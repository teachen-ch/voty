import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  ballotId?: Maybe<Scalars['String']['output']>;
  card?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  school: School;
  summary?: Maybe<Scalars['String']['output']>;
  team: Team;
  time: Scalars['DateTime']['output'];
  type: ActivityType;
  user: User;
  visibility: Visibility;
  workId?: Maybe<Scalars['String']['output']>;
};

export type ActivityCreateInput = {
  card?: InputMaybe<Scalars['String']['input']>;
  school: UserSchoolUpdateInput;
  summary?: InputMaybe<Scalars['String']['input']>;
  team: UserSchoolUpdateInput;
  type: ActivityType;
  user: UserSchoolUpdateInput;
  visibility: Visibility;
};

export type ActivityOrderByInput = {
  id?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
};

export enum ActivityType {
  Attachment = 'Attachment',
  Discussion = 'Discussion',
  Test = 'Test',
  UserAccept = 'UserAccept',
  UserInvite = 'UserInvite',
  Vote = 'Vote',
  Work = 'Work'
}

export type ActivityTypeFilter = {
  equals?: InputMaybe<ActivityType>;
};

export type ActivityWhereInput = {
  ballot?: InputMaybe<IdRelationFilter>;
  ballotId?: InputMaybe<StringFilter>;
  card?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  schoolId?: InputMaybe<StringFilter>;
  teamId?: InputMaybe<StringFilter>;
  time?: InputMaybe<DateTimeFilter>;
  type?: InputMaybe<ActivityTypeFilter>;
  userId?: InputMaybe<StringFilter>;
  workId?: InputMaybe<StringFilter>;
};

