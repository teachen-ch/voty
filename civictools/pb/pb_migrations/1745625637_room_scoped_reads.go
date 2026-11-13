package pb_migrations

import (
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/types"
)

// Room content is only readable when the client names the room in the X-Room-Id header,
// so knowing a room id stays the only way in and records can't be enumerated across rooms.
func roomScopedReadPaths() map[string]string {
	return map[string]string{
		"participants":      "room",
		"sticky_notes":      "room",
		"ballots":           "room",
		"discussion_boards": "room",
		"votings":           "room",
		"timers":            "room",
		"rankings":          "room",
		"media_items":       "room",
		"arguments":         "discussion_board.room",
		"argument_votes":    "argument.discussion_board.room",
		"participant_votes": "voting.room",
		"ranking_responses": "ranking.room",
	}
}

func init() {
	m.Register(func(app core.App) error {
		for name, path := range roomScopedReadPaths() {
			col, err := app.FindCollectionByNameOrId(name)
			if err != nil {
				continue
			}
			rule := `@request.headers.x_room_id != "" && ` + path + ` = @request.headers.x_room_id`
			col.ListRule = types.Pointer(rule)
			col.ViewRule = types.Pointer(rule)
			if err := app.Save(col); err != nil {
				return err
			}
		}
		return nil
	}, func(app core.App) error {
		for name := range roomScopedReadPaths() {
			col, err := app.FindCollectionByNameOrId(name)
			if err != nil {
				continue
			}
			col.ListRule = types.Pointer("")
			col.ViewRule = types.Pointer("")
			if err := app.Save(col); err != nil {
				return err
			}
		}
		return nil
	})
}
