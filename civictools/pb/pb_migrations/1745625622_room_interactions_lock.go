package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("rooms")
		if err != nil { return err }
		collection.Fields.Add(&core.BoolField{Name: "interactions_locked"})
		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("rooms")
		if err != nil { return nil }
		collection.Fields.RemoveByName("interactions_locked")
		return app.Save(collection)
	})
}
