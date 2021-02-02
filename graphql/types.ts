import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type Activity = {
  __typename?: 'Activity';
  ballotId?: Maybe<Scalars['String']>;
  card?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  school: School;
  summary?: Maybe<Scalars['String']>;
  team: Team;
  time: Scalars['DateTime'];
  type: ActivityType;
  user: User;
  visibility: Visibility;
  workId?: Maybe<Scalars['String']>;
};

export type ActivityCreateInput = {
  ballot?: Maybe<BallotCreateOneWithoutActivityInput>;
  card?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateOneWithoutActivityInput>;
  school: SchoolCreateOneWithoutActivityInput;
  summary?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutActivityInput;
  time?: Maybe<Scalars['DateTime']>;
  type: ActivityType;
  user: UserCreateOneWithoutActivityInput;
  visibility: Visibility;
  work?: Maybe<WorkCreateOneWithoutActivitiesInput>;
};

export type ActivityCreateManyWithoutBallotInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<ActivityCreateWithoutBallotInput>>;
};

export type ActivityCreateManyWithoutDiscussionInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutdiscussionInput>>;
  create?: Maybe<Array<ActivityCreateWithoutDiscussionInput>>;
};

export type ActivityCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<ActivityCreateWithoutSchoolInput>>;
};

export type ActivityCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<ActivityCreateWithoutTeamInput>>;
};

export type ActivityCreateManyWithoutUserInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<ActivityCreateWithoutUserInput>>;
};

export type ActivityCreateManyWithoutWorkInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutworkInput>>;
  create?: Maybe<Array<ActivityCreateWithoutWorkInput>>;
};

