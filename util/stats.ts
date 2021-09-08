import { default as Router } from "next/router";
import { useEffect } from "react";
import { SessionUser } from "state/user";
import posthog from "posthog-js";

const isExcludedUrl = (url: string, patterns: RegExp[]): boolean => {
  let excluded = false;
  patterns.forEach((pattern) => {
    if (pattern.exec(url)) {
      excluded = true;
    }
  });
  return excluded;
};

type InitSettings = {
  url: string;
  siteId: string | number;
  jsTrackerFile?: string;
  phpTrackerFile?: string;
  excludeUrlsPatterns?: RegExp[];
};
// initialize the tracker
export function initStats({
  url,
  siteId,
  jsTrackerFile = "matomo.js",
  phpTrackerFile = "matomo.php",
  excludeUrlsPatterns = [],
}: InitSettings): void {
  const href = window?.location?.href;
  if (
    href &&
    !href.includes("127.0.0.1") &&
    !href.includes("localhost") &&
    !href.includes("dev.voty.ch")
  ) {
    posthog.init("phc_qHg6fE4uFk6C2XSRZXe8wAX0xguk0XG5YTR53yBxTDP", {
      api_host: "https://app.posthog.com",
    });
  }

  window._paq = window._paq || [];
  if (!url) {
    console.warn("Matomo disabled, please provide matomo url");
    return;
  }
  let previousPath = "";
  // order is important -_- so campaign are detected
  const excludedUrl =
    typeof window !== "undefined" &&
    isExcludedUrl(window.location.pathname, excludeUrlsPatterns);

  if (excludedUrl) {
    if (typeof window !== "undefined") {
      console.warn(`matomo: exclude track ${window.location.pathname}`);
    }
  } else {
    push(["trackPageView"]);
  }

  push(["enableLinkTracking"]);
  push(["setTrackerUrl", `${url}/${phpTrackerFile}`]);
  push(["setSiteId", siteId]);

  /**
   * for initial loading we use the location.pathname
   * as the first url visited.
   * Once user navigate across the site,
   * we rely on Router.pathname
   */

  const scriptElement = document.createElement("script");
  const refElement = document.getElementsByTagName("script")[0];
  scriptElement.type = "text/javascript";
  scriptElement.async = true;
  scriptElement.defer = true;
  scriptElement.src = `${url}/${jsTrackerFile}`;
  refElement.parentNode?.insertBefore(scriptElement, refElement);
  previousPath = location.pathname;

  Router.events.on("routeChangeComplete", (path: string): void => {
    const excludedUrl = isExcludedUrl(path, excludeUrlsPatterns);
    if (excludedUrl) {
      return;
    }
    // We use only the part of the url without the querystring to ensure piwik is happy
    // It seems that piwik doesn't track well page with querystring
    const [pathname] = path.split("?");

    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      // const { q } = Router.query;
      // if (/^\/recherche/.test(pathname) || /^\/search/.test(pathname)) {
      //  push(["trackSiteSearch", q]);
      //}
      if (previousPath) {
        push(["setReferrerUrl", `${previousPath}`]);
      }
      push(["setCustomUrl", pathname]);
      push(["setDocumentTitle", document.title]);
      push(["deleteCustomVariables", "page"]);
      push(["trackPageView"]);
      previousPath = pathname;
    }, 0);
  });
}

// to push custom events
export function push(args: (string | string[] | number | number[])[]): void {
  if (!window._paq) window._paq = [];
  window._paq.push(args);
}

type TrackEvent = {
  category: string;
  action: string;
  name?: string | null;
  value?: string | null;
};

// usePageEvent provides an useEffect hook that registers an event *once*/
export function usePageEvent(evt: TrackEvent): void {
  useEffect(() => {
    trackEvent(evt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function trackEvent(evt: TrackEvent): void {
  const args = ["trackEvent", evt.category, evt.action];
  if (evt.name) args.push(evt.name);
  if (evt.value) args.push(evt.value);
  push(args);

  posthog.capture(`${evt.category}-${evt.action}`);
}

let trackedRole = false;

export function trackVisit(user: SessionUser): void {
  if (!user) return;
  posthog.identify(user.id, {
    name: `${user.role}-${user.id.slice(-6)}`,
    role: user.role,
    team: user.team,
    school: user.school?.name,
  });

  if (!trackedRole) {
    push(["setCustomDimension", 1, user.role]);
    trackedRole = true;
  }
}

export default initStats;
