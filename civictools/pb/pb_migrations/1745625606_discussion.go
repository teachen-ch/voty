package pb_migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(app core.App) error {
		if _, err := app.FindCollectionByNameOrId("discussion_boards"); err == nil {
			return nil
		}

		roomsCol, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		participantsCol, err := app.FindCollectionByNameOrId("participants")
		if err != nil {
			return err
		}

		boards := core.NewBaseCollection("discussion_boards")
		boards.Fields.Add(
			&core.RelationField{Name: "room", CollectionId: roomsCol.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
			&core.TextField{Name: "prompt"},
			&core.NumberField{Name: "pos_x"},
			&core.NumberField{Name: "pos_y"},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		boards.ListRule = types.Pointer("")
		boards.ViewRule = types.Pointer("")
		boards.CreateRule = types.Pointer("@request.auth.id != '' && @request.auth.id = room.teacher")
		boards.UpdateRule = types.Pointer("@request.auth.id != '' && @request.auth.id = room.teacher")
		boards.DeleteRule = types.Pointer("@request.auth.id != '' && @request.auth.id = room.teacher")
		if err := app.Save(boards); err != nil {
			return err
		}

		args := core.NewBaseCollection("arguments")
		args.Fields.Add(
			&core.RelationField{Name: "discussion_board", CollectionId: boards.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
			&core.RelationField{Name: "participant", CollectionId: participantsCol.Id, Required: true, MaxSelect: 1},
			&core.BoolField{Name: "is_pro"},
			&core.TextField{Name: "text"},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		args.ListRule = types.Pointer("")
		args.ViewRule = types.Pointer("")
		args.CreateRule = types.Pointer("")
		args.UpdateRule = types.Pointer("")
		args.DeleteRule = types.Pointer("")
		if err := app.Save(args); err != nil {
			return err
		}

		votes := core.NewBaseCollection("argument_votes")
		votes.Fields.Add(
			&core.RelationField{Name: "argument", CollectionId: args.Id, Required: true, MaxSelect: 1, CascadeDelete: true},
			&core.RelationField{Name: "participant", CollectionId: participantsCol.Id, Required: true, MaxSelect: 1},
			&core.AutodateField{Name: "created", OnCreate: true},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)
		votes.ListRule = types.Pointer("")
		votes.ViewRule = types.Pointer("")
		votes.CreateRule = types.Pointer("")
		votes.UpdateRule = types.Pointer("")
		votes.DeleteRule = types.Pointer("")
		votes.Indexes = []string{
			"CREATE UNIQUE INDEX idx_argument_votes_unique ON argument_votes (argument, participant)",
		}
		return app.Save(votes)
	}, func(app core.App) error {
		for _, name := range []string{"argument_votes", "arguments", "discussion_boards"} {
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
