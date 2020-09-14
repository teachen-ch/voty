import { LoggedInPage } from "../../components/Page";
import { Teams } from "../../components/Teams";

export default function TeamsPage() {
  return (
    <LoggedInPage heading="Schulklassen">
      <Teams teamClick={(team) => {}} />
    </LoggedInPage>
  );
}