export type Attachment = {
  __typename?: 'Attachment';
  createdAt: Scalars['DateTime']['output'];
  file: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type AttachmentWhereInput = {
  card?: InputMaybe<StringFilter>;
  discussionId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  teamId?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
  workId?: InputMaybe<StringFilter>;
};

export type Ballot = {
  __typename?: 'Ballot';
  body: Scalars['String']['output'];
  canVote?: Maybe<Scalars['Boolean']['output']>;
  canton?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  end: Scalars['DateTime']['output'];
  hasVoted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  originalLocale: Scalars['String']['output'];
  schoolId?: Maybe<Scalars['String']['output']>;
  scope: BallotScope;
  start: Scalars['DateTime']['output'];
  teamId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type BallotCreateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  bodyde?: InputMaybe<Scalars['String']['input']>;
  bodyfr?: InputMaybe<Scalars['String']['input']>;
  bodyit?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  descriptionde?: InputMaybe<Scalars['String']['input']>;
  descriptionfr?: InputMaybe<Scalars['String']['input']>;
  descriptionit?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  originalLocale?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<BallotScope>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  titlede?: InputMaybe<Scalars['String']['input']>;
  titlefr?: InputMaybe<Scalars['String']['input']>;
  titleit?: InputMaybe<Scalars['String']['input']>;
};

export type BallotResults = {
  __typename?: 'BallotResults';
  abs?: Maybe<Scalars['Int']['output']>;
  no?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  yes?: Maybe<Scalars['Int']['output']>;
};

export type BallotRun = {
  __typename?: 'BallotRun';
  ballotId: Scalars['String']['output'];
  end?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  start?: Maybe<Scalars['DateTime']['output']>;
  team: Team;
};

export type BallotRunRelationFilter = {
  some?: InputMaybe<BallotRunWhereInput>;
};

export type BallotRunWhereInput = {
  ballotId?: InputMaybe<StringFilter>;
  teamId?: InputMaybe<StringFilter>;
};

export enum BallotScope {
  Cantonal = 'Cantonal',
  National = 'National',
  Public = 'Public',
  School = 'School',
  Team = 'Team'
}

export type BallotScopeFilter = {
  equals?: InputMaybe<BallotScope>;
};

export type BallotUpdateInput = {
  body?: InputMaybe<StringFieldUpdateOperationsInput>;
  bodyde?: InputMaybe<StringFieldUpdateOperationsInput>;
  bodyfr?: InputMaybe<StringFieldUpdateOperationsInput>;
  bodyit?: InputMaybe<StringFieldUpdateOperationsInput>;
  canton?: InputMaybe<StringFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  descriptionde?: InputMaybe<StringFieldUpdateOperationsInput>;
  descriptionfr?: InputMaybe<StringFieldUpdateOperationsInput>;
  descriptionit?: InputMaybe<StringFieldUpdateOperationsInput>;
  end?: InputMaybe<DateTimeFieldUpdateOperationsInput2>;
  start?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  titlede?: InputMaybe<StringFieldUpdateOperationsInput>;
  titlefr?: InputMaybe<StringFieldUpdateOperationsInput>;
  titleit?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type BallotWhereInput = {
  ballotRuns?: InputMaybe<BallotRunRelationFilter>;
  canton?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<StringFilter>;
  scope?: InputMaybe<BallotScopeFilter>;
  teamId?: InputMaybe<StringFilter>;
};

export type BallotWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Card = {
  __typename?: 'Card';
  age?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discussion?: Maybe<Scalars['Boolean']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Scalars['String']['output']>;
  show?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFieldUpdateOperationsInput2 = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Discussion = {
  __typename?: 'Discussion';
  attachments: Array<Attachment>;
  ballotId?: Maybe<Scalars['String']['output']>;
  card?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<Discussion>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  reactions: Array<Reaction>;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type EnumGenderFieldUpdateOperationsInput = {
  set?: InputMaybe<Gender>;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: InputMaybe<Role>;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other',
  Unkown = 'Unkown'
}

export type IdRelationFilter = {
  id?: InputMaybe<StringFilter>;
};

export type IntFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
};

export type InviteResponse = {
  __typename?: 'InviteResponse';
  created?: Maybe<Array<Scalars['String']['output']>>;
  duplicated?: Maybe<Array<Scalars['String']['output']>>;
  failed?: Maybe<Array<Scalars['String']['output']>>;
  team?: Maybe<Team>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite: Team;
  addBallotRun: BallotRun;
  changePassword: ResponseLogin;
  checkVerification: ResponseLogin;
  createInvitedUser: User;
  createOneBallot: Ballot;
  createOneSchool: School;
  createOneTeam: Team;
  createUser: User;
  deleteAccount: Response;
  deleteOneBallot: Ballot;
  deleteOneSchool: School;
  deleteOneTeam: Team;
  deleteUser: User;
  deleteWork: Work;
  emailVerification: ResponseLogin;
  endBallotRun: BallotRun;
  inviteStudents: InviteResponse;
  login: ResponseLogin;
  magic: Response;
  postActivity: Activity;
  postDiscussion: Discussion;
  postWork: Work;
  removeBallotRun: Response;
  setCards: Team;
  setNotes: Team;
  setPrefs: Team;
  setSchool: User;
  startBallotRun: BallotRun;
  updateOneBallot: Ballot;
  updateUser: User;
  vote: Vote;
  voteCode: Response;
};


export type MutationAcceptInviteArgs = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  invite: Scalars['String']['input'];
};


export type MutationAddBallotRunArgs = {
  ballotId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCheckVerificationArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateInvitedUserArgs = {
  email: Scalars['String']['input'];
  invite: Scalars['String']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateOneBallotArgs = {
  data: BallotCreateInput;
};


export type MutationCreateOneSchoolArgs = {
  data: SchoolCreateInput;
};


export type MutationCreateOneTeamArgs = {
  data: TeamCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteOneBallotArgs = {
  where: BallotWhereUniqueInput;
};


export type MutationDeleteOneSchoolArgs = {
  where: SchoolWhereUniqueInput;
};


export type MutationDeleteOneTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteWorkArgs = {
  where: WorkWhereUniqueInput;
};


export type MutationEmailVerificationArgs = {
  email: Scalars['String']['input'];
  purpose: Scalars['String']['input'];
};


export type MutationEndBallotRunArgs = {
  ballotRunId: Scalars['String']['input'];
};


export type MutationInviteStudentsArgs = {
  emails: Array<Scalars['String']['input']>;
  team: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMagicArgs = {
  email: Scalars['String']['input'];
  redirect?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostActivityArgs = {
  data: ActivityCreateInput;
};


export type MutationPostDiscussionArgs = {
  ballotId?: InputMaybe<Scalars['String']['input']>;
  card?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationPostWorkArgs = {
  data: WorkCreateInput;
};


export type MutationRemoveBallotRunArgs = {
  ballotRunId: Scalars['String']['input'];
};


export type MutationSetCardsArgs = {
  cards: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationSetNotesArgs = {
  notes: Scalars['Json']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationSetPrefsArgs = {
  prefs: Scalars['Json']['input'];
  teamId: Scalars['String']['input'];
};


export type MutationSetSchoolArgs = {
  school: Scalars['String']['input'];
};


export type MutationStartBallotRunArgs = {
  ballotRunId: Scalars['String']['input'];
};


export type MutationUpdateOneBallotArgs = {
  data: BallotUpdateInput;
  where: BallotWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationVoteArgs = {
  ballotId: Scalars['String']['input'];
  vote: Scalars['Int']['input'];
};


export type MutationVoteCodeArgs = {
  ballotRunId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  vote: Scalars['Int']['input'];
};

export type ProgressCard = {
  __typename?: 'ProgressCard';
  done?: Maybe<Array<User>>;
  due?: Maybe<Array<User>>;
  id?: Maybe<Scalars['String']['output']>;
};

export type ProgressStudent = {
  __typename?: 'ProgressStudent';
  done?: Maybe<Array<Scalars['String']['output']>>;
  due?: Maybe<Array<Scalars['String']['output']>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Activity>;
  attachments: Array<Attachment>;
  ballot?: Maybe<Ballot>;
  ballots: Array<Ballot>;
  cards?: Maybe<Array<Card>>;
  getBallotResults?: Maybe<BallotResults>;
  getBallotRuns?: Maybe<Array<BallotRun>>;
  getTeamDiscussions?: Maybe<Array<Discussion>>;
  me?: Maybe<User>;
  progress: ResponseProgress;
  school?: Maybe<School>;
  schools: Array<School>;
  stats: Stats;
  swissvotes?: Maybe<Array<Swissvote>>;
  team?: Maybe<Team>;
  teams: Array<Team>;
  user?: Maybe<User>;
  users: Array<User>;
  works: Array<Work>;
};


export type QueryActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActivityOrderByInput>>;
  where?: InputMaybe<ActivityWhereInput>;
};


export type QueryAttachmentsArgs = {
  where?: InputMaybe<AttachmentWhereInput>;
};


export type QueryBallotArgs = {
  where: BallotWhereUniqueInput;
};


export type QueryBallotsArgs = {
  where?: InputMaybe<BallotWhereInput>;
};


export type QueryCardsArgs = {
  age?: InputMaybe<Scalars['String']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetBallotResultsArgs = {
  ballotId: Scalars['String']['input'];
  ballotRunId?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  schoolId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetBallotRunsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  teamId: Scalars['String']['input'];
};


export type QueryGetTeamDiscussionsArgs = {
  ballotId?: InputMaybe<Scalars['String']['input']>;
  card?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProgressArgs = {
  teamId: Scalars['String']['input'];
};


export type QuerySchoolArgs = {
  where: SchoolWhereUniqueInput;
};


export type QuerySchoolsArgs = {
  where?: InputMaybe<SchoolWhereInput>;
};


export type QueryStatsArgs = {
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};


export type QuerySwissvotesArgs = {
  hasPosters?: InputMaybe<Scalars['Boolean']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type QueryTeamsArgs = {
  orderBy?: InputMaybe<Array<TeamOrderByInput>>;
  where?: InputMaybe<TeamWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderByInput>>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryWorksArgs = {
  where?: InputMaybe<WorkWhereInput>;
};

export type Reaction = {
  __typename?: 'Reaction';
  discussion?: Maybe<Discussion>;
  emoij?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  user: User;
};

export type Response = {
  __typename?: 'Response';
  error?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ResponseLogin = {
  __typename?: 'ResponseLogin';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ResponseProgress = {
  __typename?: 'ResponseProgress';
  cards?: Maybe<Array<ProgressCard>>;
  students?: Maybe<Array<ProgressStudent>>;
};

export enum Role {
  Admin = 'Admin',
  Principal = 'Principal',
  Student = 'Student',
  Teacher = 'Teacher',
  User = 'User'
}

export type RoleFilter = {
  equals?: InputMaybe<Role>;
};

export type School = {
  __typename?: 'School';
  address: Scalars['String']['output'];
  canton: Scalars['String']['output'];
  city: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  members: Array<User>;
  name: Scalars['String']['output'];
  teams: Array<Team>;
  type: Scalars['String']['output'];
  zip: Scalars['String']['output'];
};

export type SchoolCreateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolWhereInput = {
  canton?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type SchoolWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Stats = {
  __typename?: 'Stats';
  stats?: Maybe<Scalars['Json']['output']>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Swissvote = {
  __typename?: 'Swissvote';
  annahme?: Maybe<Scalars['Int']['output']>;
  anr?: Maybe<Scalars['String']['output']>;
  datum?: Maybe<Scalars['String']['output']>;
  kategorien?: Maybe<Scalars['String']['output']>;
  poster_ja?: Maybe<Scalars['String']['output']>;
  poster_nein?: Maybe<Scalars['String']['output']>;
  rechtsform?: Maybe<Scalars['Int']['output']>;
  stand?: Maybe<Scalars['Int']['output']>;
  stichwort?: Maybe<Scalars['String']['output']>;
  swissvoteslink?: Maybe<Scalars['String']['output']>;
  titel_kurz_d?: Maybe<Scalars['String']['output']>;
  titel_off_d?: Maybe<Scalars['String']['output']>;
  volk?: Maybe<Scalars['Int']['output']>;
};

export type Team = {
  __typename?: 'Team';
  ballots: Array<Ballot>;
  cards: Scalars['String']['output'];
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invite?: Maybe<Scalars['String']['output']>;
  members: Array<User>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['Json']['output']>;
  prefs?: Maybe<Scalars['Json']['output']>;
  school: School;
  teacher: User;
  teacherId: Scalars['String']['output'];
};

export type TeamCreateInput = {
  name: Scalars['String']['input'];
  school: UserSchoolUpdateInput;
  teacher: UserSchoolUpdateInput;
};

export type TeamOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TeamWhereInput = {
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<StringFilter>;
  teacher?: InputMaybe<IdRelationFilter>;
  teacherId?: InputMaybe<StringFilter>;
};

export type TeamWhereUniqueInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  invite?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  attachments: Array<Attachment>;
  ballots: Array<Ballot>;
  campaign?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  discussions: Array<Discussion>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  locale: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  reactions: Array<Reaction>;
  role: Role;
  school?: Maybe<School>;
  shortname?: Maybe<Scalars['String']['output']>;
  teaches: Array<Team>;
  team?: Maybe<Team>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type UserConnectListInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateInput = {
  campaign?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  lastname?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  redirect?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  lastname?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
  year?: InputMaybe<SortOrder>;
};

export type UserSchoolUpdateInput = {
  connect?: InputMaybe<WhereByIdInput>;
};

export type UserUpdateInput = {
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  gender?: InputMaybe<EnumGenderFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  school?: InputMaybe<UserSchoolUpdateInput>;
  year?: InputMaybe<IntFieldUpdateOperationsInput>;
};

export type UserWhereInput = {
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  lastname?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  role?: InputMaybe<RoleFilter>;
  schoolId?: InputMaybe<StringFilter>;
  teamId?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export enum Visibility {
  Private = 'Private',
  Public = 'Public',
  School = 'School',
  Team = 'Team'
}

export type VisibilityFilter = {
  equals?: InputMaybe<Visibility>;
};

export type Vote = {
  __typename?: 'Vote';
  ballot: Ballot;
  verify?: Maybe<Scalars['String']['output']>;
};

export enum VotingStatus {
  Closed = 'Closed',
  NotStarted = 'NotStarted',
  Open = 'Open',
  Restricted = 'Restricted',
  Voted = 'Voted'
}

export type WhereByIdInput = {
  id: Scalars['String']['input'];
};

export type Work = {
  __typename?: 'Work';
  attachments: Array<Attachment>;
  card?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['Json']['output']>;
  id: Scalars['ID']['output'];
  reactions: Array<Reaction>;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  users: Array<User>;
};

export type WorkCreateInput = {
  card?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['Json']['input']>;
  school?: InputMaybe<UserSchoolUpdateInput>;
  team?: InputMaybe<UserSchoolUpdateInput>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<UserConnectListInput>;
  visibility?: InputMaybe<Visibility>;
};

export type WorkWhereInput = {
  card?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<StringFilter>;
  teamId?: InputMaybe<StringFilter>;
  visibility?: InputMaybe<VisibilityFilter>;
};

export type WorkWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type ActivitiesQueryVariables = Exact<{
  where?: InputMaybe<ActivityWhereInput>;
  orderBy?: InputMaybe<Array<ActivityOrderByInput> | ActivityOrderByInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ActivitiesQuery = { __typename?: 'Query', activities: Array<{ __typename?: 'Activity', type: ActivityType, card?: string | null, summary?: string | null, ballotId?: string | null, workId?: string | null, time: any, user: { __typename?: 'User', shortname?: string | null } }> };

export type CreateOneBallotMutationVariables = Exact<{
  data: BallotCreateInput;
}>;


export type CreateOneBallotMutation = { __typename?: 'Mutation', createOneBallot: { __typename?: 'Ballot', id: string, title: string, description: string, body: string, start: any, end: any, scope: BallotScope, canton?: string | null } };

export type UpdateOneBallotMutationVariables = Exact<{
  data: BallotUpdateInput;
  where: BallotWhereUniqueInput;
}>;


export type UpdateOneBallotMutation = { __typename?: 'Mutation', updateOneBallot: { __typename?: 'Ballot', id: string, title: string, description: string, body: string, start: any, end: any, scope: BallotScope, canton?: string | null } };

export type DeleteOneBallotMutationVariables = Exact<{
  where: BallotWhereUniqueInput;
}>;


export type DeleteOneBallotMutation = { __typename?: 'Mutation', deleteOneBallot: { __typename?: 'Ballot', id: string } };

export type BallotFieldsFragment = { __typename?: 'Ballot', id: string, title: string, description: string, body: string, start: any, end: any, scope: BallotScope, canton?: string | null };

export type UserBallotFieldsFragment = { __typename?: 'Ballot', canVote?: boolean | null, hasVoted?: boolean | null, id: string, title: string, description: string, body: string, start: any, end: any, scope: BallotScope, canton?: string | null };

export type BallotRunFieldsFragment = { __typename?: 'BallotRun', id: string, start?: any | null, end?: any | null, ballotId: string };

export type BallotsQueryVariables = Exact<{
  where?: InputMaybe<BallotWhereInput>;
}>;


export type BallotsQuery = { __typename?: 'Query', ballots: Array<{ __typename?: 'Ballot', id: string, title: string, description: string, body: string, start: any, end: any, scope: BallotScope, canton?: string | null }> };

export type UserBallotsQueryVariables = Exact<{
  where?: InputMaybe<BallotWhereInput>;
}>;


export type UserBallotsQuery = { __typename?: 'Query', ballots: Array<{ __typename?: 'Ballot', canVote?: boolean | null, hasVoted?: boolean | null, id: string, title: string, description: string, body: string, start: any, end: any, scope: BallotScope, canton?: string | null }> };

export type BallotQueryVariables = Exact<{
  where: BallotWhereUniqueInput;
}>;


export type BallotQuery = { __typename?: 'Query', ballot?: { __typename?: 'Ballot', canVote?: boolean | null, hasVoted?: boolean | null, id: string, title: string, description: string, body: string, start: any, end: any, scope: BallotScope, canton?: string | null } | null };

export type GetBallotRunsQueryVariables = Exact<{
  teamId: Scalars['String']['input'];
}>;


export type GetBallotRunsQuery = { __typename?: 'Query', getBallotRuns?: Array<{ __typename?: 'BallotRun', id: string, start?: any | null, end?: any | null, ballotId: string }> | null };

export type AddBallotRunMutationVariables = Exact<{
  ballotId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
}>;


export type AddBallotRunMutation = { __typename?: 'Mutation', addBallotRun: { __typename?: 'BallotRun', id: string, start?: any | null, end?: any | null, ballotId: string } };

export type RemoveBallotRunMutationVariables = Exact<{
  ballotRunId: Scalars['String']['input'];
}>;


export type RemoveBallotRunMutation = { __typename?: 'Mutation', removeBallotRun: { __typename?: 'Response', success?: boolean | null, error?: boolean | null, message?: string | null } };

export type StartBallotRunMutationVariables = Exact<{
  ballotRunId: Scalars['String']['input'];
}>;


export type StartBallotRunMutation = { __typename?: 'Mutation', startBallotRun: { __typename?: 'BallotRun', id: string, start?: any | null, end?: any | null, ballotId: string } };

export type EndBallotRunMutationVariables = Exact<{
  ballotRunId: Scalars['String']['input'];
}>;


export type EndBallotRunMutation = { __typename?: 'Mutation', endBallotRun: { __typename?: 'BallotRun', id: string, start?: any | null, end?: any | null, ballotId: string } };

export type VoteMutationVariables = Exact<{
  ballotId: Scalars['String']['input'];
  vote: Scalars['Int']['input'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'Vote', verify?: string | null, ballot: { __typename?: 'Ballot', id: string, canVote?: boolean | null, hasVoted?: boolean | null } } };

export type VoteCodeMutationVariables = Exact<{
  code: Scalars['String']['input'];
  ballotRunId: Scalars['String']['input'];
  vote: Scalars['Int']['input'];
}>;


export type VoteCodeMutation = { __typename?: 'Mutation', voteCode: { __typename?: 'Response', success?: boolean | null, error?: boolean | null, message?: string | null } };

export type GetBallotResultsQueryVariables = Exact<{
  ballotId: Scalars['String']['input'];
  ballotRunId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
  schoolId?: InputMaybe<Scalars['String']['input']>;
  canton?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBallotResultsQuery = { __typename?: 'Query', getBallotResults?: { __typename?: 'BallotResults', yes?: number | null, no?: number | null, abs?: number | null, total?: number | null } | null };

export type CardsQueryVariables = Exact<{
  keywords?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type CardsQuery = { __typename?: 'Query', cards?: Array<{ __typename?: 'Card', id?: string | null, title?: string | null, description?: string | null, duration?: string | null, keywords?: string | null, type?: string | null, icon?: string | null, url?: string | null, source?: string | null, content?: string | null, age?: string | null, discussion?: boolean | null }> | null };

export type SetCardsMutationVariables = Exact<{
  teamId: Scalars['String']['input'];
  cards: Scalars['String']['input'];
}>;


export type SetCardsMutation = { __typename?: 'Mutation', setCards: { __typename?: 'Team', id: string, cards: string } };

export type LoginFieldsFragment = { __typename?: 'User', id: string, name?: string | null, lastname?: string | null, shortname?: string | null, gender?: Gender | null, year?: number | null, role: Role, email?: string | null, school?: { __typename?: 'School', id: string, name: string, city: string } | null, team?: { __typename?: 'Team', id: string, name: string, cards: string, teacher: { __typename?: 'User', id: string, name?: string | null, shortname?: string | null } } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name?: string | null, lastname?: string | null, shortname?: string | null, gender?: Gender | null, year?: number | null, role: Role, email?: string | null, school?: { __typename?: 'School', id: string, name: string, city: string } | null, team?: { __typename?: 'Team', id: string, name: string, cards: string, teacher: { __typename?: 'User', id: string, name?: string | null, shortname?: string | null } } | null } | null };

export type DiscussionFieldsFragment = { __typename?: 'Discussion', id: string, title: string, text: string, card?: string | null, ballotId?: string | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, shortname?: string | null } };

export type GetTeamDiscussionsQueryVariables = Exact<{
  card?: InputMaybe<Scalars['String']['input']>;
  ballotId?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTeamDiscussionsQuery = { __typename?: 'Query', getTeamDiscussions?: Array<{ __typename?: 'Discussion', id: string, title: string, text: string, card?: string | null, ballotId?: string | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, shortname?: string | null } }> | null };

export type PostDiscussionMutationVariables = Exact<{
  card?: InputMaybe<Scalars['String']['input']>;
  ballotId?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
}>;


export type PostDiscussionMutation = { __typename?: 'Mutation', postDiscussion: { __typename?: 'Discussion', id: string, title: string, text: string, card?: string | null, ballotId?: string | null, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, shortname?: string | null } } };

export type SetNotesMutationVariables = Exact<{
  teamId: Scalars['String']['input'];
  notes: Scalars['Json']['input'];
}>;


export type SetNotesMutation = { __typename?: 'Mutation', setNotes: { __typename?: 'Team', invite?: string | null, code?: string | null, id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', email?: string | null, emailVerified?: any | null, id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } } };

export type SetPrefsMutationVariables = Exact<{
  teamId: Scalars['String']['input'];
  prefs: Scalars['Json']['input'];
}>;


export type SetPrefsMutation = { __typename?: 'Mutation', setPrefs: { __typename?: 'Team', invite?: string | null, code?: string | null, id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', email?: string | null, emailVerified?: any | null, id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } } };

export type ProgressQueryVariables = Exact<{
  teamId: Scalars['String']['input'];
}>;


export type ProgressQuery = { __typename?: 'Query', progress: { __typename?: 'ResponseProgress', cards?: Array<{ __typename?: 'ProgressCard', id?: string | null, done?: Array<{ __typename?: 'User', id: string, email?: string | null }> | null, due?: Array<{ __typename?: 'User', id: string, email?: string | null }> | null }> | null, students?: Array<{ __typename?: 'ProgressStudent', id?: string | null, email?: string | null, done?: Array<string> | null, due?: Array<string> | null }> | null } };

export type SchoolFieldsFragment = { __typename?: 'School', id: string, name: string, type: string, city: string, zip: string, canton: string };

export type SchoolsWithMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type SchoolsWithMembersQuery = { __typename?: 'Query', schools: Array<{ __typename?: 'School', id: string, name: string, type: string, city: string, zip: string, canton: string, members: Array<{ __typename?: 'User', id: string, name?: string | null, lastname?: string | null }> }> };

export type SetSchoolMutationVariables = Exact<{
  school: Scalars['String']['input'];
}>;


export type SetSchoolMutation = { __typename?: 'Mutation', setSchool: { __typename?: 'User', id: string, name?: string | null, shortname?: string | null, role: Role, email?: string | null, lastname?: string | null, school?: { __typename?: 'School', id: string, name: string, type: string, city: string, zip: string } | null } };

export type SchoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type SchoolsQuery = { __typename?: 'Query', schools: Array<{ __typename?: 'School', id: string, name: string, type: string, city: string, zip: string, canton: string }> };

export type CreateOneSchoolMutationVariables = Exact<{
  data: SchoolCreateInput;
}>;


export type CreateOneSchoolMutation = { __typename?: 'Mutation', createOneSchool: { __typename?: 'School', id: string, name: string, address: string, zip: string, city: string, canton: string } };

export type NewSchoolFragment = { __typename?: 'School', name: string, address: string, zip: string, city: string, canton: string };

export type SwissvotesQueryVariables = Exact<{
  keywords?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['Int']['input']>;
  result?: InputMaybe<Scalars['Int']['input']>;
  hasPosters?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type SwissvotesQuery = { __typename?: 'Query', swissvotes?: Array<{ __typename?: 'Swissvote', anr?: string | null, datum?: string | null, titel_kurz_d?: string | null, titel_off_d?: string | null, stichwort?: string | null, swissvoteslink?: string | null, rechtsform?: number | null, poster_ja?: string | null, poster_nein?: string | null, annahme?: number | null, volk?: number | null, stand?: number | null, kategorien?: string | null }> | null };

export type TeamAnonFieldsFragment = { __typename?: 'Team', id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, school: { __typename?: 'School', id: string, name: string, city: string } };

export type TeamUserFieldsFragment = { __typename?: 'Team', id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } };

export type TeamTeacherFieldsFragment = { __typename?: 'Team', invite?: string | null, code?: string | null, id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', email?: string | null, emailVerified?: any | null, id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } };

export type TeamsQueryVariables = Exact<{
  where?: InputMaybe<TeamWhereInput>;
  orderBy?: InputMaybe<Array<TeamOrderByInput> | TeamOrderByInput>;
}>;


export type TeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', invite?: string | null, code?: string | null, id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', email?: string | null, emailVerified?: any | null, id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } }> };

export type TeamAnonQueryVariables = Exact<{
  where: TeamWhereUniqueInput;
}>;


export type TeamAnonQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, school: { __typename?: 'School', id: string, name: string, city: string } } | null };

export type TeamUserQueryVariables = Exact<{
  where: TeamWhereUniqueInput;
}>;


export type TeamUserQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } } | null };

export type TeamTeacherQueryVariables = Exact<{
  where: TeamWhereUniqueInput;
}>;


export type TeamTeacherQuery = { __typename?: 'Query', team?: { __typename?: 'Team', invite?: string | null, code?: string | null, id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', email?: string | null, emailVerified?: any | null, id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } } | null };

export type TeamByInviteQueryVariables = Exact<{
  invite: Scalars['String']['input'];
}>;


export type TeamByInviteQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, school: { __typename?: 'School', id: string, name: string, city: string } } | null };

export type TeamByCodeQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type TeamByCodeQuery = { __typename?: 'Query', team?: { __typename?: 'Team', id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, school: { __typename?: 'School', id: string, name: string, city: string } } | null };

export type DeleteOneTeamMutationVariables = Exact<{
  where: TeamWhereUniqueInput;
}>;


export type DeleteOneTeamMutation = { __typename?: 'Mutation', deleteOneTeam: { __typename?: 'Team', id: string } };

export type CreateOneTeamMutationVariables = Exact<{
  name: Scalars['String']['input'];
  school: Scalars['String']['input'];
  teacher: Scalars['String']['input'];
}>;


export type CreateOneTeamMutation = { __typename?: 'Mutation', createOneTeam: { __typename?: 'Team', invite?: string | null, code?: string | null, id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', email?: string | null, emailVerified?: any | null, id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } } };

export type AttachmentFieldsFragment = { __typename?: 'Attachment', id: string, file: string, title: string, type: string, user: { __typename?: 'User', id: string, shortname?: string | null, name?: string | null } };

export type AttachmentsQueryVariables = Exact<{
  where?: InputMaybe<AttachmentWhereInput>;
}>;


export type AttachmentsQuery = { __typename?: 'Query', attachments: Array<{ __typename?: 'Attachment', id: string, file: string, title: string, type: string, user: { __typename?: 'User', id: string, shortname?: string | null, name?: string | null } }> };

export type UsersQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, shortname?: string | null, team?: { __typename?: 'Team', id: string, name: string, school: { __typename?: 'School', id: string, name: string } } | null }> };

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name?: string | null, lastname?: string | null, shortname?: string | null, gender?: Gender | null, year?: number | null, role: Role, email?: string | null, school?: { __typename?: 'School', id: string, name: string, city: string } | null, team?: { __typename?: 'Team', id: string, name: string, cards: string, teacher: { __typename?: 'User', id: string, name?: string | null, shortname?: string | null } } | null } };

export type DeleteUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string, shortname?: string | null } };

export type WorkFieldsFragment = { __typename?: 'Work', id: string, card?: string | null, title: string, text: string, data?: any | null, updatedAt: any, users: Array<{ __typename?: 'User', id: string, name?: string | null, shortname?: string | null }>, attachments: Array<{ __typename?: 'Attachment', id: string, file: string, title: string, type: string, user: { __typename?: 'User', id: string, shortname?: string | null, name?: string | null } }> };

export type WorksQueryVariables = Exact<{
  where?: InputMaybe<WorkWhereInput>;
}>;


export type WorksQuery = { __typename?: 'Query', works: Array<{ __typename?: 'Work', id: string, card?: string | null, title: string, text: string, data?: any | null, updatedAt: any, users: Array<{ __typename?: 'User', id: string, name?: string | null, shortname?: string | null }>, attachments: Array<{ __typename?: 'Attachment', id: string, file: string, title: string, type: string, user: { __typename?: 'User', id: string, shortname?: string | null, name?: string | null } }> }> };

export type DeleteWorkMutationVariables = Exact<{
  where: WorkWhereUniqueInput;
}>;


export type DeleteWorkMutation = { __typename?: 'Mutation', deleteWork: { __typename?: 'Work', id: string } };

export type PostWorkMutationVariables = Exact<{
  data: WorkCreateInput;
}>;


export type PostWorkMutation = { __typename?: 'Mutation', postWork: { __typename?: 'Work', id: string, card?: string | null, title: string, text: string, data?: any | null, updatedAt: any, users: Array<{ __typename?: 'User', id: string, name?: string | null, shortname?: string | null }>, attachments: Array<{ __typename?: 'Attachment', id: string, file: string, title: string, type: string, user: { __typename?: 'User', id: string, shortname?: string | null, name?: string | null } }> } };

export type StatsQueryVariables = Exact<{
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
}>;


export type StatsQuery = { __typename?: 'Query', stats: { __typename?: 'Stats', stats?: any | null } };

export type TeachersQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
}>;


export type TeachersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name?: string | null, lastname?: string | null, shortname?: string | null, email?: string | null, emailVerified?: any | null, createdAt: any, school?: { __typename?: 'School', id: string, name: string, city: string, zip: string } | null, teaches: Array<{ __typename?: 'Team', name: string, id: string }> }> };

export type AdminUsersQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderByInput> | UserOrderByInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, shortname?: string | null, name?: string | null, gender?: Gender | null, year?: number | null, lastname?: string | null, createdAt: any, email?: string | null, emailVerified?: any | null, role: Role, school?: { __typename?: 'School', id: string, name: string, zip: string, city: string } | null, teaches: Array<{ __typename?: 'Team', id: string, name: string }>, team?: { __typename?: 'Team', id: string, name: string } | null }> };

export type CreateInvitedUserMutationVariables = Exact<{
  invite: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateInvitedUserMutation = { __typename?: 'Mutation', createInvitedUser: { __typename?: 'User', id: string, name?: string | null, lastname?: string | null, shortname?: string | null, gender?: Gender | null, year?: number | null, role: Role, email?: string | null, school?: { __typename?: 'School', id: string, name: string, city: string } | null, team?: { __typename?: 'Team', id: string, name: string, cards: string, teacher: { __typename?: 'User', id: string, name?: string | null, shortname?: string | null } } | null } };

export type AcceptInviteMutationVariables = Exact<{
  invite: Scalars['String']['input'];
  force?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AcceptInviteMutation = { __typename?: 'Mutation', acceptInvite: { __typename?: 'Team', id: string, name: string, school: { __typename?: 'School', id: string, name: string, city: string } } };

export type InviteStudentsMutationVariables = Exact<{
  team: Scalars['String']['input'];
  emails: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type InviteStudentsMutation = { __typename?: 'Mutation', inviteStudents: { __typename?: 'InviteResponse', created?: Array<string> | null, failed?: Array<string> | null, duplicated?: Array<string> | null, team?: { __typename?: 'Team', invite?: string | null, code?: string | null, id: string, name: string, cards: string, prefs?: any | null, notes?: any | null, teacherId: string, members: Array<{ __typename?: 'User', email?: string | null, emailVerified?: any | null, id: string, name?: string | null, shortname?: string | null }>, teacher: { __typename?: 'User', id: string, shortname?: string | null }, school: { __typename?: 'School', id: string, name: string, city: string } } | null } };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'Response', success?: boolean | null, error?: boolean | null, message?: string | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'ResponseLogin', token?: string | null, user?: { __typename?: 'User', id: string, name?: string | null, lastname?: string | null, shortname?: string | null, gender?: Gender | null, year?: number | null, role: Role, email?: string | null, school?: { __typename?: 'School', id: string, name: string, city: string } | null, team?: { __typename?: 'Team', id: string, name: string, cards: string, teacher: { __typename?: 'User', id: string, name?: string | null, shortname?: string | null } } | null } | null } };

export type EmailVerificationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  purpose: Scalars['String']['input'];
}>;


export type EmailVerificationMutation = { __typename?: 'Mutation', emailVerification: { __typename?: 'ResponseLogin', token?: string | null, user?: { __typename?: 'User', id: string, name?: string | null, lastname?: string | null, shortname?: string | null, gender?: Gender | null, year?: number | null, role: Role, email?: string | null, school?: { __typename?: 'School', id: string, name: string, city: string } | null, team?: { __typename?: 'Team', id: string, name: string, cards: string, teacher: { __typename?: 'User', id: string, name?: string | null, shortname?: string | null } } | null } | null } };

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ResponseLogin', token?: string | null, user?: { __typename?: 'User', id: string, name?: string | null, lastname?: string | null, shortname?: string | null, gender?: Gender | null, year?: number | null, role: Role, email?: string | null, school?: { __typename?: 'School', id: string, name: string, city: string } | null, team?: { __typename?: 'Team', id: string, name: string, cards: string, teacher: { __typename?: 'User', id: string, name?: string | null, shortname?: string | null } } | null } | null } };

export type MagicMutationVariables = Exact<{
  email: Scalars['String']['input'];
  redirect?: InputMaybe<Scalars['String']['input']>;
}>;


export type MagicMutation = { __typename?: 'Mutation', magic: { __typename?: 'Response', success?: boolean | null, error?: boolean | null, message?: string | null } };

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name?: string | null, email?: string | null, shortname?: string | null, lastname?: string | null, role: Role } };

export type CheckVerificationMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type CheckVerificationMutation = { __typename?: 'Mutation', checkVerification: { __typename?: 'ResponseLogin', token?: string | null } };

export const BallotFieldsFragmentDoc = gql`
    fragment BallotFields on Ballot {
  id
  title
  description
  body
  start
  end
  scope
  canton
}
    `;
export const UserBallotFieldsFragmentDoc = gql`
    fragment UserBallotFields on Ballot {
  ...BallotFields
  canVote
  hasVoted
}
    ${BallotFieldsFragmentDoc}`;
export const BallotRunFieldsFragmentDoc = gql`
    fragment BallotRunFields on BallotRun {
  id
  start
  end
  ballotId
}
    `;
export const LoginFieldsFragmentDoc = gql`
    fragment LoginFields on User {
  id
  name
  lastname
  shortname
  gender
  year
  role
  email
  school {
    id
    name
    city
  }
  team {
    id
    name
    cards
    teacher {
      id
      name
      shortname
    }
  }
}
    `;
export const DiscussionFieldsFragmentDoc = gql`
    fragment DiscussionFields on Discussion {
  id
  title
  text
  card
  ballotId
  createdAt
  updatedAt
  user {
    id
    shortname
  }
}
    `;
export const SchoolFieldsFragmentDoc = gql`
    fragment SchoolFields on School {
  id
  name
  type
  city
  zip
  canton
}
    `;
export const NewSchoolFragmentDoc = gql`
    fragment NewSchool on School {
  name
  address
  zip
  city
  canton
}
    `;
export const TeamAnonFieldsFragmentDoc = gql`
    fragment TeamAnonFields on Team {
  id
  name
  cards
  prefs
  notes
  teacherId
  school {
    id
    name
    city
  }
}
    `;
export const TeamUserFieldsFragmentDoc = gql`
    fragment TeamUserFields on Team {
  ...TeamAnonFields
  members {
    id
    name
    shortname
  }
  teacher {
    id
    shortname
  }
}
    ${TeamAnonFieldsFragmentDoc}`;
export const TeamTeacherFieldsFragmentDoc = gql`
    fragment TeamTeacherFields on Team {
  ...TeamUserFields
  invite
  code
  members {
    email
    emailVerified
  }
}
    ${TeamUserFieldsFragmentDoc}`;
export const AttachmentFieldsFragmentDoc = gql`
    fragment AttachmentFields on Attachment {
  id
  file
  title
  type
  user {
    id
    shortname
    name
  }
}
    `;
export const WorkFieldsFragmentDoc = gql`
    fragment WorkFields on Work {
  id
  card
  title
  text
  data
  updatedAt
  users {
    id
    name
    shortname
  }
  attachments {
    ...AttachmentFields
  }
}
    ${AttachmentFieldsFragmentDoc}`;
export const ActivitiesDocument = gql`
    query activities($where: ActivityWhereInput, $orderBy: [ActivityOrderByInput!], $first: Int) {
  activities(where: $where, orderBy: $orderBy, first: $first) {
    user {
      shortname
    }
    type
    card
    summary
    ballotId
    workId
    time
  }
}
    `;
export function useActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
      }
export function useActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
        }
// @ts-ignore
export function useActivitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>): Apollo.UseSuspenseQueryResult<ActivitiesQuery, ActivitiesQueryVariables>;
export function useActivitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>): Apollo.UseSuspenseQueryResult<ActivitiesQuery | undefined, ActivitiesQueryVariables>;
export function useActivitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
        }
