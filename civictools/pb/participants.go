package main

import (
	"ganigeorgiev.com/pocketbase/pocketbase"
	"ganigeorgiev.com/pocketbase/pocketbase/core"
)

func registerParticipantHooks(app *pocketbase.PocketBase) {
	app.OnRecordEnrich("participants").BindFunc(func(e *core.RecordEnrichEvent) error {
		e.Record.Hide("session_token")
		return e.Next()
	})
}
