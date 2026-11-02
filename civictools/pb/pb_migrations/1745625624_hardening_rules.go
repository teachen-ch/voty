package pb_migrations

import (
	"fmt"

	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/types"
)

const (
	participantUpdateRule   = `(@request.headers.x_session_token != "" && session_token = @request.headers.x_session_token) || (@request.auth.id != "" && user = @request.auth.id)`
	participantDeleteRule   = `(@request.headers.x_session_token != "" && session_token = @request.headers.x_session_token) || (@request.auth.id != "" && room.teacher = @request.auth.id)`
	legacyParticipantUpdate = `session_token = @request.body.session_token || @request.auth.id = user`
	roomCreateRule          = `@request.auth.id != "" && (@request.body.is_template:isset = false || @request.body.is_template = false)`
	roomUpdateRule          = `@request.auth.id = teacher && (@request.body.is_template:isset = false || @request.body.is_template = is_template)`
	legacyRoomCreateRule    = `@request.auth.id != ''`
	legacyRoomUpdateRule    = `@request.auth.id = teacher`
)

func ownerToken(rel string) string {
	return fmt.Sprintf(`(@request.headers.x_session_token != "" && %s.session_token = @request.headers.x_session_token)`, rel)
}

func teacherOf(path string) string {
	return fmt.Sprintf(`(@request.auth.id != "" && %s = @request.auth.id)`, path)
}

func ownerOrTeacher(rel, path string) string {
	return ownerToken(rel) + " || " + teacherOf(path)
}

func setRules(app core.App, name string, create *string, update, del string) error {
	col, err := app.FindCollectionByNameOrId(name)
	if err != nil {
		return err
	}
	if create != nil {
		col.CreateRule = types.Pointer(*create)
	}
	col.UpdateRule = types.Pointer(update)
	col.DeleteRule = types.Pointer(del)
	return app.Save(col)
}

func init() {
	m.Register(func(app core.App) error {
		roomCreate := roomCreateRule
		if err := setRules(app, "rooms", &roomCreate, roomUpdateRule, teacherOf("teacher")); err != nil {
			return err
		}
		if err := setRules(app, "participants", nil, participantUpdateRule, participantDeleteRule); err != nil {
			return err
		}
		if err := setRules(app, "sticky_notes", nil, ownerOrTeacher("participant", "room.teacher"), ownerOrTeacher("participant", "room.teacher")); err != nil {
			return err
		}
		if err := setRules(app, "arguments", nil, ownerOrTeacher("participant", "discussion_board.room.teacher"), ownerOrTeacher("participant", "discussion_board.room.teacher")); err != nil {
			return err
		}
		if err := setRules(app, "argument_votes", nil, ownerToken("participant"), ownerOrTeacher("participant", "argument.discussion_board.room.teacher")); err != nil {
			return err
		}
		if err := setRules(app, "participant_votes", nil, ownerToken("participant"), ownerOrTeacher("participant", "voting.room.teacher")); err != nil {
			return err
		}
		if err := setRules(app, "ranking_responses", nil, ownerToken("participant"), ownerOrTeacher("participant", "ranking.room.teacher")); err != nil {
			return err
		}
		return nil
	}, func(app core.App) error {
		roomCreate := legacyRoomCreateRule
		if err := setRules(app, "rooms", &roomCreate, legacyRoomUpdateRule, legacyRoomUpdateRule); err != nil {
			return err
		}
		if err := setRules(app, "participants", nil, legacyParticipantUpdate, ""); err != nil {
			return err
		}
		for _, name := range []string{"sticky_notes", "arguments", "argument_votes", "participant_votes", "ranking_responses"} {
			if err := setRules(app, name, nil, "", ""); err != nil {
				return err
			}
		}
		return nil
	})
}
