package main

import (
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// configureAuthEmailTemplates changes PocketBase's built-in auth links from
// /_/ to /pb/. This keeps the admin UI hidden from scanners while allowing
// verification, password-reset, and email-change links to open the UI.
func configureAuthEmailTemplates(app *pocketbase.PocketBase) error {
	users, err := app.FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	changed := false
	for _, template := range []*core.EmailTemplate{
		&users.VerificationTemplate,
		&users.ResetPasswordTemplate,
		&users.ConfirmEmailChangeTemplate,
	} {
		updatedBody := strings.ReplaceAll(template.Body, "{APP_URL}/_/", "{APP_URL}/pb/")
		if updatedBody != template.Body {
			template.Body = updatedBody
			changed = true
		}
	}

	if changed {
		return app.Save(users)
	}
	return nil
}
