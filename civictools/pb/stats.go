package main

import (
	"ganigeorgiev.com/pocketbase/dbx"
	"ganigeorgiev.com/pocketbase/pocketbase"
	"ganigeorgiev.com/pocketbase/pocketbase/apis"
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/router"
)

type templateStat struct {
	Id         string `db:"id" json:"id"`
	Name       string `db:"name" json:"name"`
	Locked     bool   `db:"template_locked" json:"locked"`
	Copies     int    `db:"copies" json:"copies"`
	Students   int    `db:"students" json:"students"`
	LastCopied string `db:"last_copied" json:"lastCopied"`
}

type tenantStats struct {
	Tenant         string         `json:"tenant"`
	Teachers       int            `json:"teachers"`
	ActiveTeachers int            `json:"activeTeachers"`
	Rooms          int            `json:"rooms"`
	ActiveRooms    int            `json:"activeRooms"`
	Students       int            `json:"students"`
	Templates      []templateStat `json:"templates"`
}

func countQuery(app core.App, sql string, params dbx.Params) (int, error) {
	var n int
	err := app.DB().NewQuery(sql).Bind(params).Row(&n)
	return n, err
}

func registerStats(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/api/civictools/stats", func(re *core.RequestEvent) error {
			if !re.Auth.GetBool("editor") || re.Auth.GetString("tenant") == "" {
				return router.NewForbiddenError("editors only", nil)
			}
			p := dbx.Params{"tenant": re.Auth.GetString("tenant")}
			out := tenantStats{Tenant: re.Auth.GetString("tenant"), Templates: []templateStat{}}

			counts := []struct {
				dst *int
				sql string
			}{
				{&out.Teachers, `SELECT COUNT(*) FROM users WHERE tenant = {:tenant}`},
				{&out.ActiveTeachers, `SELECT COUNT(DISTINCT teacher) FROM rooms
					WHERE tenant = {:tenant} AND is_template = FALSE
					AND last_active >= strftime('%Y-%m-%d %H:%M:%fZ', 'now', '-30 days')`},
				{&out.Rooms, `SELECT COUNT(*) FROM rooms WHERE tenant = {:tenant} AND is_template = FALSE`},
				{&out.ActiveRooms, `SELECT COUNT(*) FROM rooms WHERE tenant = {:tenant} AND is_template = FALSE
					AND last_active >= strftime('%Y-%m-%d %H:%M:%fZ', 'now', '-30 days')`},
				{&out.Students, `SELECT COUNT(*) FROM participants p JOIN rooms r ON r.id = p.room
					WHERE r.tenant = {:tenant} AND r.is_template = FALSE AND p.role = 'student'`},
			}
			for _, c := range counts {
				n, err := countQuery(re.App, c.sql, p)
				if err != nil {
					return router.NewApiError(500, "stats failed", err)
				}
				*c.dst = n
			}

			err := re.App.DB().NewQuery(`
				SELECT t.id, t.name, t.template_locked,
					COUNT(DISTINCT c.id) AS copies,
					COUNT(p.id) AS students,
					COALESCE(MAX(c.created), '') AS last_copied
				FROM rooms t
				LEFT JOIN rooms c ON c.source_template = t.id
				LEFT JOIN participants p ON p.room = c.id AND p.role = 'student'
				WHERE t.is_template = TRUE AND t.tenant = {:tenant}
				GROUP BY t.id
				ORDER BY copies DESC, t.name`).Bind(p).All(&out.Templates)
			if err != nil {
				return router.NewApiError(500, "stats failed", err)
			}
			return re.JSON(200, out)
		}).Bind(apis.RequireAuth())
		return se.Next()
	})
}
