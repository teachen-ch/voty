package pb_migrations

import (
	"fmt"
	"strings"

	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/types"
)

const noTenantBody = `@request.body.tenant:isset = false || @request.body.tenant = tenant`

// canManage: the room owner, or an editor of the room's tenant when the room is a template.
func canManage(p string) string {
	return fmt.Sprintf(`(@request.auth.id != "" && (%[1]steacher = @request.auth.id || (@request.auth.editor = true && @request.auth.tenant != "" && %[1]sis_template = true && %[1]stenant = @request.auth.tenant)))`, p)
}

func sessionOwner(rel string) string {
	return fmt.Sprintf(`(@request.headers.x_session_token != "" && %s.session_token = @request.headers.x_session_token)`, rel)
}

type ruleSet struct {
	create, update, del *string
}

func sharedTemplateRules(manage func(string) string) map[string]ruleSet {
	room := manage("")
	child := manage("room.")
	p := types.Pointer[string]
	return map[string]ruleSet{
		"rooms": {
			update: p(room +
				` && (@request.body.is_template:isset = false || @request.body.is_template = is_template || @request.auth.editor = true)` +
				` && (@request.body.teacher:isset = false || @request.body.teacher = teacher)` +
				` && (@request.body.tenant:isset = false || @request.body.tenant = tenant || teacher = @request.auth.id)`),
		},
		"discussion_boards": {create: p(child), update: p(child), del: p(child)},
		"votings":           {create: p(child), update: p(child), del: p(child)},
		"timers":            {create: p(child), update: p(child), del: p(child)},
		"rankings":          {create: p(child), update: p(child), del: p(child)},
		"media_items": {
			create: p(`@request.auth.editor = true && ` + child),
			update: p(child + ` && @request.body.room:isset = false && @request.body.kind:isset = false && @request.body.file:isset = false && @request.body.url:isset = false && @request.body.embed_url:isset = false`),
			del:    p(child),
		},
		"sticky_notes": {
			update: p(sessionOwner("participant") + " || " + child),
			del:    p(sessionOwner("participant") + " || " + child),
		},
		"participants": {del: p(`(@request.headers.x_session_token != "" && session_token = @request.headers.x_session_token) || ` + child)},
		"arguments": {
			update: p(sessionOwner("participant") + " || " + manage("discussion_board.room.")),
			del:    p(sessionOwner("participant") + " || " + manage("discussion_board.room.")),
		},
		"argument_votes":    {del: p(sessionOwner("participant") + " || " + manage("argument.discussion_board.room."))},
		"participant_votes": {del: p(sessionOwner("participant") + " || " + manage("voting.room."))},
		"ranking_responses": {del: p(sessionOwner("participant") + " || " + manage("ranking.room."))},
	}
}

func init() {
	m.Register(func(app core.App) error {
		users, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return err
		}
		if users.UpdateRule != nil && !strings.Contains(*users.UpdateRule, noTenantBody) {
			users.UpdateRule = types.Pointer("(" + *users.UpdateRule + ") && (" + noTenantBody + ")")
			if err := app.Save(users); err != nil {
				return err
			}
		}

		_, err = app.DB().NewQuery(`
			UPDATE users SET tenant = COALESCE(
				(SELECT r.tenant FROM rooms r WHERE r.teacher = users.id AND r.tenant != ''
				 GROUP BY r.tenant ORDER BY COUNT(*) DESC LIMIT 1),
				'voty')
			WHERE tenant = '' OR tenant IS NULL`).Execute()
		if err != nil {
			return err
		}

		return applyRules(app, sharedTemplateRules(canManage))
	}, nil)
}

func applyRules(app core.App, rules map[string]ruleSet) error {
	for name, rs := range rules {
		col, err := app.FindCollectionByNameOrId(name)
		if err != nil {
			continue
		}
		if rs.create != nil {
			col.CreateRule = rs.create
		}
		if rs.update != nil {
			col.UpdateRule = rs.update
		}
		if rs.del != nil {
			col.DeleteRule = rs.del
		}
		if err := app.Save(col); err != nil {
			return fmt.Errorf("%s: %w", name, err)
		}
	}
	return nil
}
