package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(app core.App) error {
		if _, err := app.FindCollectionByNameOrId("participants"); err == nil {
			return nil
		}

		roomsCol, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}

		col := core.NewBaseCollection("participants")
		usersCol, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return err
		}

		col.Fields.Add(
			&core.RelationField{Name: "room", CollectionId: roomsCol.Id, Required: true, MaxSelect: 1},
			&core.TextField{Name: "nickname", Required: true},
			&core.TextField{Name: "session_token"},
			&core.TextField{Name: "role"},
			&core.RelationField{Name: "user", CollectionId: usersCol.Id, MaxSelect: 1},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		col.ListRule = types.Pointer("")
		col.ViewRule = types.Pointer("")
		col.CreateRule = types.Pointer("")
		col.UpdateRule = types.Pointer(`session_token = @request.body.session_token || @request.auth.id = user`)
		col.DeleteRule = types.Pointer("")
		return app.Save(col)
	}, func(app core.App) error {
		col, err := app.FindCollectionByNameOrId("participants")
		if err != nil {
			return nil
		}
		return app.Delete(col)
	})
}
