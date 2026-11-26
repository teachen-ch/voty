package pb_migrations

import (
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		settings := app.Settings()
		existing := map[string]bool{}
		for _, r := range settings.RateLimits.Rules {
			existing[r.Label] = true
		}
		for _, label := range []string{
			"argument_votes:create", "argument_votes:delete",
			"participant_votes:create", "arguments:create",
			"ranking_responses:create", "ranking_responses:update",
		} {
			if existing[label] {
				continue
			}
			settings.RateLimits.Rules = append(settings.RateLimits.Rules, core.RateLimitRule{
				Label:       label,
				MaxRequests: 600,
				Duration:    10,
			})
		}
		return app.Save(settings)
	}, nil)
}