export type ActivitiesQueryHookResult = ReturnType<typeof useActivitiesQuery>;
export type ActivitiesLazyQueryHookResult = ReturnType<typeof useActivitiesLazyQuery>;
export type ActivitiesSuspenseQueryHookResult = ReturnType<typeof useActivitiesSuspenseQuery>;
export type ActivitiesQueryResult = Apollo.QueryResult<ActivitiesQuery, ActivitiesQueryVariables>;
export const CreateOneBallotDocument = gql`
    mutation createOneBallot($data: BallotCreateInput!) {
  createOneBallot(data: $data) {
    ...BallotFields
  }
}
    ${BallotFieldsFragmentDoc}`;
export type CreateOneBallotMutationFn = Apollo.MutationFunction<CreateOneBallotMutation, CreateOneBallotMutationVariables>;
export function useCreateOneBallotMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneBallotMutation, CreateOneBallotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOneBallotMutation, CreateOneBallotMutationVariables>(CreateOneBallotDocument, options);
      }
export type CreateOneBallotMutationHookResult = ReturnType<typeof useCreateOneBallotMutation>;
export type CreateOneBallotMutationResult = Apollo.MutationResult<CreateOneBallotMutation>;
export type CreateOneBallotMutationOptions = Apollo.BaseMutationOptions<CreateOneBallotMutation, CreateOneBallotMutationVariables>;
export const UpdateOneBallotDocument = gql`
    mutation updateOneBallot($data: BallotUpdateInput!, $where: BallotWhereUniqueInput!) {
  updateOneBallot(data: $data, where: $where) {
    ...BallotFields
  }
}
    ${BallotFieldsFragmentDoc}`;
