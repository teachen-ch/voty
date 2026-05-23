package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		for _, colName := range []string{"rooms", "sticky_notes", "ballots", "participants"} {
			col, err := app.FindCollectionByNameOrId(colName)
			if err != nil {
				continue
			}
			changed := false
			if col.Fields.GetByName("created") == nil {
				col.Fields.Add(&core.AutodateField{Name: "created", OnCreate: true})
				changed = true
			}
			if col.Fields.GetByName("updated") == nil {
				col.Fields.Add(&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true})
				changed = true
			}
			if changed {
				if err := app.Save(col); err != nil {
					return err
				}
			}
		}
		return nil
	}, nil)
}