export type ActivityCreateOrConnectWithoutballotInput = {
  create: ActivityCreateWithoutBallotInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityCreateOrConnectWithoutdiscussionInput = {
  create: ActivityCreateWithoutDiscussionInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityCreateOrConnectWithoutschoolInput = {
  create: ActivityCreateWithoutSchoolInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityCreateOrConnectWithoutteamInput = {
  create: ActivityCreateWithoutTeamInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityCreateOrConnectWithoutuserInput = {
  create: ActivityCreateWithoutUserInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityCreateOrConnectWithoutworkInput = {
  create: ActivityCreateWithoutWorkInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityCreateWithoutBallotInput = {
  card?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateOneWithoutActivityInput>;
  school: SchoolCreateOneWithoutActivityInput;
  summary?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutActivityInput;
  time?: Maybe<Scalars['DateTime']>;
  type: ActivityType;
  user: UserCreateOneWithoutActivityInput;
  visibility: Visibility;
  work?: Maybe<WorkCreateOneWithoutActivitiesInput>;
};

export type ActivityCreateWithoutDiscussionInput = {
  ballot?: Maybe<BallotCreateOneWithoutActivityInput>;
  card?: Maybe<Scalars['String']>;
  school: SchoolCreateOneWithoutActivityInput;
  summary?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutActivityInput;
  time?: Maybe<Scalars['DateTime']>;
  type: ActivityType;
  user: UserCreateOneWithoutActivityInput;
  visibility: Visibility;
  work?: Maybe<WorkCreateOneWithoutActivitiesInput>;
};

export type ActivityCreateWithoutSchoolInput = {
  ballot?: Maybe<BallotCreateOneWithoutActivityInput>;
  card?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateOneWithoutActivityInput>;
  summary?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutActivityInput;
  time?: Maybe<Scalars['DateTime']>;
  type: ActivityType;
  user: UserCreateOneWithoutActivityInput;
  visibility: Visibility;
  work?: Maybe<WorkCreateOneWithoutActivitiesInput>;
};

export type ActivityCreateWithoutTeamInput = {
  ballot?: Maybe<BallotCreateOneWithoutActivityInput>;
  card?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateOneWithoutActivityInput>;
  school: SchoolCreateOneWithoutActivityInput;
  summary?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['DateTime']>;
  type: ActivityType;
  user: UserCreateOneWithoutActivityInput;
  visibility: Visibility;
  work?: Maybe<WorkCreateOneWithoutActivitiesInput>;
};

export type ActivityCreateWithoutUserInput = {
  ballot?: Maybe<BallotCreateOneWithoutActivityInput>;
  card?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateOneWithoutActivityInput>;
  school: SchoolCreateOneWithoutActivityInput;
  summary?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutActivityInput;
  time?: Maybe<Scalars['DateTime']>;
  type: ActivityType;
  visibility: Visibility;
  work?: Maybe<WorkCreateOneWithoutActivitiesInput>;
};

export type ActivityCreateWithoutWorkInput = {
  ballot?: Maybe<BallotCreateOneWithoutActivityInput>;
  card?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateOneWithoutActivityInput>;
  school: SchoolCreateOneWithoutActivityInput;
  summary?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutActivityInput;
  time?: Maybe<Scalars['DateTime']>;
  type: ActivityType;
  user: UserCreateOneWithoutActivityInput;
  visibility: Visibility;
};

export type ActivityListRelationFilter = {
  every?: Maybe<ActivityWhereInput>;
  none?: Maybe<ActivityWhereInput>;
  some?: Maybe<ActivityWhereInput>;
};

export type ActivityOrderByInput = {
  ballotId?: Maybe<SortOrder>;
  card?: Maybe<SortOrder>;
  discussionId?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  schoolId?: Maybe<SortOrder>;
  summary?: Maybe<SortOrder>;
  teamId?: Maybe<SortOrder>;
  time?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  visibility?: Maybe<SortOrder>;
  workId?: Maybe<SortOrder>;
};

export type ActivityScalarWhereInput = {
  AND?: Maybe<Array<ActivityScalarWhereInput>>;
  ballotId?: Maybe<StringNullableFilter>;
  card?: Maybe<StringNullableFilter>;
  discussionId?: Maybe<StringNullableFilter>;
  id?: Maybe<IntFilter>;
  NOT?: Maybe<Array<ActivityScalarWhereInput>>;
  OR?: Maybe<Array<ActivityScalarWhereInput>>;
  schoolId?: Maybe<StringFilter>;
  summary?: Maybe<StringNullableFilter>;
  teamId?: Maybe<StringFilter>;
  time?: Maybe<DateTimeFilter>;
  type?: Maybe<EnumActivityTypeFilter>;
  userId?: Maybe<StringFilter>;
  visibility?: Maybe<EnumVisibilityFilter>;
  workId?: Maybe<StringNullableFilter>;
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

export type ActivityUpdateManyMutationInput = {
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  summary?: Maybe<NullableStringFieldUpdateOperationsInput>;
  time?: Maybe<DateTimeFieldUpdateOperationsInput>;
  type?: Maybe<EnumActivityTypeFieldUpdateOperationsInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type ActivityUpdateManyWithoutBallotInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<ActivityCreateWithoutBallotInput>>;
  delete?: Maybe<Array<ActivityWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ActivityScalarWhereInput>>;
  disconnect?: Maybe<Array<ActivityWhereUniqueInput>>;
  set?: Maybe<Array<ActivityWhereUniqueInput>>;
  update?: Maybe<Array<ActivityUpdateWithWhereUniqueWithoutBallotInput>>;
  updateMany?: Maybe<Array<ActivityUpdateManyWithWhereWithoutBallotInput>>;
  upsert?: Maybe<Array<ActivityUpsertWithWhereUniqueWithoutBallotInput>>;
};

export type ActivityUpdateManyWithoutDiscussionInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutdiscussionInput>>;
  create?: Maybe<Array<ActivityCreateWithoutDiscussionInput>>;
  delete?: Maybe<Array<ActivityWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ActivityScalarWhereInput>>;
  disconnect?: Maybe<Array<ActivityWhereUniqueInput>>;
  set?: Maybe<Array<ActivityWhereUniqueInput>>;
  update?: Maybe<Array<ActivityUpdateWithWhereUniqueWithoutDiscussionInput>>;
  updateMany?: Maybe<Array<ActivityUpdateManyWithWhereWithoutDiscussionInput>>;
  upsert?: Maybe<Array<ActivityUpsertWithWhereUniqueWithoutDiscussionInput>>;
};

export type ActivityUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<ActivityCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<ActivityWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ActivityScalarWhereInput>>;
  disconnect?: Maybe<Array<ActivityWhereUniqueInput>>;
  set?: Maybe<Array<ActivityWhereUniqueInput>>;
  update?: Maybe<Array<ActivityUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<ActivityUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<ActivityUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type ActivityUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<ActivityCreateWithoutTeamInput>>;
  delete?: Maybe<Array<ActivityWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ActivityScalarWhereInput>>;
  disconnect?: Maybe<Array<ActivityWhereUniqueInput>>;
  set?: Maybe<Array<ActivityWhereUniqueInput>>;
  update?: Maybe<Array<ActivityUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<ActivityUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<ActivityUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type ActivityUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<ActivityCreateWithoutUserInput>>;
  delete?: Maybe<Array<ActivityWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ActivityScalarWhereInput>>;
  disconnect?: Maybe<Array<ActivityWhereUniqueInput>>;
  set?: Maybe<Array<ActivityWhereUniqueInput>>;
  update?: Maybe<Array<ActivityUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<ActivityUpdateManyWithWhereWithoutUserInput>>;
  upsert?: Maybe<Array<ActivityUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ActivityUpdateManyWithoutWorkInput = {
  connect?: Maybe<Array<ActivityWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ActivityCreateOrConnectWithoutworkInput>>;
  create?: Maybe<Array<ActivityCreateWithoutWorkInput>>;
  delete?: Maybe<Array<ActivityWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ActivityScalarWhereInput>>;
  disconnect?: Maybe<Array<ActivityWhereUniqueInput>>;
  set?: Maybe<Array<ActivityWhereUniqueInput>>;
  update?: Maybe<Array<ActivityUpdateWithWhereUniqueWithoutWorkInput>>;
  updateMany?: Maybe<Array<ActivityUpdateManyWithWhereWithoutWorkInput>>;
  upsert?: Maybe<Array<ActivityUpsertWithWhereUniqueWithoutWorkInput>>;
};

export type ActivityUpdateManyWithWhereWithoutBallotInput = {
  data: ActivityUpdateManyMutationInput;
  where: ActivityScalarWhereInput;
};

export type ActivityUpdateManyWithWhereWithoutDiscussionInput = {
  data: ActivityUpdateManyMutationInput;
  where: ActivityScalarWhereInput;
};

export type ActivityUpdateManyWithWhereWithoutSchoolInput = {
  data: ActivityUpdateManyMutationInput;
  where: ActivityScalarWhereInput;
};

export type ActivityUpdateManyWithWhereWithoutTeamInput = {
  data: ActivityUpdateManyMutationInput;
  where: ActivityScalarWhereInput;
};

export type ActivityUpdateManyWithWhereWithoutUserInput = {
  data: ActivityUpdateManyMutationInput;
  where: ActivityScalarWhereInput;
};

export type ActivityUpdateManyWithWhereWithoutWorkInput = {
  data: ActivityUpdateManyMutationInput;
  where: ActivityScalarWhereInput;
};

export type ActivityUpdateWithoutBallotInput = {
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutActivityInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutActivityInput>;
  summary?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutActivityInput>;
  time?: Maybe<DateTimeFieldUpdateOperationsInput>;
  type?: Maybe<EnumActivityTypeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutActivityInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
  work?: Maybe<WorkUpdateOneWithoutActivitiesInput>;
};

export type ActivityUpdateWithoutDiscussionInput = {
  ballot?: Maybe<BallotUpdateOneWithoutActivityInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutActivityInput>;
  summary?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutActivityInput>;
  time?: Maybe<DateTimeFieldUpdateOperationsInput>;
  type?: Maybe<EnumActivityTypeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutActivityInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
  work?: Maybe<WorkUpdateOneWithoutActivitiesInput>;
};

export type ActivityUpdateWithoutSchoolInput = {
  ballot?: Maybe<BallotUpdateOneWithoutActivityInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutActivityInput>;
  summary?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutActivityInput>;
  time?: Maybe<DateTimeFieldUpdateOperationsInput>;
  type?: Maybe<EnumActivityTypeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutActivityInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
  work?: Maybe<WorkUpdateOneWithoutActivitiesInput>;
};

export type ActivityUpdateWithoutTeamInput = {
  ballot?: Maybe<BallotUpdateOneWithoutActivityInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutActivityInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutActivityInput>;
  summary?: Maybe<NullableStringFieldUpdateOperationsInput>;
  time?: Maybe<DateTimeFieldUpdateOperationsInput>;
  type?: Maybe<EnumActivityTypeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutActivityInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
  work?: Maybe<WorkUpdateOneWithoutActivitiesInput>;
};

export type ActivityUpdateWithoutUserInput = {
  ballot?: Maybe<BallotUpdateOneWithoutActivityInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutActivityInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutActivityInput>;
  summary?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutActivityInput>;
  time?: Maybe<DateTimeFieldUpdateOperationsInput>;
  type?: Maybe<EnumActivityTypeFieldUpdateOperationsInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
  work?: Maybe<WorkUpdateOneWithoutActivitiesInput>;
};

export type ActivityUpdateWithoutWorkInput = {
  ballot?: Maybe<BallotUpdateOneWithoutActivityInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutActivityInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutActivityInput>;
  summary?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutActivityInput>;
  time?: Maybe<DateTimeFieldUpdateOperationsInput>;
  type?: Maybe<EnumActivityTypeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutActivityInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type ActivityUpdateWithWhereUniqueWithoutBallotInput = {
  data: ActivityUpdateWithoutBallotInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpdateWithWhereUniqueWithoutDiscussionInput = {
  data: ActivityUpdateWithoutDiscussionInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpdateWithWhereUniqueWithoutSchoolInput = {
  data: ActivityUpdateWithoutSchoolInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpdateWithWhereUniqueWithoutTeamInput = {
  data: ActivityUpdateWithoutTeamInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
  data: ActivityUpdateWithoutUserInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpdateWithWhereUniqueWithoutWorkInput = {
  data: ActivityUpdateWithoutWorkInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpsertWithWhereUniqueWithoutBallotInput = {
  create: ActivityCreateWithoutBallotInput;
  update: ActivityUpdateWithoutBallotInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpsertWithWhereUniqueWithoutDiscussionInput = {
  create: ActivityCreateWithoutDiscussionInput;
  update: ActivityUpdateWithoutDiscussionInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpsertWithWhereUniqueWithoutSchoolInput = {
  create: ActivityCreateWithoutSchoolInput;
  update: ActivityUpdateWithoutSchoolInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpsertWithWhereUniqueWithoutTeamInput = {
  create: ActivityCreateWithoutTeamInput;
  update: ActivityUpdateWithoutTeamInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
  create: ActivityCreateWithoutUserInput;
  update: ActivityUpdateWithoutUserInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityUpsertWithWhereUniqueWithoutWorkInput = {
  create: ActivityCreateWithoutWorkInput;
  update: ActivityUpdateWithoutWorkInput;
  where: ActivityWhereUniqueInput;
};

export type ActivityWhereInput = {
  AND?: Maybe<Array<ActivityWhereInput>>;
  ballot?: Maybe<BallotWhereInput>;
  ballotId?: Maybe<StringNullableFilter>;
  card?: Maybe<StringNullableFilter>;
  discussion?: Maybe<DiscussionWhereInput>;
  discussionId?: Maybe<StringNullableFilter>;
  id?: Maybe<IntFilter>;
  NOT?: Maybe<Array<ActivityWhereInput>>;
  OR?: Maybe<Array<ActivityWhereInput>>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringFilter>;
  summary?: Maybe<StringNullableFilter>;
  team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringFilter>;
  time?: Maybe<DateTimeFilter>;
  type?: Maybe<EnumActivityTypeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
  visibility?: Maybe<EnumVisibilityFilter>;
  work?: Maybe<WorkWhereInput>;
  workId?: Maybe<StringNullableFilter>;
};

export type ActivityWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Attachment = {
  __typename?: 'Attachment';
  createdAt: Scalars['DateTime'];
  file: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type AttachmentCreateManyWithoutBallotInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutBallotInput>>;
};

export type AttachmentCreateManyWithoutDiscussionInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutdiscussionInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutDiscussionInput>>;
};

export type AttachmentCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutSchoolInput>>;
};

export type AttachmentCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutTeamInput>>;
};

export type AttachmentCreateManyWithoutUserInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutUserInput>>;
};

export type AttachmentCreateManyWithoutWorkInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutworkInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutWorkInput>>;
};

export type AttachmentCreateOrConnectWithoutballotInput = {
  create: AttachmentCreateWithoutBallotInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateOrConnectWithoutdiscussionInput = {
  create: AttachmentCreateWithoutDiscussionInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateOrConnectWithoutschoolInput = {
  create: AttachmentCreateWithoutSchoolInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateOrConnectWithoutteamInput = {
  create: AttachmentCreateWithoutTeamInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateOrConnectWithoutuserInput = {
  create: AttachmentCreateWithoutUserInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateOrConnectWithoutworkInput = {
  create: AttachmentCreateWithoutWorkInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateWithoutBallotInput = {
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussion?: Maybe<DiscussionCreateOneWithoutAttachmentsInput>;
  file: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutAttachmentInput>;
  team: TeamCreateOneWithoutAttachmentInput;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutAttachmentsInput;
  work?: Maybe<WorkCreateOneWithoutAttachmentsInput>;
};

export type AttachmentCreateWithoutDiscussionInput = {
  ballot?: Maybe<BallotCreateOneWithoutAttachmentsInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  file: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutAttachmentInput>;
  team: TeamCreateOneWithoutAttachmentInput;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutAttachmentsInput;
  work?: Maybe<WorkCreateOneWithoutAttachmentsInput>;
};

export type AttachmentCreateWithoutSchoolInput = {
  ballot?: Maybe<BallotCreateOneWithoutAttachmentsInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussion?: Maybe<DiscussionCreateOneWithoutAttachmentsInput>;
  file: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  team: TeamCreateOneWithoutAttachmentInput;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutAttachmentsInput;
  work?: Maybe<WorkCreateOneWithoutAttachmentsInput>;
};

export type AttachmentCreateWithoutTeamInput = {
  ballot?: Maybe<BallotCreateOneWithoutAttachmentsInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussion?: Maybe<DiscussionCreateOneWithoutAttachmentsInput>;
  file: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutAttachmentInput>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutAttachmentsInput;
  work?: Maybe<WorkCreateOneWithoutAttachmentsInput>;
};

export type AttachmentCreateWithoutUserInput = {
  ballot?: Maybe<BallotCreateOneWithoutAttachmentsInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussion?: Maybe<DiscussionCreateOneWithoutAttachmentsInput>;
  file: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutAttachmentInput>;
  team: TeamCreateOneWithoutAttachmentInput;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  work?: Maybe<WorkCreateOneWithoutAttachmentsInput>;
};

export type AttachmentCreateWithoutWorkInput = {
  ballot?: Maybe<BallotCreateOneWithoutAttachmentsInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussion?: Maybe<DiscussionCreateOneWithoutAttachmentsInput>;
  file: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutAttachmentInput>;
  team: TeamCreateOneWithoutAttachmentInput;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutAttachmentsInput;
};

export type AttachmentListRelationFilter = {
  every?: Maybe<AttachmentWhereInput>;
  none?: Maybe<AttachmentWhereInput>;
  some?: Maybe<AttachmentWhereInput>;
};

export type AttachmentOrderByInput = {
  ballotId?: Maybe<SortOrder>;
  card?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  discussionId?: Maybe<SortOrder>;
  file?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  schoolId?: Maybe<SortOrder>;
  teamId?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
  workId?: Maybe<SortOrder>;
};

export type AttachmentScalarWhereInput = {
  AND?: Maybe<Array<AttachmentScalarWhereInput>>;
  ballotId?: Maybe<StringNullableFilter>;
  card?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  discussionId?: Maybe<StringNullableFilter>;
  file?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<AttachmentScalarWhereInput>>;
  OR?: Maybe<Array<AttachmentScalarWhereInput>>;
  schoolId?: Maybe<StringNullableFilter>;
  teamId?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  type?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
  workId?: Maybe<StringNullableFilter>;
};

export type AttachmentUpdateManyMutationInput = {
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  file?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type AttachmentUpdateManyWithoutBallotInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutBallotInput>>;
  delete?: Maybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: Maybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  set?: Maybe<Array<AttachmentWhereUniqueInput>>;
  update?: Maybe<Array<AttachmentUpdateWithWhereUniqueWithoutBallotInput>>;
  updateMany?: Maybe<Array<AttachmentUpdateManyWithWhereWithoutBallotInput>>;
  upsert?: Maybe<Array<AttachmentUpsertWithWhereUniqueWithoutBallotInput>>;
};

export type AttachmentUpdateManyWithoutDiscussionInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutdiscussionInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutDiscussionInput>>;
  delete?: Maybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: Maybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  set?: Maybe<Array<AttachmentWhereUniqueInput>>;
  update?: Maybe<Array<AttachmentUpdateWithWhereUniqueWithoutDiscussionInput>>;
  updateMany?: Maybe<Array<AttachmentUpdateManyWithWhereWithoutDiscussionInput>>;
  upsert?: Maybe<Array<AttachmentUpsertWithWhereUniqueWithoutDiscussionInput>>;
};

export type AttachmentUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: Maybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  set?: Maybe<Array<AttachmentWhereUniqueInput>>;
  update?: Maybe<Array<AttachmentUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<AttachmentUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<AttachmentUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type AttachmentUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutTeamInput>>;
  delete?: Maybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: Maybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  set?: Maybe<Array<AttachmentWhereUniqueInput>>;
  update?: Maybe<Array<AttachmentUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<AttachmentUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<AttachmentUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type AttachmentUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutUserInput>>;
  delete?: Maybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: Maybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  set?: Maybe<Array<AttachmentWhereUniqueInput>>;
  update?: Maybe<Array<AttachmentUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<AttachmentUpdateManyWithWhereWithoutUserInput>>;
  upsert?: Maybe<Array<AttachmentUpsertWithWhereUniqueWithoutUserInput>>;
};

export type AttachmentUpdateManyWithoutWorkInput = {
  connect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<AttachmentCreateOrConnectWithoutworkInput>>;
  create?: Maybe<Array<AttachmentCreateWithoutWorkInput>>;
  delete?: Maybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: Maybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: Maybe<Array<AttachmentWhereUniqueInput>>;
  set?: Maybe<Array<AttachmentWhereUniqueInput>>;
  update?: Maybe<Array<AttachmentUpdateWithWhereUniqueWithoutWorkInput>>;
  updateMany?: Maybe<Array<AttachmentUpdateManyWithWhereWithoutWorkInput>>;
  upsert?: Maybe<Array<AttachmentUpsertWithWhereUniqueWithoutWorkInput>>;
};

export type AttachmentUpdateManyWithWhereWithoutBallotInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateManyWithWhereWithoutDiscussionInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateManyWithWhereWithoutSchoolInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateManyWithWhereWithoutTeamInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateManyWithWhereWithoutUserInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateManyWithWhereWithoutWorkInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateWithoutBallotInput = {
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutAttachmentsInput>;
  file?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutAttachmentInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutAttachmentInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutAttachmentsInput>;
  work?: Maybe<WorkUpdateOneWithoutAttachmentsInput>;
};

export type AttachmentUpdateWithoutDiscussionInput = {
  ballot?: Maybe<BallotUpdateOneWithoutAttachmentsInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  file?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutAttachmentInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutAttachmentInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutAttachmentsInput>;
  work?: Maybe<WorkUpdateOneWithoutAttachmentsInput>;
};

export type AttachmentUpdateWithoutSchoolInput = {
  ballot?: Maybe<BallotUpdateOneWithoutAttachmentsInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutAttachmentsInput>;
  file?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutAttachmentInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutAttachmentsInput>;
  work?: Maybe<WorkUpdateOneWithoutAttachmentsInput>;
};

export type AttachmentUpdateWithoutTeamInput = {
  ballot?: Maybe<BallotUpdateOneWithoutAttachmentsInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutAttachmentsInput>;
  file?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutAttachmentInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutAttachmentsInput>;
  work?: Maybe<WorkUpdateOneWithoutAttachmentsInput>;
};

export type AttachmentUpdateWithoutUserInput = {
  ballot?: Maybe<BallotUpdateOneWithoutAttachmentsInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutAttachmentsInput>;
  file?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutAttachmentInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutAttachmentInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  work?: Maybe<WorkUpdateOneWithoutAttachmentsInput>;
};

export type AttachmentUpdateWithoutWorkInput = {
  ballot?: Maybe<BallotUpdateOneWithoutAttachmentsInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutAttachmentsInput>;
  file?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutAttachmentInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutAttachmentInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutAttachmentsInput>;
};

export type AttachmentUpdateWithWhereUniqueWithoutBallotInput = {
  data: AttachmentUpdateWithoutBallotInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpdateWithWhereUniqueWithoutDiscussionInput = {
  data: AttachmentUpdateWithoutDiscussionInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpdateWithWhereUniqueWithoutSchoolInput = {
  data: AttachmentUpdateWithoutSchoolInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpdateWithWhereUniqueWithoutTeamInput = {
  data: AttachmentUpdateWithoutTeamInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpdateWithWhereUniqueWithoutUserInput = {
  data: AttachmentUpdateWithoutUserInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpdateWithWhereUniqueWithoutWorkInput = {
  data: AttachmentUpdateWithoutWorkInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpsertWithWhereUniqueWithoutBallotInput = {
  create: AttachmentCreateWithoutBallotInput;
  update: AttachmentUpdateWithoutBallotInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpsertWithWhereUniqueWithoutDiscussionInput = {
  create: AttachmentCreateWithoutDiscussionInput;
  update: AttachmentUpdateWithoutDiscussionInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpsertWithWhereUniqueWithoutSchoolInput = {
  create: AttachmentCreateWithoutSchoolInput;
  update: AttachmentUpdateWithoutSchoolInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpsertWithWhereUniqueWithoutTeamInput = {
  create: AttachmentCreateWithoutTeamInput;
  update: AttachmentUpdateWithoutTeamInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpsertWithWhereUniqueWithoutUserInput = {
  create: AttachmentCreateWithoutUserInput;
  update: AttachmentUpdateWithoutUserInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpsertWithWhereUniqueWithoutWorkInput = {
  create: AttachmentCreateWithoutWorkInput;
  update: AttachmentUpdateWithoutWorkInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentWhereInput = {
  AND?: Maybe<Array<AttachmentWhereInput>>;
  ballot?: Maybe<BallotWhereInput>;
  ballotId?: Maybe<StringNullableFilter>;
  card?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  discussion?: Maybe<DiscussionWhereInput>;
  discussionId?: Maybe<StringNullableFilter>;
  file?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<AttachmentWhereInput>>;
  OR?: Maybe<Array<AttachmentWhereInput>>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringNullableFilter>;
  team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  type?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
  work?: Maybe<WorkWhereInput>;
  workId?: Maybe<StringNullableFilter>;
};

export type AttachmentWhereUniqueInput = {
  file?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type Ballot = {
  __typename?: 'Ballot';
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  canVote?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  end: Scalars['DateTime'];
  hasVoted?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  schoolId?: Maybe<Scalars['String']>;
  scope: BallotScope;
  start: Scalars['DateTime'];
  teamId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type BallotCreateManyWithoutCreatorInput = {
  connect?: Maybe<Array<BallotWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotCreateOrConnectWithoutcreatorInput>>;
  create?: Maybe<Array<BallotCreateWithoutCreatorInput>>;
};

export type BallotCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<BallotWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<BallotCreateWithoutSchoolInput>>;
};

export type BallotCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<BallotWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<BallotCreateWithoutTeamInput>>;
};

export type BallotCreateOneWithoutActivityInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutactivityInput>;
  create?: Maybe<BallotCreateWithoutActivityInput>;
};

export type BallotCreateOneWithoutAttachmentsInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutattachmentsInput>;
  create?: Maybe<BallotCreateWithoutAttachmentsInput>;
};

export type BallotCreateOneWithoutBallotRunsInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutballotRunsInput>;
  create?: Maybe<BallotCreateWithoutBallotRunsInput>;
};

export type BallotCreateOneWithoutDiscussionInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutdiscussionInput>;
  create?: Maybe<BallotCreateWithoutDiscussionInput>;
};

export type BallotCreateOneWithoutVotedInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutvotedInput>;
  create?: Maybe<BallotCreateWithoutVotedInput>;
};

export type BallotCreateOneWithoutVotesInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutvotesInput>;
  create?: Maybe<BallotCreateWithoutVotesInput>;
};

export type BallotCreateOrConnectWithoutactivityInput = {
  create: BallotCreateWithoutActivityInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateOrConnectWithoutattachmentsInput = {
  create: BallotCreateWithoutAttachmentsInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateOrConnectWithoutballotRunsInput = {
  create: BallotCreateWithoutBallotRunsInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateOrConnectWithoutcreatorInput = {
  create: BallotCreateWithoutCreatorInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateOrConnectWithoutdiscussionInput = {
  create: BallotCreateWithoutDiscussionInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateOrConnectWithoutschoolInput = {
  create: BallotCreateWithoutSchoolInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateOrConnectWithoutteamInput = {
  create: BallotCreateWithoutTeamInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateOrConnectWithoutvotedInput = {
  create: BallotCreateWithoutVotedInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateOrConnectWithoutvotesInput = {
  create: BallotCreateWithoutVotesInput;
  where: BallotWhereUniqueInput;
};

export type BallotCreateWithoutActivityInput = {
  attachments?: Maybe<AttachmentCreateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UserCreateOneWithoutBallotsInput>;
  description: Scalars['String'];
  discussion?: Maybe<DiscussionCreateManyWithoutBallotInput>;
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  school?: Maybe<SchoolCreateOneWithoutBallotsInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  team?: Maybe<TeamCreateOneWithoutBallotsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voted?: Maybe<VotedCreateManyWithoutBallotInput>;
  votes?: Maybe<VoteCreateManyWithoutBallotInput>;
};

export type BallotCreateWithoutAttachmentsInput = {
  activity?: Maybe<ActivityCreateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UserCreateOneWithoutBallotsInput>;
  description: Scalars['String'];
  discussion?: Maybe<DiscussionCreateManyWithoutBallotInput>;
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  school?: Maybe<SchoolCreateOneWithoutBallotsInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  team?: Maybe<TeamCreateOneWithoutBallotsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voted?: Maybe<VotedCreateManyWithoutBallotInput>;
  votes?: Maybe<VoteCreateManyWithoutBallotInput>;
};

export type BallotCreateWithoutBallotRunsInput = {
  activity?: Maybe<ActivityCreateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UserCreateOneWithoutBallotsInput>;
  description: Scalars['String'];
  discussion?: Maybe<DiscussionCreateManyWithoutBallotInput>;
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  school?: Maybe<SchoolCreateOneWithoutBallotsInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  team?: Maybe<TeamCreateOneWithoutBallotsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voted?: Maybe<VotedCreateManyWithoutBallotInput>;
  votes?: Maybe<VoteCreateManyWithoutBallotInput>;
};

export type BallotCreateWithoutCreatorInput = {
  activity?: Maybe<ActivityCreateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  discussion?: Maybe<DiscussionCreateManyWithoutBallotInput>;
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  school?: Maybe<SchoolCreateOneWithoutBallotsInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  team?: Maybe<TeamCreateOneWithoutBallotsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voted?: Maybe<VotedCreateManyWithoutBallotInput>;
  votes?: Maybe<VoteCreateManyWithoutBallotInput>;
};

export type BallotCreateWithoutDiscussionInput = {
  activity?: Maybe<ActivityCreateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UserCreateOneWithoutBallotsInput>;
  description: Scalars['String'];
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  school?: Maybe<SchoolCreateOneWithoutBallotsInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  team?: Maybe<TeamCreateOneWithoutBallotsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voted?: Maybe<VotedCreateManyWithoutBallotInput>;
  votes?: Maybe<VoteCreateManyWithoutBallotInput>;
};

export type BallotCreateWithoutSchoolInput = {
  activity?: Maybe<ActivityCreateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UserCreateOneWithoutBallotsInput>;
  description: Scalars['String'];
  discussion?: Maybe<DiscussionCreateManyWithoutBallotInput>;
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  team?: Maybe<TeamCreateOneWithoutBallotsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voted?: Maybe<VotedCreateManyWithoutBallotInput>;
  votes?: Maybe<VoteCreateManyWithoutBallotInput>;
};

export type BallotCreateWithoutTeamInput = {
  activity?: Maybe<ActivityCreateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UserCreateOneWithoutBallotsInput>;
  description: Scalars['String'];
  discussion?: Maybe<DiscussionCreateManyWithoutBallotInput>;
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  school?: Maybe<SchoolCreateOneWithoutBallotsInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voted?: Maybe<VotedCreateManyWithoutBallotInput>;
  votes?: Maybe<VoteCreateManyWithoutBallotInput>;
};

export type BallotCreateWithoutVotedInput = {
  activity?: Maybe<ActivityCreateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UserCreateOneWithoutBallotsInput>;
  description: Scalars['String'];
  discussion?: Maybe<DiscussionCreateManyWithoutBallotInput>;
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  school?: Maybe<SchoolCreateOneWithoutBallotsInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  team?: Maybe<TeamCreateOneWithoutBallotsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  votes?: Maybe<VoteCreateManyWithoutBallotInput>;
};

export type BallotCreateWithoutVotesInput = {
  activity?: Maybe<ActivityCreateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunCreateManyWithoutBallotInput>;
  body: Scalars['String'];
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UserCreateOneWithoutBallotsInput>;
  description: Scalars['String'];
  discussion?: Maybe<DiscussionCreateManyWithoutBallotInput>;
  end: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  options?: Maybe<OptionCreateManyWithoutBallotInput>;
  school?: Maybe<SchoolCreateOneWithoutBallotsInput>;
  scope?: Maybe<BallotScope>;
  start: Scalars['DateTime'];
  team?: Maybe<TeamCreateOneWithoutBallotsInput>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voted?: Maybe<VotedCreateManyWithoutBallotInput>;
};

export type BallotIdTeamIdCompoundUniqueInput = {
  ballotId: Scalars['String'];
  teamId: Scalars['String'];
};

export type BallotListRelationFilter = {
  every?: Maybe<BallotWhereInput>;
  none?: Maybe<BallotWhereInput>;
  some?: Maybe<BallotWhereInput>;
};

export type BallotOrderByInput = {
  body?: Maybe<SortOrder>;
  canton?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  creatorId?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  end?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  schoolId?: Maybe<SortOrder>;
  scope?: Maybe<SortOrder>;
  start?: Maybe<SortOrder>;
  teamId?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export type BallotResults = {
  __typename?: 'BallotResults';
  abs?: Maybe<Scalars['Int']>;
  no?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  yes?: Maybe<Scalars['Int']>;
};

export type BallotRun = {
  __typename?: 'BallotRun';
  ballot: Ballot;
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  start?: Maybe<Scalars['DateTime']>;
  team: Team;
};

export type BallotRunCreateManyWithoutBallotInput = {
  connect?: Maybe<Array<BallotRunWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotRunCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<BallotRunCreateWithoutBallotInput>>;
};

export type BallotRunCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<BallotRunWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotRunCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<BallotRunCreateWithoutTeamInput>>;
};

export type BallotRunCreateOneWithoutVoteInput = {
  connect?: Maybe<BallotRunWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotRunCreateOrConnectWithoutvoteInput>;
  create?: Maybe<BallotRunCreateWithoutVoteInput>;
};

export type BallotRunCreateOrConnectWithoutballotInput = {
  create: BallotRunCreateWithoutBallotInput;
  where: BallotRunWhereUniqueInput;
};

export type BallotRunCreateOrConnectWithoutteamInput = {
  create: BallotRunCreateWithoutTeamInput;
  where: BallotRunWhereUniqueInput;
};

export type BallotRunCreateOrConnectWithoutvoteInput = {
  create: BallotRunCreateWithoutVoteInput;
  where: BallotRunWhereUniqueInput;
};

export type BallotRunCreateWithoutBallotInput = {
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  team: TeamCreateOneWithoutBallotRunsInput;
  vote?: Maybe<VoteCreateManyWithoutBallotRunInput>;
};

export type BallotRunCreateWithoutTeamInput = {
  ballot: BallotCreateOneWithoutBallotRunsInput;
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  vote?: Maybe<VoteCreateManyWithoutBallotRunInput>;
};

export type BallotRunCreateWithoutVoteInput = {
  ballot: BallotCreateOneWithoutBallotRunsInput;
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  team: TeamCreateOneWithoutBallotRunsInput;
};

export type BallotRunListRelationFilter = {
  every?: Maybe<BallotRunWhereInput>;
  none?: Maybe<BallotRunWhereInput>;
  some?: Maybe<BallotRunWhereInput>;
};

export type BallotRunScalarWhereInput = {
  AND?: Maybe<Array<BallotRunScalarWhereInput>>;
  ballotId?: Maybe<StringFilter>;
  end?: Maybe<DateTimeNullableFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<BallotRunScalarWhereInput>>;
  OR?: Maybe<Array<BallotRunScalarWhereInput>>;
  start?: Maybe<DateTimeNullableFilter>;
  teamId?: Maybe<StringFilter>;
};

export type BallotRunUpdateManyMutationInput = {
  end?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  start?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type BallotRunUpdateManyWithoutBallotInput = {
  connect?: Maybe<Array<BallotRunWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotRunCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<BallotRunCreateWithoutBallotInput>>;
  delete?: Maybe<Array<BallotRunWhereUniqueInput>>;
  deleteMany?: Maybe<Array<BallotRunScalarWhereInput>>;
  disconnect?: Maybe<Array<BallotRunWhereUniqueInput>>;
  set?: Maybe<Array<BallotRunWhereUniqueInput>>;
  update?: Maybe<Array<BallotRunUpdateWithWhereUniqueWithoutBallotInput>>;
  updateMany?: Maybe<Array<BallotRunUpdateManyWithWhereWithoutBallotInput>>;
  upsert?: Maybe<Array<BallotRunUpsertWithWhereUniqueWithoutBallotInput>>;
};

export type BallotRunUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<BallotRunWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotRunCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<BallotRunCreateWithoutTeamInput>>;
  delete?: Maybe<Array<BallotRunWhereUniqueInput>>;
  deleteMany?: Maybe<Array<BallotRunScalarWhereInput>>;
  disconnect?: Maybe<Array<BallotRunWhereUniqueInput>>;
  set?: Maybe<Array<BallotRunWhereUniqueInput>>;
  update?: Maybe<Array<BallotRunUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<BallotRunUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<BallotRunUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type BallotRunUpdateManyWithWhereWithoutBallotInput = {
  data: BallotRunUpdateManyMutationInput;
  where: BallotRunScalarWhereInput;
};

export type BallotRunUpdateManyWithWhereWithoutTeamInput = {
  data: BallotRunUpdateManyMutationInput;
  where: BallotRunScalarWhereInput;
};

export type BallotRunUpdateOneWithoutVoteInput = {
  connect?: Maybe<BallotRunWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotRunCreateOrConnectWithoutvoteInput>;
  create?: Maybe<BallotRunCreateWithoutVoteInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<BallotRunUpdateWithoutVoteInput>;
  upsert?: Maybe<BallotRunUpsertWithoutVoteInput>;
};

export type BallotRunUpdateWithoutBallotInput = {
  end?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  start?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutBallotRunsInput>;
  vote?: Maybe<VoteUpdateManyWithoutBallotRunInput>;
};

export type BallotRunUpdateWithoutTeamInput = {
  ballot?: Maybe<BallotUpdateOneRequiredWithoutBallotRunsInput>;
  end?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  start?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  vote?: Maybe<VoteUpdateManyWithoutBallotRunInput>;
};

export type BallotRunUpdateWithoutVoteInput = {
  ballot?: Maybe<BallotUpdateOneRequiredWithoutBallotRunsInput>;
  end?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  start?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutBallotRunsInput>;
};

export type BallotRunUpdateWithWhereUniqueWithoutBallotInput = {
  data: BallotRunUpdateWithoutBallotInput;
  where: BallotRunWhereUniqueInput;
};

export type BallotRunUpdateWithWhereUniqueWithoutTeamInput = {
  data: BallotRunUpdateWithoutTeamInput;
  where: BallotRunWhereUniqueInput;
};

export type BallotRunUpsertWithoutVoteInput = {
  create: BallotRunCreateWithoutVoteInput;
  update: BallotRunUpdateWithoutVoteInput;
};

export type BallotRunUpsertWithWhereUniqueWithoutBallotInput = {
  create: BallotRunCreateWithoutBallotInput;
  update: BallotRunUpdateWithoutBallotInput;
  where: BallotRunWhereUniqueInput;
};

export type BallotRunUpsertWithWhereUniqueWithoutTeamInput = {
  create: BallotRunCreateWithoutTeamInput;
  update: BallotRunUpdateWithoutTeamInput;
  where: BallotRunWhereUniqueInput;
};

export type BallotRunWhereInput = {
  AND?: Maybe<Array<BallotRunWhereInput>>;
  ballot?: Maybe<BallotWhereInput>;
  ballotId?: Maybe<StringFilter>;
  end?: Maybe<DateTimeNullableFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<BallotRunWhereInput>>;
  OR?: Maybe<Array<BallotRunWhereInput>>;
  start?: Maybe<DateTimeNullableFilter>;
  team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringFilter>;
  vote?: Maybe<VoteListRelationFilter>;
};

export type BallotRunWhereUniqueInput = {
  ballotId_teamId?: Maybe<BallotIdTeamIdCompoundUniqueInput>;
  id?: Maybe<Scalars['String']>;
};

export type BallotScalarWhereInput = {
  AND?: Maybe<Array<BallotScalarWhereInput>>;
  body?: Maybe<StringFilter>;
  canton?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  creatorId?: Maybe<StringNullableFilter>;
  description?: Maybe<StringFilter>;
  end?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<BallotScalarWhereInput>>;
  OR?: Maybe<Array<BallotScalarWhereInput>>;
  schoolId?: Maybe<StringNullableFilter>;
  scope?: Maybe<EnumBallotScopeFilter>;
  start?: Maybe<DateTimeFilter>;
  teamId?: Maybe<StringNullableFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export enum BallotScope {
  Cantonal = 'Cantonal',
  National = 'National',
  Public = 'Public',
  School = 'School',
  Team = 'Team'
}

export type BallotUpdateManyMutationInput = {
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type BallotUpdateManyWithoutCreatorInput = {
  connect?: Maybe<Array<BallotWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotCreateOrConnectWithoutcreatorInput>>;
  create?: Maybe<Array<BallotCreateWithoutCreatorInput>>;
  delete?: Maybe<Array<BallotWhereUniqueInput>>;
  deleteMany?: Maybe<Array<BallotScalarWhereInput>>;
  disconnect?: Maybe<Array<BallotWhereUniqueInput>>;
  set?: Maybe<Array<BallotWhereUniqueInput>>;
  update?: Maybe<Array<BallotUpdateWithWhereUniqueWithoutCreatorInput>>;
  updateMany?: Maybe<Array<BallotUpdateManyWithWhereWithoutCreatorInput>>;
  upsert?: Maybe<Array<BallotUpsertWithWhereUniqueWithoutCreatorInput>>;
};

export type BallotUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<BallotWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<BallotCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<BallotWhereUniqueInput>>;
  deleteMany?: Maybe<Array<BallotScalarWhereInput>>;
  disconnect?: Maybe<Array<BallotWhereUniqueInput>>;
  set?: Maybe<Array<BallotWhereUniqueInput>>;
  update?: Maybe<Array<BallotUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<BallotUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<BallotUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type BallotUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<BallotWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<BallotCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<BallotCreateWithoutTeamInput>>;
  delete?: Maybe<Array<BallotWhereUniqueInput>>;
  deleteMany?: Maybe<Array<BallotScalarWhereInput>>;
  disconnect?: Maybe<Array<BallotWhereUniqueInput>>;
  set?: Maybe<Array<BallotWhereUniqueInput>>;
  update?: Maybe<Array<BallotUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<BallotUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<BallotUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type BallotUpdateManyWithWhereWithoutCreatorInput = {
  data: BallotUpdateManyMutationInput;
  where: BallotScalarWhereInput;
};

export type BallotUpdateManyWithWhereWithoutSchoolInput = {
  data: BallotUpdateManyMutationInput;
  where: BallotScalarWhereInput;
};

export type BallotUpdateManyWithWhereWithoutTeamInput = {
  data: BallotUpdateManyMutationInput;
  where: BallotScalarWhereInput;
};

export type BallotUpdateOneRequiredWithoutBallotRunsInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutballotRunsInput>;
  create?: Maybe<BallotCreateWithoutBallotRunsInput>;
  update?: Maybe<BallotUpdateWithoutBallotRunsInput>;
  upsert?: Maybe<BallotUpsertWithoutBallotRunsInput>;
};

export type BallotUpdateOneRequiredWithoutVotedInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutvotedInput>;
  create?: Maybe<BallotCreateWithoutVotedInput>;
  update?: Maybe<BallotUpdateWithoutVotedInput>;
  upsert?: Maybe<BallotUpsertWithoutVotedInput>;
};

export type BallotUpdateOneRequiredWithoutVotesInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutvotesInput>;
  create?: Maybe<BallotCreateWithoutVotesInput>;
  update?: Maybe<BallotUpdateWithoutVotesInput>;
  upsert?: Maybe<BallotUpsertWithoutVotesInput>;
};

export type BallotUpdateOneWithoutActivityInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutactivityInput>;
  create?: Maybe<BallotCreateWithoutActivityInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<BallotUpdateWithoutActivityInput>;
  upsert?: Maybe<BallotUpsertWithoutActivityInput>;
};

export type BallotUpdateOneWithoutAttachmentsInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutattachmentsInput>;
  create?: Maybe<BallotCreateWithoutAttachmentsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<BallotUpdateWithoutAttachmentsInput>;
  upsert?: Maybe<BallotUpsertWithoutAttachmentsInput>;
};

export type BallotUpdateOneWithoutDiscussionInput = {
  connect?: Maybe<BallotWhereUniqueInput>;
  connectOrCreate?: Maybe<BallotCreateOrConnectWithoutdiscussionInput>;
  create?: Maybe<BallotCreateWithoutDiscussionInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<BallotUpdateWithoutDiscussionInput>;
  upsert?: Maybe<BallotUpsertWithoutDiscussionInput>;
};

export type BallotUpdateWithoutActivityInput = {
  attachments?: Maybe<AttachmentUpdateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  creator?: Maybe<UserUpdateOneWithoutBallotsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutBallotInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  school?: Maybe<SchoolUpdateOneWithoutBallotsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutBallotsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutBallotInput>;
  votes?: Maybe<VoteUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithoutAttachmentsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  creator?: Maybe<UserUpdateOneWithoutBallotsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutBallotInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  school?: Maybe<SchoolUpdateOneWithoutBallotsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutBallotsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutBallotInput>;
  votes?: Maybe<VoteUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithoutBallotRunsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  creator?: Maybe<UserUpdateOneWithoutBallotsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutBallotInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  school?: Maybe<SchoolUpdateOneWithoutBallotsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutBallotsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutBallotInput>;
  votes?: Maybe<VoteUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithoutCreatorInput = {
  activity?: Maybe<ActivityUpdateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutBallotInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  school?: Maybe<SchoolUpdateOneWithoutBallotsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutBallotsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutBallotInput>;
  votes?: Maybe<VoteUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithoutDiscussionInput = {
  activity?: Maybe<ActivityUpdateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  creator?: Maybe<UserUpdateOneWithoutBallotsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  school?: Maybe<SchoolUpdateOneWithoutBallotsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutBallotsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutBallotInput>;
  votes?: Maybe<VoteUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithoutSchoolInput = {
  activity?: Maybe<ActivityUpdateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  creator?: Maybe<UserUpdateOneWithoutBallotsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutBallotInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutBallotsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutBallotInput>;
  votes?: Maybe<VoteUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithoutTeamInput = {
  activity?: Maybe<ActivityUpdateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  creator?: Maybe<UserUpdateOneWithoutBallotsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutBallotInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  school?: Maybe<SchoolUpdateOneWithoutBallotsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutBallotInput>;
  votes?: Maybe<VoteUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithoutVotedInput = {
  activity?: Maybe<ActivityUpdateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  creator?: Maybe<UserUpdateOneWithoutBallotsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutBallotInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  school?: Maybe<SchoolUpdateOneWithoutBallotsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutBallotsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  votes?: Maybe<VoteUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithoutVotesInput = {
  activity?: Maybe<ActivityUpdateManyWithoutBallotInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutBallotInput>;
  ballotRuns?: Maybe<BallotRunUpdateManyWithoutBallotInput>;
  body?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  creator?: Maybe<UserUpdateOneWithoutBallotsInput>;
  description?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutBallotInput>;
  end?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  options?: Maybe<OptionUpdateManyWithoutBallotInput>;
  school?: Maybe<SchoolUpdateOneWithoutBallotsInput>;
  scope?: Maybe<EnumBallotScopeFieldUpdateOperationsInput>;
  start?: Maybe<DateTimeFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutBallotsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutBallotInput>;
};

export type BallotUpdateWithWhereUniqueWithoutCreatorInput = {
  data: BallotUpdateWithoutCreatorInput;
  where: BallotWhereUniqueInput;
};

export type BallotUpdateWithWhereUniqueWithoutSchoolInput = {
  data: BallotUpdateWithoutSchoolInput;
  where: BallotWhereUniqueInput;
};

export type BallotUpdateWithWhereUniqueWithoutTeamInput = {
  data: BallotUpdateWithoutTeamInput;
  where: BallotWhereUniqueInput;
};

export type BallotUpsertWithoutActivityInput = {
  create: BallotCreateWithoutActivityInput;
  update: BallotUpdateWithoutActivityInput;
};

export type BallotUpsertWithoutAttachmentsInput = {
  create: BallotCreateWithoutAttachmentsInput;
  update: BallotUpdateWithoutAttachmentsInput;
};

export type BallotUpsertWithoutBallotRunsInput = {
  create: BallotCreateWithoutBallotRunsInput;
  update: BallotUpdateWithoutBallotRunsInput;
};

export type BallotUpsertWithoutDiscussionInput = {
  create: BallotCreateWithoutDiscussionInput;
  update: BallotUpdateWithoutDiscussionInput;
};

export type BallotUpsertWithoutVotedInput = {
  create: BallotCreateWithoutVotedInput;
  update: BallotUpdateWithoutVotedInput;
};

export type BallotUpsertWithoutVotesInput = {
  create: BallotCreateWithoutVotesInput;
  update: BallotUpdateWithoutVotesInput;
};

export type BallotUpsertWithWhereUniqueWithoutCreatorInput = {
  create: BallotCreateWithoutCreatorInput;
  update: BallotUpdateWithoutCreatorInput;
  where: BallotWhereUniqueInput;
};

export type BallotUpsertWithWhereUniqueWithoutSchoolInput = {
  create: BallotCreateWithoutSchoolInput;
  update: BallotUpdateWithoutSchoolInput;
  where: BallotWhereUniqueInput;
};

export type BallotUpsertWithWhereUniqueWithoutTeamInput = {
  create: BallotCreateWithoutTeamInput;
  update: BallotUpdateWithoutTeamInput;
  where: BallotWhereUniqueInput;
};

export type BallotWhereInput = {
  activity?: Maybe<ActivityListRelationFilter>;
  AND?: Maybe<Array<BallotWhereInput>>;
  attachments?: Maybe<AttachmentListRelationFilter>;
  ballotRuns?: Maybe<BallotRunListRelationFilter>;
  body?: Maybe<StringFilter>;
  canton?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  creator?: Maybe<UserWhereInput>;
  creatorId?: Maybe<StringNullableFilter>;
  description?: Maybe<StringFilter>;
  discussion?: Maybe<DiscussionListRelationFilter>;
  end?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<BallotWhereInput>>;
  options?: Maybe<OptionListRelationFilter>;
  OR?: Maybe<Array<BallotWhereInput>>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringNullableFilter>;
  scope?: Maybe<EnumBallotScopeFilter>;
  start?: Maybe<DateTimeFilter>;
  team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringNullableFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  voted?: Maybe<VotedListRelationFilter>;
  votes?: Maybe<VoteListRelationFilter>;
};

export type BallotWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolNullableFilter>;
};

export type Card = {
  __typename?: 'Card';
  age?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discussion?: Maybe<Scalars['Boolean']>;
  duration?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  keywords?: Maybe<Scalars['String']>;
  show?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type Discussion = {
  __typename?: 'Discussion';
  attachments: Array<Attachment>;
  ballotId?: Maybe<Scalars['String']>;
  card?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<Discussion>>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  reactions: Array<Reaction>;
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};


export type DiscussionAttachmentsArgs = {
  after?: Maybe<AttachmentWhereUniqueInput>;
  before?: Maybe<AttachmentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type DiscussionReactionsArgs = {
  after?: Maybe<ReactionWhereUniqueInput>;
  before?: Maybe<ReactionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DiscussionCreateManyWithoutBallotInput = {
  connect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<DiscussionCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<DiscussionCreateWithoutBallotInput>>;
};

export type DiscussionCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<DiscussionCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<DiscussionCreateWithoutSchoolInput>>;
};

export type DiscussionCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<DiscussionCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<DiscussionCreateWithoutTeamInput>>;
};

export type DiscussionCreateManyWithoutUserInput = {
  connect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<DiscussionCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<DiscussionCreateWithoutUserInput>>;
};

export type DiscussionCreateOneWithoutActivityInput = {
  connect?: Maybe<DiscussionWhereUniqueInput>;
  connectOrCreate?: Maybe<DiscussionCreateOrConnectWithoutActivityInput>;
  create?: Maybe<DiscussionCreateWithoutActivityInput>;
};

export type DiscussionCreateOneWithoutAttachmentsInput = {
  connect?: Maybe<DiscussionWhereUniqueInput>;
  connectOrCreate?: Maybe<DiscussionCreateOrConnectWithoutattachmentsInput>;
  create?: Maybe<DiscussionCreateWithoutAttachmentsInput>;
};

export type DiscussionCreateOneWithoutReactionsInput = {
  connect?: Maybe<DiscussionWhereUniqueInput>;
  connectOrCreate?: Maybe<DiscussionCreateOrConnectWithoutreactionsInput>;
  create?: Maybe<DiscussionCreateWithoutReactionsInput>;
};

export type DiscussionCreateOrConnectWithoutActivityInput = {
  create: DiscussionCreateWithoutActivityInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionCreateOrConnectWithoutattachmentsInput = {
  create: DiscussionCreateWithoutAttachmentsInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionCreateOrConnectWithoutballotInput = {
  create: DiscussionCreateWithoutBallotInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionCreateOrConnectWithoutreactionsInput = {
  create: DiscussionCreateWithoutReactionsInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionCreateOrConnectWithoutschoolInput = {
  create: DiscussionCreateWithoutSchoolInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionCreateOrConnectWithoutteamInput = {
  create: DiscussionCreateWithoutTeamInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionCreateOrConnectWithoutuserInput = {
  create: DiscussionCreateWithoutUserInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionCreateWithoutActivityInput = {
  attachments?: Maybe<AttachmentCreateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotCreateOneWithoutDiscussionInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolCreateOneWithoutDiscussionInput>;
  team: TeamCreateOneWithoutDiscussionInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutDiscussionsInput;
};

export type DiscussionCreateWithoutAttachmentsInput = {
  Activity?: Maybe<ActivityCreateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotCreateOneWithoutDiscussionInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolCreateOneWithoutDiscussionInput>;
  team: TeamCreateOneWithoutDiscussionInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutDiscussionsInput;
};

export type DiscussionCreateWithoutBallotInput = {
  Activity?: Maybe<ActivityCreateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutDiscussionInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolCreateOneWithoutDiscussionInput>;
  team: TeamCreateOneWithoutDiscussionInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutDiscussionsInput;
};

export type DiscussionCreateWithoutReactionsInput = {
  Activity?: Maybe<ActivityCreateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotCreateOneWithoutDiscussionInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutDiscussionInput>;
  team: TeamCreateOneWithoutDiscussionInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutDiscussionsInput;
};

export type DiscussionCreateWithoutSchoolInput = {
  Activity?: Maybe<ActivityCreateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotCreateOneWithoutDiscussionInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutDiscussionInput>;
  team: TeamCreateOneWithoutDiscussionInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutDiscussionsInput;
};

export type DiscussionCreateWithoutTeamInput = {
  Activity?: Maybe<ActivityCreateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotCreateOneWithoutDiscussionInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolCreateOneWithoutDiscussionInput>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutDiscussionsInput;
};

export type DiscussionCreateWithoutUserInput = {
  Activity?: Maybe<ActivityCreateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotCreateOneWithoutDiscussionInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolCreateOneWithoutDiscussionInput>;
  team: TeamCreateOneWithoutDiscussionInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DiscussionListRelationFilter = {
  every?: Maybe<DiscussionWhereInput>;
  none?: Maybe<DiscussionWhereInput>;
  some?: Maybe<DiscussionWhereInput>;
};

export type DiscussionScalarWhereInput = {
  AND?: Maybe<Array<DiscussionScalarWhereInput>>;
  ballotId?: Maybe<StringNullableFilter>;
  card?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<DiscussionScalarWhereInput>>;
  OR?: Maybe<Array<DiscussionScalarWhereInput>>;
  schoolId?: Maybe<StringNullableFilter>;
  teamId?: Maybe<StringFilter>;
  text?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
};

export type DiscussionUpdateManyMutationInput = {
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type DiscussionUpdateManyWithoutBallotInput = {
  connect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<DiscussionCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<DiscussionCreateWithoutBallotInput>>;
  delete?: Maybe<Array<DiscussionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<DiscussionScalarWhereInput>>;
  disconnect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  set?: Maybe<Array<DiscussionWhereUniqueInput>>;
  update?: Maybe<Array<DiscussionUpdateWithWhereUniqueWithoutBallotInput>>;
  updateMany?: Maybe<Array<DiscussionUpdateManyWithWhereWithoutBallotInput>>;
  upsert?: Maybe<Array<DiscussionUpsertWithWhereUniqueWithoutBallotInput>>;
};

export type DiscussionUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<DiscussionCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<DiscussionCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<DiscussionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<DiscussionScalarWhereInput>>;
  disconnect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  set?: Maybe<Array<DiscussionWhereUniqueInput>>;
  update?: Maybe<Array<DiscussionUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<DiscussionUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<DiscussionUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type DiscussionUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<DiscussionCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<DiscussionCreateWithoutTeamInput>>;
  delete?: Maybe<Array<DiscussionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<DiscussionScalarWhereInput>>;
  disconnect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  set?: Maybe<Array<DiscussionWhereUniqueInput>>;
  update?: Maybe<Array<DiscussionUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<DiscussionUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<DiscussionUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type DiscussionUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<DiscussionCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<DiscussionCreateWithoutUserInput>>;
  delete?: Maybe<Array<DiscussionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<DiscussionScalarWhereInput>>;
  disconnect?: Maybe<Array<DiscussionWhereUniqueInput>>;
  set?: Maybe<Array<DiscussionWhereUniqueInput>>;
  update?: Maybe<Array<DiscussionUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<DiscussionUpdateManyWithWhereWithoutUserInput>>;
  upsert?: Maybe<Array<DiscussionUpsertWithWhereUniqueWithoutUserInput>>;
};

export type DiscussionUpdateManyWithWhereWithoutBallotInput = {
  data: DiscussionUpdateManyMutationInput;
  where: DiscussionScalarWhereInput;
};

export type DiscussionUpdateManyWithWhereWithoutSchoolInput = {
  data: DiscussionUpdateManyMutationInput;
  where: DiscussionScalarWhereInput;
};

export type DiscussionUpdateManyWithWhereWithoutTeamInput = {
  data: DiscussionUpdateManyMutationInput;
  where: DiscussionScalarWhereInput;
};

export type DiscussionUpdateManyWithWhereWithoutUserInput = {
  data: DiscussionUpdateManyMutationInput;
  where: DiscussionScalarWhereInput;
};

export type DiscussionUpdateOneWithoutActivityInput = {
  connect?: Maybe<DiscussionWhereUniqueInput>;
  connectOrCreate?: Maybe<DiscussionCreateOrConnectWithoutActivityInput>;
  create?: Maybe<DiscussionCreateWithoutActivityInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<DiscussionUpdateWithoutActivityInput>;
  upsert?: Maybe<DiscussionUpsertWithoutActivityInput>;
};

export type DiscussionUpdateOneWithoutAttachmentsInput = {
  connect?: Maybe<DiscussionWhereUniqueInput>;
  connectOrCreate?: Maybe<DiscussionCreateOrConnectWithoutattachmentsInput>;
  create?: Maybe<DiscussionCreateWithoutAttachmentsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<DiscussionUpdateWithoutAttachmentsInput>;
  upsert?: Maybe<DiscussionUpsertWithoutAttachmentsInput>;
};

export type DiscussionUpdateOneWithoutReactionsInput = {
  connect?: Maybe<DiscussionWhereUniqueInput>;
  connectOrCreate?: Maybe<DiscussionCreateOrConnectWithoutreactionsInput>;
  create?: Maybe<DiscussionCreateWithoutReactionsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<DiscussionUpdateWithoutReactionsInput>;
  upsert?: Maybe<DiscussionUpsertWithoutReactionsInput>;
};

export type DiscussionUpdateWithoutActivityInput = {
  attachments?: Maybe<AttachmentUpdateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotUpdateOneWithoutDiscussionInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolUpdateOneWithoutDiscussionInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutDiscussionInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutDiscussionsInput>;
};

export type DiscussionUpdateWithoutAttachmentsInput = {
  Activity?: Maybe<ActivityUpdateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotUpdateOneWithoutDiscussionInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolUpdateOneWithoutDiscussionInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutDiscussionInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutDiscussionsInput>;
};

export type DiscussionUpdateWithoutBallotInput = {
  Activity?: Maybe<ActivityUpdateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutDiscussionInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolUpdateOneWithoutDiscussionInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutDiscussionInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutDiscussionsInput>;
};

export type DiscussionUpdateWithoutReactionsInput = {
  Activity?: Maybe<ActivityUpdateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotUpdateOneWithoutDiscussionInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutDiscussionInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutDiscussionInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutDiscussionsInput>;
};

export type DiscussionUpdateWithoutSchoolInput = {
  Activity?: Maybe<ActivityUpdateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotUpdateOneWithoutDiscussionInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutDiscussionInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutDiscussionInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutDiscussionsInput>;
};

export type DiscussionUpdateWithoutTeamInput = {
  Activity?: Maybe<ActivityUpdateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotUpdateOneWithoutDiscussionInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolUpdateOneWithoutDiscussionInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutDiscussionsInput>;
};

export type DiscussionUpdateWithoutUserInput = {
  Activity?: Maybe<ActivityUpdateManyWithoutDiscussionInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutDiscussionInput>;
  ballot?: Maybe<BallotUpdateOneWithoutDiscussionInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutDiscussionInput>;
  school?: Maybe<SchoolUpdateOneWithoutDiscussionInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutDiscussionInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type DiscussionUpdateWithWhereUniqueWithoutBallotInput = {
  data: DiscussionUpdateWithoutBallotInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionUpdateWithWhereUniqueWithoutSchoolInput = {
  data: DiscussionUpdateWithoutSchoolInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionUpdateWithWhereUniqueWithoutTeamInput = {
  data: DiscussionUpdateWithoutTeamInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionUpdateWithWhereUniqueWithoutUserInput = {
  data: DiscussionUpdateWithoutUserInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionUpsertWithoutActivityInput = {
  create: DiscussionCreateWithoutActivityInput;
  update: DiscussionUpdateWithoutActivityInput;
};

export type DiscussionUpsertWithoutAttachmentsInput = {
  create: DiscussionCreateWithoutAttachmentsInput;
  update: DiscussionUpdateWithoutAttachmentsInput;
};

export type DiscussionUpsertWithoutReactionsInput = {
  create: DiscussionCreateWithoutReactionsInput;
  update: DiscussionUpdateWithoutReactionsInput;
};

export type DiscussionUpsertWithWhereUniqueWithoutBallotInput = {
  create: DiscussionCreateWithoutBallotInput;
  update: DiscussionUpdateWithoutBallotInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionUpsertWithWhereUniqueWithoutSchoolInput = {
  create: DiscussionCreateWithoutSchoolInput;
  update: DiscussionUpdateWithoutSchoolInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionUpsertWithWhereUniqueWithoutTeamInput = {
  create: DiscussionCreateWithoutTeamInput;
  update: DiscussionUpdateWithoutTeamInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionUpsertWithWhereUniqueWithoutUserInput = {
  create: DiscussionCreateWithoutUserInput;
  update: DiscussionUpdateWithoutUserInput;
  where: DiscussionWhereUniqueInput;
};

export type DiscussionWhereInput = {
  Activity?: Maybe<ActivityListRelationFilter>;
  AND?: Maybe<Array<DiscussionWhereInput>>;
  attachments?: Maybe<AttachmentListRelationFilter>;
  ballot?: Maybe<BallotWhereInput>;
  ballotId?: Maybe<StringNullableFilter>;
  card?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<DiscussionWhereInput>>;
  OR?: Maybe<Array<DiscussionWhereInput>>;
  reactions?: Maybe<ReactionListRelationFilter>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringNullableFilter>;
  team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringFilter>;
  text?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type DiscussionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Domain = {
  __typename?: 'Domain';
  approved: Scalars['Boolean'];
  id: Scalars['String'];
  name: Scalars['String'];
  schools: Array<School>;
};


export type DomainSchoolsArgs = {
  after?: Maybe<SchoolWhereUniqueInput>;
  before?: Maybe<SchoolWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DomainCreateOneWithoutSchoolsInput = {
  connect?: Maybe<DomainWhereUniqueInput>;
  connectOrCreate?: Maybe<DomainCreateOrConnectWithoutschoolsInput>;
  create?: Maybe<DomainCreateWithoutSchoolsInput>;
};

export type DomainCreateOneWithoutTeamInput = {
  connect?: Maybe<DomainWhereUniqueInput>;
  connectOrCreate?: Maybe<DomainCreateOrConnectWithoutTeamInput>;
  create?: Maybe<DomainCreateWithoutTeamInput>;
};

export type DomainCreateOrConnectWithoutschoolsInput = {
  create: DomainCreateWithoutSchoolsInput;
  where: DomainWhereUniqueInput;
};

export type DomainCreateOrConnectWithoutTeamInput = {
  create: DomainCreateWithoutTeamInput;
  where: DomainWhereUniqueInput;
};

export type DomainCreateWithoutSchoolsInput = {
  approved?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  Team?: Maybe<TeamCreateManyWithoutDomainInput>;
};

export type DomainCreateWithoutTeamInput = {
  approved?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  schools?: Maybe<SchoolCreateManyWithoutDomainInput>;
};

export type DomainUpdateOneWithoutSchoolsInput = {
  connect?: Maybe<DomainWhereUniqueInput>;
  connectOrCreate?: Maybe<DomainCreateOrConnectWithoutschoolsInput>;
  create?: Maybe<DomainCreateWithoutSchoolsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<DomainUpdateWithoutSchoolsInput>;
  upsert?: Maybe<DomainUpsertWithoutSchoolsInput>;
};

export type DomainUpdateOneWithoutTeamInput = {
  connect?: Maybe<DomainWhereUniqueInput>;
  connectOrCreate?: Maybe<DomainCreateOrConnectWithoutTeamInput>;
  create?: Maybe<DomainCreateWithoutTeamInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<DomainUpdateWithoutTeamInput>;
  upsert?: Maybe<DomainUpsertWithoutTeamInput>;
};

export type DomainUpdateWithoutSchoolsInput = {
  approved?: Maybe<BoolFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  Team?: Maybe<TeamUpdateManyWithoutDomainInput>;
};

export type DomainUpdateWithoutTeamInput = {
  approved?: Maybe<BoolFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  schools?: Maybe<SchoolUpdateManyWithoutDomainInput>;
};

export type DomainUpsertWithoutSchoolsInput = {
  create: DomainCreateWithoutSchoolsInput;
  update: DomainUpdateWithoutSchoolsInput;
};

export type DomainUpsertWithoutTeamInput = {
  create: DomainCreateWithoutTeamInput;
  update: DomainUpdateWithoutTeamInput;
};

export type DomainWhereInput = {
  AND?: Maybe<Array<DomainWhereInput>>;
  approved?: Maybe<BoolFilter>;
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<DomainWhereInput>>;
  OR?: Maybe<Array<DomainWhereInput>>;
  schools?: Maybe<SchoolListRelationFilter>;
  Team?: Maybe<TeamListRelationFilter>;
};

export type DomainWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type EnumActivityTypeFieldUpdateOperationsInput = {
  set?: Maybe<ActivityType>;
};

export type EnumActivityTypeFilter = {
  equals?: Maybe<ActivityType>;
  in?: Maybe<Array<ActivityType>>;
  not?: Maybe<NestedEnumActivityTypeFilter>;
  notIn?: Maybe<Array<ActivityType>>;
};

export type EnumBallotScopeFieldUpdateOperationsInput = {
  set?: Maybe<BallotScope>;
};

export type EnumBallotScopeFilter = {
  equals?: Maybe<BallotScope>;
  in?: Maybe<Array<BallotScope>>;
  not?: Maybe<NestedEnumBallotScopeFilter>;
  notIn?: Maybe<Array<BallotScope>>;
};

export type EnumGenderNullableFilter = {
  equals?: Maybe<Gender>;
  in?: Maybe<Array<Gender>>;
  not?: Maybe<NestedEnumGenderNullableFilter>;
  notIn?: Maybe<Array<Gender>>;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: Maybe<Role>;
};

export type EnumRoleFilter = {
  equals?: Maybe<Role>;
  in?: Maybe<Array<Role>>;
  not?: Maybe<NestedEnumRoleFilter>;
  notIn?: Maybe<Array<Role>>;
};

export type EnumVisibilityFieldUpdateOperationsInput = {
  set?: Maybe<Visibility>;
};

export type EnumVisibilityFilter = {
  equals?: Maybe<Visibility>;
  in?: Maybe<Array<Visibility>>;
  not?: Maybe<NestedEnumVisibilityFilter>;
  notIn?: Maybe<Array<Visibility>>;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other',
  Unkown = 'Unkown'
}

export type IntFieldUpdateOperationsInput = {
  decrement?: Maybe<Scalars['Int']>;
  divide?: Maybe<Scalars['Int']>;
  increment?: Maybe<Scalars['Int']>;
  multiply?: Maybe<Scalars['Int']>;
  set?: Maybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type InviteResponse = {
  __typename?: 'InviteResponse';
  created?: Maybe<Array<Maybe<Scalars['String']>>>;
  duplicated?: Maybe<Array<Maybe<Scalars['String']>>>;
  failed?: Maybe<Array<Maybe<Scalars['String']>>>;
  team?: Maybe<Team>;
};


export type JsonNullableFilter = {
  equals?: Maybe<Scalars['Json']>;
  not?: Maybe<Scalars['Json']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite?: Maybe<Team>;
  addBallotRun?: Maybe<BallotRun>;
  changePassword?: Maybe<ResponseLogin>;
  checkVerification?: Maybe<ResponseLogin>;
  createInvitedUser?: Maybe<User>;
  createOneSchool: School;
  createOneTeam: Team;
  createUser: User;
  deleteAccount?: Maybe<Response>;
  deleteOneSchool?: Maybe<School>;
  deleteOneTeam?: Maybe<Team>;
  deleteUser?: Maybe<User>;
  emailVerification?: Maybe<ResponseLogin>;
  endBallotRun?: Maybe<BallotRun>;
  inviteStudents?: Maybe<InviteResponse>;
  login?: Maybe<ResponseLogin>;
  magic?: Maybe<Response>;
  postActivity: Activity;
  postDiscussion?: Maybe<Discussion>;
  postWork: Work;
  removeBallotRun?: Maybe<Response>;
  setCards?: Maybe<Team>;
  setPrefs?: Maybe<Team>;
  setSchool?: Maybe<User>;
  startBallotRun?: Maybe<BallotRun>;
  updateUser?: Maybe<User>;
  vote?: Maybe<Vote>;
  voteCode?: Maybe<Response>;
};


export type MutationAcceptInviteArgs = {
  invite: Scalars['String'];
};


export type MutationAddBallotRunArgs = {
  ballotId: Scalars['String'];
  teamId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password?: Maybe<Scalars['String']>;
};


export type MutationCheckVerificationArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationCreateInvitedUserArgs = {
  email?: Maybe<Scalars['String']>;
  invite: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
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


export type MutationDeleteOneSchoolArgs = {
  where: SchoolWhereUniqueInput;
};


export type MutationDeleteOneTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationEmailVerificationArgs = {
  email: Scalars['String'];
  purpose: Scalars['String'];
};


export type MutationEndBallotRunArgs = {
  ballotRunId: Scalars['String'];
};


export type MutationInviteStudentsArgs = {
  emails: Array<Scalars['String']>;
  team: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMagicArgs = {
  email: Scalars['String'];
  redirect?: Maybe<Scalars['String']>;
};


export type MutationPostActivityArgs = {
  data: ActivityCreateInput;
};


export type MutationPostDiscussionArgs = {
  ballotId?: Maybe<Scalars['String']>;
  card?: Maybe<Scalars['String']>;
  teamId: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationPostWorkArgs = {
  data: WorkCreateInput;
};


export type MutationRemoveBallotRunArgs = {
  ballotRunId: Scalars['String'];
};


export type MutationSetCardsArgs = {
  cards: Scalars['String'];
  teamId: Scalars['String'];
};


export type MutationSetPrefsArgs = {
  prefs: Scalars['Json'];
  teamId: Scalars['String'];
};


export type MutationSetSchoolArgs = {
  school: Scalars['String'];
};


export type MutationStartBallotRunArgs = {
  ballotRunId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationVoteArgs = {
  ballotId: Scalars['String'];
  vote: Scalars['Int'];
};


export type MutationVoteCodeArgs = {
  ballotRunId: Scalars['String'];
  code: Scalars['String'];
  vote: Scalars['Int'];
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumActivityTypeFilter = {
  equals?: Maybe<ActivityType>;
  in?: Maybe<Array<ActivityType>>;
  not?: Maybe<NestedEnumActivityTypeFilter>;
  notIn?: Maybe<Array<ActivityType>>;
};

export type NestedEnumBallotScopeFilter = {
  equals?: Maybe<BallotScope>;
  in?: Maybe<Array<BallotScope>>;
  not?: Maybe<NestedEnumBallotScopeFilter>;
  notIn?: Maybe<Array<BallotScope>>;
};

export type NestedEnumGenderNullableFilter = {
  equals?: Maybe<Gender>;
  in?: Maybe<Array<Gender>>;
  not?: Maybe<NestedEnumGenderNullableFilter>;
  notIn?: Maybe<Array<Gender>>;
};

export type NestedEnumRoleFilter = {
  equals?: Maybe<Role>;
  in?: Maybe<Array<Role>>;
  not?: Maybe<NestedEnumRoleFilter>;
  notIn?: Maybe<Array<Role>>;
};

export type NestedEnumVisibilityFilter = {
  equals?: Maybe<Visibility>;
  in?: Maybe<Array<Visibility>>;
  not?: Maybe<NestedEnumVisibilityFilter>;
  notIn?: Maybe<Array<Visibility>>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type NullableBoolFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Boolean']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type NullableEnumGenderFieldUpdateOperationsInput = {
  set?: Maybe<Gender>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: Maybe<Scalars['Int']>;
  divide?: Maybe<Scalars['Int']>;
  increment?: Maybe<Scalars['Int']>;
  multiply?: Maybe<Scalars['Int']>;
  set?: Maybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type OptionCreateManyWithoutBallotInput = {
  connect?: Maybe<Array<OptionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<OptionCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<OptionCreateWithoutBallotInput>>;
};

export type OptionCreateOrConnectWithoutballotInput = {
  create: OptionCreateWithoutBallotInput;
  where: OptionWhereUniqueInput;
};

export type OptionCreateWithoutBallotInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  vote: Scalars['Int'];
};

export type OptionListRelationFilter = {
  every?: Maybe<OptionWhereInput>;
  none?: Maybe<OptionWhereInput>;
  some?: Maybe<OptionWhereInput>;
};

export type OptionScalarWhereInput = {
  AND?: Maybe<Array<OptionScalarWhereInput>>;
  ballotId?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<OptionScalarWhereInput>>;
  OR?: Maybe<Array<OptionScalarWhereInput>>;
  title?: Maybe<StringFilter>;
  vote?: Maybe<IntFilter>;
};

export type OptionUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  vote?: Maybe<IntFieldUpdateOperationsInput>;
};

export type OptionUpdateManyWithoutBallotInput = {
  connect?: Maybe<Array<OptionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<OptionCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<OptionCreateWithoutBallotInput>>;
  delete?: Maybe<Array<OptionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<OptionScalarWhereInput>>;
  disconnect?: Maybe<Array<OptionWhereUniqueInput>>;
  set?: Maybe<Array<OptionWhereUniqueInput>>;
  update?: Maybe<Array<OptionUpdateWithWhereUniqueWithoutBallotInput>>;
  updateMany?: Maybe<Array<OptionUpdateManyWithWhereWithoutBallotInput>>;
  upsert?: Maybe<Array<OptionUpsertWithWhereUniqueWithoutBallotInput>>;
};

export type OptionUpdateManyWithWhereWithoutBallotInput = {
  data: OptionUpdateManyMutationInput;
  where: OptionScalarWhereInput;
};

export type OptionUpdateWithoutBallotInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  vote?: Maybe<IntFieldUpdateOperationsInput>;
};

export type OptionUpdateWithWhereUniqueWithoutBallotInput = {
  data: OptionUpdateWithoutBallotInput;
  where: OptionWhereUniqueInput;
};

export type OptionUpsertWithWhereUniqueWithoutBallotInput = {
  create: OptionCreateWithoutBallotInput;
  update: OptionUpdateWithoutBallotInput;
  where: OptionWhereUniqueInput;
};

export type OptionWhereInput = {
  AND?: Maybe<Array<OptionWhereInput>>;
  ballot?: Maybe<BallotWhereInput>;
  ballotId?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<OptionWhereInput>>;
  OR?: Maybe<Array<OptionWhereInput>>;
  title?: Maybe<StringFilter>;
  vote?: Maybe<IntFilter>;
};

export type OptionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Activity>;
  attachment?: Maybe<Attachment>;
  attachments: Array<Attachment>;
  ballot?: Maybe<Ballot>;
  ballots: Array<Ballot>;
  cards?: Maybe<Array<Maybe<Card>>>;
  getBallotResults?: Maybe<BallotResults>;
  getBallotRuns?: Maybe<Array<Maybe<BallotRun>>>;
  getTeamDiscussions?: Maybe<Array<Maybe<Discussion>>>;
  me?: Maybe<User>;
  school?: Maybe<School>;
  schools: Array<School>;
  swissvotes?: Maybe<Array<Maybe<Swissvote>>>;
  team?: Maybe<Team>;
  teams: Array<Team>;
  user?: Maybe<User>;
  users: Array<User>;
  works: Array<Work>;
};


export type QueryActivitiesArgs = {
  after?: Maybe<ActivityWhereUniqueInput>;
  before?: Maybe<ActivityWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ActivityOrderByInput>>;
  where?: Maybe<ActivityWhereInput>;
};


export type QueryAttachmentArgs = {
  where: AttachmentWhereUniqueInput;
};


export type QueryAttachmentsArgs = {
  after?: Maybe<AttachmentWhereUniqueInput>;
  before?: Maybe<AttachmentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<AttachmentOrderByInput>>;
  where?: Maybe<AttachmentWhereInput>;
};


export type QueryBallotArgs = {
  where: BallotWhereUniqueInput;
};


export type QueryBallotsArgs = {
  after?: Maybe<BallotWhereUniqueInput>;
  before?: Maybe<BallotWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BallotOrderByInput>>;
  where?: Maybe<BallotWhereInput>;
};


export type QueryCardsArgs = {
  age?: Maybe<Scalars['String']>;
  keywords?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type QueryGetBallotResultsArgs = {
  ballotId: Scalars['String'];
  ballotRunId?: Maybe<Scalars['String']>;
  canton?: Maybe<Scalars['String']>;
  schoolId?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};


export type QueryGetBallotRunsArgs = {
  teamId: Scalars['String'];
};


export type QueryGetTeamDiscussionsArgs = {
  ballotId?: Maybe<Scalars['String']>;
  card?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};


export type QuerySchoolArgs = {
  where: SchoolWhereUniqueInput;
};


export type QuerySchoolsArgs = {
  after?: Maybe<SchoolWhereUniqueInput>;
  before?: Maybe<SchoolWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SchoolOrderByInput>>;
  where?: Maybe<SchoolWhereInput>;
};


export type QuerySwissvotesArgs = {
  hasPosters?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  result?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
};


export type QueryTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type QueryTeamsArgs = {
  after?: Maybe<TeamWhereUniqueInput>;
  before?: Maybe<TeamWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<TeamOrderByInput>>;
  where?: Maybe<TeamWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  where?: Maybe<UserWhereInput>;
};


export type QueryWorksArgs = {
  after?: Maybe<WorkWhereUniqueInput>;
  before?: Maybe<WorkWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkOrderByInput>>;
  where?: Maybe<WorkWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Reaction = {
  __typename?: 'Reaction';
  discussion?: Maybe<Discussion>;
  emoij: Scalars['String'];
  id: Scalars['String'];
  user: User;
};

export type ReactionCreateManyWithoutDiscussionInput = {
  connect?: Maybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ReactionCreateOrConnectWithoutdiscussionInput>>;
  create?: Maybe<Array<ReactionCreateWithoutDiscussionInput>>;
};

export type ReactionCreateManyWithoutUserInput = {
  connect?: Maybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ReactionCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<ReactionCreateWithoutUserInput>>;
};

export type ReactionCreateManyWithoutWorkInput = {
  connect?: Maybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ReactionCreateOrConnectWithoutworkInput>>;
  create?: Maybe<Array<ReactionCreateWithoutWorkInput>>;
};

export type ReactionCreateOrConnectWithoutdiscussionInput = {
  create: ReactionCreateWithoutDiscussionInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionCreateOrConnectWithoutuserInput = {
  create: ReactionCreateWithoutUserInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionCreateOrConnectWithoutworkInput = {
  create: ReactionCreateWithoutWorkInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionCreateWithoutDiscussionInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  emoij?: Maybe<Scalars['String']>;
  feedback: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  stars: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutReactionsInput;
  work?: Maybe<WorkCreateOneWithoutReactionsInput>;
};

export type ReactionCreateWithoutUserInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  discussion?: Maybe<DiscussionCreateOneWithoutReactionsInput>;
  emoij?: Maybe<Scalars['String']>;
  feedback: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  stars: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  work?: Maybe<WorkCreateOneWithoutReactionsInput>;
};

export type ReactionCreateWithoutWorkInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  discussion?: Maybe<DiscussionCreateOneWithoutReactionsInput>;
  emoij?: Maybe<Scalars['String']>;
  feedback: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  stars: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: UserCreateOneWithoutReactionsInput;
};

export type ReactionListRelationFilter = {
  every?: Maybe<ReactionWhereInput>;
  none?: Maybe<ReactionWhereInput>;
  some?: Maybe<ReactionWhereInput>;
};

export type ReactionScalarWhereInput = {
  AND?: Maybe<Array<ReactionScalarWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  discussionId?: Maybe<StringNullableFilter>;
  emoij?: Maybe<StringFilter>;
  feedback?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<ReactionScalarWhereInput>>;
  OR?: Maybe<Array<ReactionScalarWhereInput>>;
  stars?: Maybe<IntFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  userId?: Maybe<StringFilter>;
  workId?: Maybe<StringNullableFilter>;
};

export type ReactionUpdateManyMutationInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  emoij?: Maybe<StringFieldUpdateOperationsInput>;
  feedback?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  stars?: Maybe<IntFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type ReactionUpdateManyWithoutDiscussionInput = {
  connect?: Maybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ReactionCreateOrConnectWithoutdiscussionInput>>;
  create?: Maybe<Array<ReactionCreateWithoutDiscussionInput>>;
  delete?: Maybe<Array<ReactionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ReactionScalarWhereInput>>;
  disconnect?: Maybe<Array<ReactionWhereUniqueInput>>;
  set?: Maybe<Array<ReactionWhereUniqueInput>>;
  update?: Maybe<Array<ReactionUpdateWithWhereUniqueWithoutDiscussionInput>>;
  updateMany?: Maybe<Array<ReactionUpdateManyWithWhereWithoutDiscussionInput>>;
  upsert?: Maybe<Array<ReactionUpsertWithWhereUniqueWithoutDiscussionInput>>;
};

export type ReactionUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ReactionCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<ReactionCreateWithoutUserInput>>;
  delete?: Maybe<Array<ReactionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ReactionScalarWhereInput>>;
  disconnect?: Maybe<Array<ReactionWhereUniqueInput>>;
  set?: Maybe<Array<ReactionWhereUniqueInput>>;
  update?: Maybe<Array<ReactionUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<ReactionUpdateManyWithWhereWithoutUserInput>>;
  upsert?: Maybe<Array<ReactionUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ReactionUpdateManyWithoutWorkInput = {
  connect?: Maybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<ReactionCreateOrConnectWithoutworkInput>>;
  create?: Maybe<Array<ReactionCreateWithoutWorkInput>>;
  delete?: Maybe<Array<ReactionWhereUniqueInput>>;
  deleteMany?: Maybe<Array<ReactionScalarWhereInput>>;
  disconnect?: Maybe<Array<ReactionWhereUniqueInput>>;
  set?: Maybe<Array<ReactionWhereUniqueInput>>;
  update?: Maybe<Array<ReactionUpdateWithWhereUniqueWithoutWorkInput>>;
  updateMany?: Maybe<Array<ReactionUpdateManyWithWhereWithoutWorkInput>>;
  upsert?: Maybe<Array<ReactionUpsertWithWhereUniqueWithoutWorkInput>>;
};

export type ReactionUpdateManyWithWhereWithoutDiscussionInput = {
  data: ReactionUpdateManyMutationInput;
  where: ReactionScalarWhereInput;
};

export type ReactionUpdateManyWithWhereWithoutUserInput = {
  data: ReactionUpdateManyMutationInput;
  where: ReactionScalarWhereInput;
};

export type ReactionUpdateManyWithWhereWithoutWorkInput = {
  data: ReactionUpdateManyMutationInput;
  where: ReactionScalarWhereInput;
};

export type ReactionUpdateWithoutDiscussionInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  emoij?: Maybe<StringFieldUpdateOperationsInput>;
  feedback?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  stars?: Maybe<IntFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutReactionsInput>;
  work?: Maybe<WorkUpdateOneWithoutReactionsInput>;
};

export type ReactionUpdateWithoutUserInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutReactionsInput>;
  emoij?: Maybe<StringFieldUpdateOperationsInput>;
  feedback?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  stars?: Maybe<IntFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  work?: Maybe<WorkUpdateOneWithoutReactionsInput>;
};

export type ReactionUpdateWithoutWorkInput = {
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateOneWithoutReactionsInput>;
  emoij?: Maybe<StringFieldUpdateOperationsInput>;
  feedback?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  stars?: Maybe<IntFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutReactionsInput>;
};

export type ReactionUpdateWithWhereUniqueWithoutDiscussionInput = {
  data: ReactionUpdateWithoutDiscussionInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionUpdateWithWhereUniqueWithoutUserInput = {
  data: ReactionUpdateWithoutUserInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionUpdateWithWhereUniqueWithoutWorkInput = {
  data: ReactionUpdateWithoutWorkInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionUpsertWithWhereUniqueWithoutDiscussionInput = {
  create: ReactionCreateWithoutDiscussionInput;
  update: ReactionUpdateWithoutDiscussionInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionUpsertWithWhereUniqueWithoutUserInput = {
  create: ReactionCreateWithoutUserInput;
  update: ReactionUpdateWithoutUserInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionUpsertWithWhereUniqueWithoutWorkInput = {
  create: ReactionCreateWithoutWorkInput;
  update: ReactionUpdateWithoutWorkInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionWhereInput = {
  AND?: Maybe<Array<ReactionWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  discussion?: Maybe<DiscussionWhereInput>;
  discussionId?: Maybe<StringNullableFilter>;
  emoij?: Maybe<StringFilter>;
  feedback?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<ReactionWhereInput>>;
  OR?: Maybe<Array<ReactionWhereInput>>;
  stars?: Maybe<IntFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
  work?: Maybe<WorkWhereInput>;
  workId?: Maybe<StringNullableFilter>;
};

export type ReactionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Response = {
  __typename?: 'Response';
  error?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ResponseLogin = {
  __typename?: 'ResponseLogin';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export enum Role {
  Admin = 'Admin',
  Principal = 'Principal',
  Student = 'Student',
  Teacher = 'Teacher',
  User = 'User'
}

export type School = {
  __typename?: 'School';
  address: Scalars['String'];
  canton: Scalars['String'];
  city: Scalars['String'];
  id: Scalars['String'];
  members: Array<User>;
  name: Scalars['String'];
  teams: Array<Team>;
  type: Scalars['String'];
  zip: Scalars['String'];
};


export type SchoolMembersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type SchoolTeamsArgs = {
  after?: Maybe<TeamWhereUniqueInput>;
  before?: Maybe<TeamWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SchoolCreateInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateManyWithoutDomainInput = {
  connect?: Maybe<Array<SchoolWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<SchoolCreateOrConnectWithoutdomainInput>>;
  create?: Maybe<Array<SchoolCreateWithoutDomainInput>>;
};

export type SchoolCreateOneWithoutActivityInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutactivityInput>;
  create?: Maybe<SchoolCreateWithoutActivityInput>;
};

export type SchoolCreateOneWithoutAttachmentInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutattachmentInput>;
  create?: Maybe<SchoolCreateWithoutAttachmentInput>;
};

export type SchoolCreateOneWithoutBallotsInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutballotsInput>;
  create?: Maybe<SchoolCreateWithoutBallotsInput>;
};

export type SchoolCreateOneWithoutDiscussionInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutdiscussionInput>;
  create?: Maybe<SchoolCreateWithoutDiscussionInput>;
};

export type SchoolCreateOneWithoutMembersInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutmembersInput>;
  create?: Maybe<SchoolCreateWithoutMembersInput>;
};

export type SchoolCreateOneWithoutTeamsInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutteamsInput>;
  create?: Maybe<SchoolCreateWithoutTeamsInput>;
};

export type SchoolCreateOneWithoutVotedInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutVotedInput>;
  create?: Maybe<SchoolCreateWithoutVotedInput>;
};

export type SchoolCreateOneWithoutVoteInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutVoteInput>;
  create?: Maybe<SchoolCreateWithoutVoteInput>;
};

export type SchoolCreateOneWithoutWorkInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutworkInput>;
  create?: Maybe<SchoolCreateWithoutWorkInput>;
};

export type SchoolCreateOrConnectWithoutactivityInput = {
  create: SchoolCreateWithoutActivityInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutattachmentInput = {
  create: SchoolCreateWithoutAttachmentInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutballotsInput = {
  create: SchoolCreateWithoutBallotsInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutdiscussionInput = {
  create: SchoolCreateWithoutDiscussionInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutdomainInput = {
  create: SchoolCreateWithoutDomainInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutmembersInput = {
  create: SchoolCreateWithoutMembersInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutteamsInput = {
  create: SchoolCreateWithoutTeamsInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutVotedInput = {
  create: SchoolCreateWithoutVotedInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutVoteInput = {
  create: SchoolCreateWithoutVoteInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutworkInput = {
  create: SchoolCreateWithoutWorkInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateWithoutActivityInput = {
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutAttachmentInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutBallotsInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutDiscussionInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutDomainInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutMembersInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutTeamsInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutVotedInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutVoteInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  work?: Maybe<WorkCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolCreateWithoutWorkInput = {
  activity?: Maybe<ActivityCreateManyWithoutSchoolInput>;
  address?: Maybe<Scalars['String']>;
  attachment?: Maybe<AttachmentCreateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotCreateManyWithoutSchoolInput>;
  canton?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutSchoolInput>;
  domain?: Maybe<DomainCreateOneWithoutSchoolsInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutSchoolInput>;
  name: Scalars['String'];
  teams?: Maybe<TeamCreateManyWithoutSchoolInput>;
  type?: Maybe<Scalars['String']>;
  Vote?: Maybe<VoteCreateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedCreateManyWithoutSchoolInput>;
  zip?: Maybe<Scalars['String']>;
};

export type SchoolListRelationFilter = {
  every?: Maybe<SchoolWhereInput>;
  none?: Maybe<SchoolWhereInput>;
  some?: Maybe<SchoolWhereInput>;
};

export type SchoolOrderByInput = {
  address?: Maybe<SortOrder>;
  canton?: Maybe<SortOrder>;
  city?: Maybe<SortOrder>;
  domainId?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
  zip?: Maybe<SortOrder>;
};

export type SchoolScalarWhereInput = {
  address?: Maybe<StringFilter>;
  AND?: Maybe<Array<SchoolScalarWhereInput>>;
  canton?: Maybe<StringFilter>;
  city?: Maybe<StringFilter>;
  domainId?: Maybe<StringNullableFilter>;
  id?: Maybe<StringFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<SchoolScalarWhereInput>>;
  OR?: Maybe<Array<SchoolScalarWhereInput>>;
  type?: Maybe<StringFilter>;
  zip?: Maybe<StringFilter>;
};

export type SchoolUpdateManyMutationInput = {
  address?: Maybe<StringFieldUpdateOperationsInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateManyWithoutDomainInput = {
  connect?: Maybe<Array<SchoolWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<SchoolCreateOrConnectWithoutdomainInput>>;
  create?: Maybe<Array<SchoolCreateWithoutDomainInput>>;
  delete?: Maybe<Array<SchoolWhereUniqueInput>>;
  deleteMany?: Maybe<Array<SchoolScalarWhereInput>>;
  disconnect?: Maybe<Array<SchoolWhereUniqueInput>>;
  set?: Maybe<Array<SchoolWhereUniqueInput>>;
  update?: Maybe<Array<SchoolUpdateWithWhereUniqueWithoutDomainInput>>;
  updateMany?: Maybe<Array<SchoolUpdateManyWithWhereWithoutDomainInput>>;
  upsert?: Maybe<Array<SchoolUpsertWithWhereUniqueWithoutDomainInput>>;
};

export type SchoolUpdateManyWithWhereWithoutDomainInput = {
  data: SchoolUpdateManyMutationInput;
  where: SchoolScalarWhereInput;
};

export type SchoolUpdateOneRequiredWithoutActivityInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutactivityInput>;
  create?: Maybe<SchoolCreateWithoutActivityInput>;
  update?: Maybe<SchoolUpdateWithoutActivityInput>;
  upsert?: Maybe<SchoolUpsertWithoutActivityInput>;
};

export type SchoolUpdateOneRequiredWithoutTeamsInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutteamsInput>;
  create?: Maybe<SchoolCreateWithoutTeamsInput>;
  update?: Maybe<SchoolUpdateWithoutTeamsInput>;
  upsert?: Maybe<SchoolUpsertWithoutTeamsInput>;
};

export type SchoolUpdateOneRequiredWithoutWorkInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutworkInput>;
  create?: Maybe<SchoolCreateWithoutWorkInput>;
  update?: Maybe<SchoolUpdateWithoutWorkInput>;
  upsert?: Maybe<SchoolUpsertWithoutWorkInput>;
};

export type SchoolUpdateOneWithoutAttachmentInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutattachmentInput>;
  create?: Maybe<SchoolCreateWithoutAttachmentInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<SchoolUpdateWithoutAttachmentInput>;
  upsert?: Maybe<SchoolUpsertWithoutAttachmentInput>;
};

export type SchoolUpdateOneWithoutBallotsInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutballotsInput>;
  create?: Maybe<SchoolCreateWithoutBallotsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<SchoolUpdateWithoutBallotsInput>;
  upsert?: Maybe<SchoolUpsertWithoutBallotsInput>;
};

export type SchoolUpdateOneWithoutDiscussionInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutdiscussionInput>;
  create?: Maybe<SchoolCreateWithoutDiscussionInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<SchoolUpdateWithoutDiscussionInput>;
  upsert?: Maybe<SchoolUpsertWithoutDiscussionInput>;
};

export type SchoolUpdateOneWithoutMembersInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutmembersInput>;
  create?: Maybe<SchoolCreateWithoutMembersInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<SchoolUpdateWithoutMembersInput>;
  upsert?: Maybe<SchoolUpsertWithoutMembersInput>;
};

export type SchoolUpdateOneWithoutVotedInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutVotedInput>;
  create?: Maybe<SchoolCreateWithoutVotedInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<SchoolUpdateWithoutVotedInput>;
  upsert?: Maybe<SchoolUpsertWithoutVotedInput>;
};

export type SchoolUpdateOneWithoutVoteInput = {
  connect?: Maybe<SchoolWhereUniqueInput>;
  connectOrCreate?: Maybe<SchoolCreateOrConnectWithoutVoteInput>;
  create?: Maybe<SchoolCreateWithoutVoteInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<SchoolUpdateWithoutVoteInput>;
  upsert?: Maybe<SchoolUpsertWithoutVoteInput>;
};

export type SchoolUpdateWithoutActivityInput = {
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutAttachmentInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutBallotsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutDiscussionInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutDomainInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutMembersInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutTeamsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutVotedInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutVoteInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  work?: Maybe<WorkUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutWorkInput = {
  activity?: Maybe<ActivityUpdateManyWithoutSchoolInput>;
  address?: Maybe<StringFieldUpdateOperationsInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutSchoolInput>;
  ballots?: Maybe<BallotUpdateManyWithoutSchoolInput>;
  canton?: Maybe<StringFieldUpdateOperationsInput>;
  city?: Maybe<StringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutSchoolInput>;
  domain?: Maybe<DomainUpdateOneWithoutSchoolsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutSchoolInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  teams?: Maybe<TeamUpdateManyWithoutSchoolInput>;
  type?: Maybe<StringFieldUpdateOperationsInput>;
  Vote?: Maybe<VoteUpdateManyWithoutSchoolInput>;
  Voted?: Maybe<VotedUpdateManyWithoutSchoolInput>;
  zip?: Maybe<StringFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithWhereUniqueWithoutDomainInput = {
  data: SchoolUpdateWithoutDomainInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolUpsertWithoutActivityInput = {
  create: SchoolCreateWithoutActivityInput;
  update: SchoolUpdateWithoutActivityInput;
};

export type SchoolUpsertWithoutAttachmentInput = {
  create: SchoolCreateWithoutAttachmentInput;
  update: SchoolUpdateWithoutAttachmentInput;
};

export type SchoolUpsertWithoutBallotsInput = {
  create: SchoolCreateWithoutBallotsInput;
  update: SchoolUpdateWithoutBallotsInput;
};

export type SchoolUpsertWithoutDiscussionInput = {
  create: SchoolCreateWithoutDiscussionInput;
  update: SchoolUpdateWithoutDiscussionInput;
};

export type SchoolUpsertWithoutMembersInput = {
  create: SchoolCreateWithoutMembersInput;
  update: SchoolUpdateWithoutMembersInput;
};

export type SchoolUpsertWithoutTeamsInput = {
  create: SchoolCreateWithoutTeamsInput;
  update: SchoolUpdateWithoutTeamsInput;
};

export type SchoolUpsertWithoutVotedInput = {
  create: SchoolCreateWithoutVotedInput;
  update: SchoolUpdateWithoutVotedInput;
};

export type SchoolUpsertWithoutVoteInput = {
  create: SchoolCreateWithoutVoteInput;
  update: SchoolUpdateWithoutVoteInput;
};

export type SchoolUpsertWithoutWorkInput = {
  create: SchoolCreateWithoutWorkInput;
  update: SchoolUpdateWithoutWorkInput;
};

export type SchoolUpsertWithWhereUniqueWithoutDomainInput = {
  create: SchoolCreateWithoutDomainInput;
  update: SchoolUpdateWithoutDomainInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolWhereInput = {
  activity?: Maybe<ActivityListRelationFilter>;
  address?: Maybe<StringFilter>;
  AND?: Maybe<Array<SchoolWhereInput>>;
  attachment?: Maybe<AttachmentListRelationFilter>;
  ballots?: Maybe<BallotListRelationFilter>;
  canton?: Maybe<StringFilter>;
  city?: Maybe<StringFilter>;
  discussion?: Maybe<DiscussionListRelationFilter>;
  domain?: Maybe<DomainWhereInput>;
  domainId?: Maybe<StringNullableFilter>;
  id?: Maybe<StringFilter>;
  members?: Maybe<UserListRelationFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<SchoolWhereInput>>;
  OR?: Maybe<Array<SchoolWhereInput>>;
  teams?: Maybe<TeamListRelationFilter>;
  type?: Maybe<StringFilter>;
  Vote?: Maybe<VoteListRelationFilter>;
  Voted?: Maybe<VotedListRelationFilter>;
  work?: Maybe<WorkListRelationFilter>;
  zip?: Maybe<StringFilter>;
};

export type SchoolWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type Swissvote = {
  __typename?: 'Swissvote';
  annahme?: Maybe<Scalars['Int']>;
  anr?: Maybe<Scalars['String']>;
  datum?: Maybe<Scalars['String']>;
  kategorien?: Maybe<Scalars['String']>;
  poster_ja?: Maybe<Scalars['String']>;
  poster_nein?: Maybe<Scalars['String']>;
  rechtsform?: Maybe<Scalars['Int']>;
  stand?: Maybe<Scalars['Int']>;
  stichwort?: Maybe<Scalars['String']>;
  swissvoteslink?: Maybe<Scalars['String']>;
  titel_kurz_d?: Maybe<Scalars['String']>;
  titel_off_d?: Maybe<Scalars['String']>;
  volk?: Maybe<Scalars['Int']>;
};

export type Team = {
  __typename?: 'Team';
  ballots: Array<Ballot>;
  cards: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  domain?: Maybe<Domain>;
  id: Scalars['String'];
  invite?: Maybe<Scalars['String']>;
  members: Array<User>;
  name: Scalars['String'];
  prefs: Scalars['Json'];
  school: School;
  teacher: User;
};


export type TeamBallotsArgs = {
  after?: Maybe<BallotWhereUniqueInput>;
  before?: Maybe<BallotWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type TeamMembersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TeamCreateInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateManyWithoutDomainInput = {
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutdomainInput>>;
  create?: Maybe<Array<TeamCreateWithoutDomainInput>>;
};

export type TeamCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<TeamCreateWithoutSchoolInput>>;
};

export type TeamCreateManyWithoutTeacherInput = {
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutteacherInput>>;
  create?: Maybe<Array<TeamCreateWithoutTeacherInput>>;
};

export type TeamCreateOneWithoutActivityInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutactivityInput>;
  create?: Maybe<TeamCreateWithoutActivityInput>;
};

export type TeamCreateOneWithoutAttachmentInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutattachmentInput>;
  create?: Maybe<TeamCreateWithoutAttachmentInput>;
};

export type TeamCreateOneWithoutBallotRunsInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutBallotRunsInput>;
  create?: Maybe<TeamCreateWithoutBallotRunsInput>;
};

export type TeamCreateOneWithoutBallotsInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutballotsInput>;
  create?: Maybe<TeamCreateWithoutBallotsInput>;
};

export type TeamCreateOneWithoutDiscussionInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutdiscussionInput>;
  create?: Maybe<TeamCreateWithoutDiscussionInput>;
};

export type TeamCreateOneWithoutMembersInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutmembersInput>;
  create?: Maybe<TeamCreateWithoutMembersInput>;
};

export type TeamCreateOneWithoutUserInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutUserInput>;
  create?: Maybe<TeamCreateWithoutUserInput>;
};

export type TeamCreateOneWithoutVotedInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutVotedInput>;
  create?: Maybe<TeamCreateWithoutVotedInput>;
};

export type TeamCreateOneWithoutVoteInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutVoteInput>;
  create?: Maybe<TeamCreateWithoutVoteInput>;
};

export type TeamCreateOneWithoutWorkInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutworkInput>;
  create?: Maybe<TeamCreateWithoutWorkInput>;
};

export type TeamCreateOrConnectWithoutactivityInput = {
  create: TeamCreateWithoutActivityInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutattachmentInput = {
  create: TeamCreateWithoutAttachmentInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutBallotRunsInput = {
  create: TeamCreateWithoutBallotRunsInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutballotsInput = {
  create: TeamCreateWithoutBallotsInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutdiscussionInput = {
  create: TeamCreateWithoutDiscussionInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutdomainInput = {
  create: TeamCreateWithoutDomainInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutmembersInput = {
  create: TeamCreateWithoutMembersInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutschoolInput = {
  create: TeamCreateWithoutSchoolInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutteacherInput = {
  create: TeamCreateWithoutTeacherInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutUserInput = {
  create: TeamCreateWithoutUserInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutVotedInput = {
  create: TeamCreateWithoutVotedInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutVoteInput = {
  create: TeamCreateWithoutVoteInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateOrConnectWithoutworkInput = {
  create: TeamCreateWithoutWorkInput;
  where: TeamWhereUniqueInput;
};

export type TeamCreateWithoutActivityInput = {
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutAttachmentInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutBallotRunsInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutBallotsInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutDiscussionInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutDomainInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutMembersInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutSchoolInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutTeacherInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutUserInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutVotedInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutVoteInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  work?: Maybe<WorkCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamCreateWithoutWorkInput = {
  activity?: Maybe<ActivityCreateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentCreateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunCreateManyWithoutTeamInput>;
  ballots?: Maybe<BallotCreateManyWithoutTeamInput>;
  cards?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  discussion?: Maybe<DiscussionCreateManyWithoutTeamInput>;
  domain?: Maybe<DomainCreateOneWithoutTeamInput>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
  members?: Maybe<UserCreateManyWithoutTeamInput>;
  name: Scalars['String'];
  prefs?: Maybe<Scalars['Json']>;
  school: SchoolCreateOneWithoutTeamsInput;
  teacher: UserCreateOneWithoutTeachesInput;
  User?: Maybe<UserCreateManyWithoutTeamInput>;
  Vote?: Maybe<VoteCreateManyWithoutTeamInput>;
  Voted?: Maybe<VotedCreateManyWithoutTeamInput>;
  year?: Maybe<Scalars['Int']>;
};

export type TeamListRelationFilter = {
  every?: Maybe<TeamWhereInput>;
  none?: Maybe<TeamWhereInput>;
  some?: Maybe<TeamWhereInput>;
};

export type TeamOrderByInput = {
  cards?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  domainId?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  invite?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  prefs?: Maybe<SortOrder>;
  schoolId?: Maybe<SortOrder>;
  teacherId?: Maybe<SortOrder>;
  year?: Maybe<SortOrder>;
};

export type TeamScalarWhereInput = {
  AND?: Maybe<Array<TeamScalarWhereInput>>;
  cards?: Maybe<StringFilter>;
  code?: Maybe<StringNullableFilter>;
  domainId?: Maybe<StringNullableFilter>;
  id?: Maybe<StringFilter>;
  invite?: Maybe<StringNullableFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<TeamScalarWhereInput>>;
  OR?: Maybe<Array<TeamScalarWhereInput>>;
  schoolId?: Maybe<StringFilter>;
  teacherId?: Maybe<StringFilter>;
  year?: Maybe<IntNullableFilter>;
};

export type TeamUpdateManyMutationInput = {
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateManyWithoutDomainInput = {
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutdomainInput>>;
  create?: Maybe<Array<TeamCreateWithoutDomainInput>>;
  delete?: Maybe<Array<TeamWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TeamScalarWhereInput>>;
  disconnect?: Maybe<Array<TeamWhereUniqueInput>>;
  set?: Maybe<Array<TeamWhereUniqueInput>>;
  update?: Maybe<Array<TeamUpdateWithWhereUniqueWithoutDomainInput>>;
  updateMany?: Maybe<Array<TeamUpdateManyWithWhereWithoutDomainInput>>;
  upsert?: Maybe<Array<TeamUpsertWithWhereUniqueWithoutDomainInput>>;
};

export type TeamUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<TeamCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<TeamWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TeamScalarWhereInput>>;
  disconnect?: Maybe<Array<TeamWhereUniqueInput>>;
  set?: Maybe<Array<TeamWhereUniqueInput>>;
  update?: Maybe<Array<TeamUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<TeamUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<TeamUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type TeamUpdateManyWithoutTeacherInput = {
  connect?: Maybe<Array<TeamWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<TeamCreateOrConnectWithoutteacherInput>>;
  create?: Maybe<Array<TeamCreateWithoutTeacherInput>>;
  delete?: Maybe<Array<TeamWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TeamScalarWhereInput>>;
  disconnect?: Maybe<Array<TeamWhereUniqueInput>>;
  set?: Maybe<Array<TeamWhereUniqueInput>>;
  update?: Maybe<Array<TeamUpdateWithWhereUniqueWithoutTeacherInput>>;
  updateMany?: Maybe<Array<TeamUpdateManyWithWhereWithoutTeacherInput>>;
  upsert?: Maybe<Array<TeamUpsertWithWhereUniqueWithoutTeacherInput>>;
};

export type TeamUpdateManyWithWhereWithoutDomainInput = {
  data: TeamUpdateManyMutationInput;
  where: TeamScalarWhereInput;
};

export type TeamUpdateManyWithWhereWithoutSchoolInput = {
  data: TeamUpdateManyMutationInput;
  where: TeamScalarWhereInput;
};

export type TeamUpdateManyWithWhereWithoutTeacherInput = {
  data: TeamUpdateManyMutationInput;
  where: TeamScalarWhereInput;
};

export type TeamUpdateOneRequiredWithoutActivityInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutactivityInput>;
  create?: Maybe<TeamCreateWithoutActivityInput>;
  update?: Maybe<TeamUpdateWithoutActivityInput>;
  upsert?: Maybe<TeamUpsertWithoutActivityInput>;
};

export type TeamUpdateOneRequiredWithoutAttachmentInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutattachmentInput>;
  create?: Maybe<TeamCreateWithoutAttachmentInput>;
  update?: Maybe<TeamUpdateWithoutAttachmentInput>;
  upsert?: Maybe<TeamUpsertWithoutAttachmentInput>;
};

export type TeamUpdateOneRequiredWithoutBallotRunsInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutBallotRunsInput>;
  create?: Maybe<TeamCreateWithoutBallotRunsInput>;
  update?: Maybe<TeamUpdateWithoutBallotRunsInput>;
  upsert?: Maybe<TeamUpsertWithoutBallotRunsInput>;
};

export type TeamUpdateOneRequiredWithoutDiscussionInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutdiscussionInput>;
  create?: Maybe<TeamCreateWithoutDiscussionInput>;
  update?: Maybe<TeamUpdateWithoutDiscussionInput>;
  upsert?: Maybe<TeamUpsertWithoutDiscussionInput>;
};

export type TeamUpdateOneRequiredWithoutWorkInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutworkInput>;
  create?: Maybe<TeamCreateWithoutWorkInput>;
  update?: Maybe<TeamUpdateWithoutWorkInput>;
  upsert?: Maybe<TeamUpsertWithoutWorkInput>;
};

export type TeamUpdateOneWithoutBallotsInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutballotsInput>;
  create?: Maybe<TeamCreateWithoutBallotsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutBallotsInput>;
  upsert?: Maybe<TeamUpsertWithoutBallotsInput>;
};

export type TeamUpdateOneWithoutMembersInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutmembersInput>;
  create?: Maybe<TeamCreateWithoutMembersInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutMembersInput>;
  upsert?: Maybe<TeamUpsertWithoutMembersInput>;
};

export type TeamUpdateOneWithoutUserInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutUserInput>;
  create?: Maybe<TeamCreateWithoutUserInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutUserInput>;
  upsert?: Maybe<TeamUpsertWithoutUserInput>;
};

export type TeamUpdateOneWithoutVotedInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutVotedInput>;
  create?: Maybe<TeamCreateWithoutVotedInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutVotedInput>;
  upsert?: Maybe<TeamUpsertWithoutVotedInput>;
};

export type TeamUpdateOneWithoutVoteInput = {
  connect?: Maybe<TeamWhereUniqueInput>;
  connectOrCreate?: Maybe<TeamCreateOrConnectWithoutVoteInput>;
  create?: Maybe<TeamCreateWithoutVoteInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<TeamUpdateWithoutVoteInput>;
  upsert?: Maybe<TeamUpsertWithoutVoteInput>;
};

export type TeamUpdateWithoutActivityInput = {
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutAttachmentInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutBallotRunsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutBallotsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutDiscussionInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutDomainInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutMembersInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutSchoolInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutTeacherInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutUserInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutVotedInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutVoteInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  work?: Maybe<WorkUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithoutWorkInput = {
  activity?: Maybe<ActivityUpdateManyWithoutTeamInput>;
  attachment?: Maybe<AttachmentUpdateManyWithoutTeamInput>;
  BallotRuns?: Maybe<BallotRunUpdateManyWithoutTeamInput>;
  ballots?: Maybe<BallotUpdateManyWithoutTeamInput>;
  cards?: Maybe<StringFieldUpdateOperationsInput>;
  code?: Maybe<NullableStringFieldUpdateOperationsInput>;
  discussion?: Maybe<DiscussionUpdateManyWithoutTeamInput>;
  domain?: Maybe<DomainUpdateOneWithoutTeamInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  invite?: Maybe<NullableStringFieldUpdateOperationsInput>;
  members?: Maybe<UserUpdateManyWithoutTeamInput>;
  name?: Maybe<StringFieldUpdateOperationsInput>;
  prefs?: Maybe<Scalars['Json']>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutTeamsInput>;
  teacher?: Maybe<UserUpdateOneRequiredWithoutTeachesInput>;
  User?: Maybe<UserUpdateManyWithoutTeamInput>;
  Vote?: Maybe<VoteUpdateManyWithoutTeamInput>;
  Voted?: Maybe<VotedUpdateManyWithoutTeamInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type TeamUpdateWithWhereUniqueWithoutDomainInput = {
  data: TeamUpdateWithoutDomainInput;
  where: TeamWhereUniqueInput;
};

export type TeamUpdateWithWhereUniqueWithoutSchoolInput = {
  data: TeamUpdateWithoutSchoolInput;
  where: TeamWhereUniqueInput;
};

export type TeamUpdateWithWhereUniqueWithoutTeacherInput = {
  data: TeamUpdateWithoutTeacherInput;
  where: TeamWhereUniqueInput;
};

export type TeamUpsertWithoutActivityInput = {
  create: TeamCreateWithoutActivityInput;
  update: TeamUpdateWithoutActivityInput;
};

export type TeamUpsertWithoutAttachmentInput = {
  create: TeamCreateWithoutAttachmentInput;
  update: TeamUpdateWithoutAttachmentInput;
};

export type TeamUpsertWithoutBallotRunsInput = {
  create: TeamCreateWithoutBallotRunsInput;
  update: TeamUpdateWithoutBallotRunsInput;
};

export type TeamUpsertWithoutBallotsInput = {
  create: TeamCreateWithoutBallotsInput;
  update: TeamUpdateWithoutBallotsInput;
};

export type TeamUpsertWithoutDiscussionInput = {
  create: TeamCreateWithoutDiscussionInput;
  update: TeamUpdateWithoutDiscussionInput;
};

export type TeamUpsertWithoutMembersInput = {
  create: TeamCreateWithoutMembersInput;
  update: TeamUpdateWithoutMembersInput;
};

export type TeamUpsertWithoutUserInput = {
  create: TeamCreateWithoutUserInput;
  update: TeamUpdateWithoutUserInput;
};

export type TeamUpsertWithoutVotedInput = {
  create: TeamCreateWithoutVotedInput;
  update: TeamUpdateWithoutVotedInput;
};

export type TeamUpsertWithoutVoteInput = {
  create: TeamCreateWithoutVoteInput;
  update: TeamUpdateWithoutVoteInput;
};

export type TeamUpsertWithoutWorkInput = {
  create: TeamCreateWithoutWorkInput;
  update: TeamUpdateWithoutWorkInput;
};

export type TeamUpsertWithWhereUniqueWithoutDomainInput = {
  create: TeamCreateWithoutDomainInput;
  update: TeamUpdateWithoutDomainInput;
  where: TeamWhereUniqueInput;
};

export type TeamUpsertWithWhereUniqueWithoutSchoolInput = {
  create: TeamCreateWithoutSchoolInput;
  update: TeamUpdateWithoutSchoolInput;
  where: TeamWhereUniqueInput;
};

export type TeamUpsertWithWhereUniqueWithoutTeacherInput = {
  create: TeamCreateWithoutTeacherInput;
  update: TeamUpdateWithoutTeacherInput;
  where: TeamWhereUniqueInput;
};

export type TeamWhereInput = {
  activity?: Maybe<ActivityListRelationFilter>;
  AND?: Maybe<Array<TeamWhereInput>>;
  attachment?: Maybe<AttachmentListRelationFilter>;
  BallotRuns?: Maybe<BallotRunListRelationFilter>;
  ballots?: Maybe<BallotListRelationFilter>;
  cards?: Maybe<StringFilter>;
  code?: Maybe<StringNullableFilter>;
  discussion?: Maybe<DiscussionListRelationFilter>;
  domain?: Maybe<DomainWhereInput>;
  domainId?: Maybe<StringNullableFilter>;
  id?: Maybe<StringFilter>;
  invite?: Maybe<StringNullableFilter>;
  members?: Maybe<UserListRelationFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<TeamWhereInput>>;
  OR?: Maybe<Array<TeamWhereInput>>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringFilter>;
  teacher?: Maybe<UserWhereInput>;
  teacherId?: Maybe<StringFilter>;
  User?: Maybe<UserListRelationFilter>;
  Vote?: Maybe<VoteListRelationFilter>;
  Voted?: Maybe<VotedListRelationFilter>;
  work?: Maybe<WorkListRelationFilter>;
  year?: Maybe<IntNullableFilter>;
};

export type TeamWhereUniqueInput = {
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  invite?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  attachments: Array<Attachment>;
  ballots: Array<Ballot>;
  createdAt: Scalars['DateTime'];
  discussions: Array<Discussion>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  reactions: Array<Reaction>;
  role: Role;
  school?: Maybe<School>;
  shortname?: Maybe<Scalars['String']>;
  teaches: Array<Team>;
  team?: Maybe<Team>;
  year?: Maybe<Scalars['Int']>;
};


export type UserAttachmentsArgs = {
  after?: Maybe<AttachmentWhereUniqueInput>;
  before?: Maybe<AttachmentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UserBallotsArgs = {
  after?: Maybe<BallotWhereUniqueInput>;
  before?: Maybe<BallotWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UserDiscussionsArgs = {
  after?: Maybe<DiscussionWhereUniqueInput>;
  before?: Maybe<DiscussionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UserReactionsArgs = {
  after?: Maybe<ReactionWhereUniqueInput>;
  before?: Maybe<ReactionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type UserTeachesArgs = {
  after?: Maybe<TeamWhereUniqueInput>;
  before?: Maybe<TeamWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserCreateInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<UserCreateWithoutSchoolInput>>;
};

export type UserCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<UserCreateWithoutTeamInput>>;
};

export type UserCreateManyWithoutWorkInput = {
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutworkInput>>;
  create?: Maybe<Array<UserCreateWithoutWorkInput>>;
};

export type UserCreateOneWithoutActivityInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutactivityInput>;
  create?: Maybe<UserCreateWithoutActivityInput>;
};

export type UserCreateOneWithoutAttachmentsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutattachmentsInput>;
  create?: Maybe<UserCreateWithoutAttachmentsInput>;
};

export type UserCreateOneWithoutBallotsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutballotsInput>;
  create?: Maybe<UserCreateWithoutBallotsInput>;
};

export type UserCreateOneWithoutDiscussionsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutdiscussionsInput>;
  create?: Maybe<UserCreateWithoutDiscussionsInput>;
};

export type UserCreateOneWithoutReactionsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutreactionsInput>;
  create?: Maybe<UserCreateWithoutReactionsInput>;
};

export type UserCreateOneWithoutTeachesInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutteachesInput>;
  create?: Maybe<UserCreateWithoutTeachesInput>;
};

export type UserCreateOneWithoutVotedInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutvotedInput>;
  create?: Maybe<UserCreateWithoutVotedInput>;
};

export type UserCreateOrConnectWithoutactivityInput = {
  create: UserCreateWithoutActivityInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutattachmentsInput = {
  create: UserCreateWithoutAttachmentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutballotsInput = {
  create: UserCreateWithoutBallotsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutdiscussionsInput = {
  create: UserCreateWithoutDiscussionsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutreactionsInput = {
  create: UserCreateWithoutReactionsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutschoolInput = {
  create: UserCreateWithoutSchoolInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutteachesInput = {
  create: UserCreateWithoutTeachesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutteamInput = {
  create: UserCreateWithoutTeamInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutvotedInput = {
  create: UserCreateWithoutVotedInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutworkInput = {
  create: UserCreateWithoutWorkInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutActivityInput = {
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutAttachmentsInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutBallotsInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutDiscussionsInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutReactionsInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutSchoolInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutTeachesInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutTeamInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutVotedInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  work?: Maybe<WorkCreateManyWithoutUsersInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserCreateWithoutWorkInput = {
  activity?: Maybe<ActivityCreateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutUserInput>;
  ballots?: Maybe<BallotCreateManyWithoutCreatorInput>;
  canton?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  discussions?: Maybe<DiscussionCreateManyWithoutUserInput>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutUserInput>;
  role?: Maybe<Role>;
  school?: Maybe<SchoolCreateOneWithoutMembersInput>;
  teaches?: Maybe<TeamCreateManyWithoutTeacherInput>;
  team?: Maybe<TeamCreateOneWithoutMembersInput>;
  Team?: Maybe<TeamCreateOneWithoutUserInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
  voted?: Maybe<VotedCreateManyWithoutUserInput>;
  year?: Maybe<Scalars['Int']>;
};

export type UserListRelationFilter = {
  every?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
};

export type UserOrderByInput = {
  canton?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  emailVerified?: Maybe<SortOrder>;
  gender?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  image?: Maybe<SortOrder>;
  lastname?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  role?: Maybe<SortOrder>;
  schoolId?: Maybe<SortOrder>;
  teamId?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  verified?: Maybe<SortOrder>;
  year?: Maybe<SortOrder>;
};

export type UserScalarWhereInput = {
  AND?: Maybe<Array<UserScalarWhereInput>>;
  canton?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringNullableFilter>;
  emailVerified?: Maybe<DateTimeNullableFilter>;
  gender?: Maybe<EnumGenderNullableFilter>;
  id?: Maybe<StringFilter>;
  image?: Maybe<StringNullableFilter>;
  lastname?: Maybe<StringNullableFilter>;
  name?: Maybe<StringNullableFilter>;
  NOT?: Maybe<Array<UserScalarWhereInput>>;
  OR?: Maybe<Array<UserScalarWhereInput>>;
  password?: Maybe<StringNullableFilter>;
  role?: Maybe<EnumRoleFilter>;
  schoolId?: Maybe<StringNullableFilter>;
  teamId?: Maybe<StringNullableFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  verified?: Maybe<BoolNullableFilter>;
  year?: Maybe<IntNullableFilter>;
};

export type UserUpdateInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<UserCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<UserWhereUniqueInput>>;
  deleteMany?: Maybe<Array<UserScalarWhereInput>>;
  disconnect?: Maybe<Array<UserWhereUniqueInput>>;
  set?: Maybe<Array<UserWhereUniqueInput>>;
  update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<UserUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type UserUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<UserCreateWithoutTeamInput>>;
  delete?: Maybe<Array<UserWhereUniqueInput>>;
  deleteMany?: Maybe<Array<UserScalarWhereInput>>;
  disconnect?: Maybe<Array<UserWhereUniqueInput>>;
  set?: Maybe<Array<UserWhereUniqueInput>>;
  update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<UserUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type UserUpdateManyWithoutWorkInput = {
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<UserCreateOrConnectWithoutworkInput>>;
  create?: Maybe<Array<UserCreateWithoutWorkInput>>;
  delete?: Maybe<Array<UserWhereUniqueInput>>;
  deleteMany?: Maybe<Array<UserScalarWhereInput>>;
  disconnect?: Maybe<Array<UserWhereUniqueInput>>;
  set?: Maybe<Array<UserWhereUniqueInput>>;
  update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutWorkInput>>;
  updateMany?: Maybe<Array<UserUpdateManyWithWhereWithoutWorkInput>>;
  upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutWorkInput>>;
};

export type UserUpdateManyWithWhereWithoutSchoolInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutTeamInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutWorkInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateOneRequiredWithoutActivityInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutactivityInput>;
  create?: Maybe<UserCreateWithoutActivityInput>;
  update?: Maybe<UserUpdateWithoutActivityInput>;
  upsert?: Maybe<UserUpsertWithoutActivityInput>;
};

export type UserUpdateOneRequiredWithoutAttachmentsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutattachmentsInput>;
  create?: Maybe<UserCreateWithoutAttachmentsInput>;
  update?: Maybe<UserUpdateWithoutAttachmentsInput>;
  upsert?: Maybe<UserUpsertWithoutAttachmentsInput>;
};

export type UserUpdateOneRequiredWithoutDiscussionsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutdiscussionsInput>;
  create?: Maybe<UserCreateWithoutDiscussionsInput>;
  update?: Maybe<UserUpdateWithoutDiscussionsInput>;
  upsert?: Maybe<UserUpsertWithoutDiscussionsInput>;
};

export type UserUpdateOneRequiredWithoutReactionsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutreactionsInput>;
  create?: Maybe<UserCreateWithoutReactionsInput>;
  update?: Maybe<UserUpdateWithoutReactionsInput>;
  upsert?: Maybe<UserUpsertWithoutReactionsInput>;
};

export type UserUpdateOneRequiredWithoutTeachesInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutteachesInput>;
  create?: Maybe<UserCreateWithoutTeachesInput>;
  update?: Maybe<UserUpdateWithoutTeachesInput>;
  upsert?: Maybe<UserUpsertWithoutTeachesInput>;
};

export type UserUpdateOneRequiredWithoutVotedInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutvotedInput>;
  create?: Maybe<UserCreateWithoutVotedInput>;
  update?: Maybe<UserUpdateWithoutVotedInput>;
  upsert?: Maybe<UserUpsertWithoutVotedInput>;
};

export type UserUpdateOneWithoutBallotsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutballotsInput>;
  create?: Maybe<UserCreateWithoutBallotsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutBallotsInput>;
  upsert?: Maybe<UserUpsertWithoutBallotsInput>;
};

export type UserUpdateWithoutActivityInput = {
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutAttachmentsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutBallotsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutDiscussionsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutReactionsInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutSchoolInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutTeachesInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutTeamInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutVotedInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  work?: Maybe<WorkUpdateManyWithoutUsersInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutWorkInput = {
  activity?: Maybe<ActivityUpdateManyWithoutUserInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutUserInput>;
  ballots?: Maybe<BallotUpdateManyWithoutCreatorInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  discussions?: Maybe<DiscussionUpdateManyWithoutUserInput>;
  email?: Maybe<NullableStringFieldUpdateOperationsInput>;
  emailVerified?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  gender?: Maybe<NullableEnumGenderFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  image?: Maybe<NullableStringFieldUpdateOperationsInput>;
  lastname?: Maybe<NullableStringFieldUpdateOperationsInput>;
  name?: Maybe<NullableStringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutUserInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutMembersInput>;
  teaches?: Maybe<TeamUpdateManyWithoutTeacherInput>;
  team?: Maybe<TeamUpdateOneWithoutMembersInput>;
  Team?: Maybe<TeamUpdateOneWithoutUserInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  verified?: Maybe<NullableBoolFieldUpdateOperationsInput>;
  voted?: Maybe<VotedUpdateManyWithoutUserInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type UserUpdateWithWhereUniqueWithoutSchoolInput = {
  data: UserUpdateWithoutSchoolInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutTeamInput = {
  data: UserUpdateWithoutTeamInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutWorkInput = {
  data: UserUpdateWithoutWorkInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutActivityInput = {
  create: UserCreateWithoutActivityInput;
  update: UserUpdateWithoutActivityInput;
};

export type UserUpsertWithoutAttachmentsInput = {
  create: UserCreateWithoutAttachmentsInput;
  update: UserUpdateWithoutAttachmentsInput;
};

export type UserUpsertWithoutBallotsInput = {
  create: UserCreateWithoutBallotsInput;
  update: UserUpdateWithoutBallotsInput;
};

export type UserUpsertWithoutDiscussionsInput = {
  create: UserCreateWithoutDiscussionsInput;
  update: UserUpdateWithoutDiscussionsInput;
};

export type UserUpsertWithoutReactionsInput = {
  create: UserCreateWithoutReactionsInput;
  update: UserUpdateWithoutReactionsInput;
};

export type UserUpsertWithoutTeachesInput = {
  create: UserCreateWithoutTeachesInput;
  update: UserUpdateWithoutTeachesInput;
};

export type UserUpsertWithoutVotedInput = {
  create: UserCreateWithoutVotedInput;
  update: UserUpdateWithoutVotedInput;
};

export type UserUpsertWithWhereUniqueWithoutSchoolInput = {
  create: UserCreateWithoutSchoolInput;
  update: UserUpdateWithoutSchoolInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutTeamInput = {
  create: UserCreateWithoutTeamInput;
  update: UserUpdateWithoutTeamInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutWorkInput = {
  create: UserCreateWithoutWorkInput;
  update: UserUpdateWithoutWorkInput;
  where: UserWhereUniqueInput;
};

export type UserWhereInput = {
  activity?: Maybe<ActivityListRelationFilter>;
  AND?: Maybe<Array<UserWhereInput>>;
  attachments?: Maybe<AttachmentListRelationFilter>;
  ballots?: Maybe<BallotListRelationFilter>;
  canton?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  discussions?: Maybe<DiscussionListRelationFilter>;
  email?: Maybe<StringNullableFilter>;
  emailVerified?: Maybe<DateTimeNullableFilter>;
  gender?: Maybe<EnumGenderNullableFilter>;
  id?: Maybe<StringFilter>;
  image?: Maybe<StringNullableFilter>;
  lastname?: Maybe<StringNullableFilter>;
  name?: Maybe<StringNullableFilter>;
  NOT?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  password?: Maybe<StringNullableFilter>;
  reactions?: Maybe<ReactionListRelationFilter>;
  role?: Maybe<EnumRoleFilter>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringNullableFilter>;
  teaches?: Maybe<TeamListRelationFilter>;
  team?: Maybe<TeamWhereInput>;
  Team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringNullableFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  verified?: Maybe<BoolNullableFilter>;
  voted?: Maybe<VotedListRelationFilter>;
  work?: Maybe<WorkListRelationFilter>;
  year?: Maybe<IntNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export enum Visibility {
  Private = 'Private',
  Public = 'Public',
  School = 'School',
  Team = 'Team'
}

export type Vote = {
  __typename?: 'Vote';
  ballot: Ballot;
  verify?: Maybe<Scalars['String']>;
};

export type VoteCreateManyWithoutBallotInput = {
  connect?: Maybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VoteCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<VoteCreateWithoutBallotInput>>;
};

export type VoteCreateManyWithoutBallotRunInput = {
  connect?: Maybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VoteCreateOrConnectWithoutballotRunInput>>;
  create?: Maybe<Array<VoteCreateWithoutBallotRunInput>>;
};

export type VoteCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VoteCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<VoteCreateWithoutSchoolInput>>;
};

export type VoteCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VoteCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<VoteCreateWithoutTeamInput>>;
};

export type VoteCreateOrConnectWithoutballotInput = {
  create: VoteCreateWithoutBallotInput;
  where: VoteWhereUniqueInput;
};

export type VoteCreateOrConnectWithoutballotRunInput = {
  create: VoteCreateWithoutBallotRunInput;
  where: VoteWhereUniqueInput;
};

export type VoteCreateOrConnectWithoutschoolInput = {
  create: VoteCreateWithoutSchoolInput;
  where: VoteWhereUniqueInput;
};

export type VoteCreateOrConnectWithoutteamInput = {
  create: VoteCreateWithoutTeamInput;
  where: VoteWhereUniqueInput;
};

export type VoteCreateWithoutBallotInput = {
  ballotRun?: Maybe<BallotRunCreateOneWithoutVoteInput>;
  canton?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutVoteInput>;
  schooltype?: Maybe<Scalars['String']>;
  team?: Maybe<TeamCreateOneWithoutVoteInput>;
  verify?: Maybe<Scalars['String']>;
  vote: Scalars['Int'];
  year?: Maybe<Scalars['Int']>;
};

export type VoteCreateWithoutBallotRunInput = {
  ballot: BallotCreateOneWithoutVotesInput;
  canton?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutVoteInput>;
  schooltype?: Maybe<Scalars['String']>;
  team?: Maybe<TeamCreateOneWithoutVoteInput>;
  verify?: Maybe<Scalars['String']>;
  vote: Scalars['Int'];
  year?: Maybe<Scalars['Int']>;
};

export type VoteCreateWithoutSchoolInput = {
  ballot: BallotCreateOneWithoutVotesInput;
  ballotRun?: Maybe<BallotRunCreateOneWithoutVoteInput>;
  canton?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  schooltype?: Maybe<Scalars['String']>;
  team?: Maybe<TeamCreateOneWithoutVoteInput>;
  verify?: Maybe<Scalars['String']>;
  vote: Scalars['Int'];
  year?: Maybe<Scalars['Int']>;
};

export type VoteCreateWithoutTeamInput = {
  ballot: BallotCreateOneWithoutVotesInput;
  ballotRun?: Maybe<BallotRunCreateOneWithoutVoteInput>;
  canton?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutVoteInput>;
  schooltype?: Maybe<Scalars['String']>;
  verify?: Maybe<Scalars['String']>;
  vote: Scalars['Int'];
  year?: Maybe<Scalars['Int']>;
};

export type VotedCreateManyWithoutBallotInput = {
  connect?: Maybe<Array<VotedWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VotedCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<VotedCreateWithoutBallotInput>>;
};

export type VotedCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<VotedWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VotedCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<VotedCreateWithoutSchoolInput>>;
};

export type VotedCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<VotedWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VotedCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<VotedCreateWithoutTeamInput>>;
};

export type VotedCreateManyWithoutUserInput = {
  connect?: Maybe<Array<VotedWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VotedCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<VotedCreateWithoutUserInput>>;
};

export type VotedCreateOrConnectWithoutballotInput = {
  create: VotedCreateWithoutBallotInput;
  where: VotedWhereUniqueInput;
};

export type VotedCreateOrConnectWithoutschoolInput = {
  create: VotedCreateWithoutSchoolInput;
  where: VotedWhereUniqueInput;
};

export type VotedCreateOrConnectWithoutteamInput = {
  create: VotedCreateWithoutTeamInput;
  where: VotedWhereUniqueInput;
};

export type VotedCreateOrConnectWithoutuserInput = {
  create: VotedCreateWithoutUserInput;
  where: VotedWhereUniqueInput;
};

export type VotedCreateWithoutBallotInput = {
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutVotedInput>;
  signature?: Maybe<Scalars['String']>;
  team?: Maybe<TeamCreateOneWithoutVotedInput>;
  user: UserCreateOneWithoutVotedInput;
};

export type VotedCreateWithoutSchoolInput = {
  ballot: BallotCreateOneWithoutVotedInput;
  id?: Maybe<Scalars['String']>;
  signature?: Maybe<Scalars['String']>;
  team?: Maybe<TeamCreateOneWithoutVotedInput>;
  user: UserCreateOneWithoutVotedInput;
};

export type VotedCreateWithoutTeamInput = {
  ballot: BallotCreateOneWithoutVotedInput;
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutVotedInput>;
  signature?: Maybe<Scalars['String']>;
  user: UserCreateOneWithoutVotedInput;
};

export type VotedCreateWithoutUserInput = {
  ballot: BallotCreateOneWithoutVotedInput;
  id?: Maybe<Scalars['String']>;
  school?: Maybe<SchoolCreateOneWithoutVotedInput>;
  signature?: Maybe<Scalars['String']>;
  team?: Maybe<TeamCreateOneWithoutVotedInput>;
};

export type VotedListRelationFilter = {
  every?: Maybe<VotedWhereInput>;
  none?: Maybe<VotedWhereInput>;
  some?: Maybe<VotedWhereInput>;
};

export type VotedScalarWhereInput = {
  AND?: Maybe<Array<VotedScalarWhereInput>>;
  ballotId?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<VotedScalarWhereInput>>;
  OR?: Maybe<Array<VotedScalarWhereInput>>;
  schoolId?: Maybe<StringNullableFilter>;
  signature?: Maybe<StringNullableFilter>;
  teamId?: Maybe<StringNullableFilter>;
  userId?: Maybe<StringFilter>;
};

export type VotedUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  signature?: Maybe<NullableStringFieldUpdateOperationsInput>;
};

export type VotedUpdateManyWithoutBallotInput = {
  connect?: Maybe<Array<VotedWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VotedCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<VotedCreateWithoutBallotInput>>;
  delete?: Maybe<Array<VotedWhereUniqueInput>>;
  deleteMany?: Maybe<Array<VotedScalarWhereInput>>;
  disconnect?: Maybe<Array<VotedWhereUniqueInput>>;
  set?: Maybe<Array<VotedWhereUniqueInput>>;
  update?: Maybe<Array<VotedUpdateWithWhereUniqueWithoutBallotInput>>;
  updateMany?: Maybe<Array<VotedUpdateManyWithWhereWithoutBallotInput>>;
  upsert?: Maybe<Array<VotedUpsertWithWhereUniqueWithoutBallotInput>>;
};

export type VotedUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<VotedWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VotedCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<VotedCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<VotedWhereUniqueInput>>;
  deleteMany?: Maybe<Array<VotedScalarWhereInput>>;
  disconnect?: Maybe<Array<VotedWhereUniqueInput>>;
  set?: Maybe<Array<VotedWhereUniqueInput>>;
  update?: Maybe<Array<VotedUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<VotedUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<VotedUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type VotedUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<VotedWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VotedCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<VotedCreateWithoutTeamInput>>;
  delete?: Maybe<Array<VotedWhereUniqueInput>>;
  deleteMany?: Maybe<Array<VotedScalarWhereInput>>;
  disconnect?: Maybe<Array<VotedWhereUniqueInput>>;
  set?: Maybe<Array<VotedWhereUniqueInput>>;
  update?: Maybe<Array<VotedUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<VotedUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<VotedUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type VotedUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<VotedWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VotedCreateOrConnectWithoutuserInput>>;
  create?: Maybe<Array<VotedCreateWithoutUserInput>>;
  delete?: Maybe<Array<VotedWhereUniqueInput>>;
  deleteMany?: Maybe<Array<VotedScalarWhereInput>>;
  disconnect?: Maybe<Array<VotedWhereUniqueInput>>;
  set?: Maybe<Array<VotedWhereUniqueInput>>;
  update?: Maybe<Array<VotedUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<VotedUpdateManyWithWhereWithoutUserInput>>;
  upsert?: Maybe<Array<VotedUpsertWithWhereUniqueWithoutUserInput>>;
};

export type VotedUpdateManyWithWhereWithoutBallotInput = {
  data: VotedUpdateManyMutationInput;
  where: VotedScalarWhereInput;
};

export type VotedUpdateManyWithWhereWithoutSchoolInput = {
  data: VotedUpdateManyMutationInput;
  where: VotedScalarWhereInput;
};

export type VotedUpdateManyWithWhereWithoutTeamInput = {
  data: VotedUpdateManyMutationInput;
  where: VotedScalarWhereInput;
};

export type VotedUpdateManyWithWhereWithoutUserInput = {
  data: VotedUpdateManyMutationInput;
  where: VotedScalarWhereInput;
};

export type VotedUpdateWithoutBallotInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutVotedInput>;
  signature?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutVotedInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutVotedInput>;
};

export type VotedUpdateWithoutSchoolInput = {
  ballot?: Maybe<BallotUpdateOneRequiredWithoutVotedInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  signature?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutVotedInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutVotedInput>;
};

export type VotedUpdateWithoutTeamInput = {
  ballot?: Maybe<BallotUpdateOneRequiredWithoutVotedInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutVotedInput>;
  signature?: Maybe<NullableStringFieldUpdateOperationsInput>;
  user?: Maybe<UserUpdateOneRequiredWithoutVotedInput>;
};

export type VotedUpdateWithoutUserInput = {
  ballot?: Maybe<BallotUpdateOneRequiredWithoutVotedInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutVotedInput>;
  signature?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutVotedInput>;
};

export type VotedUpdateWithWhereUniqueWithoutBallotInput = {
  data: VotedUpdateWithoutBallotInput;
  where: VotedWhereUniqueInput;
};

export type VotedUpdateWithWhereUniqueWithoutSchoolInput = {
  data: VotedUpdateWithoutSchoolInput;
  where: VotedWhereUniqueInput;
};

export type VotedUpdateWithWhereUniqueWithoutTeamInput = {
  data: VotedUpdateWithoutTeamInput;
  where: VotedWhereUniqueInput;
};

export type VotedUpdateWithWhereUniqueWithoutUserInput = {
  data: VotedUpdateWithoutUserInput;
  where: VotedWhereUniqueInput;
};

export type VotedUpsertWithWhereUniqueWithoutBallotInput = {
  create: VotedCreateWithoutBallotInput;
  update: VotedUpdateWithoutBallotInput;
  where: VotedWhereUniqueInput;
};

export type VotedUpsertWithWhereUniqueWithoutSchoolInput = {
  create: VotedCreateWithoutSchoolInput;
  update: VotedUpdateWithoutSchoolInput;
  where: VotedWhereUniqueInput;
};

export type VotedUpsertWithWhereUniqueWithoutTeamInput = {
  create: VotedCreateWithoutTeamInput;
  update: VotedUpdateWithoutTeamInput;
  where: VotedWhereUniqueInput;
};

export type VotedUpsertWithWhereUniqueWithoutUserInput = {
  create: VotedCreateWithoutUserInput;
  update: VotedUpdateWithoutUserInput;
  where: VotedWhereUniqueInput;
};

export type VotedWhereInput = {
  AND?: Maybe<Array<VotedWhereInput>>;
  ballot?: Maybe<BallotWhereInput>;
  ballotId?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<VotedWhereInput>>;
  OR?: Maybe<Array<VotedWhereInput>>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringNullableFilter>;
  signature?: Maybe<StringNullableFilter>;
  team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringNullableFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type VotedWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type VoteListRelationFilter = {
  every?: Maybe<VoteWhereInput>;
  none?: Maybe<VoteWhereInput>;
  some?: Maybe<VoteWhereInput>;
};

export type VoteScalarWhereInput = {
  AND?: Maybe<Array<VoteScalarWhereInput>>;
  ballotId?: Maybe<StringFilter>;
  ballotRunId?: Maybe<StringNullableFilter>;
  canton?: Maybe<StringNullableFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<VoteScalarWhereInput>>;
  OR?: Maybe<Array<VoteScalarWhereInput>>;
  schoolId?: Maybe<StringNullableFilter>;
  schooltype?: Maybe<StringNullableFilter>;
  teamId?: Maybe<StringNullableFilter>;
  verify?: Maybe<StringNullableFilter>;
  vote?: Maybe<IntFilter>;
  year?: Maybe<IntNullableFilter>;
};

export type VoteUpdateManyMutationInput = {
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  schooltype?: Maybe<NullableStringFieldUpdateOperationsInput>;
  verify?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vote?: Maybe<IntFieldUpdateOperationsInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type VoteUpdateManyWithoutBallotInput = {
  connect?: Maybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VoteCreateOrConnectWithoutballotInput>>;
  create?: Maybe<Array<VoteCreateWithoutBallotInput>>;
  delete?: Maybe<Array<VoteWhereUniqueInput>>;
  deleteMany?: Maybe<Array<VoteScalarWhereInput>>;
  disconnect?: Maybe<Array<VoteWhereUniqueInput>>;
  set?: Maybe<Array<VoteWhereUniqueInput>>;
  update?: Maybe<Array<VoteUpdateWithWhereUniqueWithoutBallotInput>>;
  updateMany?: Maybe<Array<VoteUpdateManyWithWhereWithoutBallotInput>>;
  upsert?: Maybe<Array<VoteUpsertWithWhereUniqueWithoutBallotInput>>;
};

export type VoteUpdateManyWithoutBallotRunInput = {
  connect?: Maybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VoteCreateOrConnectWithoutballotRunInput>>;
  create?: Maybe<Array<VoteCreateWithoutBallotRunInput>>;
  delete?: Maybe<Array<VoteWhereUniqueInput>>;
  deleteMany?: Maybe<Array<VoteScalarWhereInput>>;
  disconnect?: Maybe<Array<VoteWhereUniqueInput>>;
  set?: Maybe<Array<VoteWhereUniqueInput>>;
  update?: Maybe<Array<VoteUpdateWithWhereUniqueWithoutBallotRunInput>>;
  updateMany?: Maybe<Array<VoteUpdateManyWithWhereWithoutBallotRunInput>>;
  upsert?: Maybe<Array<VoteUpsertWithWhereUniqueWithoutBallotRunInput>>;
};

export type VoteUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VoteCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<VoteCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<VoteWhereUniqueInput>>;
  deleteMany?: Maybe<Array<VoteScalarWhereInput>>;
  disconnect?: Maybe<Array<VoteWhereUniqueInput>>;
  set?: Maybe<Array<VoteWhereUniqueInput>>;
  update?: Maybe<Array<VoteUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<VoteUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<VoteUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type VoteUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<VoteWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<VoteCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<VoteCreateWithoutTeamInput>>;
  delete?: Maybe<Array<VoteWhereUniqueInput>>;
  deleteMany?: Maybe<Array<VoteScalarWhereInput>>;
  disconnect?: Maybe<Array<VoteWhereUniqueInput>>;
  set?: Maybe<Array<VoteWhereUniqueInput>>;
  update?: Maybe<Array<VoteUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<VoteUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<VoteUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type VoteUpdateManyWithWhereWithoutBallotInput = {
  data: VoteUpdateManyMutationInput;
  where: VoteScalarWhereInput;
};

export type VoteUpdateManyWithWhereWithoutBallotRunInput = {
  data: VoteUpdateManyMutationInput;
  where: VoteScalarWhereInput;
};

export type VoteUpdateManyWithWhereWithoutSchoolInput = {
  data: VoteUpdateManyMutationInput;
  where: VoteScalarWhereInput;
};

export type VoteUpdateManyWithWhereWithoutTeamInput = {
  data: VoteUpdateManyMutationInput;
  where: VoteScalarWhereInput;
};

export type VoteUpdateWithoutBallotInput = {
  ballotRun?: Maybe<BallotRunUpdateOneWithoutVoteInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutVoteInput>;
  schooltype?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutVoteInput>;
  verify?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vote?: Maybe<IntFieldUpdateOperationsInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type VoteUpdateWithoutBallotRunInput = {
  ballot?: Maybe<BallotUpdateOneRequiredWithoutVotesInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutVoteInput>;
  schooltype?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutVoteInput>;
  verify?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vote?: Maybe<IntFieldUpdateOperationsInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type VoteUpdateWithoutSchoolInput = {
  ballot?: Maybe<BallotUpdateOneRequiredWithoutVotesInput>;
  ballotRun?: Maybe<BallotRunUpdateOneWithoutVoteInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  schooltype?: Maybe<NullableStringFieldUpdateOperationsInput>;
  team?: Maybe<TeamUpdateOneWithoutVoteInput>;
  verify?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vote?: Maybe<IntFieldUpdateOperationsInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type VoteUpdateWithoutTeamInput = {
  ballot?: Maybe<BallotUpdateOneRequiredWithoutVotesInput>;
  ballotRun?: Maybe<BallotRunUpdateOneWithoutVoteInput>;
  canton?: Maybe<NullableStringFieldUpdateOperationsInput>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneWithoutVoteInput>;
  schooltype?: Maybe<NullableStringFieldUpdateOperationsInput>;
  verify?: Maybe<NullableStringFieldUpdateOperationsInput>;
  vote?: Maybe<IntFieldUpdateOperationsInput>;
  year?: Maybe<NullableIntFieldUpdateOperationsInput>;
};

export type VoteUpdateWithWhereUniqueWithoutBallotInput = {
  data: VoteUpdateWithoutBallotInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpdateWithWhereUniqueWithoutBallotRunInput = {
  data: VoteUpdateWithoutBallotRunInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpdateWithWhereUniqueWithoutSchoolInput = {
  data: VoteUpdateWithoutSchoolInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpdateWithWhereUniqueWithoutTeamInput = {
  data: VoteUpdateWithoutTeamInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpsertWithWhereUniqueWithoutBallotInput = {
  create: VoteCreateWithoutBallotInput;
  update: VoteUpdateWithoutBallotInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpsertWithWhereUniqueWithoutBallotRunInput = {
  create: VoteCreateWithoutBallotRunInput;
  update: VoteUpdateWithoutBallotRunInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpsertWithWhereUniqueWithoutSchoolInput = {
  create: VoteCreateWithoutSchoolInput;
  update: VoteUpdateWithoutSchoolInput;
  where: VoteWhereUniqueInput;
};

export type VoteUpsertWithWhereUniqueWithoutTeamInput = {
  create: VoteCreateWithoutTeamInput;
  update: VoteUpdateWithoutTeamInput;
  where: VoteWhereUniqueInput;
};

export type VoteWhereInput = {
  AND?: Maybe<Array<VoteWhereInput>>;
  ballot?: Maybe<BallotWhereInput>;
  ballotId?: Maybe<StringFilter>;
  ballotRun?: Maybe<BallotRunWhereInput>;
  ballotRunId?: Maybe<StringNullableFilter>;
  canton?: Maybe<StringNullableFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<VoteWhereInput>>;
  OR?: Maybe<Array<VoteWhereInput>>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringNullableFilter>;
  schooltype?: Maybe<StringNullableFilter>;
  team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringNullableFilter>;
  verify?: Maybe<StringNullableFilter>;
  vote?: Maybe<IntFilter>;
  year?: Maybe<IntNullableFilter>;
};

export type VoteWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Work = {
  __typename?: 'Work';
  attachments: Array<Attachment>;
  card?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['Json']>;
  id: Scalars['String'];
  reactions: Array<Reaction>;
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};


export type WorkAttachmentsArgs = {
  after?: Maybe<AttachmentWhereUniqueInput>;
  before?: Maybe<AttachmentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type WorkReactionsArgs = {
  after?: Maybe<ReactionWhereUniqueInput>;
  before?: Maybe<ReactionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type WorkUsersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type WorkCreateInput = {
  activities?: Maybe<ActivityCreateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutWorkInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutWorkInput>;
  school: SchoolCreateOneWithoutWorkInput;
  team: TeamCreateOneWithoutWorkInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutWorkInput>;
  visibility?: Maybe<Visibility>;
};

export type WorkCreateManyWithoutSchoolInput = {
  connect?: Maybe<Array<WorkWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<WorkCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<WorkCreateWithoutSchoolInput>>;
};

export type WorkCreateManyWithoutTeamInput = {
  connect?: Maybe<Array<WorkWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<WorkCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<WorkCreateWithoutTeamInput>>;
};

export type WorkCreateManyWithoutUsersInput = {
  connect?: Maybe<Array<WorkWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<WorkCreateOrConnectWithoutusersInput>>;
  create?: Maybe<Array<WorkCreateWithoutUsersInput>>;
};

export type WorkCreateOneWithoutActivitiesInput = {
  connect?: Maybe<WorkWhereUniqueInput>;
  connectOrCreate?: Maybe<WorkCreateOrConnectWithoutactivitiesInput>;
  create?: Maybe<WorkCreateWithoutActivitiesInput>;
};

export type WorkCreateOneWithoutAttachmentsInput = {
  connect?: Maybe<WorkWhereUniqueInput>;
  connectOrCreate?: Maybe<WorkCreateOrConnectWithoutattachmentsInput>;
  create?: Maybe<WorkCreateWithoutAttachmentsInput>;
};

export type WorkCreateOneWithoutReactionsInput = {
  connect?: Maybe<WorkWhereUniqueInput>;
  connectOrCreate?: Maybe<WorkCreateOrConnectWithoutreactionsInput>;
  create?: Maybe<WorkCreateWithoutReactionsInput>;
};

export type WorkCreateOrConnectWithoutactivitiesInput = {
  create: WorkCreateWithoutActivitiesInput;
  where: WorkWhereUniqueInput;
};

export type WorkCreateOrConnectWithoutattachmentsInput = {
  create: WorkCreateWithoutAttachmentsInput;
  where: WorkWhereUniqueInput;
};

export type WorkCreateOrConnectWithoutreactionsInput = {
  create: WorkCreateWithoutReactionsInput;
  where: WorkWhereUniqueInput;
};

export type WorkCreateOrConnectWithoutschoolInput = {
  create: WorkCreateWithoutSchoolInput;
  where: WorkWhereUniqueInput;
};

export type WorkCreateOrConnectWithoutteamInput = {
  create: WorkCreateWithoutTeamInput;
  where: WorkWhereUniqueInput;
};

export type WorkCreateOrConnectWithoutusersInput = {
  create: WorkCreateWithoutUsersInput;
  where: WorkWhereUniqueInput;
};

export type WorkCreateWithoutActivitiesInput = {
  attachments?: Maybe<AttachmentCreateManyWithoutWorkInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutWorkInput>;
  school: SchoolCreateOneWithoutWorkInput;
  team: TeamCreateOneWithoutWorkInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutWorkInput>;
  visibility?: Maybe<Visibility>;
};

export type WorkCreateWithoutAttachmentsInput = {
  activities?: Maybe<ActivityCreateManyWithoutWorkInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutWorkInput>;
  school: SchoolCreateOneWithoutWorkInput;
  team: TeamCreateOneWithoutWorkInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutWorkInput>;
  visibility?: Maybe<Visibility>;
};

export type WorkCreateWithoutReactionsInput = {
  activities?: Maybe<ActivityCreateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutWorkInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['String']>;
  school: SchoolCreateOneWithoutWorkInput;
  team: TeamCreateOneWithoutWorkInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutWorkInput>;
  visibility?: Maybe<Visibility>;
};

export type WorkCreateWithoutSchoolInput = {
  activities?: Maybe<ActivityCreateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutWorkInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutWorkInput>;
  team: TeamCreateOneWithoutWorkInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutWorkInput>;
  visibility?: Maybe<Visibility>;
};

export type WorkCreateWithoutTeamInput = {
  activities?: Maybe<ActivityCreateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutWorkInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutWorkInput>;
  school: SchoolCreateOneWithoutWorkInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutWorkInput>;
  visibility?: Maybe<Visibility>;
};

export type WorkCreateWithoutUsersInput = {
  activities?: Maybe<ActivityCreateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentCreateManyWithoutWorkInput>;
  card?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['String']>;
  reactions?: Maybe<ReactionCreateManyWithoutWorkInput>;
  school: SchoolCreateOneWithoutWorkInput;
  team: TeamCreateOneWithoutWorkInput;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  visibility?: Maybe<Visibility>;
};

export type WorkListRelationFilter = {
  every?: Maybe<WorkWhereInput>;
  none?: Maybe<WorkWhereInput>;
  some?: Maybe<WorkWhereInput>;
};

export type WorkOrderByInput = {
  card?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  data?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  schoolId?: Maybe<SortOrder>;
  teamId?: Maybe<SortOrder>;
  text?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  visibility?: Maybe<SortOrder>;
};

export type WorkScalarWhereInput = {
  AND?: Maybe<Array<WorkScalarWhereInput>>;
  card?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  data?: Maybe<JsonNullableFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<WorkScalarWhereInput>>;
  OR?: Maybe<Array<WorkScalarWhereInput>>;
  schoolId?: Maybe<StringFilter>;
  teamId?: Maybe<StringFilter>;
  text?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  visibility?: Maybe<EnumVisibilityFilter>;
};

export type WorkUpdateManyMutationInput = {
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type WorkUpdateManyWithoutSchoolInput = {
  connect?: Maybe<Array<WorkWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<WorkCreateOrConnectWithoutschoolInput>>;
  create?: Maybe<Array<WorkCreateWithoutSchoolInput>>;
  delete?: Maybe<Array<WorkWhereUniqueInput>>;
  deleteMany?: Maybe<Array<WorkScalarWhereInput>>;
  disconnect?: Maybe<Array<WorkWhereUniqueInput>>;
  set?: Maybe<Array<WorkWhereUniqueInput>>;
  update?: Maybe<Array<WorkUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: Maybe<Array<WorkUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: Maybe<Array<WorkUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type WorkUpdateManyWithoutTeamInput = {
  connect?: Maybe<Array<WorkWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<WorkCreateOrConnectWithoutteamInput>>;
  create?: Maybe<Array<WorkCreateWithoutTeamInput>>;
  delete?: Maybe<Array<WorkWhereUniqueInput>>;
  deleteMany?: Maybe<Array<WorkScalarWhereInput>>;
  disconnect?: Maybe<Array<WorkWhereUniqueInput>>;
  set?: Maybe<Array<WorkWhereUniqueInput>>;
  update?: Maybe<Array<WorkUpdateWithWhereUniqueWithoutTeamInput>>;
  updateMany?: Maybe<Array<WorkUpdateManyWithWhereWithoutTeamInput>>;
  upsert?: Maybe<Array<WorkUpsertWithWhereUniqueWithoutTeamInput>>;
};

export type WorkUpdateManyWithoutUsersInput = {
  connect?: Maybe<Array<WorkWhereUniqueInput>>;
  connectOrCreate?: Maybe<Array<WorkCreateOrConnectWithoutusersInput>>;
  create?: Maybe<Array<WorkCreateWithoutUsersInput>>;
  delete?: Maybe<Array<WorkWhereUniqueInput>>;
  deleteMany?: Maybe<Array<WorkScalarWhereInput>>;
  disconnect?: Maybe<Array<WorkWhereUniqueInput>>;
  set?: Maybe<Array<WorkWhereUniqueInput>>;
  update?: Maybe<Array<WorkUpdateWithWhereUniqueWithoutUsersInput>>;
  updateMany?: Maybe<Array<WorkUpdateManyWithWhereWithoutUsersInput>>;
  upsert?: Maybe<Array<WorkUpsertWithWhereUniqueWithoutUsersInput>>;
};

export type WorkUpdateManyWithWhereWithoutSchoolInput = {
  data: WorkUpdateManyMutationInput;
  where: WorkScalarWhereInput;
};

export type WorkUpdateManyWithWhereWithoutTeamInput = {
  data: WorkUpdateManyMutationInput;
  where: WorkScalarWhereInput;
};

export type WorkUpdateManyWithWhereWithoutUsersInput = {
  data: WorkUpdateManyMutationInput;
  where: WorkScalarWhereInput;
};

export type WorkUpdateOneWithoutActivitiesInput = {
  connect?: Maybe<WorkWhereUniqueInput>;
  connectOrCreate?: Maybe<WorkCreateOrConnectWithoutactivitiesInput>;
  create?: Maybe<WorkCreateWithoutActivitiesInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<WorkUpdateWithoutActivitiesInput>;
  upsert?: Maybe<WorkUpsertWithoutActivitiesInput>;
};

export type WorkUpdateOneWithoutAttachmentsInput = {
  connect?: Maybe<WorkWhereUniqueInput>;
  connectOrCreate?: Maybe<WorkCreateOrConnectWithoutattachmentsInput>;
  create?: Maybe<WorkCreateWithoutAttachmentsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<WorkUpdateWithoutAttachmentsInput>;
  upsert?: Maybe<WorkUpsertWithoutAttachmentsInput>;
};

export type WorkUpdateOneWithoutReactionsInput = {
  connect?: Maybe<WorkWhereUniqueInput>;
  connectOrCreate?: Maybe<WorkCreateOrConnectWithoutreactionsInput>;
  create?: Maybe<WorkCreateWithoutReactionsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<WorkUpdateWithoutReactionsInput>;
  upsert?: Maybe<WorkUpsertWithoutReactionsInput>;
};

export type WorkUpdateWithoutActivitiesInput = {
  attachments?: Maybe<AttachmentUpdateManyWithoutWorkInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutWorkInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutWorkInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutWorkInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  users?: Maybe<UserUpdateManyWithoutWorkInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type WorkUpdateWithoutAttachmentsInput = {
  activities?: Maybe<ActivityUpdateManyWithoutWorkInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutWorkInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutWorkInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutWorkInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  users?: Maybe<UserUpdateManyWithoutWorkInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type WorkUpdateWithoutReactionsInput = {
  activities?: Maybe<ActivityUpdateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutWorkInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutWorkInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutWorkInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  users?: Maybe<UserUpdateManyWithoutWorkInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type WorkUpdateWithoutSchoolInput = {
  activities?: Maybe<ActivityUpdateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutWorkInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutWorkInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutWorkInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  users?: Maybe<UserUpdateManyWithoutWorkInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type WorkUpdateWithoutTeamInput = {
  activities?: Maybe<ActivityUpdateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutWorkInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutWorkInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutWorkInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  users?: Maybe<UserUpdateManyWithoutWorkInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type WorkUpdateWithoutUsersInput = {
  activities?: Maybe<ActivityUpdateManyWithoutWorkInput>;
  attachments?: Maybe<AttachmentUpdateManyWithoutWorkInput>;
  card?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  data?: Maybe<Scalars['Json']>;
  id?: Maybe<StringFieldUpdateOperationsInput>;
  reactions?: Maybe<ReactionUpdateManyWithoutWorkInput>;
  school?: Maybe<SchoolUpdateOneRequiredWithoutWorkInput>;
  team?: Maybe<TeamUpdateOneRequiredWithoutWorkInput>;
  text?: Maybe<StringFieldUpdateOperationsInput>;
  title?: Maybe<StringFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  visibility?: Maybe<EnumVisibilityFieldUpdateOperationsInput>;
};

export type WorkUpdateWithWhereUniqueWithoutSchoolInput = {
  data: WorkUpdateWithoutSchoolInput;
  where: WorkWhereUniqueInput;
};

export type WorkUpdateWithWhereUniqueWithoutTeamInput = {
  data: WorkUpdateWithoutTeamInput;
  where: WorkWhereUniqueInput;
};

export type WorkUpdateWithWhereUniqueWithoutUsersInput = {
  data: WorkUpdateWithoutUsersInput;
  where: WorkWhereUniqueInput;
};

export type WorkUpsertWithoutActivitiesInput = {
  create: WorkCreateWithoutActivitiesInput;
  update: WorkUpdateWithoutActivitiesInput;
};

export type WorkUpsertWithoutAttachmentsInput = {
  create: WorkCreateWithoutAttachmentsInput;
  update: WorkUpdateWithoutAttachmentsInput;
};

export type WorkUpsertWithoutReactionsInput = {
  create: WorkCreateWithoutReactionsInput;
  update: WorkUpdateWithoutReactionsInput;
};

export type WorkUpsertWithWhereUniqueWithoutSchoolInput = {
  create: WorkCreateWithoutSchoolInput;
  update: WorkUpdateWithoutSchoolInput;
  where: WorkWhereUniqueInput;
};

export type WorkUpsertWithWhereUniqueWithoutTeamInput = {
  create: WorkCreateWithoutTeamInput;
  update: WorkUpdateWithoutTeamInput;
  where: WorkWhereUniqueInput;
};

export type WorkUpsertWithWhereUniqueWithoutUsersInput = {
  create: WorkCreateWithoutUsersInput;
  update: WorkUpdateWithoutUsersInput;
  where: WorkWhereUniqueInput;
};

export type WorkWhereInput = {
  activities?: Maybe<ActivityListRelationFilter>;
  AND?: Maybe<Array<WorkWhereInput>>;
  attachments?: Maybe<AttachmentListRelationFilter>;
  card?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  data?: Maybe<JsonNullableFilter>;
  id?: Maybe<StringFilter>;
  NOT?: Maybe<Array<WorkWhereInput>>;
  OR?: Maybe<Array<WorkWhereInput>>;
  reactions?: Maybe<ReactionListRelationFilter>;
  school?: Maybe<SchoolWhereInput>;
  schoolId?: Maybe<StringFilter>;
  team?: Maybe<TeamWhereInput>;
  teamId?: Maybe<StringFilter>;
  text?: Maybe<StringFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  users?: Maybe<UserListRelationFilter>;
  visibility?: Maybe<EnumVisibilityFilter>;
};

export type WorkWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type ActivitiesQueryVariables = Exact<{
  where?: Maybe<ActivityWhereInput>;
  orderBy?: Maybe<Array<ActivityOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
}>;


export type ActivitiesQuery = (
  { __typename?: 'Query' }
  & { activities: Array<(
    { __typename?: 'Activity' }
    & Pick<Activity, 'type' | 'card' | 'summary' | 'ballotId' | 'workId' | 'time'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'shortname'>
    ) }
  )> }
);

export type BallotFieldsFragment = (
  { __typename?: 'Ballot' }
  & Pick<Ballot, 'id' | 'title' | 'description' | 'body' | 'start' | 'end' | 'scope' | 'canton'>
);

export type BallotRunFieldsFragment = (
  { __typename?: 'BallotRun' }
  & Pick<BallotRun, 'id' | 'start' | 'end'>
  & { ballot: (
    { __typename?: 'Ballot' }
    & BallotFieldsFragment
  ) }
);

export type BallotsQueryVariables = Exact<{
  where?: Maybe<BallotWhereInput>;
}>;


export type BallotsQuery = (
  { __typename?: 'Query' }
  & { ballots: Array<(
    { __typename?: 'Ballot' }
    & BallotFieldsFragment
  )> }
);

export type BallotQueryVariables = Exact<{
  where: BallotWhereUniqueInput;
}>;


export type BallotQuery = (
  { __typename?: 'Query' }
  & { ballot?: Maybe<(
    { __typename?: 'Ballot' }
    & Pick<Ballot, 'canVote' | 'hasVoted'>
    & BallotFieldsFragment
  )> }
);

export type GetBallotRunsQueryVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type GetBallotRunsQuery = (
  { __typename?: 'Query' }
  & { getBallotRuns?: Maybe<Array<Maybe<(
    { __typename?: 'BallotRun' }
    & BallotRunFieldsFragment
  )>>> }
);

export type AddBallotRunMutationVariables = Exact<{
  ballotId: Scalars['String'];
  teamId: Scalars['String'];
}>;


export type AddBallotRunMutation = (
  { __typename?: 'Mutation' }
  & { addBallotRun?: Maybe<(
    { __typename?: 'BallotRun' }
    & BallotRunFieldsFragment
  )> }
);

export type RemoveBallotRunMutationVariables = Exact<{
  ballotRunId: Scalars['String'];
}>;


export type RemoveBallotRunMutation = (
  { __typename?: 'Mutation' }
  & { removeBallotRun?: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'success' | 'error' | 'message'>
  )> }
);

export type StartBallotRunMutationVariables = Exact<{
  ballotRunId: Scalars['String'];
}>;


export type StartBallotRunMutation = (
  { __typename?: 'Mutation' }
  & { startBallotRun?: Maybe<(
    { __typename?: 'BallotRun' }
    & BallotRunFieldsFragment
  )> }
);

export type EndBallotRunMutationVariables = Exact<{
  ballotRunId: Scalars['String'];
}>;


export type EndBallotRunMutation = (
  { __typename?: 'Mutation' }
  & { endBallotRun?: Maybe<(
    { __typename?: 'BallotRun' }
    & BallotRunFieldsFragment
  )> }
);

export type VoteMutationVariables = Exact<{
  ballotId: Scalars['String'];
  vote: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote?: Maybe<(
    { __typename?: 'Vote' }
    & Pick<Vote, 'verify'>
    & { ballot: (
      { __typename?: 'Ballot' }
      & Pick<Ballot, 'id' | 'canVote' | 'hasVoted'>
    ) }
  )> }
);

export type VoteCodeMutationVariables = Exact<{
  code: Scalars['String'];
  ballotRunId: Scalars['String'];
  vote: Scalars['Int'];
}>;


export type VoteCodeMutation = (
  { __typename?: 'Mutation' }
  & { voteCode?: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'success' | 'error' | 'message'>
  )> }
);

export type GetBallotResultsQueryVariables = Exact<{
  ballotId: Scalars['String'];
  ballotRunId?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
  schoolId?: Maybe<Scalars['String']>;
  canton?: Maybe<Scalars['String']>;
}>;


export type GetBallotResultsQuery = (
  { __typename?: 'Query' }
  & { getBallotResults?: Maybe<(
    { __typename?: 'BallotResults' }
    & Pick<BallotResults, 'yes' | 'no' | 'abs' | 'total'>
  )> }
);

export type CardsQueryVariables = Exact<{
  keywords?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
}>;


export type CardsQuery = (
  { __typename?: 'Query' }
  & { cards?: Maybe<Array<Maybe<(
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'title' | 'description' | 'duration' | 'keywords' | 'type' | 'icon' | 'url' | 'source' | 'content' | 'age' | 'discussion'>
  )>>> }
);

export type SetCardsMutationVariables = Exact<{
  teamId: Scalars['String'];
  cards: Scalars['String'];
}>;


export type SetCardsMutation = (
  { __typename?: 'Mutation' }
  & { setCards?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'cards'>
  )> }
);

export type LoginFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'lastname' | 'shortname' | 'gender' | 'year' | 'role' | 'email'>
  & { school?: Maybe<(
    { __typename?: 'School' }
    & Pick<School, 'id' | 'name' | 'city'>
  )>, team?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name' | 'cards'>
    & { teacher: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'shortname'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & LoginFieldsFragment
  )> }
);

export type DiscussionFieldsFragment = (
  { __typename?: 'Discussion' }
  & Pick<Discussion, 'id' | 'title' | 'text' | 'card' | 'ballotId' | 'createdAt' | 'updatedAt'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'shortname'>
  ) }
);

export type GetTeamDiscussionsQueryVariables = Exact<{
  card?: Maybe<Scalars['String']>;
  ballotId?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
}>;


export type GetTeamDiscussionsQuery = (
  { __typename?: 'Query' }
  & { getTeamDiscussions?: Maybe<Array<Maybe<(
    { __typename?: 'Discussion' }
    & DiscussionFieldsFragment
  )>>> }
);

export type PostDiscussionMutationVariables = Exact<{
  card?: Maybe<Scalars['String']>;
  ballotId?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  title: Scalars['String'];
  teamId: Scalars['String'];
}>;


export type PostDiscussionMutation = (
  { __typename?: 'Mutation' }
  & { postDiscussion?: Maybe<(
    { __typename?: 'Discussion' }
    & DiscussionFieldsFragment
  )> }
);

export type SetPrefsMutationVariables = Exact<{
  teamId: Scalars['String'];
  prefs: Scalars['Json'];
}>;


export type SetPrefsMutation = (
  { __typename?: 'Mutation' }
  & { setPrefs?: Maybe<(
    { __typename?: 'Team' }
    & TeamTeacherFieldsFragment
  )> }
);

export type SchoolFieldsFragment = (
  { __typename?: 'School' }
  & Pick<School, 'id' | 'name' | 'type' | 'city' | 'zip' | 'canton'>
);

export type SchoolsWithMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type SchoolsWithMembersQuery = (
  { __typename?: 'Query' }
  & { schools: Array<(
    { __typename?: 'School' }
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'lastname'>
    )> }
    & SchoolFieldsFragment
  )> }
);

export type SetSchoolMutationVariables = Exact<{
  school: Scalars['String'];
}>;


export type SetSchoolMutation = (
  { __typename?: 'Mutation' }
  & { setSchool?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'shortname' | 'role' | 'email' | 'lastname'>
    & { school?: Maybe<(
      { __typename?: 'School' }
      & Pick<School, 'id' | 'name' | 'type' | 'city' | 'zip'>
    )> }
  )> }
);

export type SchoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type SchoolsQuery = (
  { __typename?: 'Query' }
  & { schools: Array<(
    { __typename?: 'School' }
    & SchoolFieldsFragment
  )> }
);

export type CreateOneSchoolMutationVariables = Exact<{
  data: SchoolCreateInput;
}>;


export type CreateOneSchoolMutation = (
  { __typename?: 'Mutation' }
  & { createOneSchool: (
    { __typename?: 'School' }
    & Pick<School, 'id' | 'name' | 'address' | 'zip' | 'city' | 'canton'>
  ) }
);

export type NewSchoolFragment = (
  { __typename?: 'School' }
  & Pick<School, 'name' | 'address' | 'zip' | 'city' | 'canton'>
);

export type SwissvotesQueryVariables = Exact<{
  keywords?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Int']>;
  result?: Maybe<Scalars['Int']>;
  hasPosters?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
}>;


export type SwissvotesQuery = (
  { __typename?: 'Query' }
  & { swissvotes?: Maybe<Array<Maybe<(
    { __typename?: 'Swissvote' }
    & Pick<Swissvote, 'anr' | 'datum' | 'titel_kurz_d' | 'titel_off_d' | 'stichwort' | 'swissvoteslink' | 'rechtsform' | 'poster_ja' | 'poster_nein' | 'annahme' | 'volk' | 'stand' | 'kategorien'>
  )>>> }
);

export type TeamAnonFieldsFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name' | 'cards' | 'prefs'>
  & { school: (
    { __typename?: 'School' }
    & Pick<School, 'id' | 'name' | 'city'>
  ) }
);

export type TeamUserFieldsFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'cards' | 'prefs'>
  & { members: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'shortname'>
  )>, teacher: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'shortname'>
  ) }
  & TeamAnonFieldsFragment
);

export type TeamTeacherFieldsFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'invite' | 'code'>
  & { members: Array<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'emailVerified'>
  )> }
  & TeamUserFieldsFragment
);

export type TeamsQueryVariables = Exact<{
  where?: Maybe<TeamWhereInput>;
}>;


export type TeamsQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & TeamTeacherFieldsFragment
  )> }
);

export type TeamAnonQueryVariables = Exact<{
  where: TeamWhereUniqueInput;
}>;


export type TeamAnonQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & TeamAnonFieldsFragment
  )> }
);

export type TeamUserQueryVariables = Exact<{
  where: TeamWhereUniqueInput;
}>;


export type TeamUserQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & TeamUserFieldsFragment
  )> }
);

export type TeamTeacherQueryVariables = Exact<{
  where: TeamWhereUniqueInput;
}>;


export type TeamTeacherQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & TeamTeacherFieldsFragment
  )> }
);

export type TeamByInviteQueryVariables = Exact<{
  invite: Scalars['String'];
}>;


export type TeamByInviteQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & TeamAnonFieldsFragment
  )> }
);

export type TeamByCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type TeamByCodeQuery = (
  { __typename?: 'Query' }
  & { team?: Maybe<(
    { __typename?: 'Team' }
    & TeamAnonFieldsFragment
  )> }
);

export type CreateOneTeamMutationVariables = Exact<{
  name: Scalars['String'];
  school: Scalars['String'];
  teacher: Scalars['String'];
}>;


export type CreateOneTeamMutation = (
  { __typename?: 'Mutation' }
  & { createOneTeam: (
    { __typename?: 'Team' }
    & TeamTeacherFieldsFragment
  ) }
);

export type AttachmentFieldsFragment = (
  { __typename?: 'Attachment' }
  & Pick<Attachment, 'id' | 'file' | 'title' | 'type'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'shortname' | 'name'>
  ) }
);

export type AttachmentsQueryVariables = Exact<{
  where?: Maybe<AttachmentWhereInput>;
}>;


export type AttachmentsQuery = (
  { __typename?: 'Query' }
  & { attachments: Array<(
    { __typename?: 'Attachment' }
    & AttachmentFieldsFragment
  )> }
);

export type UsersQueryVariables = Exact<{
  where?: Maybe<UserWhereInput>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'shortname'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
      & { school: (
        { __typename?: 'School' }
        & Pick<School, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & LoginFieldsFragment
  )> }
);

export type DeleteUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'shortname'>
  )> }
);

export type WorkFieldsFragment = (
  { __typename?: 'Work' }
  & Pick<Work, 'id' | 'card' | 'title' | 'text' | 'data' | 'updatedAt'>
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'shortname'>
  )>, attachments: Array<(
    { __typename?: 'Attachment' }
    & AttachmentFieldsFragment
  )> }
);

export type WorksQueryVariables = Exact<{
  where?: Maybe<WorkWhereInput>;
}>;


export type WorksQuery = (
  { __typename?: 'Query' }
  & { works: Array<(
    { __typename?: 'Work' }
    & WorkFieldsFragment
  )> }
);

export type PostWorkMutationVariables = Exact<{
  data: WorkCreateInput;
}>;


export type PostWorkMutation = (
  { __typename?: 'Mutation' }
  & { postWork: (
    { __typename?: 'Work' }
    & WorkFieldsFragment
  ) }
);

export type TeachersQueryVariables = Exact<{
  where?: Maybe<UserWhereInput>;
}>;


export type TeachersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'lastname' | 'shortname' | 'email' | 'emailVerified' | 'createdAt'>
    & { school?: Maybe<(
      { __typename?: 'School' }
      & Pick<School, 'id' | 'name' | 'city' | 'zip'>
    )>, teaches: Array<(
      { __typename?: 'Team' }
      & Pick<Team, 'name' | 'id'>
    )> }
  )> }
);

export type AdminUsersQueryVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<Array<UserOrderByInput>>;
  first?: Maybe<Scalars['Int']>;
}>;


export type AdminUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'shortname' | 'name' | 'gender' | 'year' | 'lastname' | 'createdAt' | 'email' | 'emailVerified' | 'role'>
    & { school?: Maybe<(
      { __typename?: 'School' }
      & Pick<School, 'id' | 'name' | 'zip' | 'city'>
    )>, teaches: Array<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
    )>, team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
    )> }
  )> }
);

export type CreateInvitedUserMutationVariables = Exact<{
  invite: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
}>;


export type CreateInvitedUserMutation = (
  { __typename?: 'Mutation' }
  & { createInvitedUser?: Maybe<(
    { __typename?: 'User' }
    & LoginFieldsFragment
  )> }
);

export type AcceptInviteMutationVariables = Exact<{
  invite: Scalars['String'];
}>;


export type AcceptInviteMutation = (
  { __typename?: 'Mutation' }
  & { acceptInvite?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
    & { school: (
      { __typename?: 'School' }
      & Pick<School, 'id' | 'name' | 'city'>
    ) }
  )> }
);

export type InviteStudentsMutationVariables = Exact<{
  team: Scalars['String'];
  emails: Array<Scalars['String']>;
}>;


export type InviteStudentsMutation = (
  { __typename?: 'Mutation' }
  & { inviteStudents?: Maybe<(
    { __typename?: 'InviteResponse' }
    & Pick<InviteResponse, 'created' | 'failed' | 'duplicated'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & TeamTeacherFieldsFragment
    )> }
  )> }
);

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteAccount?: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'success' | 'error' | 'message'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'ResponseLogin' }
    & Pick<ResponseLogin, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & LoginFieldsFragment
    )> }
  )> }
);

export type EmailVerificationMutationVariables = Exact<{
  email: Scalars['String'];
  purpose: Scalars['String'];
}>;


export type EmailVerificationMutation = (
  { __typename?: 'Mutation' }
  & { emailVerification?: Maybe<(
    { __typename?: 'ResponseLogin' }
    & Pick<ResponseLogin, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & LoginFieldsFragment
    )> }
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'ResponseLogin' }
    & Pick<ResponseLogin, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & LoginFieldsFragment
    )> }
  )> }
);

export type MagicMutationVariables = Exact<{
  email: Scalars['String'];
  redirect?: Maybe<Scalars['String']>;
}>;


export type MagicMutation = (
  { __typename?: 'Mutation' }
  & { magic?: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'success' | 'error' | 'message'>
  )> }
);

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'shortname' | 'lastname' | 'role'>
  ) }
);

export type CheckVerificationMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type CheckVerificationMutation = (
  { __typename?: 'Mutation' }
  & { checkVerification?: Maybe<(
    { __typename?: 'ResponseLogin' }
    & Pick<ResponseLogin, 'token'>
  )> }
);

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
export const BallotRunFieldsFragmentDoc = gql`
    fragment BallotRunFields on BallotRun {
  id
  start
  end
  ballot {
    ...BallotFields
  }
}
    ${BallotFieldsFragmentDoc}`;
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
  cards
  prefs
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

/**
 * __useActivitiesQuery__
 *
 * To run a query within a React component, call `useActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
        return Apollo.useQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, baseOptions);
      }
export function useActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
          return Apollo.useLazyQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, baseOptions);
        }
export type ActivitiesQueryHookResult = ReturnType<typeof useActivitiesQuery>;
export type ActivitiesLazyQueryHookResult = ReturnType<typeof useActivitiesLazyQuery>;
export type ActivitiesQueryResult = Apollo.QueryResult<ActivitiesQuery, ActivitiesQueryVariables>;
export const BallotsDocument = gql`
    query ballots($where: BallotWhereInput) {
  ballots(where: $where) {
    ...BallotFields
  }
}
    ${BallotFieldsFragmentDoc}`;

/**
 * __useBallotsQuery__
 *
 * To run a query within a React component, call `useBallotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBallotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBallotsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBallotsQuery(baseOptions?: Apollo.QueryHookOptions<BallotsQuery, BallotsQueryVariables>) {
        return Apollo.useQuery<BallotsQuery, BallotsQueryVariables>(BallotsDocument, baseOptions);
      }
export function useBallotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BallotsQuery, BallotsQueryVariables>) {
          return Apollo.useLazyQuery<BallotsQuery, BallotsQueryVariables>(BallotsDocument, baseOptions);
        }
export type BallotsQueryHookResult = ReturnType<typeof useBallotsQuery>;
export type BallotsLazyQueryHookResult = ReturnType<typeof useBallotsLazyQuery>;
export type BallotsQueryResult = Apollo.QueryResult<BallotsQuery, BallotsQueryVariables>;
export const BallotDocument = gql`
    query ballot($where: BallotWhereUniqueInput!) {
  ballot(where: $where) {
    ...BallotFields
    canVote
    hasVoted
  }
}
    ${BallotFieldsFragmentDoc}`;

/**
 * __useBallotQuery__
 *
 * To run a query within a React component, call `useBallotQuery` and pass it any options that fit your needs.
 * When your component renders, `useBallotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBallotQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBallotQuery(baseOptions: Apollo.QueryHookOptions<BallotQuery, BallotQueryVariables>) {
        return Apollo.useQuery<BallotQuery, BallotQueryVariables>(BallotDocument, baseOptions);
      }
export function useBallotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BallotQuery, BallotQueryVariables>) {
          return Apollo.useLazyQuery<BallotQuery, BallotQueryVariables>(BallotDocument, baseOptions);
        }
export type BallotQueryHookResult = ReturnType<typeof useBallotQuery>;
export type BallotLazyQueryHookResult = ReturnType<typeof useBallotLazyQuery>;
export type BallotQueryResult = Apollo.QueryResult<BallotQuery, BallotQueryVariables>;
export const GetBallotRunsDocument = gql`
    query getBallotRuns($teamId: String!) {
  getBallotRuns(teamId: $teamId) {
    ...BallotRunFields
  }
}
    ${BallotRunFieldsFragmentDoc}`;

/**
 * __useGetBallotRunsQuery__
 *
 * To run a query within a React component, call `useGetBallotRunsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBallotRunsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBallotRunsQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetBallotRunsQuery(baseOptions: Apollo.QueryHookOptions<GetBallotRunsQuery, GetBallotRunsQueryVariables>) {
        return Apollo.useQuery<GetBallotRunsQuery, GetBallotRunsQueryVariables>(GetBallotRunsDocument, baseOptions);
      }
export function useGetBallotRunsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBallotRunsQuery, GetBallotRunsQueryVariables>) {
          return Apollo.useLazyQuery<GetBallotRunsQuery, GetBallotRunsQueryVariables>(GetBallotRunsDocument, baseOptions);
        }
export type GetBallotRunsQueryHookResult = ReturnType<typeof useGetBallotRunsQuery>;
export type GetBallotRunsLazyQueryHookResult = ReturnType<typeof useGetBallotRunsLazyQuery>;
export type GetBallotRunsQueryResult = Apollo.QueryResult<GetBallotRunsQuery, GetBallotRunsQueryVariables>;
export const AddBallotRunDocument = gql`
    mutation addBallotRun($ballotId: String!, $teamId: String!) {
  addBallotRun(ballotId: $ballotId, teamId: $teamId) {
    ...BallotRunFields
  }
}
    ${BallotRunFieldsFragmentDoc}`;
export type AddBallotRunMutationFn = Apollo.MutationFunction<AddBallotRunMutation, AddBallotRunMutationVariables>;

/**
 * __useAddBallotRunMutation__
 *
 * To run a mutation, you first call `useAddBallotRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBallotRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBallotRunMutation, { data, loading, error }] = useAddBallotRunMutation({
 *   variables: {
 *      ballotId: // value for 'ballotId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useAddBallotRunMutation(baseOptions?: Apollo.MutationHookOptions<AddBallotRunMutation, AddBallotRunMutationVariables>) {
        return Apollo.useMutation<AddBallotRunMutation, AddBallotRunMutationVariables>(AddBallotRunDocument, baseOptions);
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

/**
 * __useRemoveBallotRunMutation__
 *
 * To run a mutation, you first call `useRemoveBallotRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBallotRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBallotRunMutation, { data, loading, error }] = useRemoveBallotRunMutation({
 *   variables: {
 *      ballotRunId: // value for 'ballotRunId'
 *   },
 * });
 */
export function useRemoveBallotRunMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBallotRunMutation, RemoveBallotRunMutationVariables>) {
        return Apollo.useMutation<RemoveBallotRunMutation, RemoveBallotRunMutationVariables>(RemoveBallotRunDocument, baseOptions);
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

/**
 * __useStartBallotRunMutation__
 *
 * To run a mutation, you first call `useStartBallotRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartBallotRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startBallotRunMutation, { data, loading, error }] = useStartBallotRunMutation({
 *   variables: {
 *      ballotRunId: // value for 'ballotRunId'
 *   },
 * });
 */
export function useStartBallotRunMutation(baseOptions?: Apollo.MutationHookOptions<StartBallotRunMutation, StartBallotRunMutationVariables>) {
        return Apollo.useMutation<StartBallotRunMutation, StartBallotRunMutationVariables>(StartBallotRunDocument, baseOptions);
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

/**
 * __useEndBallotRunMutation__
 *
 * To run a mutation, you first call `useEndBallotRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndBallotRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endBallotRunMutation, { data, loading, error }] = useEndBallotRunMutation({
 *   variables: {
 *      ballotRunId: // value for 'ballotRunId'
 *   },
 * });
 */
export function useEndBallotRunMutation(baseOptions?: Apollo.MutationHookOptions<EndBallotRunMutation, EndBallotRunMutationVariables>) {
        return Apollo.useMutation<EndBallotRunMutation, EndBallotRunMutationVariables>(EndBallotRunDocument, baseOptions);
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

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      ballotId: // value for 'ballotId'
 *      vote: // value for 'vote'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, baseOptions);
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

/**
 * __useVoteCodeMutation__
 *
 * To run a mutation, you first call `useVoteCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCodeMutation, { data, loading, error }] = useVoteCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *      ballotRunId: // value for 'ballotRunId'
 *      vote: // value for 'vote'
 *   },
 * });
 */
export function useVoteCodeMutation(baseOptions?: Apollo.MutationHookOptions<VoteCodeMutation, VoteCodeMutationVariables>) {
        return Apollo.useMutation<VoteCodeMutation, VoteCodeMutationVariables>(VoteCodeDocument, baseOptions);
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

/**
 * __useGetBallotResultsQuery__
 *
 * To run a query within a React component, call `useGetBallotResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBallotResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBallotResultsQuery({
 *   variables: {
 *      ballotId: // value for 'ballotId'
 *      ballotRunId: // value for 'ballotRunId'
 *      teamId: // value for 'teamId'
 *      schoolId: // value for 'schoolId'
 *      canton: // value for 'canton'
 *   },
 * });
 */
export function useGetBallotResultsQuery(baseOptions: Apollo.QueryHookOptions<GetBallotResultsQuery, GetBallotResultsQueryVariables>) {
        return Apollo.useQuery<GetBallotResultsQuery, GetBallotResultsQueryVariables>(GetBallotResultsDocument, baseOptions);
      }
export function useGetBallotResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBallotResultsQuery, GetBallotResultsQueryVariables>) {
          return Apollo.useLazyQuery<GetBallotResultsQuery, GetBallotResultsQueryVariables>(GetBallotResultsDocument, baseOptions);
        }
export type GetBallotResultsQueryHookResult = ReturnType<typeof useGetBallotResultsQuery>;
export type GetBallotResultsLazyQueryHookResult = ReturnType<typeof useGetBallotResultsLazyQuery>;
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

/**
 * __useCardsQuery__
 *
 * To run a query within a React component, call `useCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsQuery({
 *   variables: {
 *      keywords: // value for 'keywords'
 *      age: // value for 'age'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCardsQuery(baseOptions?: Apollo.QueryHookOptions<CardsQuery, CardsQueryVariables>) {
        return Apollo.useQuery<CardsQuery, CardsQueryVariables>(CardsDocument, baseOptions);
      }
export function useCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          return Apollo.useLazyQuery<CardsQuery, CardsQueryVariables>(CardsDocument, baseOptions);
        }
export type CardsQueryHookResult = ReturnType<typeof useCardsQuery>;
export type CardsLazyQueryHookResult = ReturnType<typeof useCardsLazyQuery>;
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

/**
 * __useSetCardsMutation__
 *
 * To run a mutation, you first call `useSetCardsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCardsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCardsMutation, { data, loading, error }] = useSetCardsMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      cards: // value for 'cards'
 *   },
 * });
 */
export function useSetCardsMutation(baseOptions?: Apollo.MutationHookOptions<SetCardsMutation, SetCardsMutationVariables>) {
        return Apollo.useMutation<SetCardsMutation, SetCardsMutationVariables>(SetCardsDocument, baseOptions);
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetTeamDiscussionsDocument = gql`
    query getTeamDiscussions($card: String, $ballotId: String, $teamId: String) {
  getTeamDiscussions(card: $card, ballotId: $ballotId, teamId: $teamId) {
    ...DiscussionFields
  }
}
    ${DiscussionFieldsFragmentDoc}`;

/**
 * __useGetTeamDiscussionsQuery__
 *
 * To run a query within a React component, call `useGetTeamDiscussionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamDiscussionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamDiscussionsQuery({
 *   variables: {
 *      card: // value for 'card'
 *      ballotId: // value for 'ballotId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamDiscussionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>) {
        return Apollo.useQuery<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>(GetTeamDiscussionsDocument, baseOptions);
      }
export function useGetTeamDiscussionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>) {
          return Apollo.useLazyQuery<GetTeamDiscussionsQuery, GetTeamDiscussionsQueryVariables>(GetTeamDiscussionsDocument, baseOptions);
        }
export type GetTeamDiscussionsQueryHookResult = ReturnType<typeof useGetTeamDiscussionsQuery>;
export type GetTeamDiscussionsLazyQueryHookResult = ReturnType<typeof useGetTeamDiscussionsLazyQuery>;
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

/**
 * __usePostDiscussionMutation__
 *
 * To run a mutation, you first call `usePostDiscussionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostDiscussionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postDiscussionMutation, { data, loading, error }] = usePostDiscussionMutation({
 *   variables: {
 *      card: // value for 'card'
 *      ballotId: // value for 'ballotId'
 *      text: // value for 'text'
 *      title: // value for 'title'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function usePostDiscussionMutation(baseOptions?: Apollo.MutationHookOptions<PostDiscussionMutation, PostDiscussionMutationVariables>) {
        return Apollo.useMutation<PostDiscussionMutation, PostDiscussionMutationVariables>(PostDiscussionDocument, baseOptions);
      }
export type PostDiscussionMutationHookResult = ReturnType<typeof usePostDiscussionMutation>;
export type PostDiscussionMutationResult = Apollo.MutationResult<PostDiscussionMutation>;
export type PostDiscussionMutationOptions = Apollo.BaseMutationOptions<PostDiscussionMutation, PostDiscussionMutationVariables>;
export const SetPrefsDocument = gql`
    mutation setPrefs($teamId: String!, $prefs: Json!) {
  setPrefs(teamId: $teamId, prefs: $prefs) {
    ...TeamTeacherFields
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;
export type SetPrefsMutationFn = Apollo.MutationFunction<SetPrefsMutation, SetPrefsMutationVariables>;

/**
 * __useSetPrefsMutation__
 *
 * To run a mutation, you first call `useSetPrefsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPrefsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPrefsMutation, { data, loading, error }] = useSetPrefsMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      prefs: // value for 'prefs'
 *   },
 * });
 */
export function useSetPrefsMutation(baseOptions?: Apollo.MutationHookOptions<SetPrefsMutation, SetPrefsMutationVariables>) {
        return Apollo.useMutation<SetPrefsMutation, SetPrefsMutationVariables>(SetPrefsDocument, baseOptions);
      }
export type SetPrefsMutationHookResult = ReturnType<typeof useSetPrefsMutation>;
export type SetPrefsMutationResult = Apollo.MutationResult<SetPrefsMutation>;
export type SetPrefsMutationOptions = Apollo.BaseMutationOptions<SetPrefsMutation, SetPrefsMutationVariables>;
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

/**
 * __useSchoolsWithMembersQuery__
 *
 * To run a query within a React component, call `useSchoolsWithMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolsWithMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolsWithMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSchoolsWithMembersQuery(baseOptions?: Apollo.QueryHookOptions<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>) {
        return Apollo.useQuery<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>(SchoolsWithMembersDocument, baseOptions);
      }
export function useSchoolsWithMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>) {
          return Apollo.useLazyQuery<SchoolsWithMembersQuery, SchoolsWithMembersQueryVariables>(SchoolsWithMembersDocument, baseOptions);
        }
export type SchoolsWithMembersQueryHookResult = ReturnType<typeof useSchoolsWithMembersQuery>;
export type SchoolsWithMembersLazyQueryHookResult = ReturnType<typeof useSchoolsWithMembersLazyQuery>;
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

/**
 * __useSetSchoolMutation__
 *
 * To run a mutation, you first call `useSetSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSchoolMutation, { data, loading, error }] = useSetSchoolMutation({
 *   variables: {
 *      school: // value for 'school'
 *   },
 * });
 */
export function useSetSchoolMutation(baseOptions?: Apollo.MutationHookOptions<SetSchoolMutation, SetSchoolMutationVariables>) {
        return Apollo.useMutation<SetSchoolMutation, SetSchoolMutationVariables>(SetSchoolDocument, baseOptions);
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

/**
 * __useSchoolsQuery__
 *
 * To run a query within a React component, call `useSchoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSchoolsQuery(baseOptions?: Apollo.QueryHookOptions<SchoolsQuery, SchoolsQueryVariables>) {
        return Apollo.useQuery<SchoolsQuery, SchoolsQueryVariables>(SchoolsDocument, baseOptions);
      }
export function useSchoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchoolsQuery, SchoolsQueryVariables>) {
          return Apollo.useLazyQuery<SchoolsQuery, SchoolsQueryVariables>(SchoolsDocument, baseOptions);
        }
export type SchoolsQueryHookResult = ReturnType<typeof useSchoolsQuery>;
export type SchoolsLazyQueryHookResult = ReturnType<typeof useSchoolsLazyQuery>;
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

/**
 * __useCreateOneSchoolMutation__
 *
 * To run a mutation, you first call `useCreateOneSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneSchoolMutation, { data, loading, error }] = useCreateOneSchoolMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneSchoolMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneSchoolMutation, CreateOneSchoolMutationVariables>) {
        return Apollo.useMutation<CreateOneSchoolMutation, CreateOneSchoolMutationVariables>(CreateOneSchoolDocument, baseOptions);
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

/**
 * __useSwissvotesQuery__
 *
 * To run a query within a React component, call `useSwissvotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSwissvotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSwissvotesQuery({
 *   variables: {
 *      keywords: // value for 'keywords'
 *      type: // value for 'type'
 *      result: // value for 'result'
 *      hasPosters: // value for 'hasPosters'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useSwissvotesQuery(baseOptions?: Apollo.QueryHookOptions<SwissvotesQuery, SwissvotesQueryVariables>) {
        return Apollo.useQuery<SwissvotesQuery, SwissvotesQueryVariables>(SwissvotesDocument, baseOptions);
      }
export function useSwissvotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SwissvotesQuery, SwissvotesQueryVariables>) {
          return Apollo.useLazyQuery<SwissvotesQuery, SwissvotesQueryVariables>(SwissvotesDocument, baseOptions);
        }
export type SwissvotesQueryHookResult = ReturnType<typeof useSwissvotesQuery>;
export type SwissvotesLazyQueryHookResult = ReturnType<typeof useSwissvotesLazyQuery>;
export type SwissvotesQueryResult = Apollo.QueryResult<SwissvotesQuery, SwissvotesQueryVariables>;
export const TeamsDocument = gql`
    query teams($where: TeamWhereInput) {
  teams(where: $where) {
    ...TeamTeacherFields
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const TeamAnonDocument = gql`
    query teamAnon($where: TeamWhereUniqueInput!) {
  team(where: $where) {
    ...TeamAnonFields
  }
}
    ${TeamAnonFieldsFragmentDoc}`;

/**
 * __useTeamAnonQuery__
 *
 * To run a query within a React component, call `useTeamAnonQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamAnonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamAnonQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTeamAnonQuery(baseOptions: Apollo.QueryHookOptions<TeamAnonQuery, TeamAnonQueryVariables>) {
        return Apollo.useQuery<TeamAnonQuery, TeamAnonQueryVariables>(TeamAnonDocument, baseOptions);
      }
export function useTeamAnonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamAnonQuery, TeamAnonQueryVariables>) {
          return Apollo.useLazyQuery<TeamAnonQuery, TeamAnonQueryVariables>(TeamAnonDocument, baseOptions);
        }
export type TeamAnonQueryHookResult = ReturnType<typeof useTeamAnonQuery>;
export type TeamAnonLazyQueryHookResult = ReturnType<typeof useTeamAnonLazyQuery>;
export type TeamAnonQueryResult = Apollo.QueryResult<TeamAnonQuery, TeamAnonQueryVariables>;
export const TeamUserDocument = gql`
    query teamUser($where: TeamWhereUniqueInput!) {
  team(where: $where) {
    ...TeamUserFields
  }
}
    ${TeamUserFieldsFragmentDoc}`;

/**
 * __useTeamUserQuery__
 *
 * To run a query within a React component, call `useTeamUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTeamUserQuery(baseOptions: Apollo.QueryHookOptions<TeamUserQuery, TeamUserQueryVariables>) {
        return Apollo.useQuery<TeamUserQuery, TeamUserQueryVariables>(TeamUserDocument, baseOptions);
      }
export function useTeamUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamUserQuery, TeamUserQueryVariables>) {
          return Apollo.useLazyQuery<TeamUserQuery, TeamUserQueryVariables>(TeamUserDocument, baseOptions);
        }
export type TeamUserQueryHookResult = ReturnType<typeof useTeamUserQuery>;
export type TeamUserLazyQueryHookResult = ReturnType<typeof useTeamUserLazyQuery>;
export type TeamUserQueryResult = Apollo.QueryResult<TeamUserQuery, TeamUserQueryVariables>;
export const TeamTeacherDocument = gql`
    query teamTeacher($where: TeamWhereUniqueInput!) {
  team(where: $where) {
    ...TeamTeacherFields
  }
}
    ${TeamTeacherFieldsFragmentDoc}`;

/**
 * __useTeamTeacherQuery__
 *
 * To run a query within a React component, call `useTeamTeacherQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamTeacherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamTeacherQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTeamTeacherQuery(baseOptions: Apollo.QueryHookOptions<TeamTeacherQuery, TeamTeacherQueryVariables>) {
        return Apollo.useQuery<TeamTeacherQuery, TeamTeacherQueryVariables>(TeamTeacherDocument, baseOptions);
      }
export function useTeamTeacherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamTeacherQuery, TeamTeacherQueryVariables>) {
          return Apollo.useLazyQuery<TeamTeacherQuery, TeamTeacherQueryVariables>(TeamTeacherDocument, baseOptions);
        }
export type TeamTeacherQueryHookResult = ReturnType<typeof useTeamTeacherQuery>;
export type TeamTeacherLazyQueryHookResult = ReturnType<typeof useTeamTeacherLazyQuery>;
export type TeamTeacherQueryResult = Apollo.QueryResult<TeamTeacherQuery, TeamTeacherQueryVariables>;
export const TeamByInviteDocument = gql`
    query teamByInvite($invite: String!) {
  team(where: {invite: $invite}) {
    ...TeamAnonFields
  }
}
    ${TeamAnonFieldsFragmentDoc}`;

/**
 * __useTeamByInviteQuery__
 *
 * To run a query within a React component, call `useTeamByInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamByInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamByInviteQuery({
 *   variables: {
 *      invite: // value for 'invite'
 *   },
 * });
 */
export function useTeamByInviteQuery(baseOptions: Apollo.QueryHookOptions<TeamByInviteQuery, TeamByInviteQueryVariables>) {
        return Apollo.useQuery<TeamByInviteQuery, TeamByInviteQueryVariables>(TeamByInviteDocument, baseOptions);
      }
export function useTeamByInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamByInviteQuery, TeamByInviteQueryVariables>) {
          return Apollo.useLazyQuery<TeamByInviteQuery, TeamByInviteQueryVariables>(TeamByInviteDocument, baseOptions);
        }
export type TeamByInviteQueryHookResult = ReturnType<typeof useTeamByInviteQuery>;
export type TeamByInviteLazyQueryHookResult = ReturnType<typeof useTeamByInviteLazyQuery>;
export type TeamByInviteQueryResult = Apollo.QueryResult<TeamByInviteQuery, TeamByInviteQueryVariables>;
export const TeamByCodeDocument = gql`
    query teamByCode($code: String!) {
  team(where: {code: $code}) {
    ...TeamAnonFields
  }
}
    ${TeamAnonFieldsFragmentDoc}`;

/**
 * __useTeamByCodeQuery__
 *
 * To run a query within a React component, call `useTeamByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useTeamByCodeQuery(baseOptions: Apollo.QueryHookOptions<TeamByCodeQuery, TeamByCodeQueryVariables>) {
        return Apollo.useQuery<TeamByCodeQuery, TeamByCodeQueryVariables>(TeamByCodeDocument, baseOptions);
      }
export function useTeamByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamByCodeQuery, TeamByCodeQueryVariables>) {
          return Apollo.useLazyQuery<TeamByCodeQuery, TeamByCodeQueryVariables>(TeamByCodeDocument, baseOptions);
        }
export type TeamByCodeQueryHookResult = ReturnType<typeof useTeamByCodeQuery>;
export type TeamByCodeLazyQueryHookResult = ReturnType<typeof useTeamByCodeLazyQuery>;
export type TeamByCodeQueryResult = Apollo.QueryResult<TeamByCodeQuery, TeamByCodeQueryVariables>;
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

/**
 * __useCreateOneTeamMutation__
 *
 * To run a mutation, you first call `useCreateOneTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneTeamMutation, { data, loading, error }] = useCreateOneTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      school: // value for 'school'
 *      teacher: // value for 'teacher'
 *   },
 * });
 */
export function useCreateOneTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneTeamMutation, CreateOneTeamMutationVariables>) {
        return Apollo.useMutation<CreateOneTeamMutation, CreateOneTeamMutationVariables>(CreateOneTeamDocument, baseOptions);
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

/**
 * __useAttachmentsQuery__
 *
 * To run a query within a React component, call `useAttachmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttachmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttachmentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAttachmentsQuery(baseOptions?: Apollo.QueryHookOptions<AttachmentsQuery, AttachmentsQueryVariables>) {
        return Apollo.useQuery<AttachmentsQuery, AttachmentsQueryVariables>(AttachmentsDocument, baseOptions);
      }
export function useAttachmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttachmentsQuery, AttachmentsQueryVariables>) {
          return Apollo.useLazyQuery<AttachmentsQuery, AttachmentsQueryVariables>(AttachmentsDocument, baseOptions);
        }
export type AttachmentsQueryHookResult = ReturnType<typeof useAttachmentsQuery>;
export type AttachmentsLazyQueryHookResult = ReturnType<typeof useAttachmentsLazyQuery>;
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

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    ...LoginFields
  }
}
    ${LoginFieldsFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
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

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
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

/**
 * __useWorksQuery__
 *
 * To run a query within a React component, call `useWorksQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorksQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useWorksQuery(baseOptions?: Apollo.QueryHookOptions<WorksQuery, WorksQueryVariables>) {
        return Apollo.useQuery<WorksQuery, WorksQueryVariables>(WorksDocument, baseOptions);
      }
export function useWorksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorksQuery, WorksQueryVariables>) {
          return Apollo.useLazyQuery<WorksQuery, WorksQueryVariables>(WorksDocument, baseOptions);
        }
export type WorksQueryHookResult = ReturnType<typeof useWorksQuery>;
export type WorksLazyQueryHookResult = ReturnType<typeof useWorksLazyQuery>;
export type WorksQueryResult = Apollo.QueryResult<WorksQuery, WorksQueryVariables>;
export const PostWorkDocument = gql`
    mutation postWork($data: WorkCreateInput!) {
  postWork(data: $data) {
    ...WorkFields
  }
}
    ${WorkFieldsFragmentDoc}`;
export type PostWorkMutationFn = Apollo.MutationFunction<PostWorkMutation, PostWorkMutationVariables>;

/**
 * __usePostWorkMutation__
 *
 * To run a mutation, you first call `usePostWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postWorkMutation, { data, loading, error }] = usePostWorkMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePostWorkMutation(baseOptions?: Apollo.MutationHookOptions<PostWorkMutation, PostWorkMutationVariables>) {
        return Apollo.useMutation<PostWorkMutation, PostWorkMutationVariables>(PostWorkDocument, baseOptions);
      }
export type PostWorkMutationHookResult = ReturnType<typeof usePostWorkMutation>;
export type PostWorkMutationResult = Apollo.MutationResult<PostWorkMutation>;
export type PostWorkMutationOptions = Apollo.BaseMutationOptions<PostWorkMutation, PostWorkMutationVariables>;
export const TeachersDocument = gql`
    query teachers($where: UserWhereInput) {
  users(where: $where) {
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

/**
 * __useTeachersQuery__
 *
 * To run a query within a React component, call `useTeachersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeachersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeachersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTeachersQuery(baseOptions?: Apollo.QueryHookOptions<TeachersQuery, TeachersQueryVariables>) {
        return Apollo.useQuery<TeachersQuery, TeachersQueryVariables>(TeachersDocument, baseOptions);
      }
export function useTeachersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeachersQuery, TeachersQueryVariables>) {
          return Apollo.useLazyQuery<TeachersQuery, TeachersQueryVariables>(TeachersDocument, baseOptions);
        }
export type TeachersQueryHookResult = ReturnType<typeof useTeachersQuery>;
export type TeachersLazyQueryHookResult = ReturnType<typeof useTeachersLazyQuery>;
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

/**
 * __useAdminUsersQuery__
 *
 * To run a query within a React component, call `useAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useAdminUsersQuery(baseOptions?: Apollo.QueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
        return Apollo.useQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, baseOptions);
      }
export function useAdminUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
          return Apollo.useLazyQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, baseOptions);
        }
export type AdminUsersQueryHookResult = ReturnType<typeof useAdminUsersQuery>;
export type AdminUsersLazyQueryHookResult = ReturnType<typeof useAdminUsersLazyQuery>;
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

/**
 * __useCreateInvitedUserMutation__
 *
 * To run a mutation, you first call `useCreateInvitedUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvitedUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvitedUserMutation, { data, loading, error }] = useCreateInvitedUserMutation({
 *   variables: {
 *      invite: // value for 'invite'
 *      name: // value for 'name'
 *      lastname: // value for 'lastname'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateInvitedUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvitedUserMutation, CreateInvitedUserMutationVariables>) {
        return Apollo.useMutation<CreateInvitedUserMutation, CreateInvitedUserMutationVariables>(CreateInvitedUserDocument, baseOptions);
      }
export type CreateInvitedUserMutationHookResult = ReturnType<typeof useCreateInvitedUserMutation>;
export type CreateInvitedUserMutationResult = Apollo.MutationResult<CreateInvitedUserMutation>;
export type CreateInvitedUserMutationOptions = Apollo.BaseMutationOptions<CreateInvitedUserMutation, CreateInvitedUserMutationVariables>;
export const AcceptInviteDocument = gql`
    mutation acceptInvite($invite: String!) {
  acceptInvite(invite: $invite) {
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

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      invite: // value for 'invite'
 *   },
 * });
 */
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, baseOptions);
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

/**
 * __useInviteStudentsMutation__
 *
 * To run a mutation, you first call `useInviteStudentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteStudentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteStudentsMutation, { data, loading, error }] = useInviteStudentsMutation({
 *   variables: {
 *      team: // value for 'team'
 *      emails: // value for 'emails'
 *   },
 * });
 */
export function useInviteStudentsMutation(baseOptions?: Apollo.MutationHookOptions<InviteStudentsMutation, InviteStudentsMutationVariables>) {
        return Apollo.useMutation<InviteStudentsMutation, InviteStudentsMutationVariables>(InviteStudentsDocument, baseOptions);
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

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, baseOptions);
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

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
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

/**
 * __useEmailVerificationMutation__
 *
 * To run a mutation, you first call `useEmailVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailVerificationMutation, { data, loading, error }] = useEmailVerificationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      purpose: // value for 'purpose'
 *   },
 * });
 */
export function useEmailVerificationMutation(baseOptions?: Apollo.MutationHookOptions<EmailVerificationMutation, EmailVerificationMutationVariables>) {
        return Apollo.useMutation<EmailVerificationMutation, EmailVerificationMutationVariables>(EmailVerificationDocument, baseOptions);
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

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
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

/**
 * __useMagicMutation__
 *
 * To run a mutation, you first call `useMagicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMagicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [magicMutation, { data, loading, error }] = useMagicMutation({
 *   variables: {
 *      email: // value for 'email'
 *      redirect: // value for 'redirect'
 *   },
 * });
 */
export function useMagicMutation(baseOptions?: Apollo.MutationHookOptions<MagicMutation, MagicMutationVariables>) {
        return Apollo.useMutation<MagicMutation, MagicMutationVariables>(MagicDocument, baseOptions);
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

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
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

/**
 * __useCheckVerificationMutation__
 *
 * To run a mutation, you first call `useCheckVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkVerificationMutation, { data, loading, error }] = useCheckVerificationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCheckVerificationMutation(baseOptions?: Apollo.MutationHookOptions<CheckVerificationMutation, CheckVerificationMutationVariables>) {
        return Apollo.useMutation<CheckVerificationMutation, CheckVerificationMutationVariables>(CheckVerificationDocument, baseOptions);
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
    