export type UpdateOneBallotMutationFn = Apollo.MutationFunction<UpdateOneBallotMutation, UpdateOneBallotMutationVariables>;
export function useUpdateOneBallotMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneBallotMutation, UpdateOneBallotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneBallotMutation, UpdateOneBallotMutationVariables>(UpdateOneBallotDocument, options);
      }
export type UpdateOneBallotMutationHookResult = ReturnType<typeof useUpdateOneBallotMutation>;
export type UpdateOneBallotMutationResult = Apollo.MutationResult<UpdateOneBallotMutation>;
export type UpdateOneBallotMutationOptions = Apollo.BaseMutationOptions<UpdateOneBallotMutation, UpdateOneBallotMutationVariables>;
export const DeleteOneBallotDocument = gql`
    mutation deleteOneBallot($where: BallotWhereUniqueInput!) {
  deleteOneBallot(where: $where) {
    id
  }
}
    `;
export type DeleteOneBallotMutationFn = Apollo.MutationFunction<DeleteOneBallotMutation, DeleteOneBallotMutationVariables>;
export function useDeleteOneBallotMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneBallotMutation, DeleteOneBallotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOneBallotMutation, DeleteOneBallotMutationVariables>(DeleteOneBallotDocument, options);
      }
export type DeleteOneBallotMutationHookResult = ReturnType<typeof useDeleteOneBallotMutation>;
export type DeleteOneBallotMutationResult = Apollo.MutationResult<DeleteOneBallotMutation>;
export type DeleteOneBallotMutationOptions = Apollo.BaseMutationOptions<DeleteOneBallotMutation, DeleteOneBallotMutationVariables>;
export const BallotsDocument = gql`
    query ballots($where: BallotWhereInput) {
  ballots(where: $where) {
    ...BallotFields
  }
}
    ${BallotFieldsFragmentDoc}`;
export function useBallotsQuery(baseOptions?: Apollo.QueryHookOptions<BallotsQuery, BallotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BallotsQuery, BallotsQueryVariables>(BallotsDocument, options);
      }
export function useBallotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BallotsQuery, BallotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BallotsQuery, BallotsQueryVariables>(BallotsDocument, options);
        }
// @ts-ignore
export function useBallotsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BallotsQuery, BallotsQueryVariables>): Apollo.UseSuspenseQueryResult<BallotsQuery, BallotsQueryVariables>;
export function useBallotsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BallotsQuery, BallotsQueryVariables>): Apollo.UseSuspenseQueryResult<BallotsQuery | undefined, BallotsQueryVariables>;
export function useBallotsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BallotsQuery, BallotsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BallotsQuery, BallotsQueryVariables>(BallotsDocument, options);
        }
export type BallotsQueryHookResult = ReturnType<typeof useBallotsQuery>;
export type BallotsLazyQueryHookResult = ReturnType<typeof useBallotsLazyQuery>;
export type BallotsSuspenseQueryHookResult = ReturnType<typeof useBallotsSuspenseQuery>;
export type BallotsQueryResult = Apollo.QueryResult<BallotsQuery, BallotsQueryVariables>;
export const UserBallotsDocument = gql`
    query userBallots($where: BallotWhereInput) {
  ballots(where: $where) {
    ...BallotFields
    canVote
    hasVoted
  }
}
    ${BallotFieldsFragmentDoc}`;
export function useUserBallotsQuery(baseOptions?: Apollo.QueryHookOptions<UserBallotsQuery, UserBallotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBallotsQuery, UserBallotsQueryVariables>(UserBallotsDocument, options);
      }
export function useUserBallotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBallotsQuery, UserBallotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBallotsQuery, UserBallotsQueryVariables>(UserBallotsDocument, options);
        }
// @ts-ignore
export function useUserBallotsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserBallotsQuery, UserBallotsQueryVariables>): Apollo.UseSuspenseQueryResult<UserBallotsQuery, UserBallotsQueryVariables>;
export function useUserBallotsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserBallotsQuery, UserBallotsQueryVariables>): Apollo.UseSuspenseQueryResult<UserBallotsQuery | undefined, UserBallotsQueryVariables>;
export function useUserBallotsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserBallotsQuery, UserBallotsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserBallotsQuery, UserBallotsQueryVariables>(UserBallotsDocument, options);
        }
export type UserBallotsQueryHookResult = ReturnType<typeof useUserBallotsQuery>;
export type UserBallotsLazyQueryHookResult = ReturnType<typeof useUserBallotsLazyQuery>;
export type UserBallotsSuspenseQueryHookResult = ReturnType<typeof useUserBallotsSuspenseQuery>;
export type UserBallotsQueryResult = Apollo.QueryResult<UserBallotsQuery, UserBallotsQueryVariables>;
export const BallotDocument = gql`
    query ballot($where: BallotWhereUniqueInput!) {
  ballot(where: $where) {
    ...BallotFields
    canVote
    hasVoted
  }
}
    ${BallotFieldsFragmentDoc}`;
export function useBallotQuery(baseOptions: Apollo.QueryHookOptions<BallotQuery, BallotQueryVariables> & ({ variables: BallotQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BallotQuery, BallotQueryVariables>(BallotDocument, options);
      }
export function useBallotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BallotQuery, BallotQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BallotQuery, BallotQueryVariables>(BallotDocument, options);
        }
// @ts-ignore
export function useBallotSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BallotQuery, BallotQueryVariables>): Apollo.UseSuspenseQueryResult<BallotQuery, BallotQueryVariables>;
export function useBallotSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BallotQuery, BallotQueryVariables>): Apollo.UseSuspenseQueryResult<BallotQuery | undefined, BallotQueryVariables>;
export function useBallotSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BallotQuery, BallotQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BallotQuery, BallotQueryVariables>(BallotDocument, options);
        }
