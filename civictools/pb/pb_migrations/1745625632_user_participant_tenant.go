package pb_migrations

import (
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		for _, name := range []string{"users", "participants"} {
			c, err := app.FindCollectionByNameOrId(name)
			if err != nil {
				return err
			}
			if c.Fields.GetByName("tenant") == nil {
				c.Fields.Add(&core.TextField{Name: "tenant"})
				if err := app.Save(c); err != nil {
					return err
				}
			}
		}
		return nil
	}, func(app core.App) error {
		for _, name := range []string{"users", "participants"} {
			c, err := app.FindCollectionByNameOrId(name)
			if err != nil {
				continue
			}
			if c.Fields.GetByName("tenant") != nil {
				c.Fields.RemoveByName("tenant")
				if err := app.Save(c); err != nil {
					return err
				}
			}
		}
		return nil
	})
}
