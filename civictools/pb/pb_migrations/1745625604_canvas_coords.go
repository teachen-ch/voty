package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		// Scale existing sticky note positions from percentage (0-100) to canvas world pixels.
		// Old pos_x/pos_y stored percentages; multiply by 60 to land in the 0-6000px range
		// which the initial viewport (centered at 3000,2000) can comfortably show.
		_, err := app.DB().NewQuery(
			"UPDATE sticky_notes SET pos_x = pos_x * 60, pos_y = pos_y * 60",
		).Execute()
		return err
	}, func(app core.App) error {
		_, err := app.DB().NewQuery(
			"UPDATE sticky_notes SET pos_x = pos_x / 60, pos_y = pos_y / 60",
		).Execute()
		return err
	})
}
