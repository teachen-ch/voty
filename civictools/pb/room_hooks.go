package main

import (
	"math/rand"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
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

	app.OnRecordAfterCreateSuccess("rooms").BindFunc(func(e *core.RecordEvent) error {
		if err := ensureTeacherParticipant(e.App, e.Record); err != nil {
			e.App.Logger().Error("failed to create teacher participant", "room", e.Record.Id, "err", err)
		}
		return e.Next()
	})
}

func ensureTeacherParticipant(app core.App, room *core.Record) error {
	teacherId := room.GetString("teacher")
	if teacherId == "" {
		return nil
	}

	participants, err := app.FindCollectionByNameOrId("participants")
	if err != nil {
		return err
	}

	existing, _ := app.FindFirstRecordByFilter(
		participants.Id,
		"room = {:room} && user = {:user}",
		map[string]any{"room": room.Id, "user": teacherId},
	)
	if existing != nil {
		return nil
	}

	user, err := app.FindRecordById("users", teacherId)
	if err != nil {
		return err
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
	return app.Save(p)
}