export type BallotQueryHookResult = ReturnType<typeof useBallotQuery>;
export type BallotLazyQueryHookResult = ReturnType<typeof useBallotLazyQuery>;
export type BallotSuspenseQueryHookResult = ReturnType<typeof useBallotSuspenseQuery>;
export type BallotQueryResult = Apollo.QueryResult<BallotQuery, BallotQueryVariables>;
export const GetBallotRunsDocument = gql`
    query getBallotRuns($teamId: String!) {
  getBallotRuns(teamId: $teamId) {
    ...BallotRunFields
  }
}
    ${BallotRunFieldsFragmentDoc}`;
export function useGetBallotRunsQuery(baseOptions: Apollo.QueryHookOptions<GetBallotRunsQuery, GetBallotRunsQueryVariables> & ({ variables: GetBallotRunsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBallotRunsQuery, GetBallotRunsQueryVariables>(GetBallotRunsDocument, options);
      }
export function useGetBallotRunsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBallotRunsQuery, GetBallotRunsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBallotRunsQuery, GetBallotRunsQueryVariables>(GetBallotRunsDocument, options);
        }
// @ts-ignore
export function useGetBallotRunsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBallotRunsQuery, GetBallotRunsQueryVariables>): Apollo.UseSuspenseQueryResult<GetBallotRunsQuery, GetBallotRunsQueryVariables>;
export function useGetBallotRunsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBallotRunsQuery, GetBallotRunsQueryVariables>): Apollo.UseSuspenseQueryResult<GetBallotRunsQuery | undefined, GetBallotRunsQueryVariables>;
export function useGetBallotRunsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBallotRunsQuery, GetBallotRunsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBallotRunsQuery, GetBallotRunsQueryVariables>(GetBallotRunsDocument, options);
        }
export type GetBallotRunsQueryHookResult = ReturnType<typeof useGetBallotRunsQuery>;
export type GetBallotRunsLazyQueryHookResult = ReturnType<typeof useGetBallotRunsLazyQuery>;
export type GetBallotRunsSuspenseQueryHookResult = ReturnType<typeof useGetBallotRunsSuspenseQuery>;
export type GetBallotRunsQueryResult = Apollo.QueryResult<GetBallotRunsQuery, GetBallotRunsQueryVariables>;
export const AddBallotRunDocument = gql`
    mutation addBallotRun($ballotId: String!, $teamId: String!) {
  addBallotRun(ballotId: $ballotId, teamId: $teamId) {
    ...BallotRunFields
  }
}
    ${BallotRunFieldsFragmentDoc}`;
export type AddBallotRunMutationFn = Apollo.MutationFunction<AddBallotRunMutation, AddBallotRunMutationVariables>;
export function useAddBallotRunMutation(baseOptions?: Apollo.MutationHookOptions<AddBallotRunMutation, AddBallotRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBallotRunMutation, AddBallotRunMutationVariables>(AddBallotRunDocument, options);
      }
export type AddBallotRunMutationHookResult = ReturnType<typeof useAddBallotRunMutation>;
export type AddBallotRunMutationResult = Apollo.MutationResult<AddBallotRunMutation>;
export type AddBallotRunMutationOptions = Apollo.BaseMutationOptions<AddBallotRunMutation, AddBallotRunMutationVariables>;
export const RemoveBallotRunDocument = gql`
    mutation removeBallotRun($ballotRunId: String!) {
  removeBallotRun(ballotRunId: $ballotRunId) {
    success
    error
    message
  }
}
    `;
export type RemoveBallotRunMutationFn = Apollo.MutationFunction<RemoveBallotRunMutation, RemoveBallotRunMutationVariables>;
export function useRemoveBallotRunMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBallotRunMutation, RemoveBallotRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBallotRunMutation, RemoveBallotRunMutationVariables>(RemoveBallotRunDocument, options);
      }
export type RemoveBallotRunMutationHookResult = ReturnType<typeof useRemoveBallotRunMutation>;
export type RemoveBallotRunMutationResult = Apollo.MutationResult<RemoveBallotRunMutation>;
export type RemoveBallotRunMutationOptions = Apollo.BaseMutationOptions<RemoveBallotRunMutation, RemoveBallotRunMutationVariables>;
export const StartBallotRunDocument = gql`
    mutation startBallotRun($ballotRunId: String!) {
  startBallotRun(ballotRunId: $ballotRunId) {
    ...BallotRunFields
  }
}
    ${BallotRunFieldsFragmentDoc}`;
export type StartBallotRunMutationFn = Apollo.MutationFunction<StartBallotRunMutation, StartBallotRunMutationVariables>;
export function useStartBallotRunMutation(baseOptions?: Apollo.MutationHookOptions<StartBallotRunMutation, StartBallotRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartBallotRunMutation, StartBallotRunMutationVariables>(StartBallotRunDocument, options);
      }
export type StartBallotRunMutationHookResult = ReturnType<typeof useStartBallotRunMutation>;
export type StartBallotRunMutationResult = Apollo.MutationResult<StartBallotRunMutation>;
export type StartBallotRunMutationOptions = Apollo.BaseMutationOptions<StartBallotRunMutation, StartBallotRunMutationVariables>;
export const EndBallotRunDocument = gql`
    mutation endBallotRun($ballotRunId: String!) {
  endBallotRun(ballotRunId: $ballotRunId) {
    ...BallotRunFields
  }
}
    ${BallotRunFieldsFragmentDoc}`;
export type EndBallotRunMutationFn = Apollo.MutationFunction<EndBallotRunMutation, EndBallotRunMutationVariables>;
export function useEndBallotRunMutation(baseOptions?: Apollo.MutationHookOptions<EndBallotRunMutation, EndBallotRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndBallotRunMutation, EndBallotRunMutationVariables>(EndBallotRunDocument, options);
      }
export type EndBallotRunMutationHookResult = ReturnType<typeof useEndBallotRunMutation>;
export type EndBallotRunMutationResult = Apollo.MutationResult<EndBallotRunMutation>;
export type EndBallotRunMutationOptions = Apollo.BaseMutationOptions<EndBallotRunMutation, EndBallotRunMutationVariables>;
export const VoteDocument = gql`
    mutation vote($ballotId: String!, $vote: Int!) {
  vote(ballotId: $ballotId, vote: $vote) {
    verify
    ballot {
      id
      canVote
      hasVoted
    }
  }
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const VoteCodeDocument = gql`
    mutation voteCode($code: String!, $ballotRunId: String!, $vote: Int!) {
  voteCode(code: $code, ballotRunId: $ballotRunId, vote: $vote) {
    success
    error
    message
  }
}
    `;
export type VoteCodeMutationFn = Apollo.MutationFunction<VoteCodeMutation, VoteCodeMutationVariables>;
export function useVoteCodeMutation(baseOptions?: Apollo.MutationHookOptions<VoteCodeMutation, VoteCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteCodeMutation, VoteCodeMutationVariables>(VoteCodeDocument, options);
      }
export type VoteCodeMutationHookResult = ReturnType<typeof useVoteCodeMutation>;
export type VoteCodeMutationResult = Apollo.MutationResult<VoteCodeMutation>;
export type VoteCodeMutationOptions = Apollo.BaseMutationOptions<VoteCodeMutation, VoteCodeMutationVariables>;
export const GetBallotResultsDocument = gql`
    query getBallotResults($ballotId: String!, $ballotRunId: String, $teamId: String, $schoolId: String, $canton: String) {
  getBallotResults(
    ballotRunId: $ballotRunId
    ballotId: $ballotId
    teamId: $teamId
    schoolId: $schoolId
    canton: $canton
  ) {
    yes
    no
    abs
    total
  }
}
    `;
export function useGetBallotResultsQuery(baseOptions: Apollo.QueryHookOptions<GetBallotResultsQuery, GetBallotResultsQueryVariables> & ({ variables: GetBallotResultsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBallotResultsQuery, GetBallotResultsQueryVariables>(GetBallotResultsDocument, options);
      }
export function useGetBallotResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBallotResultsQuery, GetBallotResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBallotResultsQuery, GetBallotResultsQueryVariables>(GetBallotResultsDocument, options);
        }
// @ts-ignore
export function useGetBallotResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBallotResultsQuery, GetBallotResultsQueryVariables>): Apollo.UseSuspenseQueryResult<GetBallotResultsQuery, GetBallotResultsQueryVariables>;
export function useGetBallotResultsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBallotResultsQuery, GetBallotResultsQueryVariables>): Apollo.UseSuspenseQueryResult<GetBallotResultsQuery | undefined, GetBallotResultsQueryVariables>;
export function useGetBallotResultsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBallotResultsQuery, GetBallotResultsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBallotResultsQuery, GetBallotResultsQueryVariables>(GetBallotResultsDocument, options);
        }
export type GetBallotResultsQueryHookResult = ReturnType<typeof useGetBallotResultsQuery>;
export type GetBallotResultsLazyQueryHookResult = ReturnType<typeof useGetBallotResultsLazyQuery>;
export type GetBallotResultsSuspenseQueryHookResult = ReturnType<typeof useGetBallotResultsSuspenseQuery>;
export type GetBallotResultsQueryResult = Apollo.QueryResult<GetBallotResultsQuery, GetBallotResultsQueryVariables>;
export const CardsDocument = gql`
    query cards($keywords: String, $age: String, $type: String) {
  cards(keywords: $keywords, age: $age, type: $type) {
    id
    title
    description
    duration
    keywords
    type
    icon
    url
    source
    content
    age
    discussion
  }
}
    `;
export function useCardsQuery(baseOptions?: Apollo.QueryHookOptions<CardsQuery, CardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
      }
export function useCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
        }
// @ts-ignore
export function useCardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CardsQuery, CardsQueryVariables>): Apollo.UseSuspenseQueryResult<CardsQuery, CardsQueryVariables>;
export function useCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CardsQuery, CardsQueryVariables>): Apollo.UseSuspenseQueryResult<CardsQuery | undefined, CardsQueryVariables>;
export function useCardsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
        }
export type CardsQueryHookResult = ReturnType<typeof useCardsQuery>;
export type CardsLazyQueryHookResult = ReturnType<typeof useCardsLazyQuery>;
export type CardsSuspenseQueryHookResult = ReturnType<typeof useCardsSuspenseQuery>;
export type CardsQueryResult = Apollo.QueryResult<CardsQuery, CardsQueryVariables>;
export const SetCardsDocument = gql`
    mutation setCards($teamId: String!, $cards: String!) {
  setCards(teamId: $teamId, cards: $cards) {
    id
    cards
  }
}
    `;
export type SetCardsMutationFn = Apollo.MutationFunction<SetCardsMutation, SetCardsMutationVariables>;
export function useSetCardsMutation(baseOptions?: Apollo.MutationHookOptions<SetCardsMutation, SetCardsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetCardsMutation, SetCardsMutationVariables>(SetCardsDocument, options);
      }
export type SetCardsMutationHookResult = ReturnType<typeof useSetCardsMutation>;
export type SetCardsMutationResult = Apollo.MutationResult<SetCardsMutation>;
export type SetCardsMutationOptions = Apollo.BaseMutationOptions<SetCardsMutation, SetCardsMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...LoginFields
  }
}
    ${LoginFieldsFragmentDoc}`;
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetTeamDiscussionsDocument = gql`
    query getTeamDiscussions($card: String, $ballotId: String, $teamId: String) {
  getTeamDiscussions(card: $card, ballotId: $ballotId, teamId: $teamId) {
    ...DiscussionFields
  }
}
    ${DiscussionFieldsFragmentDoc}`;
export function useGetTeamDiscussionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>(GetTeamDiscussionsDocument, options);
      }
export function useGetTeamDiscussionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>(GetTeamDiscussionsDocument, options);
        }
// @ts-ignore
export function useGetTeamDiscussionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>): Apollo.UseSuspenseQueryResult<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>;
export function useGetTeamDiscussionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>): Apollo.UseSuspenseQueryResult<GetTeamDiscussionsQuery | undefined, GetTeamDiscussionsQueryVariables>;
export function useGetTeamDiscussionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>(GetTeamDiscussionsDocument, options);
        }
