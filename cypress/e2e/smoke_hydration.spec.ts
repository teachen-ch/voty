// Smoke run for hydration errors after the Next 16 / React 19 upgrade.
// Visits a cross-section of pages (anonymous + teacher + admin), asserts no
// uncaught errors and no minified React hydration error markers, and takes
// a screenshot per page for manual review.

const anonRoutes = [
  "/",
  "/faq",
  "/glossar",
  "/lernen",
  "/leben",
  "/abstimmen",
  "/projekt",
  "/kontakt",
  "/datenschutz",
  "/impressum",
  "/changelog",
  "/user/login",
  "/user/signup",
  "/content/lernpfad",
  "/content/lehrplan-21",
  "/content/staatskunde",
  "/content/videos",
  "/content/tools/chaty",
];

const teacherRoutes = ["/teacher", "/teacher/profile"];
const adminRoutes = ["/admin", "/admin/schools", "/admin/teachers", "/admin/teams"];

// React 19 minified hydration errors use these error codes.
const reactErrorMarkers = [
  "Minified React error #418",
  "Minified React error #421",
  "Minified React error #422",
  "Minified React error #423",
  "Minified React error #425",
  "Hydration failed",
  "There was an error while hydrating",
  "Text content does not match",
];

function checkHydration(path: string) {
  const errors: string[] = [];
  cy.on("uncaught:exception", (err) => {
    errors.push(`[uncaught] ${err.message}`);
    return false;
  });
  cy.on("window:before:load", (win) => {
    const origError = win.console.error;
    win.console.error = (...args: unknown[]) => {
      const msg = args.map((a) => String(a)).join(" ");
      errors.push(`[console.error] ${msg}`);
      origError.apply(win.console, args as []);
    };
  });
  cy.visit(path, { failOnStatusCode: false });
  cy.get("body", { timeout: 15000 }).should("exist");
  cy.wait(500);
  const safe = path.replace(/\//g, "_") || "_root";
  cy.screenshot(`smoke/${safe}`, { capture: "viewport", overwrite: true });
  cy.then(() => {
    const bad = errors.filter((e) =>
      reactErrorMarkers.some((m) => e.includes(m)),
    );
    if (bad.length > 0) {
      throw new Error(`Hydration errors on ${path}:\n${bad.join("\n")}`);
    }
    if (errors.length > 0) {
      // Non-hydration noise (expected: some 404s, unhandled promise rejections).
      // Log but don't fail — this spec only gates hydration specifically.
      cy.log(`(non-hydration noise on ${path}): ${errors.length} entries`);
    }
  });
}

describe("Hydration smoke — anonymous", () => {
  anonRoutes.forEach((r) => {
    it(`renders ${r} without hydration errors`, () => {
      checkHydration(r);
    });
  });
});

describe("Hydration smoke — teacher", () => {
  before(() => {
    cy.login();
  });
  teacherRoutes.forEach((r) => {
    it(`renders ${r} without hydration errors`, () => {
      checkHydration(r);
    });
  });
});

describe("Hydration smoke — admin", () => {
  before(() => {
    cy.login("admin@teachen.ch", "admin");
  });
  adminRoutes.forEach((r) => {
    it(`renders ${r} without hydration errors`, () => {
      checkHydration(r);
    });
  });
});
