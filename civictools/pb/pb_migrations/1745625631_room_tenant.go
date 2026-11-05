package pb_migrations

import (
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		if rooms.Fields.GetByName("tenant") == nil {
			rooms.Fields.Add(&core.TextField{Name: "tenant"})
			if err := app.Save(rooms); err != nil {
				return err
			}
		}
		_, err = app.DB().NewQuery("UPDATE rooms SET tenant = 'voty' WHERE tenant = '' OR tenant IS NULL").Execute()
		return err
	}, func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return nil
		}
		if rooms.Fields.GetByName("tenant") != nil {
			rooms.Fields.RemoveByName("tenant")
			return app.Save(rooms)
		}
		return nil
	})
}
