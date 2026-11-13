package pb_migrations

import (
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/types"
)

func canEdit(p string) string {
	return "(" + canManage(p) + " && " + p + "template_locked != true)"
}

func init() {
	m.Register(func(app core.App) error {
		rooms, err := app.FindCollectionByNameOrId("rooms")
		if err != nil {
			return err
		}
		if rooms.Fields.GetByName("template_locked") == nil {
			rooms.Fields.Add(&core.BoolField{Name: "template_locked"})
			if err := app.Save(rooms); err != nil {
				return err
			}
		}

		rules := sharedTemplateRules(canEdit)
		rules["rooms"] = ruleSet{
			update: types.Pointer(canManage("") +
				` && (template_locked != true || (@request.body.template_locked:isset = true && @request.body.template_locked = false))` +
				` && (@request.body.template_locked:isset = false || @request.body.template_locked = template_locked || @request.auth.editor = true)` +
				` && (@request.body.is_template:isset = false || @request.body.is_template = is_template || @request.auth.editor = true)` +
				` && (@request.body.teacher:isset = false || @request.body.teacher = teacher)` +
				` && (@request.body.tenant:isset = false || @request.body.tenant = tenant || teacher = @request.auth.id)`),
			del: types.Pointer(canEdit("")),
		}
		return applyRules(app, rules)
	}, nil)
}
