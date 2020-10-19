import { ReactElement } from "react";
import { useUser } from "state/user";
import { Role } from "graphql/types";
import { StudentProfilePage } from "pages/student/profile";
import { TeacherProfilePage } from "pages/teacher/profile";
import { LoggedInPage } from "components/Page";

export default function Profile(): React.ReactElement {
  const user = useUser();

  if (user) {
    switch (user.role) {
      case Role.Principal:
      case Role.Teacher:
        return <TeacherProfilePage />;
      case Role.User:
      case Role.Student:
      default:
        return <StudentProfilePage />;
    }
  } else return <LoggedInPage heading="Profil">...</LoggedInPage>;
}
