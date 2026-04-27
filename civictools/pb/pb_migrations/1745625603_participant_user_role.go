package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(app core.App) error {
		usersCol, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return err
		}

		participants, err := app.FindCollectionByNameOrId("participants")
		if err != nil {
			return err
		}

		if participants.Fields.GetByName("role") == nil {
			participants.Fields.Add(&core.TextField{Name: "role"})
		}
		if participants.Fields.GetByName("user") == nil {
			participants.Fields.Add(&core.RelationField{
				Name:         "user",
				CollectionId: usersCol.Id,
				MaxSelect:    1,
			})
		}
		if f, ok := participants.Fields.GetByName("session_token").(*core.TextField); ok {
			f.Required = false
		}
		participants.UpdateRule = types.Pointer(`session_token = @request.body.session_token || @request.auth.id = user`)
		if err := app.Save(participants); err != nil {
			return err
		}

		notes, err := app.FindCollectionByNameOrId("sticky_notes")
		if err != nil {
			return err
		}
		notes.Fields.RemoveByName("nickname")
		if notes.Fields.GetByName("participant") == nil {
			notes.Fields.Add(&core.RelationField{
				Name:         "participant",
				CollectionId: participants.Id,
				MaxSelect:    1,
			})
		}
		return app.Save(notes)
	}, nil)
}