export type GetTeamDiscussionsQueryHookResult = ReturnType<typeof useGetTeamDiscussionsQuery>;
export type GetTeamDiscussionsLazyQueryHookResult = ReturnType<typeof useGetTeamDiscussionsLazyQuery>;
export type GetTeamDiscussionsSuspenseQueryHookResult = ReturnType<typeof useGetTeamDiscussionsSuspenseQuery>;
export type GetTeamDiscussionsQueryResult = Apollo.QueryResult<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>;
export const PostDiscussionDocument = gql`
    mutation postDiscussion($card: String, $ballotId: String, $text: String!, $title: String!, $teamId: String!) {
  postDiscussion(
    card: $card
    ballotId: $ballotId
    text: $text
    title: $title
    teamId: $teamId
  ) {
    ...DiscussionFields
  }
}
    ${DiscussionFieldsFragmentDoc}`;
export type PostDiscussionMutationFn = Apollo.MutationFunction<PostDiscussionMutation, PostDiscussionMutationVariables>;
export function usePostDiscussionMutation(baseOptions?: Apollo.MutationHookOptions<PostDiscussionMutation, PostDiscussionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostDiscussionMutation, PostDiscussionMutationVariables>(PostDiscussionDocument, options);
      }
export type PostDiscussionMutationHookResult = ReturnType<typeof usePostDiscussionMutation>;
export type PostDiscussionMutationResult = Apollo.MutationResult<PostDiscussionMutation>;
export type PostDiscussionMutationOptions = Apollo.BaseMutationOptions<PostDiscussionMutation, PostDiscussionMutationVariables>;
export const SetNotesDocument = gql`
    mutation setNotes($teamId: String!, $notes: Json!) {
  setNotes(teamId: $teamId, notes: $notes) {
    ...TeamTeacherFields
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;
export type SetNotesMutationFn = Apollo.MutationFunction<SetNotesMutation, SetNotesMutationVariables>;
export function useSetNotesMutation(baseOptions?: Apollo.MutationHookOptions<SetNotesMutation, SetNotesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetNotesMutation, SetNotesMutationVariables>(SetNotesDocument, options);
      }
export type SetNotesMutationHookResult = ReturnType<typeof useSetNotesMutation>;
export type SetNotesMutationResult = Apollo.MutationResult<SetNotesMutation>;
export type SetNotesMutationOptions = Apollo.BaseMutationOptions<SetNotesMutation, SetNotesMutationVariables>;
export const SetPrefsDocument = gql`
    mutation setPrefs($teamId: String!, $prefs: Json!) {
  setPrefs(teamId: $teamId, prefs: $prefs) {
    ...TeamTeacherFields
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;
export type SetPrefsMutationFn = Apollo.MutationFunction<SetPrefsMutation, SetPrefsMutationVariables>;
export function useSetPrefsMutation(baseOptions?: Apollo.MutationHookOptions<SetPrefsMutation, SetPrefsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPrefsMutation, SetPrefsMutationVariables>(SetPrefsDocument, options);
      }
export type SetPrefsMutationHookResult = ReturnType<typeof useSetPrefsMutation>;
export type SetPrefsMutationResult = Apollo.MutationResult<SetPrefsMutation>;
export type SetPrefsMutationOptions = Apollo.BaseMutationOptions<SetPrefsMutation, SetPrefsMutationVariables>;
export const ProgressDocument = gql`
    query progress($teamId: String!) {
  progress(teamId: $teamId) {
    cards {
      id
      done {
        id
        email
      }
      due {
        id
        email
      }
    }
    students {
      id
      email
      done
      due
    }
  }
}
    `;
export function useProgressQuery(baseOptions: Apollo.QueryHookOptions<ProgressQuery, ProgressQueryVariables> & ({ variables: ProgressQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgressQuery, ProgressQueryVariables>(ProgressDocument, options);
      }
export function useProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgressQuery, ProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgressQuery, ProgressQueryVariables>(ProgressDocument, options);
        }
// @ts-ignore
export function useProgressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProgressQuery, ProgressQueryVariables>): Apollo.UseSuspenseQueryResult<ProgressQuery, ProgressQueryVariables>;
export function useProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProgressQuery, ProgressQueryVariables>): Apollo.UseSuspenseQueryResult<ProgressQuery | undefined, ProgressQueryVariables>;
export function useProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProgressQuery, ProgressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProgressQuery, ProgressQueryVariables>(ProgressDocument, options);
        }
export type ProgressQueryHookResult = ReturnType<typeof useProgressQuery>;
export type ProgressLazyQueryHookResult = ReturnType<typeof useProgressLazyQuery>;
export type ProgressSuspenseQueryHookResult = ReturnType<typeof useProgressSuspenseQuery>;
export type ProgressQueryResult = Apollo.QueryResult<ProgressQuery, ProgressQueryVariables>;
export const SchoolsWithMembersDocument = gql`
    query schoolsWithMembers {
  schools {
    ...SchoolFields
    members {
      id
      name
      lastname
    }
  }
}
    ${SchoolFieldsFragmentDoc}`;
export function useSchoolsWithMembersQuery(baseOptions?: Apollo.QueryHookOptions<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>(SchoolsWithMembersDocument, options);
      }
export function useSchoolsWithMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>(SchoolsWithMembersDocument, options);
        }
// @ts-ignore
export function useSchoolsWithMembersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>): Apollo.UseSuspenseQueryResult<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>;
export function useSchoolsWithMembersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>): Apollo.UseSuspenseQueryResult<SchoolsWithMembersQuery | undefined, SchoolsWithMembersQueryVariables>;
export function useSchoolsWithMembersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>(SchoolsWithMembersDocument, options);
        }
export type SchoolsWithMembersQueryHookResult = ReturnType<typeof useSchoolsWithMembersQuery>;
export type SchoolsWithMembersLazyQueryHookResult = ReturnType<typeof useSchoolsWithMembersLazyQuery>;
export type SchoolsWithMembersSuspenseQueryHookResult = ReturnType<typeof useSchoolsWithMembersSuspenseQuery>;
export type SchoolsWithMembersQueryResult = Apollo.QueryResult<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>;
export const SetSchoolDocument = gql`
    mutation setSchool($school: String!) {
  setSchool(school: $school) {
    id
    name
    shortname
    role
    email
    lastname
    school {
      id
      name
      type
      city
      zip
    }
  }
}
    `;
export type SetSchoolMutationFn = Apollo.MutationFunction<SetSchoolMutation, SetSchoolMutationVariables>;
export function useSetSchoolMutation(baseOptions?: Apollo.MutationHookOptions<SetSchoolMutation, SetSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetSchoolMutation, SetSchoolMutationVariables>(SetSchoolDocument, options);
      }
export type SetSchoolMutationHookResult = ReturnType<typeof useSetSchoolMutation>;
export type SetSchoolMutationResult = Apollo.MutationResult<SetSchoolMutation>;
export type SetSchoolMutationOptions = Apollo.BaseMutationOptions<SetSchoolMutation, SetSchoolMutationVariables>;
export const SchoolsDocument = gql`
    query schools {
  schools {
    ...SchoolFields
  }
}
    ${SchoolFieldsFragmentDoc}`;
export function useSchoolsQuery(baseOptions?: Apollo.QueryHookOptions<SchoolsQuery, SchoolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchoolsQuery, SchoolsQueryVariables>(SchoolsDocument, options);
      }
export function useSchoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchoolsQuery, SchoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchoolsQuery, SchoolsQueryVariables>(SchoolsDocument, options);
        }
// @ts-ignore
export function useSchoolsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SchoolsQuery, SchoolsQueryVariables>): Apollo.UseSuspenseQueryResult<SchoolsQuery, SchoolsQueryVariables>;
export function useSchoolsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SchoolsQuery, SchoolsQueryVariables>): Apollo.UseSuspenseQueryResult<SchoolsQuery | undefined, SchoolsQueryVariables>;
export function useSchoolsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SchoolsQuery, SchoolsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SchoolsQuery, SchoolsQueryVariables>(SchoolsDocument, options);
        }
export type SchoolsQueryHookResult = ReturnType<typeof useSchoolsQuery>;
export type SchoolsLazyQueryHookResult = ReturnType<typeof useSchoolsLazyQuery>;
export type SchoolsSuspenseQueryHookResult = ReturnType<typeof useSchoolsSuspenseQuery>;
export type SchoolsQueryResult = Apollo.QueryResult<SchoolsQuery, SchoolsQueryVariables>;
export const CreateOneSchoolDocument = gql`
    mutation createOneSchool($data: SchoolCreateInput!) {
  createOneSchool(data: $data) {
    id
    name
    address
    zip
    city
    canton
  }
}
    `;
export type CreateOneSchoolMutationFn = Apollo.MutationFunction<CreateOneSchoolMutation, CreateOneSchoolMutationVariables>;
export function useCreateOneSchoolMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneSchoolMutation, CreateOneSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOneSchoolMutation, CreateOneSchoolMutationVariables>(CreateOneSchoolDocument, options);
      }
export type CreateOneSchoolMutationHookResult = ReturnType<typeof useCreateOneSchoolMutation>;
export type CreateOneSchoolMutationResult = Apollo.MutationResult<CreateOneSchoolMutation>;
export type CreateOneSchoolMutationOptions = Apollo.BaseMutationOptions<CreateOneSchoolMutation, CreateOneSchoolMutationVariables>;
export const SwissvotesDocument = gql`
    query swissvotes($keywords: String, $type: Int, $result: Int, $hasPosters: Boolean, $offset: Int, $limit: Int, $sort: String) {
  swissvotes(
    keywords: $keywords
    type: $type
    result: $result
    hasPosters: $hasPosters
    offset: $offset
    limit: $limit
    sort: $sort
  ) {
    anr
    datum
    titel_kurz_d
    titel_off_d
    stichwort
    swissvoteslink
    rechtsform
    poster_ja
    poster_nein
    annahme
    volk
    stand
    kategorien
  }
}
    `;
export function useSwissvotesQuery(baseOptions?: Apollo.QueryHookOptions<SwissvotesQuery, SwissvotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SwissvotesQuery, SwissvotesQueryVariables>(SwissvotesDocument, options);
      }
export function useSwissvotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SwissvotesQuery, SwissvotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SwissvotesQuery, SwissvotesQueryVariables>(SwissvotesDocument, options);
        }
// @ts-ignore
export function useSwissvotesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SwissvotesQuery, SwissvotesQueryVariables>): Apollo.UseSuspenseQueryResult<SwissvotesQuery, SwissvotesQueryVariables>;
export function useSwissvotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SwissvotesQuery, SwissvotesQueryVariables>): Apollo.UseSuspenseQueryResult<SwissvotesQuery | undefined, SwissvotesQueryVariables>;
export function useSwissvotesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SwissvotesQuery, SwissvotesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SwissvotesQuery, SwissvotesQueryVariables>(SwissvotesDocument, options);
        }
