import { useUser } from "state/user";
import { Role } from "graphql/types";
import StudentHome from "pages/student";
import TeacherHome from "pages/teacher";
import AdminHome from "pages/admin";
import { LoggedInPage } from "components/Page";

export default function StartPage(): React.ReactElement {
  const user = useUser();
  if (user?.role === Role.Student) return <StudentHome />;
  if (user?.role === Role.Teacher) return <TeacherHome />;
  if (user?.role === Role.Admin) return <AdminHome />;
  else return <LoggedInPage heading="Anmelden" />;
}
