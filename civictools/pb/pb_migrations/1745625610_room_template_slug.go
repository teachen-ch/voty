package pb_migrations

import (
	"strings"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		if rooms.Fields.GetByName("slug") == nil {
			rooms.Fields.Add(&core.TextField{Name: "slug"})
			if err := app.Save(rooms); err != nil {
				return err
			}
		}

		// Backfill existing templates with their record id as slug so any
		// pre-existing /copy/<id> URLs keep resolving after the cutover.
		templates, err := app.FindRecordsByFilter("rooms", "is_template = true && slug = ''", "", 0, 0)
		if err != nil {
			return err
		}
		for _, r := range templates {
			r.Set("slug", r.Id)
			if err := app.Save(r); err != nil {
				return err
			}
		}

		const idxName = "idx_rooms_slug_unique"
		filtered := rooms.Indexes[:0]
		for _, idx := range rooms.Indexes {
			if !strings.Contains(idx, idxName) {
				filtered = append(filtered, idx)
			}
		}
		rooms.Indexes = append(filtered,
			"CREATE UNIQUE INDEX "+idxName+" ON rooms (slug) WHERE slug != ''",
		)
		return app.Save(rooms)
	}, func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return nil
		}
		const idxName = "idx_rooms_slug_unique"
		filtered := rooms.Indexes[:0]
		for _, idx := range rooms.Indexes {
			if !strings.Contains(idx, idxName) {
				filtered = append(filtered, idx)
			}
		}
		rooms.Indexes = filtered
		if rooms.Fields.GetByName("slug") != nil {
			rooms.Fields.RemoveByName("slug")
		}
		return app.Save(rooms)
	})
}