export type SwissvotesQueryHookResult = ReturnType<typeof useSwissvotesQuery>;
export type SwissvotesLazyQueryHookResult = ReturnType<typeof useSwissvotesLazyQuery>;
export type SwissvotesSuspenseQueryHookResult = ReturnType<typeof useSwissvotesSuspenseQuery>;
export type SwissvotesQueryResult = Apollo.QueryResult<SwissvotesQuery, SwissvotesQueryVariables>;
export const TeamsDocument = gql`
    query teams($where: TeamWhereInput, $orderBy: [TeamOrderByInput!]) {
  teams(where: $where, orderBy: $orderBy) {
    ...TeamTeacherFields
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
// @ts-ignore
export function useTeamsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeamsQuery, TeamsQueryVariables>): Apollo.UseSuspenseQueryResult<TeamsQuery, TeamsQueryVariables>;
export function useTeamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamsQuery, TeamsQueryVariables>): Apollo.UseSuspenseQueryResult<TeamsQuery | undefined, TeamsQueryVariables>;
export function useTeamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, options);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsSuspenseQueryHookResult = ReturnType<typeof useTeamsSuspenseQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const TeamAnonDocument = gql`
    query teamAnon($where: TeamWhereUniqueInput!) {
  team(where: $where) {
    ...TeamAnonFields
  }
}
    ${TeamAnonFieldsFragmentDoc}`;
export function useTeamAnonQuery(baseOptions: Apollo.QueryHookOptions<TeamAnonQuery, TeamAnonQueryVariables> & ({ variables: TeamAnonQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamAnonQuery, TeamAnonQueryVariables>(TeamAnonDocument, options);
      }
export function useTeamAnonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamAnonQuery, TeamAnonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamAnonQuery, TeamAnonQueryVariables>(TeamAnonDocument, options);
        }
// @ts-ignore
export function useTeamAnonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeamAnonQuery, TeamAnonQueryVariables>): Apollo.UseSuspenseQueryResult<TeamAnonQuery, TeamAnonQueryVariables>;
export function useTeamAnonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamAnonQuery, TeamAnonQueryVariables>): Apollo.UseSuspenseQueryResult<TeamAnonQuery | undefined, TeamAnonQueryVariables>;
export function useTeamAnonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamAnonQuery, TeamAnonQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamAnonQuery, TeamAnonQueryVariables>(TeamAnonDocument, options);
        }
export type TeamAnonQueryHookResult = ReturnType<typeof useTeamAnonQuery>;
export type TeamAnonLazyQueryHookResult = ReturnType<typeof useTeamAnonLazyQuery>;
export type TeamAnonSuspenseQueryHookResult = ReturnType<typeof useTeamAnonSuspenseQuery>;
export type TeamAnonQueryResult = Apollo.QueryResult<TeamAnonQuery, TeamAnonQueryVariables>;
export const TeamUserDocument = gql`
    query teamUser($where: TeamWhereUniqueInput!) {
  team(where: $where) {
    ...TeamUserFields
  }
}
    ${TeamUserFieldsFragmentDoc}`;
export function useTeamUserQuery(baseOptions: Apollo.QueryHookOptions<TeamUserQuery, TeamUserQueryVariables> & ({ variables: TeamUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamUserQuery, TeamUserQueryVariables>(TeamUserDocument, options);
      }
export function useTeamUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamUserQuery, TeamUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamUserQuery, TeamUserQueryVariables>(TeamUserDocument, options);
        }
// @ts-ignore
export function useTeamUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeamUserQuery, TeamUserQueryVariables>): Apollo.UseSuspenseQueryResult<TeamUserQuery, TeamUserQueryVariables>;
export function useTeamUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamUserQuery, TeamUserQueryVariables>): Apollo.UseSuspenseQueryResult<TeamUserQuery | undefined, TeamUserQueryVariables>;
export function useTeamUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamUserQuery, TeamUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamUserQuery, TeamUserQueryVariables>(TeamUserDocument, options);
        }
export type TeamUserQueryHookResult = ReturnType<typeof useTeamUserQuery>;
export type TeamUserLazyQueryHookResult = ReturnType<typeof useTeamUserLazyQuery>;
export type TeamUserSuspenseQueryHookResult = ReturnType<typeof useTeamUserSuspenseQuery>;
export type TeamUserQueryResult = Apollo.QueryResult<TeamUserQuery, TeamUserQueryVariables>;
export const TeamTeacherDocument = gql`
    query teamTeacher($where: TeamWhereUniqueInput!) {
  team(where: $where) {
    ...TeamTeacherFields
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;
export function useTeamTeacherQuery(baseOptions: Apollo.QueryHookOptions<TeamTeacherQuery, TeamTeacherQueryVariables> & ({ variables: TeamTeacherQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamTeacherQuery, TeamTeacherQueryVariables>(TeamTeacherDocument, options);
      }
export function useTeamTeacherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamTeacherQuery, TeamTeacherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamTeacherQuery, TeamTeacherQueryVariables>(TeamTeacherDocument, options);
        }
// @ts-ignore
export function useTeamTeacherSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeamTeacherQuery, TeamTeacherQueryVariables>): Apollo.UseSuspenseQueryResult<TeamTeacherQuery, TeamTeacherQueryVariables>;
export function useTeamTeacherSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamTeacherQuery, TeamTeacherQueryVariables>): Apollo.UseSuspenseQueryResult<TeamTeacherQuery | undefined, TeamTeacherQueryVariables>;
export function useTeamTeacherSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamTeacherQuery, TeamTeacherQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamTeacherQuery, TeamTeacherQueryVariables>(TeamTeacherDocument, options);
        }
export type TeamTeacherQueryHookResult = ReturnType<typeof useTeamTeacherQuery>;
export type TeamTeacherLazyQueryHookResult = ReturnType<typeof useTeamTeacherLazyQuery>;
export type TeamTeacherSuspenseQueryHookResult = ReturnType<typeof useTeamTeacherSuspenseQuery>;
export type TeamTeacherQueryResult = Apollo.QueryResult<TeamTeacherQuery, TeamTeacherQueryVariables>;
export const TeamByInviteDocument = gql`
    query teamByInvite($invite: String!) {
  team(where: {invite: $invite}) {
    ...TeamAnonFields
  }
}
    ${TeamAnonFieldsFragmentDoc}`;
export function useTeamByInviteQuery(baseOptions: Apollo.QueryHookOptions<TeamByInviteQuery, TeamByInviteQueryVariables> & ({ variables: TeamByInviteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamByInviteQuery, TeamByInviteQueryVariables>(TeamByInviteDocument, options);
      }
export function useTeamByInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamByInviteQuery, TeamByInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamByInviteQuery, TeamByInviteQueryVariables>(TeamByInviteDocument, options);
        }
// @ts-ignore
export function useTeamByInviteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeamByInviteQuery, TeamByInviteQueryVariables>): Apollo.UseSuspenseQueryResult<TeamByInviteQuery, TeamByInviteQueryVariables>;
export function useTeamByInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamByInviteQuery, TeamByInviteQueryVariables>): Apollo.UseSuspenseQueryResult<TeamByInviteQuery | undefined, TeamByInviteQueryVariables>;
export function useTeamByInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamByInviteQuery, TeamByInviteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamByInviteQuery, TeamByInviteQueryVariables>(TeamByInviteDocument, options);
        }
export type TeamByInviteQueryHookResult = ReturnType<typeof useTeamByInviteQuery>;
export type TeamByInviteLazyQueryHookResult = ReturnType<typeof useTeamByInviteLazyQuery>;
export type TeamByInviteSuspenseQueryHookResult = ReturnType<typeof useTeamByInviteSuspenseQuery>;
export type TeamByInviteQueryResult = Apollo.QueryResult<TeamByInviteQuery, TeamByInviteQueryVariables>;
export const TeamByCodeDocument = gql`
    query teamByCode($code: String!) {
  team(where: {code: $code}) {
    ...TeamAnonFields
  }
}
    ${TeamAnonFieldsFragmentDoc}`;
export function useTeamByCodeQuery(baseOptions: Apollo.QueryHookOptions<TeamByCodeQuery, TeamByCodeQueryVariables> & ({ variables: TeamByCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamByCodeQuery, TeamByCodeQueryVariables>(TeamByCodeDocument, options);
      }
export function useTeamByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamByCodeQuery, TeamByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamByCodeQuery, TeamByCodeQueryVariables>(TeamByCodeDocument, options);
        }
// @ts-ignore
export function useTeamByCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeamByCodeQuery, TeamByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<TeamByCodeQuery, TeamByCodeQueryVariables>;
export function useTeamByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamByCodeQuery, TeamByCodeQueryVariables>): Apollo.UseSuspenseQueryResult<TeamByCodeQuery | undefined, TeamByCodeQueryVariables>;
export function useTeamByCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamByCodeQuery, TeamByCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamByCodeQuery, TeamByCodeQueryVariables>(TeamByCodeDocument, options);
        }
export type TeamByCodeQueryHookResult = ReturnType<typeof useTeamByCodeQuery>;
export type TeamByCodeLazyQueryHookResult = ReturnType<typeof useTeamByCodeLazyQuery>;
export type TeamByCodeSuspenseQueryHookResult = ReturnType<typeof useTeamByCodeSuspenseQuery>;
export type TeamByCodeQueryResult = Apollo.QueryResult<TeamByCodeQuery, TeamByCodeQueryVariables>;
export const DeleteOneTeamDocument = gql`
    mutation deleteOneTeam($where: TeamWhereUniqueInput!) {
  deleteOneTeam(where: $where) {
    id
  }
}
    `;
export type DeleteOneTeamMutationFn = Apollo.MutationFunction<DeleteOneTeamMutation, DeleteOneTeamMutationVariables>;
export function useDeleteOneTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneTeamMutation, DeleteOneTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOneTeamMutation, DeleteOneTeamMutationVariables>(DeleteOneTeamDocument, options);
      }
