package pb_migrations

import (
	"strings"

	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/types"
)

const (
	noEditorBody               = `@request.body.editor:isset = false`
	roomCreateEditorRule       = `@request.auth.id != "" && (@request.body.is_template:isset = false || @request.body.is_template = false || @request.auth.editor = true)`
	roomUpdateEditorRule       = `@request.auth.id = teacher && (@request.body.is_template:isset = false || @request.body.is_template = is_template || @request.auth.editor = true)`
	mediaCreateRule            = `@request.auth.id != "" && @request.auth.editor = true && room.teacher = @request.auth.id`
	mediaUpdateRule            = `@request.auth.id != "" && room.teacher = @request.auth.id && @request.body.room:isset = false && @request.body.kind:isset = false && @request.body.file:isset = false && @request.body.url:isset = false && @request.body.embed_url:isset = false`
	mediaDeleteRule            = `@request.auth.id != "" && room.teacher = @request.auth.id`
	maxImageBytes        int64 = 10 * 1024 * 1024
)

func guardEditor(rule *string) *string {
	if rule == nil || strings.Contains(*rule, noEditorBody) {
		return rule
	}
	if *rule == "" {
		return types.Pointer(noEditorBody)
	}
	return types.Pointer("(" + *rule + ") && " + noEditorBody)
}

func init() {
	m.Register(func(app core.App) error {
		users, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return err
		}
		if users.Fields.GetByName("editor") == nil {
			users.Fields.Add(&core.BoolField{Name: "editor"})
		}
		users.CreateRule = guardEditor(users.CreateRule)
		users.UpdateRule = guardEditor(users.UpdateRule)
		if err := app.Save(users); err != nil {
			return err
		}

		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		rooms.CreateRule = types.Pointer(roomCreateEditorRule)
		rooms.UpdateRule = types.Pointer(roomUpdateEditorRule)
		if err := app.Save(rooms); err != nil {
			return err
		}

		if _, err := app.FindCollectionByNameOrId("media_items"); err == nil {
			return nil
		}
		media := core.NewBaseCollection("media_items")
		media.Fields.Add(
			&core.RelationField{Name: "room", CollectionId: rooms.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
			&core.SelectField{Name: "kind", Required: true, MaxSelect: 1, Values: []string{"image", "video"}},
			&core.FileField{
				Name:      "file",
				MaxSelect: 1,
				MaxSize:   maxImageBytes,
				MimeTypes: []string{"image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"},
			},
			&core.TextField{Name: "url"},
			&core.TextField{Name: "embed_url"},
			&core.TextField{Name: "description"},
			&core.NumberField{Name: "aspect_ratio"},
			&core.NumberField{Name: "width"},
			&core.NumberField{Name: "pos_x"},
			&core.NumberField{Name: "pos_y"},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		media.ListRule = types.Pointer("")
		media.ViewRule = types.Pointer("")
		media.CreateRule = types.Pointer(mediaCreateRule)
		media.UpdateRule = types.Pointer(mediaUpdateRule)
		media.DeleteRule = types.Pointer(mediaDeleteRule)
		return app.Save(media)
	}, func(app core.App) error {
		if col, err := app.FindCollectionByNameOrId("media_items"); err == nil {
			if err := app.Delete(col); err != nil {
				return err
			}
		}
		return nil
	})
}
