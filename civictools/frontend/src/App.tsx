import { Route, Switch, Redirect } from "wouter";
import { isTeacher, studentSession } from "./store";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Room } from "./pages/Room";
import { Join } from "./pages/Join";
import { StudentRoom } from "./pages/StudentRoom";
import { CopyTemplate } from "./pages/CopyTemplate";
import { Templates } from "./pages/Templates";

export function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/dashboard">
        {isTeacher.value ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
      <Route path="/room/:id">
        {(params: { id: string }) =>
          isTeacher.value ? (
            <Room roomId={params.id} />
          ) : (
            <Redirect to={`/join/${params.id}`} />
          )
        }
      </Route>
      <Route path="/join/:id">
        {(params: { id: string }) => <Join roomId={params.id} />}
      </Route>
      <Route path="/templates" component={Templates} />
      <Route path="/copy/:slug">
        {(params: { slug: string }) => <CopyTemplate slug={params.slug} />}
      </Route>
      <Route path="/s/:id">
        {(params: { id: string }) =>
          studentSession.value?.roomId === params.id ? (
            <StudentRoom roomId={params.id} />
          ) : (
            <Redirect to={`/join/${params.id}`} />
          )
        }
      </Route>
      <Route>
        {isTeacher.value ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    </Switch>
  );
}
