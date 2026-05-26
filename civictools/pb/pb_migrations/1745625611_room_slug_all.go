package pb_migrations

import (
	"math/rand"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		rooms, err := app.FindRecordsByFilter("rooms", "slug = ''", "", 0, 0)
		if err != nil {
			return err
		}
		for _, r := range rooms {
			slug, err := migrationUniqueSlug(app, r.Id)
			if err != nil {
				return err
			}
			r.Set("slug", slug)
			if err := app.Save(r); err != nil {
				return err
			}
		}
		return nil
	}, nil)
}

const slugAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func migrationUniqueSlug(app core.App, excludeId string) (string, error) {
	for {
		b := make([]byte, 6)
		for i := range b {
			b[i] = slugAlphabet[rand.Intn(len(slugAlphabet))]
		}
		slug := string(b)
		existing, _ := app.FindFirstRecordByFilter(
			"rooms",
			"slug = {:slug} && id != {:id}",
			map[string]any{"slug": slug, "id": excludeId},
		)
		if existing == nil {
			return slug, nil
		}
	}
}
