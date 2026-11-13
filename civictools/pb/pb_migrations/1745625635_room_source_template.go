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
		if rooms.Fields.GetByName("source_template") != nil {
			return nil
		}
		rooms.Fields.Add(&core.RelationField{
			Name:          "source_template",
			CollectionId:  rooms.Id,
			MaxSelect:     1,
			CascadeDelete: false,
		})
		rooms.AddIndex("idx_rooms_source_template", false, "source_template", "")
		return app.Save(rooms)
	}, func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		rooms.Fields.RemoveByName("source_template")
		rooms.RemoveIndex("idx_rooms_source_template")
		return app.Save(rooms)
	})
}
