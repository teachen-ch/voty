package main

import (
	"net/url"
	"regexp"
	"strings"

	"ganigeorgiev.com/pocketbase/pocketbase"
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	"ganigeorgiev.com/pocketbase/pocketbase/tools/router"
)

var (
	youtubeID     = regexp.MustCompile(`^[A-Za-z0-9_-]{11}$`)
	vimeoID       = regexp.MustCompile(`^[0-9]+$`)
	dailymotionID = regexp.MustCompile(`^[A-Za-z0-9]+$`)
)

// embedURL maps a public video page URL to a safe player URL for a supported platform.
func embedURL(raw string) (string, bool) {
	u, err := url.Parse(strings.TrimSpace(raw))
	if err != nil || (u.Scheme != "http" && u.Scheme != "https") {
		return "", false
	}
	host := strings.TrimPrefix(strings.ToLower(u.Hostname()), "www.")
	segs := strings.FieldsFunc(u.Path, func(r rune) bool { return r == '/' })

	switch host {
	case "youtube.com", "m.youtube.com", "music.youtube.com", "youtube-nocookie.com":
		id := u.Query().Get("v")
		if len(segs) == 2 && (segs[0] == "embed" || segs[0] == "shorts" || segs[0] == "live") {
			id = segs[1]
		}
		if youtubeID.MatchString(id) {
			return "https://www.youtube-nocookie.com/embed/" + id, true
		}
	case "youtu.be":
		if len(segs) >= 1 && youtubeID.MatchString(segs[0]) {
			return "https://www.youtube-nocookie.com/embed/" + segs[0], true
		}
	case "vimeo.com", "player.vimeo.com":
		for i, s := range segs {
			if !vimeoID.MatchString(s) {
				continue
			}
			out := "https://player.vimeo.com/video/" + s
			if i+1 < len(segs) && len(segs[i+1]) > 0 && regexp.MustCompile(`^[a-f0-9]+$`).MatchString(segs[i+1]) {
				out += "?h=" + segs[i+1]
			} else if h := u.Query().Get("h"); regexp.MustCompile(`^[a-f0-9]+$`).MatchString(h) {
				out += "?h=" + h
			}
			return out, true
		}
	case "dailymotion.com":
		if len(segs) >= 2 && segs[len(segs)-2] == "video" {
			id := strings.SplitN(segs[len(segs)-1], "_", 2)[0]
			if dailymotionID.MatchString(id) {
				return "https://www.dailymotion.com/embed/video/" + id, true
			}
		}
	case "dai.ly":
		if len(segs) == 1 && dailymotionID.MatchString(segs[0]) {
			return "https://www.dailymotion.com/embed/video/" + segs[0], true
		}
	}
	return "", false
}

func registerMediaHooks(app *pocketbase.PocketBase) {
	app.OnRecordCreateRequest("media_items").BindFunc(func(e *core.RecordRequestEvent) error {
		r := e.Record
		switch r.GetString("kind") {
		case "video":
			embed, ok := embedURL(r.GetString("url"))
			if !ok {
				return router.NewBadRequestError("unsupported video URL", nil)
			}
			r.Set("embed_url", embed)
			r.Set("aspect_ratio", 16.0/9.0)
			r.Set("file", nil)
		case "image":
			if len(r.GetUnsavedFiles("file")) == 0 {
				return router.NewBadRequestError("image file required", nil)
			}
			r.Set("url", "")
			r.Set("embed_url", "")
			if ar := r.GetFloat("aspect_ratio"); ar < 0.05 || ar > 20 {
				r.Set("aspect_ratio", 1.0)
			}
		}
		if w := r.GetFloat("width"); w < 80 || w > 4000 {
			r.Set("width", 480.0)
		}
		return e.Next()
	})
}
