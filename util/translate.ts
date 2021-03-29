// TODO:
// this is an ad-hoc translation solution until we invet into a proper
// translation management system

interface Translations {
  [name: string]: Translations | string;
}

const messages: Translations = {
  Error: {
    BallotNotStarted: "Diese Abstimmung ist noch nicht gestartet",
    BallotEnded: "Diese Abstimmung ist bereits beendet",
    BallotcodeWrong: "Ungültiger Abstimmungscode",
    AlreadyInTeam: "Du bist bereits in dieser Klasse",
    AlreadyVoted: "Du hast bereits über diese Vorlage abgestimmt",
    VotecodeFailed: "Datenbank-Fehler",
    BallotrunCannotRemove: "Abstimmung kann nicht abgewählt werden",
    BallotrunNotFound: "Abstimmung nicht gefunden",
    BallotNotFound: "Abstimmung nicht gefunden",
    CannotCreateBallotrun: "Abstimmung kann nicht ausgewählt werden",
    CannotDeleteAccount:
      "Konto kann nicht gelöscht werden. Bitte kontaktiere uns",
    CreateUser: "Konto kann nicht erstellt werden",
    Database: "Ein Fehler in der Datenbank ist aufgetreten",
    DuplicateEmail: "Für diese Email-Adresse gibt es bereits ein Konto",
    EmailNotFound: "Email-Adresse wurde nicht gefunden",
    EmailNotVerified: "Deine Email-Adresse ist noch nicht bestätigt",
    InviteNotFound: "Die Einladung wurde nicht gefunden",
    InviteTeacherRole: "Du bist aktuell als Lehrperson angemeldet",
    MissingParameter: "Eine Eingabe fehlt",
    NeedsLogin: "Eine Anmeldung wird benötigt für diese Funktion",
    NotYourTeam: "Du bist nicht in dieser Klasse angemeldet",
    NoBallotSpecified: "Keine Abstimmung ausgewählt",
    NoEmail: "Keine Email-Adresse angegeben",
    NoPassword: "Kein Passwort angegeben",
    NoPermission: "Berechtigung fehlt für diese Aktion",
    NoTeamSchool: "Es wurde keine Klasse / Schulhaus angegeben",
    NoToken: "Deine Anmeldung hat nicht geklappt",
    NotFound: "Wir konnten dieses Element leider nicht finden",
    OnlyUpdateSelf: "Du darfst nur Dein eigenes Profil bearbeiten",
    PasswordChange: "Das Passwort konnte nicht geändert werden",
    PasswordNotSet: "Es wurde kein Passwort gesetzt",
    SendEmailVerification:
      "Das Bestätigungs-Email konnte nicht verschickt werden",
    ServerError: "Ein Fehler ist aufgetreten",
    StrangeCookie: "Fehlerhafte Anfrage",
    TeamNotFound: "Diese Klasse wurde nicht gefunden",
    DiscussionNoTeam: "Du musst der Klasse angehören, um zu diskutieren",
    TokenNotFound: "Dieser Code wurde nicht gefunden",
    UserNotFound: "Dieses Konto wurde nicht gefunden",
    UserPassword: "Email oder Passwort passen leider nicht zueinander…",
    VotingNeedsLogin: "Die Abstimmung benötigt eine Anmeldung",
    VotingNotAllowed: "Abstimmen nicht erlaubt",
  },
  Teacher: { LegalText: "" },
  Student: {
    LegalText:
      "Wenn Du uns Deinen Jahrgang und Dein Geschlecht mitteilst, können wir bessere Hochrechnungen erstellen und die Meinung der Jugend in der Schweiz repräsentieren. Du darfst aber auch «möchte ich nicht angeben» auswählen. ",
  },
  "Not Authorised!": "Berechtigung fehlt!",
};

const matchNestedCode = new RegExp(/^\w+\.[\w.]+$/);

export function tr(code: string, dict?: Translations): string {
  // start with root Translations object
  if (!dict) dict = messages;
  // check for a nested key like Error.Login.ForgotPassword
  if (matchNestedCode.exec(code)) {
    const elems = code.split(".");
    if (elems.length > 0) {
      const [first, ...rest] = elems;
      const result = dict[first];
      if (typeof result !== "string") {
        return tr(rest.join("."), result);
      }
    }
  }
  // we look for code in Translations. If nothing found, we take the original
  const translated = dict[code] !== undefined ? dict[code] : code;
  // the result should not be a list of Translations
  if (typeof translated !== "string") {
    throw new Error(
      `Deep translation code ${code} does not follow Error.Login.ForgotPassword syntax`
    );
  }
  return translated;
}
