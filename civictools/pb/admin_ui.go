package main

import (
	"strings"

	"ganigeorgiev.com/pocketbase/pocketbase"
	"ganigeorgiev.com/pocketbase/pocketbase/apis"
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/router"
	"ganigeorgiev.com/pocketbase/pocketbase/ui"
)

// registerAdminUI exposes PocketBase's embedded admin UI at /pb/.
func registerAdminUI(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/pb/{path...}", apis.Static(ui.DistDirFS, true))
		se.Router.BindFunc(func(e *core.RequestEvent) error {
			if strings.HasPrefix(e.Request.URL.Path, "/_/") {
				return router.NewNotFoundError("not found", nil)
			}
			return e.Next()
		})
		return se.Next()
	})
}
