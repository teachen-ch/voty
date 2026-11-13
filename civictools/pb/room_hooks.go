package main

import (
	"math/rand"

	"ganigeorgiev.com/pocketbase/pocketbase"
	"ganigeorgiev.com/pocketbase/pocketbase/apis"
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/router"
)

const roomSlugAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func generateUniqueSlug(app core.App) (string, error) {
	for {
		b := make([]byte, 6)
		for i := range b {
			b[i] = roomSlugAlphabet[rand.Intn(len(roomSlugAlphabet))]
		}
		slug := string(b)
		existing, _ := app.FindFirstRecordByFilter("rooms", "slug = {:slug}", map[string]any{"slug": slug})
		if existing == nil {
			return slug, nil
		}
	}
}

func registerRoomHooks(app *pocketbase.PocketBase) {
	app.OnRecordCreate("rooms").BindFunc(func(e *core.RecordEvent) error {
		if e.Record.GetString("slug") == "" {
			slug, err := generateUniqueSlug(e.App)
			if err != nil {
				return err
			}
			e.Record.Set("slug", slug)
		}
		return e.Next()
	})

	app.OnRecordDelete("rooms").BindFunc(func(e *core.RecordEvent) error {
		// cascading children first: they reference participants, which have no cascade on room
		for _, name := range []string{"discussion_boards", "votings", "rankings", "timers", "media_items", "sticky_notes", "ballots", "participants"} {
			records, err := e.App.FindRecordsByFilter(name, "room = {:room}", "", 0, 0,
				map[string]any{"room": e.Record.Id})
			if err != nil {
				continue
			}
			for _, r := range records {
				if err := e.App.Delete(r); err != nil {
					return err
				}
			}
		}
		return e.Next()
	})

	app.OnRecordAfterCreateSuccess("rooms").BindFunc(func(e *core.RecordEvent) error {
		if err := ensureTeacherParticipant(e.App, e.Record); err != nil {
			e.App.Logger().Error("failed to create teacher participant", "room", e.Record.Id, "err", err)
		}
		return e.Next()
	})
}

func ensureTeacherParticipant(app core.App, room *core.Record) error {
	_, err := ensureUserParticipant(app, room, room.GetString("teacher"))
	return err
}

func ensureUserParticipant(app core.App, room *core.Record, teacherId string) (*core.Record, error) {
	if teacherId == "" {
		return nil, nil
	}

	participants, err := app.FindCollectionByNameOrId("participants")
	if err != nil {
		return nil, err
	}

	existing, _ := app.FindFirstRecordByFilter(
		participants.Id,
		"room = {:room} && user = {:user}",
		map[string]any{"room": room.Id, "user": teacherId},
	)
	if existing != nil {
		return existing, nil
	}

	user, err := app.FindRecordById("users", teacherId)
	if err != nil {
		return nil, err
	}
	nickname := user.GetString("name")
	if nickname == "" {
		nickname = user.GetString("email")
	}
	if nickname == "" {
		nickname = "Teacher"
	}

	p := core.NewRecord(participants)
	p.Set("room", room.Id)
	p.Set("user", teacherId)
	p.Set("role", "teacher")
	p.Set("nickname", nickname)
	p.Set("tenant", user.GetString("tenant"))
	if err := app.Save(p); err != nil {
		return nil, err
	}
	return p, nil
}

func canManageRoom(user, room *core.Record) bool {
	if user == nil || room == nil {
		return false
	}
	if room.GetString("teacher") == user.Id {
		return true
	}
	tenant := user.GetString("tenant")
	return user.GetBool("editor") && room.GetBool("is_template") &&
		tenant != "" && room.GetString("tenant") == tenant
}

func registerSharedTemplates(app *pocketbase.PocketBase) {
	app.OnRecordEnrich("rooms").BindFunc(func(e *core.RecordEnrichEvent) error {
		auth := e.RequestInfo.Auth
		if auth != nil && auth.GetBool("editor") && e.Record.GetBool("is_template") &&
			auth.GetString("tenant") != "" && auth.GetString("tenant") == e.Record.GetString("tenant") {
			name := ""
			if owner, err := e.App.FindRecordById("users", e.Record.GetString("teacher")); err == nil {
				name = owner.GetString("name")
				if name == "" {
					name = owner.GetString("email")
				}
			}
			e.Record.WithCustomData(true)
			e.Record.Set("owner_name", name)
		}
		return e.Next()
	})

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/civictools/rooms/{id}/teacher-participant", func(re *core.RequestEvent) error {
			room, err := re.App.FindRecordById("rooms", re.Request.PathValue("id"))
			if err != nil {
				return router.NewNotFoundError("room not found", nil)
			}
			if !canManageRoom(re.Auth, room) {
				return router.NewForbiddenError("not allowed", nil)
			}
			p, err := ensureUserParticipant(re.App, room, re.Auth.Id)
			if err != nil {
				return router.NewApiError(500, "failed to create participant", err)
			}
			return re.JSON(200, p)
		}).Bind(apis.RequireAuth())
		return se.Next()
	})
}
