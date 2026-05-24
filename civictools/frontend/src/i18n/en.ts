const en = {
  appName: "CivicTools",
  header: {
    brand: "Voty CivicTools",
  },
  breadcrumb: {
    home: "Home",
    signIn: "Sign in",
    templates: "See all templates",
  },
  login: {
    welcome: "Welcome",
    title: "Teacher Login",
    email: "Email",
    password: "Password",
    submit: "Login",
    submitting: "Logging in…",
    or: "or",
    keycloak: "Login with Keycloak",
  },
  dashboard: {
    title: "My Rooms",
    logout: "Logout",
    namePlaceholder: "New room name…",
    create: "Create Room",
    creating: "Creating…",
    empty: "No rooms yet. Create one above.",
    open: "Open",
    chooseTemplate: "Choose from templates…",
  },
  room: {
    back: "← Rooms",
    loading: "Loading…",
    stickyEnabled: "Sticky notes enabled",
    stickyDisabledHint: "Enable sticky notes to let students place notes.",
    live: "Live",
    online: "online",
  },
  join: {
    title: "Join",
    nicknamePlaceholder: "Your nickname",
    submit: "Join Room",
    notFound: "Room not found.",
  },
  student: {
    connecting: "Connecting…",
    youAre: "You are:",
    leave: "Leave",
    waitingSticky: "Waiting for your teacher to enable sticky notes…",
  },
  board: {
    hint: "Click on the board to add a sticky note. Drag to move.",
  },
  shareLink: {
    copy: "Copy join link",
    copied: "✓ Copied!",
  },
  templates: {
    title: "Templates",
    empty: "No templates available yet.",
    noDescription: "(no description)",
    create: "Create",
  },
  copy: {
    outlineTitle: "What this room includes",
    empty: "This room has no components yet.",
    itemDiscussion: "Discussion board",
    itemVoting: "Voting",
    itemTimer: "Timer",
    itemBallot: "Ballot",
    noPrompt: "(no prompt)",
    create: "Create room for my class",
    creating: "Creating…",
    notFound: "Template not found.",
    notTemplate: "This room is not a template.",
    failed: "Failed to create room. Please try again.",
  },
} as const;

export default en;
export type Translations = typeof en;
