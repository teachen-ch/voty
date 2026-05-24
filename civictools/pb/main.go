package main

import (
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "civictools/pb/pb_migrations"
)

func main() {
	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Dir:         "pb_migrations",
		Automigrate: true,
	})

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		if err := syncKeycloakOIDC(app); err != nil {
			log.Printf("warn: keycloak OIDC sync skipped: %v", err)
		}
		registerCursorWS(se)
		serveStatic(se)
		return se.Next()
	})

	registerRoomHooks(app)
	registerCopyTemplate(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func syncKeycloakOIDC(app core.App) error {
	clientId := os.Getenv("KEYCLOAK_CLIENT_ID")
	clientSecret := os.Getenv("KEYCLOAK_CLIENT_SECRET")
	if clientId == "" || clientSecret == "" {
		return nil
	}

	keycloakBase := os.Getenv("KEYCLOAK_BASE_URL")
	if keycloakBase == "" {
		keycloakBase = "http://localhost:8080/realms/civictools/protocol/openid-connect"
	}

	users, err := app.FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	for _, p := range users.OAuth2.Providers {
		if p.Name == "oidc" && p.ClientId == clientId && p.ClientSecret == clientSecret {
			return nil
		}
	}

	filtered := make([]core.OAuth2ProviderConfig, 0, len(users.OAuth2.Providers))
	for _, p := range users.OAuth2.Providers {
		if p.Name != "oidc" {
			filtered = append(filtered, p)
		}
	}

	pkce := true
	users.OAuth2.Enabled = true
	users.OAuth2.Providers = append(filtered, core.OAuth2ProviderConfig{
		Name:         "oidc",
		ClientId:     clientId,
		ClientSecret: clientSecret,
		DisplayName:  "Keycloak",
		AuthURL:      keycloakBase + "/auth",
		TokenURL:     keycloakBase + "/token",
		UserInfoURL:  keycloakBase + "/userinfo",
		PKCE:         &pkce,
	})
	return app.Save(users)
}

func serveStatic(se *core.ServeEvent) {
	if _, err := os.Stat("../frontend/dist/index.html"); err != nil {
		return // dist not built; skip static serving (dev mode uses Vite)
	}
	distFS := os.DirFS("../frontend/dist")

	se.Router.GET("/{path...}", func(re *core.RequestEvent) error {
		p := filepath.Clean(strings.TrimPrefix(re.Request.URL.Path, "/"))
		if p == "." || p == "" {
			return re.FileFS(distFS, "index.html")
		}
		if _, err := fs.Stat(distFS, p); err != nil {
			return re.FileFS(distFS, "index.html")
		}
		return re.FileFS(distFS, p)
	})
}
