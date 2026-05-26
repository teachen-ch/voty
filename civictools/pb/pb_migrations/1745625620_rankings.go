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

		if _, err := app.FindCollectionByNameOrId("rankings"); err != nil {
			rankings := core.NewBaseCollection("rankings")
			rankings.Fields.Add(
				&core.RelationField{Name: "room", CollectionId: roomsCol.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
				&core.TextField{Name: "question"},
				&core.JSONField{Name: "options"},
				&core.JSONField{Name: "config"},
				&core.NumberField{Name: "pos_x"},
				&core.NumberField{Name: "pos_y"},
				&core.AutodateField{Name: "created", OnCreate: true},
				&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
			)
			rankings.ListRule = types.Pointer("")
			rankings.ViewRule = types.Pointer("")
			rankings.CreateRule = types.Pointer(teacherOnly)
			rankings.UpdateRule = types.Pointer(teacherOnly)
			rankings.DeleteRule = types.Pointer(teacherOnly)
			if err := app.Save(rankings); err != nil {
				return err
			}
		}

		rankingsCol, err := app.FindCollectionByNameOrId("rankings")
		if err != nil {
			return err
		}

		if _, err := app.FindCollectionByNameOrId("ranking_responses"); err != nil {
			responses := core.NewBaseCollection("ranking_responses")
			responses.Fields.Add(
				&core.RelationField{Name: "ranking", CollectionId: rankingsCol.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
				&core.RelationField{Name: "participant", CollectionId: participantsCol.Id, Required: true, MaxSelect: 1},
				&core.JSONField{Name: "order"},
				&core.AutodateField{Name: "created", OnCreate: true},
				&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
			)
			responses.ListRule = types.Pointer("")
			responses.ViewRule = types.Pointer("")
			responses.CreateRule = types.Pointer("")
			responses.UpdateRule = types.Pointer("")
			responses.DeleteRule = types.Pointer("")
			responses.Indexes = []string{
				"CREATE UNIQUE INDEX idx_ranking_responses_unique ON ranking_responses (ranking, participant)",
			}
			if err := app.Save(responses); err != nil {
				return err
			}
		}

		return nil
	}, func(app core.App) error {
		for _, name := range []string{"ranking_responses", "rankings"} {
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
