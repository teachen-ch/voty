package main

import (
	"crypto/subtle"

	"civictools/pb/pb_migrations"

	"ganigeorgiev.com/pocketbase/pocketbase"
	"ganigeorgiev.com/pocketbase/pocketbase/core"
)

func participantToken(app core.App, collection string, record *core.Record) (token, userId string) {
	p := record
	if collection != "participants" {
		var err error
		if p, err = app.FindRecordById("participants", record.GetString("participant")); err != nil {
			return "", ""
		}
	}
	return p.GetString("session_token"), p.GetString("user")
}

func tokenMatches(header, token string) bool {
	return header != "" && token != "" && subtle.ConstantTimeCompare([]byte(header), []byte(token)) == 1
}

// registerSessionTokenChecks enforces that student-owned records are only
// created, updated or deleted by the student holding the participant's session
// token, or by whoever passes the collection's non-student rule.
func registerSessionTokenChecks(app *pocketbase.PocketBase) {
	rules := pb_migrations.SessionRules()
	names := make([]string, 0, len(rules))
	for n := range rules {
		names = append(names, n)
	}

	check := func(e *core.RecordRequestEvent, record *core.Record, rule string) error {
		if e.HasSuperuserAuth() {
			return e.Next()
		}
		info, err := e.RequestInfo()
		if err != nil {
			return err
		}
		token, _ := participantToken(e.App, e.Collection.Name, record)
		if tokenMatches(info.Headers["x_session_token"], token) {
			return e.Next()
		}
		if rule != "" {
			if ok, _ := e.App.CanAccessRecord(record, info, &rule); ok {
				return e.Next()
			}
		}
		return e.NotFoundError("", nil)
	}

	app.OnRecordUpdateRequest(names...).BindFunc(func(e *core.RecordRequestEvent) error {
		return check(e, e.Record.Original(), rules[e.Collection.Name].Update)
	})
	app.OnRecordDeleteRequest(names...).BindFunc(func(e *core.RecordRequestEvent) error {
		return check(e, e.Record, rules[e.Collection.Name].Delete)
	})

	// Hidden fields are stripped from client input, so the token comes in the X-Session-Token header.
	app.OnRecordCreateRequest("participants").BindFunc(func(e *core.RecordRequestEvent) error {
		if e.HasSuperuserAuth() {
			return e.Next()
		}
		info, err := e.RequestInfo()
		if err != nil {
			return err
		}
		token := info.Headers["x_session_token"]
		if len(token) < 32 {
			return e.BadRequestError("session_token must be at least 32 characters", nil)
		}
		e.Record.Set("session_token", token)
		return e.Next()
	})

	// Creating content as someone else's participant requires their token, or being that participant's user.
	app.OnRecordCreateRequest("sticky_notes", "arguments", "argument_votes", "participant_votes", "ranking_responses").
		BindFunc(func(e *core.RecordRequestEvent) error {
			if e.HasSuperuserAuth() || e.Record.GetString("participant") == "" {
				return e.Next()
			}
			info, err := e.RequestInfo()
			if err != nil {
				return err
			}
			token, userId := participantToken(e.App, e.Collection.Name, e.Record)
			if tokenMatches(info.Headers["x_session_token"], token) ||
				(e.Auth != nil && userId != "" && e.Auth.Id == userId) {
				return e.Next()
			}
			return e.BadRequestError("invalid participant", nil)
		})
}
