package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("sticky_notes")
		if err != nil {
			return err
		}
		collection.Fields.Add(
			&core.NumberField{Name: "width"},
			&core.NumberField{Name: "height"},
		)
		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("sticky_notes")
		if err != nil {
			return nil
		}
		collection.Fields.RemoveByName("width")
		collection.Fields.RemoveByName("height")
		return app.Save(collection)
	})
}
