package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		participants, err := app.FindCollectionByNameOrId("participants")
		if err != nil {
			return err
		}

		rooms, err := app.FindAllRecords("rooms")
		if err != nil {
			return err
		}

		for _, room := range rooms {
			teacherId := room.GetString("teacher")
			if teacherId == "" {
				continue
			}

			existing, _ := app.FindFirstRecordByFilter(
				participants.Id,
				"room = {:room} && user = {:user}",
				map[string]any{"room": room.Id, "user": teacherId},
			)
			if existing != nil {
				continue
			}

			user, err := app.FindRecordById("users", teacherId)
			if err != nil {
				continue
			}
			nickname := user.GetString("name")
			if nickname == "" {
				nickname = user.GetString("email")
			}
			if nickname == "" {
				nickname = "Teacher"
			}

			p := core.NewRecord(participants)
			p.Set("room", room.Id)
			p.Set("user", teacherId)
			p.Set("role", "teacher")
			p.Set("nickname", nickname)
			if err := app.Save(p); err != nil {
				return err
			}
		}
		return nil
	}, nil)
}
