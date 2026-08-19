package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

var stickyPalette = []string{"#fef08a", "#bbf7d0", "#bfdbfe", "#fecaca", "#e9d5ff"}

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("sticky_notes")
		if err != nil {
			return err
		}
		collection.Fields.Add(&core.NumberField{Name: "color_index"})
		if err := app.Save(collection); err != nil {
			return err
		}

		notes, err := app.FindAllRecords(collection.Id)
		if err != nil {
			return err
		}
		for _, note := range notes {
			index := 0
			for i, color := range stickyPalette {
				if note.GetString("color") == color {
					index = i
					break
				}
			}
			note.Set("color_index", index)
			if err := app.Save(note); err != nil {
				return err
			}
		}
		collection.Fields.RemoveByName("color")
		if err := app.Save(collection); err != nil {
			return err
		}
		return nil
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("sticky_notes")
		if err != nil {
			return nil
		}
		collection.Fields.RemoveByName("color_index")
		collection.Fields.Add(&core.TextField{Name: "color"})
		return app.Save(collection)
	})
}
