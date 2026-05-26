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
		if rooms.Fields.GetByName("last_active") == nil {
			rooms.Fields.Add(&core.DateField{Name: "last_active"})
			return app.Save(rooms)
		}
		return nil
	}, func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return nil
		}
		if rooms.Fields.GetByName("last_active") != nil {
			rooms.Fields.RemoveByName("last_active")
			return app.Save(rooms)
		}
		return nil
	})
}
