package main

import (
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/router"
	"github.com/pocketbase/pocketbase/ui"
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