export type DeleteOneTeamMutationHookResult = ReturnType<typeof useDeleteOneTeamMutation>;
export type DeleteOneTeamMutationResult = Apollo.MutationResult<DeleteOneTeamMutation>;
export type DeleteOneTeamMutationOptions = Apollo.BaseMutationOptions<DeleteOneTeamMutation, DeleteOneTeamMutationVariables>;
export const CreateOneTeamDocument = gql`
    mutation createOneTeam($name: String!, $school: String!, $teacher: String!) {
  createOneTeam(
    data: {name: $name, school: {connect: {id: $school}}, teacher: {connect: {id: $teacher}}}
  ) {
    ...TeamTeacherFields
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;
export type CreateOneTeamMutationFn = Apollo.MutationFunction<CreateOneTeamMutation, CreateOneTeamMutationVariables>;
export function useCreateOneTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneTeamMutation, CreateOneTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOneTeamMutation, CreateOneTeamMutationVariables>(CreateOneTeamDocument, options);
      }
export type CreateOneTeamMutationHookResult = ReturnType<typeof useCreateOneTeamMutation>;
export type CreateOneTeamMutationResult = Apollo.MutationResult<CreateOneTeamMutation>;
export type CreateOneTeamMutationOptions = Apollo.BaseMutationOptions<CreateOneTeamMutation, CreateOneTeamMutationVariables>;
export const AttachmentsDocument = gql`
    query attachments($where: AttachmentWhereInput) {
  attachments(where: $where) {
    ...AttachmentFields
  }
}
    ${AttachmentFieldsFragmentDoc}`;
export function useAttachmentsQuery(baseOptions?: Apollo.QueryHookOptions<AttachmentsQuery, AttachmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttachmentsQuery, AttachmentsQueryVariables>(AttachmentsDocument, options);
      }
export function useAttachmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttachmentsQuery, AttachmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttachmentsQuery, AttachmentsQueryVariables>(AttachmentsDocument, options);
        }
// @ts-ignore
export function useAttachmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AttachmentsQuery, AttachmentsQueryVariables>): Apollo.UseSuspenseQueryResult<AttachmentsQuery, AttachmentsQueryVariables>;
export function useAttachmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AttachmentsQuery, AttachmentsQueryVariables>): Apollo.UseSuspenseQueryResult<AttachmentsQuery | undefined, AttachmentsQueryVariables>;
export function useAttachmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AttachmentsQuery, AttachmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttachmentsQuery, AttachmentsQueryVariables>(AttachmentsDocument, options);
        }
export type AttachmentsQueryHookResult = ReturnType<typeof useAttachmentsQuery>;
export type AttachmentsLazyQueryHookResult = ReturnType<typeof useAttachmentsLazyQuery>;
export type AttachmentsSuspenseQueryHookResult = ReturnType<typeof useAttachmentsSuspenseQuery>;
export type AttachmentsQueryResult = Apollo.QueryResult<AttachmentsQuery, AttachmentsQueryVariables>;
export const UsersDocument = gql`
    query users($where: UserWhereInput) {
  users(where: $where) {
    id
    shortname
    team {
      id
      name
      school {
        id
        name
      }
    }
  }
}
    `;
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
// @ts-ignore
export function useUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>): Apollo.UseSuspenseQueryResult<UsersQuery, UsersQueryVariables>;
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>): Apollo.UseSuspenseQueryResult<UsersQuery | undefined, UsersQueryVariables>;
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    ...LoginFields
  }
}
    ${LoginFieldsFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($where: UserWhereUniqueInput!) {
  deleteUser(where: $where) {
    id
    shortname
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const WorksDocument = gql`
    query works($where: WorkWhereInput) {
  works(where: $where) {
    ...WorkFields
  }
}
    ${WorkFieldsFragmentDoc}`;
export function useWorksQuery(baseOptions?: Apollo.QueryHookOptions<WorksQuery, WorksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorksQuery, WorksQueryVariables>(WorksDocument, options);
      }
export function useWorksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorksQuery, WorksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorksQuery, WorksQueryVariables>(WorksDocument, options);
        }
// @ts-ignore
export function useWorksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WorksQuery, WorksQueryVariables>): Apollo.UseSuspenseQueryResult<WorksQuery, WorksQueryVariables>;
export function useWorksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WorksQuery, WorksQueryVariables>): Apollo.UseSuspenseQueryResult<WorksQuery | undefined, WorksQueryVariables>;
export function useWorksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WorksQuery, WorksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WorksQuery, WorksQueryVariables>(WorksDocument, options);
        }
export type WorksQueryHookResult = ReturnType<typeof useWorksQuery>;
export type WorksLazyQueryHookResult = ReturnType<typeof useWorksLazyQuery>;
export type WorksSuspenseQueryHookResult = ReturnType<typeof useWorksSuspenseQuery>;
export type WorksQueryResult = Apollo.QueryResult<WorksQuery, WorksQueryVariables>;
export const DeleteWorkDocument = gql`
    mutation deleteWork($where: WorkWhereUniqueInput!) {
  deleteWork(where: $where) {
    id
  }
}
    `;
export type DeleteWorkMutationFn = Apollo.MutationFunction<DeleteWorkMutation, DeleteWorkMutationVariables>;
export function useDeleteWorkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkMutation, DeleteWorkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkMutation, DeleteWorkMutationVariables>(DeleteWorkDocument, options);
      }
export type DeleteWorkMutationHookResult = ReturnType<typeof useDeleteWorkMutation>;
export type DeleteWorkMutationResult = Apollo.MutationResult<DeleteWorkMutation>;
export type DeleteWorkMutationOptions = Apollo.BaseMutationOptions<DeleteWorkMutation, DeleteWorkMutationVariables>;
export const PostWorkDocument = gql`
    mutation postWork($data: WorkCreateInput!) {
  postWork(data: $data) {
    ...WorkFields
  }
}
    ${WorkFieldsFragmentDoc}`;
export type PostWorkMutationFn = Apollo.MutationFunction<PostWorkMutation, PostWorkMutationVariables>;
export function usePostWorkMutation(baseOptions?: Apollo.MutationHookOptions<PostWorkMutation, PostWorkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostWorkMutation, PostWorkMutationVariables>(PostWorkDocument, options);
      }
export type PostWorkMutationHookResult = ReturnType<typeof usePostWorkMutation>;
export type PostWorkMutationResult = Apollo.MutationResult<PostWorkMutation>;
export type PostWorkMutationOptions = Apollo.BaseMutationOptions<PostWorkMutation, PostWorkMutationVariables>;
export const StatsDocument = gql`
    query stats($from: Float, $to: Float) {
  stats(from: $from, to: $to) {
    stats
  }
}
    `;
export function useStatsQuery(baseOptions?: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
      }
export function useStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
// @ts-ignore
export function useStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StatsQuery, StatsQueryVariables>): Apollo.UseSuspenseQueryResult<StatsQuery, StatsQueryVariables>;
export function useStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StatsQuery, StatsQueryVariables>): Apollo.UseSuspenseQueryResult<StatsQuery | undefined, StatsQueryVariables>;
export function useStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsSuspenseQueryHookResult = ReturnType<typeof useStatsSuspenseQuery>;
export type StatsQueryResult = Apollo.QueryResult<StatsQuery, StatsQueryVariables>;
export const TeachersDocument = gql`
    query teachers($where: UserWhereInput) {
  users(where: $where, orderBy: {createdAt: desc}) {
    id
    name
    lastname
    shortname
    email
    emailVerified
    createdAt
    school {
      id
      name
      city
      zip
    }
    teaches {
      name
      id
    }
  }
}
    `;
export function useTeachersQuery(baseOptions?: Apollo.QueryHookOptions<TeachersQuery, TeachersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeachersQuery, TeachersQueryVariables>(TeachersDocument, options);
      }
export function useTeachersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeachersQuery, TeachersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeachersQuery, TeachersQueryVariables>(TeachersDocument, options);
        }
// @ts-ignore
export function useTeachersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeachersQuery, TeachersQueryVariables>): Apollo.UseSuspenseQueryResult<TeachersQuery, TeachersQueryVariables>;
export function useTeachersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeachersQuery, TeachersQueryVariables>): Apollo.UseSuspenseQueryResult<TeachersQuery | undefined, TeachersQueryVariables>;
export function useTeachersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeachersQuery, TeachersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeachersQuery, TeachersQueryVariables>(TeachersDocument, options);
        }
export type TeachersQueryHookResult = ReturnType<typeof useTeachersQuery>;
export type TeachersLazyQueryHookResult = ReturnType<typeof useTeachersLazyQuery>;
export type TeachersSuspenseQueryHookResult = ReturnType<typeof useTeachersSuspenseQuery>;
export type TeachersQueryResult = Apollo.QueryResult<TeachersQuery, TeachersQueryVariables>;
export const AdminUsersDocument = gql`
    query adminUsers($where: UserWhereInput, $orderBy: [UserOrderByInput!], $first: Int) {
  users(where: $where, orderBy: $orderBy, first: $first) {
    id
    shortname
    name
    gender
    year
    lastname
    createdAt
    email
    emailVerified
    role
    school {
      id
      name
      zip
      city
    }
    teaches {
      id
      name
    }
    team {
      id
      name
    }
  }
}
    `;
export function useAdminUsersQuery(baseOptions?: Apollo.QueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
      }
export function useAdminUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
// @ts-ignore
export function useAdminUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>): Apollo.UseSuspenseQueryResult<AdminUsersQuery, AdminUsersQueryVariables>;
export function useAdminUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>): Apollo.UseSuspenseQueryResult<AdminUsersQuery | undefined, AdminUsersQueryVariables>;
export function useAdminUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
export type AdminUsersQueryHookResult = ReturnType<typeof useAdminUsersQuery>;
export type AdminUsersLazyQueryHookResult = ReturnType<typeof useAdminUsersLazyQuery>;
export type AdminUsersSuspenseQueryHookResult = ReturnType<typeof useAdminUsersSuspenseQuery>;
export type AdminUsersQueryResult = Apollo.QueryResult<AdminUsersQuery, AdminUsersQueryVariables>;
export const CreateInvitedUserDocument = gql`
    mutation createInvitedUser($invite: String!, $name: String, $lastname: String, $email: String!, $password: String) {
  createInvitedUser(
    invite: $invite
    name: $name
    lastname: $lastname
    email: $email
    password: $password
  ) {
    ...LoginFields
  }
}
    ${LoginFieldsFragmentDoc}`;
export type CreateInvitedUserMutationFn = Apollo.MutationFunction<CreateInvitedUserMutation, CreateInvitedUserMutationVariables>;
export function useCreateInvitedUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvitedUserMutation, CreateInvitedUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvitedUserMutation, CreateInvitedUserMutationVariables>(CreateInvitedUserDocument, options);
      }
export type CreateInvitedUserMutationHookResult = ReturnType<typeof useCreateInvitedUserMutation>;
export type CreateInvitedUserMutationResult = Apollo.MutationResult<CreateInvitedUserMutation>;
export type CreateInvitedUserMutationOptions = Apollo.BaseMutationOptions<CreateInvitedUserMutation, CreateInvitedUserMutationVariables>;
export const AcceptInviteDocument = gql`
    mutation acceptInvite($invite: String!, $force: Boolean) {
  acceptInvite(invite: $invite, force: $force) {
    id
    name
    school {
      id
      name
      city
    }
  }
}
    `;
export type AcceptInviteMutationFn = Apollo.MutationFunction<AcceptInviteMutation, AcceptInviteMutationVariables>;
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, options);
      }
export type AcceptInviteMutationHookResult = ReturnType<typeof useAcceptInviteMutation>;
export type AcceptInviteMutationResult = Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const InviteStudentsDocument = gql`
    mutation inviteStudents($team: String!, $emails: [String!]!) {
  inviteStudents(team: $team, emails: $emails) {
    created
    failed
    duplicated
    team {
      ...TeamTeacherFields
    }
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;
export type InviteStudentsMutationFn = Apollo.MutationFunction<InviteStudentsMutation, InviteStudentsMutationVariables>;
export function useInviteStudentsMutation(baseOptions?: Apollo.MutationHookOptions<InviteStudentsMutation, InviteStudentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteStudentsMutation, InviteStudentsMutationVariables>(InviteStudentsDocument, options);
      }
export type InviteStudentsMutationHookResult = ReturnType<typeof useInviteStudentsMutation>;
export type InviteStudentsMutationResult = Apollo.MutationResult<InviteStudentsMutation>;
export type InviteStudentsMutationOptions = Apollo.BaseMutationOptions<InviteStudentsMutation, InviteStudentsMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation deleteAccount {
  deleteAccount {
    success
    error
    message
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      ...LoginFields
    }
  }
}
    ${LoginFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const EmailVerificationDocument = gql`
    mutation emailVerification($email: String!, $purpose: String!) {
  emailVerification(email: $email, purpose: $purpose) {
    token
    user {
      ...LoginFields
    }
  }
}
    ${LoginFieldsFragmentDoc}`;
export type EmailVerificationMutationFn = Apollo.MutationFunction<EmailVerificationMutation, EmailVerificationMutationVariables>;
export function useEmailVerificationMutation(baseOptions?: Apollo.MutationHookOptions<EmailVerificationMutation, EmailVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmailVerificationMutation, EmailVerificationMutationVariables>(EmailVerificationDocument, options);
      }
export type EmailVerificationMutationHookResult = ReturnType<typeof useEmailVerificationMutation>;
export type EmailVerificationMutationResult = Apollo.MutationResult<EmailVerificationMutation>;
export type EmailVerificationMutationOptions = Apollo.BaseMutationOptions<EmailVerificationMutation, EmailVerificationMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($password: String!) {
  changePassword(password: $password) {
    token
    user {
      ...LoginFields
    }
  }
}
    ${LoginFieldsFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const MagicDocument = gql`
    mutation magic($email: String!, $redirect: String) {
  magic(email: $email, redirect: $redirect) {
    success
    error
    message
  }
}
    `;
export type MagicMutationFn = Apollo.MutationFunction<MagicMutation, MagicMutationVariables>;
export function useMagicMutation(baseOptions?: Apollo.MutationHookOptions<MagicMutation, MagicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MagicMutation, MagicMutationVariables>(MagicDocument, options);
      }
export type MagicMutationHookResult = ReturnType<typeof useMagicMutation>;
export type MagicMutationResult = Apollo.MutationResult<MagicMutation>;
export type MagicMutationOptions = Apollo.BaseMutationOptions<MagicMutation, MagicMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($data: UserCreateInput!) {
  createUser(data: $data) {
    id
    name
    email
    shortname
    lastname
    role
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CheckVerificationDocument = gql`
    mutation checkVerification($token: String!) {
  checkVerification(token: $token) {
    token
  }
}
    `;
export type CheckVerificationMutationFn = Apollo.MutationFunction<CheckVerificationMutation, CheckVerificationMutationVariables>;
export function useCheckVerificationMutation(baseOptions?: Apollo.MutationHookOptions<CheckVerificationMutation, CheckVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckVerificationMutation, CheckVerificationMutationVariables>(CheckVerificationDocument, options);
      }
export type CheckVerificationMutationHookResult = ReturnType<typeof useCheckVerificationMutation>;
export type CheckVerificationMutationResult = Apollo.MutationResult<CheckVerificationMutation>;
export type CheckVerificationMutationOptions = Apollo.BaseMutationOptions<CheckVerificationMutation, CheckVerificationMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    