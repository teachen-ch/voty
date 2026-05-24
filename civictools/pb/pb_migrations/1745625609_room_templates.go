package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		changed := false
		if rooms.Fields.GetByName("is_template") == nil {
			rooms.Fields.Add(&core.BoolField{Name: "is_template"})
			changed = true
		}
		if rooms.Fields.GetByName("description") == nil {
			rooms.Fields.Add(&core.TextField{Name: "description"})
			changed = true
		}
		if changed {
			return app.Save(rooms)
		}
		return nil
	}, func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return nil
		}
		changed := false
		if rooms.Fields.GetByName("is_template") != nil {
			rooms.Fields.RemoveByName("is_template")
			changed = true
		}
		if rooms.Fields.GetByName("description") != nil {
			rooms.Fields.RemoveByName("description")
			changed = true
		}
		if changed {
			return app.Save(rooms)
		}
		return nil
	})
}
