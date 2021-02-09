import { gql } from "@apollo/client";
import { Label, Select } from "@rebass/forms";
import { TeamAnonFieldsFragment, useSetPrefsMutation } from "graphql/types";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { Box, Button } from "rebass";
import { Grid } from "theme-ui";
import { A } from "./Breadcrumb";
import { Err } from "./Page";
import { fragments } from "./Teams";
import IconPrefs from "../public/images/icon_prefs.svg";
import { isMobile } from "util/isBrowser";

export const SET_PREFS = gql`
  mutation setPrefs($teamId: String!, $prefs: Json!) {
    setPrefs(teamId: $teamId, prefs: $prefs) {
      ...TeamTeacherFields
    }
  }
  ${fragments.TeamTeacherFields}
`;

export const EditTeamPrefs: React.FC<{
  team: TeamAnonFieldsFragment;
  card?: string;
}> = ({ team, card }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [prefs, setPrefs] = useState<Record<string, any>>(team.prefs);
  const [doSetPrefs, mutation] = useSetPrefsMutation({
    variables: { teamId: team.id, prefs },
    onCompleted() {
      setShow(false);
    },
    onError(err) {
      setError(err.message);
    },
  });

  function getPref(name: string): string {
    name = card ? `${name}_${card}` : name;
    return (card
      ? prefs[`${name}_${card}`] ?? prefs[name]
      : prefs[name]) as string;
  }

  function setPref(name: string, value: string) {
    name = card ? `${name}_${card}` : name;
    const newPrefs = cloneDeep(prefs);
    newPrefs[name] = value;
    setPrefs(newPrefs);
  }

  return (
    <Box>
      <A onClick={() => setShow(!show)}>
        {card
          ? "Anpassen"
          : `Klassen-Einstellungen${isMobile() ? "" : " bearbeiten"}`}
        <IconPrefs
          width="16"
          height="16"
          style={{ marginLeft: 8, marginBottom: -3 }}
        />
      </A>
      {show && (
        <Box mt={3} textAlign="left" fontStyle="normal">
          <Label>
            Bereits eingegebene Arbeiten der ganzen Klasse anzeigen:
          </Label>
          <Select
            value={getPref("showWorks")}
            onChange={(e) => setPref("showWorks", e.target.value)}
          >
            <option value="">Immer</option>
            <option value="after">Nach eigener Abgabe</option>
            <option value="never">Nie</option>
          </Select>
          <Label mt={3}>Gruppenarbeiten ermöglichen:</Label>
          <Select
            value={getPref("allowGroups")}
            onChange={(e) => setPref("allowGroups", e.target.value)}
          >
            <option value="">Ja</option>
            <option value="no">Nein</option>
          </Select>
          <Grid columns={"1fr 1fr"} mt={3}>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => doSetPrefs()} disabled={mutation.loading}>
              Speichern
            </Button>
          </Grid>
          <Err msg={error} />
        </Box>
      )}
    </Box>
  );
};

export enum AllowGroups {
  Yes = "",
  No = "no",
}

export function allowGroups(
  team: TeamAnonFieldsFragment,
  card: string,
  defaultValue = AllowGroups.Yes
): AllowGroups {
  if (team.prefs[`allowGroups_${card}`] !== undefined)
    return team.prefs[`allowGroups_${card}`] as AllowGroups;
  else if (team.prefs["allowGroups"] !== undefined)
    return team.prefs["allowGroups"] as AllowGroups;
  else return defaultValue;
}

export const AllowGroupText: Record<AllowGroups, string> = {
  [AllowGroups.Yes]: "Gruppenarbeiten sind möglich",
  [AllowGroups.No]: "Gruppenarbeiten sind nicht möglich",
};

export enum ShowWorks {
  Always = "",
  After = "after",
  Never = "never",
}

export function showWorks(
  team: TeamAnonFieldsFragment,
  card: string,
  defaultValue = ShowWorks.Always
): ShowWorks {
  if (team.prefs[`showWorks_${card}`] !== undefined)
    return team.prefs[`showWorks_${card}`] as ShowWorks;
  else if (team.prefs["showWorks"] !== undefined)
    return team.prefs["showWorks"] as ShowWorks;
  else return defaultValue;
}

export const ShowWorkText: Record<ShowWorks, string> = {
  [ShowWorks.Always]: "Arbeiten werden sofort der Klasse angezeigt",
  [ShowWorks.After]: "Arbeiten werden erst nach eigener Eingabe angezeigt",
  [ShowWorks.Never]: "Arbeiten werden der Klasse nicht angezeigt",
};
