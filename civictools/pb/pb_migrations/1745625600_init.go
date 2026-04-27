package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(app core.App) error {
		if _, err := app.FindCollectionByNameOrId("rooms"); err == nil {
			return nil // already initialized, skip
		}

		usersCol, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return err
		}

		rooms := core.NewBaseCollection("rooms")
		rooms.Fields.Add(
			&core.TextField{Name: "name", Required: true},
			&core.RelationField{
				Name:         "teacher",
				CollectionId: usersCol.Id,
				Required:     true,
				MaxSelect:    1,
			},
			&core.BoolField{Name: "sticky_notes_enabled"},
			&core.BoolField{Name: "ballots_enabled"},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		rooms.ListRule = types.Pointer("")
		rooms.ViewRule = types.Pointer("")
		rooms.CreateRule = types.Pointer("@request.auth.id != ''")
		rooms.UpdateRule = types.Pointer("@request.auth.id = teacher")
		rooms.DeleteRule = types.Pointer("@request.auth.id = teacher")
		if err := app.Save(rooms); err != nil {
			return err
		}

		notes := core.NewBaseCollection("sticky_notes")
		notes.Fields.Add(
			&core.RelationField{Name: "room", CollectionId: rooms.Id, Required: true, MaxSelect: 1},
			&core.TextField{Name: "content"},
			&core.NumberField{Name: "pos_x"},
			&core.NumberField{Name: "pos_y"},
			&core.TextField{Name: "color"},
			&core.TextField{Name: "nickname"},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		notes.ListRule = types.Pointer("")
		notes.ViewRule = types.Pointer("")
		notes.CreateRule = types.Pointer("")
		notes.UpdateRule = types.Pointer("")
		notes.DeleteRule = types.Pointer("")
		if err := app.Save(notes); err != nil {
			return err
		}

		ballots := core.NewBaseCollection("ballots")
		ballots.Fields.Add(
			&core.RelationField{Name: "room", CollectionId: rooms.Id, Required: true, MaxSelect: 1},
			&core.TextField{Name: "question"},
			&core.JSONField{Name: "options"},
			&core.BoolField{Name: "active"},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		ballots.ListRule = types.Pointer("")
		ballots.ViewRule = types.Pointer("")
		ballots.CreateRule = types.Pointer("@request.auth.id != ''")
		ballots.UpdateRule = types.Pointer("@request.auth.id != ''")
		ballots.DeleteRule = types.Pointer("@request.auth.id != ''")
		return app.Save(ballots)
	}, func(app core.App) error {
		for _, name := range []string{"ballots", "sticky_notes", "rooms"} {
			col, err := app.FindCollectionByNameOrId(name)
			if err != nil {
				continue
			}
			if err := app.Delete(col); err != nil {
				return err
			}
		}
		return nil
	})
}
