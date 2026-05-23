package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(app core.App) error {
		roomsCol, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		participantsCol, err := app.FindCollectionByNameOrId("participants")
		if err != nil {
			return err
		}

		teacherOnly := "@request.auth.id != '' && @request.auth.id = room.teacher"

		if _, err := app.FindCollectionByNameOrId("votings"); err != nil {
			votings := core.NewBaseCollection("votings")
			votings.Fields.Add(
				&core.RelationField{Name: "room", CollectionId: roomsCol.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
				&core.TextField{Name: "prompt"},
				&core.JSONField{Name: "options"},
				&core.JSONField{Name: "config"},
				&core.NumberField{Name: "pos_x"},
				&core.NumberField{Name: "pos_y"},
				&core.AutodateField{Name: "created", OnCreate: true},
				&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
			)
			votings.ListRule = types.Pointer("")
			votings.ViewRule = types.Pointer("")
			votings.CreateRule = types.Pointer(teacherOnly)
			votings.UpdateRule = types.Pointer(teacherOnly)
			votings.DeleteRule = types.Pointer(teacherOnly)
			if err := app.Save(votings); err != nil {
				return err
			}
		}

		votingsCol, err := app.FindCollectionByNameOrId("votings")
		if err != nil {
			return err
		}

		if _, err := app.FindCollectionByNameOrId("participant_votes"); err != nil {
			pvotes := core.NewBaseCollection("participant_votes")
			pvotes.Fields.Add(
				&core.RelationField{Name: "voting", CollectionId: votingsCol.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
				&core.RelationField{Name: "participant", CollectionId: participantsCol.Id, Required: true, MaxSelect: 1},
				&core.NumberField{Name: "option"},
				&core.AutodateField{Name: "created", OnCreate: true},
				&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
			)
			pvotes.ListRule = types.Pointer("")
			pvotes.ViewRule = types.Pointer("")
			pvotes.CreateRule = types.Pointer("")
			pvotes.UpdateRule = types.Pointer("")
			pvotes.DeleteRule = types.Pointer("")
			pvotes.Indexes = []string{
				"CREATE UNIQUE INDEX idx_participant_votes_unique ON participant_votes (voting, participant)",
			}
			if err := app.Save(pvotes); err != nil {
				return err
			}
		}

		if _, err := app.FindCollectionByNameOrId("timers"); err != nil {
			timers := core.NewBaseCollection("timers")
			timers.Fields.Add(
				&core.RelationField{Name: "room", CollectionId: roomsCol.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
				&core.NumberField{Name: "duration_seconds"},
				&core.DateField{Name: "started"},
				&core.DateField{Name: "paused_at"},
				&core.DateField{Name: "ended"},
				&core.NumberField{Name: "pos_x"},
				&core.NumberField{Name: "pos_y"},
				&core.AutodateField{Name: "created", OnCreate: true},
				&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
			)
			timers.ListRule = types.Pointer("")
			timers.ViewRule = types.Pointer("")
			timers.CreateRule = types.Pointer(teacherOnly)
			timers.UpdateRule = types.Pointer(teacherOnly)
			timers.DeleteRule = types.Pointer(teacherOnly)
			if err := app.Save(timers); err != nil {
				return err
			}
		}

		return nil
	}, func(app core.App) error {
		for _, name := range []string{"participant_votes", "votings", "timers"} {
			col, err := app.FindCollectionByNameOrId(name)
			if err != nil {
				continue
			}
			if err := app.Delete(col); err != nil {
				return err
			}
		}
		return nil
	})
}
