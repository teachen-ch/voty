package main

import (
	"net"
	"net/http"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase/core"
)

// configureDynamicAppURL makes auth emails use the public hostname that made
// the request. This is enabled only in production because the development
// setup intentionally keeps PocketBase's localhost:8090 URL.
func configureDynamicAppURL(app core.App) {
	if !strings.EqualFold(os.Getenv("CIVICTOOLS_DYNAMIC_APP_URL"), "true") {
		return
	}

	update := func(req *http.Request) {
		host := forwardedValue(req.Header.Get("X-Forwarded-Host"))
		if host == "" {
			host = req.Host
		}
		host = hostname(host)
		if host == "" || !allowedHost(host) {
			return
		}

		scheme := forwardedValue(req.Header.Get("X-Forwarded-Proto"))
		if scheme != "http" && scheme != "https" {
			scheme = "https"
		}
		app.Settings().Meta.AppURL = scheme + "://" + host
	}

	app.OnRecordRequestPasswordResetRequest().BindFunc(func(e *core.RecordRequestPasswordResetRequestEvent) error {
		update(e.Request)
		return nil
	})
	app.OnRecordRequestVerificationRequest().BindFunc(func(e *core.RecordRequestVerificationRequestEvent) error {
		update(e.Request)
		return nil
	})
	app.OnRecordRequestEmailChangeRequest().BindFunc(func(e *core.RecordRequestEmailChangeRequestEvent) error {
		update(e.Request)
		return nil
	})
}

func forwardedValue(value string) string {
	return strings.TrimSpace(strings.Split(value, ",")[0])
}

func hostname(value string) string {
	value = strings.TrimSpace(strings.ToLower(value))
	if host, _, err := net.SplitHostPort(value); err == nil {
		return strings.Trim(host, "[]")
	}
	return strings.TrimSuffix(value, ".")
}

func allowedHost(host string) bool {
	for _, allowed := range strings.Split(os.Getenv("CIVICTOOLS_ALLOWED_HOSTS"), ",") {
		if hostname(allowed) == host {
			return true
		}
	}
	return false
}
