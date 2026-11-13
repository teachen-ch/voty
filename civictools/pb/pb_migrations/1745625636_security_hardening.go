package pb_migrations

import (
	"strings"

	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/types"
)

const (
	roomListRule        = `is_template = true || (@request.auth.id != "" && teacher = @request.auth.id)`
	roomCreateOwnerOnly = `@request.body.teacher = @request.auth.id && @request.body.source_template:isset = false && (@request.body.template_locked:isset = false || @request.body.template_locked = false)`
	roomKeepSource      = `(@request.body.source_template:isset = false || @request.body.source_template = source_template)`
	participantCreate   = `@request.body.user:isset = false && (@request.body.role:isset = false || @request.body.role = "student") && @request.body.room.is_template != true`
	hasSessionHeader    = `@request.headers.x_session_token != ""`
)

// SessionRule holds the non-student branch of a student-owned collection's rules.
// The student branch (session token) is verified in Go, because session_token is
// a hidden field and hidden fields cannot be referenced in API rules.
type SessionRule struct {
	Update, Delete string
}

func SessionRules() map[string]SessionRule {
	return map[string]SessionRule{
		"participants":      {Update: `@request.auth.id != "" && user = @request.auth.id`, Delete: canEdit("room.")},
		"sticky_notes":      {Update: canEdit("room."), Delete: canEdit("room.")},
		"arguments":         {Update: canEdit("discussion_board.room."), Delete: canEdit("discussion_board.room.")},
		"argument_votes":    {Delete: canEdit("argument.discussion_board.room.")},
		"participant_votes": {Delete: canEdit("voting.room.")},
		"ranking_responses": {Delete: canEdit("ranking.room.")},
	}
}

func withSession(rule string) *string {
	if rule == "" {
		return types.Pointer(hasSessionHeader)
	}
	return types.Pointer(hasSessionHeader + " || (" + rule + ")")
}

func appendRule(rule *string, extra string) *string {
	if rule == nil || strings.Contains(*rule, extra) {
		return rule
	}
	return types.Pointer("(" + *rule + ") && " + extra)
}

func init() {
	m.Register(func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		rooms.ListRule = types.Pointer(roomListRule)
		rooms.CreateRule = appendRule(rooms.CreateRule, roomCreateOwnerOnly)
		rooms.UpdateRule = appendRule(rooms.UpdateRule, roomKeepSource)
		if err := app.Save(rooms); err != nil {
			return err
		}

		participants, err := app.FindCollectionByNameOrId("participants")
		if err != nil {
			return err
		}
		participants.CreateRule = types.Pointer(participantCreate)
		if f := participants.Fields.GetByName("session_token"); f != nil {
			f.SetHidden(true)
		}
		if err := app.Save(participants); err != nil {
			return err
		}

		edit := types.Pointer(canEdit("room."))
		rules := map[string]ruleSet{"ballots": {create: edit, update: edit, del: edit}}
		for name, r := range SessionRules() {
			rules[name] = ruleSet{update: withSession(r.Update), del: withSession(r.Delete)}
		}
		return applyRules(app, rules)
	}, nil)
}
