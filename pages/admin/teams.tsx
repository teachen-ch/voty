import { LoggedInPage } from "../../components/Page";
import { Teams } from "../../components/Teams";
import { ReactElement } from "react";

export default function TeamsPage(): ReactElement {
  return (
    <LoggedInPage heading="Schulklassen">
      <Teams
        teamClick={() => {
          return;
        }}
      />
    </LoggedInPage>
  );
}
