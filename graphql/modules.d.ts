
declare module '*/Activities.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const activities: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/BallotAdmin.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const createOneBallot: DocumentNode;
export const updateOneBallot: DocumentNode;
export const deleteOneBallot: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Ballots.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const BallotFields: DocumentNode;
export const UserBallotFields: DocumentNode;
export const BallotRunFields: DocumentNode;
export const ballots: DocumentNode;
export const userBallots: DocumentNode;
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
    

declare module '*/Cards.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const cards: DocumentNode;
export const setCards: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/CheckLogin.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const LoginFields: DocumentNode;
export const me: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Discussion.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const DiscussionFields: DocumentNode;
export const getTeamDiscussions: DocumentNode;
export const postDiscussion: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Notes.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const setNotes: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Prefs.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const setPrefs: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Progress.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const progress: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Schools.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const SchoolFields: DocumentNode;
export const schoolsWithMembers: DocumentNode;
export const setSchool: DocumentNode;
export const schools: DocumentNode;
export const createOneSchool: DocumentNode;
export const NewSchool: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Swissvotes.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const swissvotes: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Teams.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const TeamAnonFields: DocumentNode;
export const TeamUserFields: DocumentNode;
export const TeamTeacherFields: DocumentNode;
export const teams: DocumentNode;
export const teamAnon: DocumentNode;
export const teamUser: DocumentNode;
export const teamTeacher: DocumentNode;
export const teamByInvite: DocumentNode;
export const teamByCode: DocumentNode;
export const deleteOneTeam: DocumentNode;
export const createOneTeam: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Uploader.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const AttachmentFields: DocumentNode;
export const attachments: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Users.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const users: DocumentNode;
export const updateUser: DocumentNode;
export const deleteUser: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/Works.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const WorkFields: DocumentNode;
export const works: DocumentNode;
export const deleteWork: DocumentNode;
export const postWork: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/stats.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const stats: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/teachers.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const teachers: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/users.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const adminUsers: DocumentNode;

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
    

declare module '*/delete.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const deleteAccount: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/login.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const login: DocumentNode;
export const emailVerification: DocumentNode;
export const changePassword: DocumentNode;
export const magic: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/signup.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const createUser: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/verify.tsx' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const checkVerification: DocumentNode;

  export default defaultDocument;
}
    