package main

import (
	"encoding/json"
	"net/http"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/subscriptions"
)

// registerOAuthRedirect keeps PocketBase's realtime OAuth handshake intact,
// while avoiding its built-in redirect to the hidden /_/ admin UI.
func registerOAuthRedirect(se *core.ServeEvent) {
	se.Router.BindFunc(func(e *core.RequestEvent) error {
		if e.Request.URL.Path != "/api/oauth2-redirect" {
			return e.Next()
		}

		data := struct {
			State string `form:"state" json:"state"`
			Code  string `form:"code" json:"code"`
			Error string `form:"error" json:"error,omitempty"`
		}{}
		if e.Request.Method == http.MethodPost {
			if err := e.BindBody(&data); err != nil {
				return e.Redirect(http.StatusSeeOther, "/oauth-success?error=1")
			}
		} else {
			query := e.Request.URL.Query()
			data.State = query.Get("state")
			data.Code = query.Get("code")
			data.Error = query.Get("error")
		}

		if data.State != "" {
			if client, err := e.App.SubscriptionsBroker().ClientById(data.State); err == nil &&
				!client.IsDiscarded() && client.HasSubscription("@oauth2") {
				if encoded, err := json.Marshal(data); err == nil {
					client.Send(subscriptions.Message{Name: "@oauth2", Data: encoded})
					client.Unsubscribe("@oauth2")
				}
			}
		}

		return e.Redirect(http.StatusSeeOther, "/oauth-success")
	})
}
