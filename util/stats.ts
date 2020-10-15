let initialized: boolean;

export function initStats(): void {
  if (initialized) return;
  const _paq = [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  (function () {
    const u = "https://stats.teachen.ch/";
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", "2"]);
    const d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.type = "text/javascript";
    g.async = true;
    g.defer = true;
    g.src = u + "matomo.js";
    if (s && s.parentNode) {
      s.parentNode.insertBefore(g, s);
      initialized = true;
    }
  })();
}
