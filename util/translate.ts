// TODO:
// this is an ad-hoc translation solution until we invet into a proper
// translation management system

const messages: Record<string, string> = {
  ERR_BALLOT_NOT_STARTED: "Diese Abstimmung ist noch nicht gestartet",
  ERR_BALLOT_ENDED: "Diese Abstimmung ist bereits beendet",
  ERR_BALLOTCODE_WRONG: "Ungültiger Abstimmungscode",
  ERR_ALREADY_VOTED: "Du hast bereits über diese Vorlage abgestimmt",
  ERR_VOTECODE_FAILED: "Datenbank-Fehler",
  ERR_BALLOTRUN_CANNOT_REMOVE: "Abstimmung kann nicht abgewählt werden",
  ERR_BALLOTRUN_NOT_FOUND: "Abstimmung nicht gefunden",
  ERR_BALLOT_NOT_FOUND: "Abstimmung nicht gefunden",
  ERR_CANNOT_CREATE_BALLOTRUN: "Abstimmung kann nicht ausgewählt werden",
  ERR_CANNOT_DELETE_ACCOUNT:
    "Benutzer-Konto kann nicht gelöscht werden. Bitte kontaktiere uns",
  ERR_CREATE_USER: "Benutzer-Konto kann nicht erstellt werden",
  ERR_DUPLICATE_EMAIL:
    "Für diese Email-Adresse gibt es bereits ein Benutzer-Konto",
  ERR_EMAIL_NOT_FOUND: "Email-Adresse wurde nicht gefunden",
  ERR_EMAIL_NOT_VERIFIED: "Deine Email-Adresse ist noch nicht bestätigt",
  ERR_NEEDS_LOGIN: "Eine Anmeldung wird benötigt für diese Funktion",
  ERR_NOT_YOUR_TEAM: "Du bist nicht in dieser Klasse angemeldet",
  ERR_NO_BALLOT_SPECIFIED: "Keine Abstimmung ausgewählt",
  ERR_NO_EMAIL: "Keine Email-Adresse angegeben",
  ERR_NO_PASSWORD: "Kein Passwort angegeben",
  ERR_NO_PERMISSION: "Berechtigung fehlt für diese Aktion",
  ERR_NO_TOKEN: "Deine Anmeldung hat nicht geklappt",
  ERR_ONLY_UPDATE_SELF: "Du darfst nur Dein eigenes Profil bearbeiten",
  ERR_PASSWORD_CHANGE: "Das Passwort konnte nicht geändert werden",
  ERR_PASSWORD_NOT_SET: "Es wurde kein Passwort gesetzt",
  ERR_SEND_EMAIL_VERIFICATION:
    "Das Bestätigungs-Email konnte nicht verschickt werden",
  ERR_STRANGE_COOKIE: "Fehlerhafte Anfrage",
  ERR_TEAM_NOT_FOUND: "Diese Klasse wurde nicht gefunden",
  ERR_TOKEN_NOT_FOUND: "Dieser Code wurde nicht gefunden",
  ERR_USER_NOT_FOUND: "Dieses Benutzer-Konto wurde nicht gefunden",
  ERR_USER_PASSWORD: "Email oder Passwort passen leider nicht zueinander…",
  ERR_VOTING_NEEDS_LOGIN: "Die Abstimmung benötigt eine Anmeldung",
  ERR_VOTING_NOT_ALLOWED: "Abstimmen nicht erlaubt",
};

export function tr(code: string): string {
  return messages[code] || code;
}
