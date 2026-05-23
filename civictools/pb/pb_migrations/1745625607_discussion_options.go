package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		boards, err := app.FindCollectionByNameOrId("discussion_boards")
		if err != nil {
			return err
		}
		if boards.Fields.GetByName("options") == nil {
			boards.Fields.Add(&core.JSONField{Name: "options"})
			if err := app.Save(boards); err != nil {
				return err
			}
		}

		args, err := app.FindCollectionByNameOrId("arguments")
		if err != nil {
			return err
		}
		changed := false
		if args.Fields.GetByName("option_index") == nil {
			args.Fields.Add(&core.NumberField{Name: "option_index"})
			changed = true
		}
		if args.Fields.GetByName("is_pro") != nil {
			args.Fields.RemoveByName("is_pro")
			changed = true
		}
		if changed {
			return app.Save(args)
		}
		return nil
	}, func(app core.App) error {
		return nil
	})
}
