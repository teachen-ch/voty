
declare module '*/Ballots.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const BallotFields: DocumentNode;
export const BallotRunFields: DocumentNode;
export const ballots: DocumentNode;
export const ballot: DocumentNode;
export const getBallotRuns: DocumentNode;
export const addBallotRun: DocumentNode;
export const removeBallotRun: DocumentNode;
export const startBallotRun: DocumentNode;
export const endBallotRun: DocumentNode;
export const vote: DocumentNode;
export const voteCode: DocumentNode;
export const getBallotResults: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/CheckLogin.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const LoginFields: DocumentNode;
export const me: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Schools.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const schoolsWithMembers: DocumentNode;
export const setSchool: DocumentNode;
export const schools: DocumentNode;
export const createOneSchool: DocumentNode;
export const NewSchool: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Teams.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const TeamAnonFields: DocumentNode;
export const TeamUserFields: DocumentNode;
export const TeamTeacherFields: DocumentNode;
export const teams: DocumentNode;
export const teamUser: DocumentNode;
export const teamTeacher: DocumentNode;
export const teamByInvite: DocumentNode;
export const teamByCode: DocumentNode;
export const createOneTeam: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Users.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const users: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/[invite].tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const createInvitedUser: DocumentNode;
export const acceptInvite: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/admin.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const inviteStudents: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/login.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const login: DocumentNode;
export const emailVerification: DocumentNode;
export const changePassword: DocumentNode;
export const checkVerification: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/signup.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const createUser: DocumentNode;

  export default defaultDocument;
}
    