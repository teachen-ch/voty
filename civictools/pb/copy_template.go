package main

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/router"
)

func registerCopyTemplate(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/civictools/copy/{slug}", func(re *core.RequestEvent) error {
			if re.Auth == nil {
				return router.NewUnauthorizedError("login required", nil)
			}

			slug := re.Request.PathValue("slug")
			if slug == "" {
				return router.NewBadRequestError("missing slug", nil)
			}

			tpl, err := re.App.FindFirstRecordByFilter(
				"rooms",
				"slug = {:slug} && is_template = true",
				map[string]any{"slug": slug},
			)
			if err != nil || tpl == nil {
				return router.NewNotFoundError("template not found", nil)
			}
			templateId := tpl.Id

			var newRoomId string
			err = re.App.RunInTransaction(func(txApp core.App) error {
				roomsCol, err := txApp.FindCollectionByNameOrId("rooms")
				if err != nil {
					return err
				}

				newRoom := core.NewRecord(roomsCol)
				newRoom.Set("name", tpl.GetString("name"))
				newRoom.Set("teacher", re.Auth.Id)
				newRoom.Set("sticky_notes_enabled", tpl.GetBool("sticky_notes_enabled"))
				newRoom.Set("ballots_enabled", tpl.GetBool("ballots_enabled"))
				newRoom.Set("is_template", false)
				newRoom.Set("description", "")
				if err := txApp.Save(newRoom); err != nil {
					return err
				}
				newRoomId = newRoom.Id

				if err := copyChildren(txApp, "discussion_boards", templateId, newRoom.Id,
					[]string{"prompt", "pos_x", "pos_y", "options"}); err != nil {
					return err
				}
				if err := copyChildren(txApp, "votings", templateId, newRoom.Id,
					[]string{"prompt", "options", "config", "pos_x", "pos_y"}); err != nil {
					return err
				}
				if err := copyChildren(txApp, "timers", templateId, newRoom.Id,
					[]string{"duration_seconds", "pos_x", "pos_y"}); err != nil {
					return err
				}
				if err := copyBallots(txApp, templateId, newRoom.Id); err != nil {
					return err
				}
				return nil
			})
			if err != nil {
				return router.NewApiError(500, "failed to copy template", err)
			}

			return re.JSON(200, map[string]string{"id": newRoomId})
		}).Bind(apis.RequireAuth())

		return se.Next()
	})
}

func copyChildren(app core.App, collection, fromRoom, toRoom string, fields []string) error {
	col, err := app.FindCollectionByNameOrId(collection)
	if err != nil {
		return err
	}
	records, err := app.FindRecordsByFilter(col.Id, "room = {:room}", "", 0, 0,
		map[string]any{"room": fromRoom})
	if err != nil {
		return err
	}
	for _, src := range records {
		dst := core.NewRecord(col)
		dst.Set("room", toRoom)
		for _, f := range fields {
			dst.Set(f, src.Get(f))
		}
		if err := app.Save(dst); err != nil {
			return err
		}
	}
	return nil
}

func copyBallots(app core.App, fromRoom, toRoom string) error {
	col, err := app.FindCollectionByNameOrId("ballots")
	if err != nil {
		return err
	}
	records, err := app.FindRecordsByFilter(col.Id, "room = {:room}", "", 0, 0,
		map[string]any{"room": fromRoom})
	if err != nil {
		return err
	}
	for _, src := range records {
		dst := core.NewRecord(col)
		dst.Set("room", toRoom)
		dst.Set("question", src.GetString("question"))
		dst.Set("options", src.Get("options"))
		dst.Set("active", false)
		if err := app.Save(dst); err != nil {
			return err
		}
	}
	return nil
}
