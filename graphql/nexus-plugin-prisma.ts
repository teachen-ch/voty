import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime' | 'Json'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  VerificationRequest: Prisma.VerificationRequest
  Team: Prisma.Team
  School: Prisma.School
  Domain: Prisma.Domain
  Ballot: Prisma.Ballot
  BallotRun: Prisma.BallotRun
  Option: Prisma.Option
  Voted: Prisma.Voted
  Vote: Prisma.Vote
  Attachment: Prisma.Attachment
  Discussion: Prisma.Discussion
  Work: Prisma.Work
  Reaction: Prisma.Reaction
  Activity: Prisma.Activity
  Swissvote: Prisma.Swissvote
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'school' | 'schoolId' | 'team' | 'teamId' | 'teaches' | 'ballots' | 'attachments' | 'discussions' | 'reactions' | 'voted' | 'activity' | 'work' | 'createdAt' | 'updatedAt' | 'Team'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'schoolId' | 'teamId' | 'createdAt' | 'updatedAt'
    }
    verificationRequests: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'identifier' | 'token' | 'expires' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'identifier' | 'token' | 'expires' | 'createdAt' | 'updatedAt'
    }
    teams: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'invite' | 'code' | 'year' | 'cards' | 'prefs' | 'notes' | 'school' | 'schoolId' | 'teacher' | 'teacherId' | 'members' | 'ballots' | 'domain' | 'domainId' | 'User' | 'BallotRuns' | 'Vote' | 'Voted' | 'discussion' | 'activity' | 'attachment' | 'work' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'name' | 'invite' | 'code' | 'year' | 'cards' | 'prefs' | 'notes' | 'schoolId' | 'teacherId' | 'domainId' | 'createdAt' | 'updatedAt'
    }
    schools: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'city' | 'canton' | 'zip' | 'address' | 'type' | 'domain' | 'domainId' | 'members' | 'teams' | 'ballots' | 'Vote' | 'Voted' | 'discussion' | 'activity' | 'attachment' | 'work'
      ordering: 'id' | 'name' | 'city' | 'canton' | 'zip' | 'address' | 'type' | 'domainId'
    }
    domains: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'approved' | 'schools' | 'Team'
      ordering: 'id' | 'name' | 'approved'
    }
    ballots: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'titlede' | 'titlefr' | 'titleit' | 'description' | 'descriptionde' | 'descriptionfr' | 'descriptionit' | 'body' | 'bodyde' | 'bodyfr' | 'bodyit' | 'originalLocale' | 'start' | 'end' | 'scope' | 'canton' | 'school' | 'schoolId' | 'team' | 'teamId' | 'creator' | 'creatorId' | 'options' | 'voted' | 'votes' | 'attachments' | 'ballotRuns' | 'activity' | 'discussion' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'titlede' | 'titlefr' | 'titleit' | 'description' | 'descriptionde' | 'descriptionfr' | 'descriptionit' | 'body' | 'bodyde' | 'bodyfr' | 'bodyit' | 'originalLocale' | 'start' | 'end' | 'scope' | 'canton' | 'schoolId' | 'teamId' | 'creatorId' | 'createdAt' | 'updatedAt'
    }
    ballotRuns: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'start' | 'end' | 'vote' | 'ballot' | 'ballotId' | 'team' | 'teamId'
      ordering: 'id' | 'start' | 'end' | 'ballotId' | 'teamId'
    }
    options: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'vote' | 'title' | 'ballot' | 'ballotId'
      ordering: 'id' | 'vote' | 'title' | 'ballotId'
    }
    voteds: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'signature' | 'user' | 'userId' | 'ballot' | 'ballotId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'signature' | 'userId' | 'ballotId' | 'teamId' | 'schoolId'
    }
    votes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballot' | 'ballotId' | 'ballotRun' | 'ballotRunId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballotId' | 'ballotRunId' | 'teamId' | 'schoolId'
    }
    attachments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'file' | 'title' | 'type' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'ballot' | 'ballotId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'file' | 'title' | 'type' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'ballotId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    discussions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'ballot' | 'ballotId' | 'reactions' | 'attachments' | 'createdAt' | 'updatedAt' | 'Activity'
      ordering: 'id' | 'title' | 'text' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'ballotId' | 'createdAt' | 'updatedAt'
    }
    works: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'data' | 'card' | 'visibility' | 'team' | 'teamId' | 'school' | 'schoolId' | 'users' | 'reactions' | 'attachments' | 'activities' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'text' | 'data' | 'card' | 'visibility' | 'teamId' | 'schoolId' | 'createdAt' | 'updatedAt'
    }
    reactions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'emoij' | 'stars' | 'feedback' | 'user' | 'userId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'emoij' | 'stars' | 'feedback' | 'userId' | 'discussionId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    activities: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'ballot' | 'ballotId' | 'time'
      ordering: 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'workId' | 'ballotId' | 'time'
    }
    swissvotes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'anr' | 'datum' | 'titel_kurz_d' | 'titel_off_d' | 'stichwort' | 'swissvoteslink' | 'rechtsform' | 'poster_ja' | 'poster_nein' | 'annahme' | 'volk' | 'stand' | 'kategorien'
      ordering: 'anr' | 'datum' | 'titel_kurz_d' | 'titel_off_d' | 'stichwort' | 'swissvoteslink' | 'rechtsform' | 'poster_ja' | 'poster_nein' | 'annahme' | 'volk' | 'stand' | 'kategorien'
    }
  },
  User: {
    teaches: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'invite' | 'code' | 'year' | 'cards' | 'prefs' | 'notes' | 'school' | 'schoolId' | 'teacher' | 'teacherId' | 'members' | 'ballots' | 'domain' | 'domainId' | 'User' | 'BallotRuns' | 'Vote' | 'Voted' | 'discussion' | 'activity' | 'attachment' | 'work' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'name' | 'invite' | 'code' | 'year' | 'cards' | 'prefs' | 'notes' | 'schoolId' | 'teacherId' | 'domainId' | 'createdAt' | 'updatedAt'
    }
    ballots: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'titlede' | 'titlefr' | 'titleit' | 'description' | 'descriptionde' | 'descriptionfr' | 'descriptionit' | 'body' | 'bodyde' | 'bodyfr' | 'bodyit' | 'originalLocale' | 'start' | 'end' | 'scope' | 'canton' | 'school' | 'schoolId' | 'team' | 'teamId' | 'creator' | 'creatorId' | 'options' | 'voted' | 'votes' | 'attachments' | 'ballotRuns' | 'activity' | 'discussion' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'titlede' | 'titlefr' | 'titleit' | 'description' | 'descriptionde' | 'descriptionfr' | 'descriptionit' | 'body' | 'bodyde' | 'bodyfr' | 'bodyit' | 'originalLocale' | 'start' | 'end' | 'scope' | 'canton' | 'schoolId' | 'teamId' | 'creatorId' | 'createdAt' | 'updatedAt'
    }
    attachments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'file' | 'title' | 'type' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'ballot' | 'ballotId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'file' | 'title' | 'type' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'ballotId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    discussions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'ballot' | 'ballotId' | 'reactions' | 'attachments' | 'createdAt' | 'updatedAt' | 'Activity'
      ordering: 'id' | 'title' | 'text' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'ballotId' | 'createdAt' | 'updatedAt'
    }
    reactions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'emoij' | 'stars' | 'feedback' | 'user' | 'userId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'emoij' | 'stars' | 'feedback' | 'userId' | 'discussionId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    voted: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'signature' | 'user' | 'userId' | 'ballot' | 'ballotId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'signature' | 'userId' | 'ballotId' | 'teamId' | 'schoolId'
    }
    activity: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'ballot' | 'ballotId' | 'time'
      ordering: 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'workId' | 'ballotId' | 'time'
    }
    work: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'data' | 'card' | 'visibility' | 'team' | 'teamId' | 'school' | 'schoolId' | 'users' | 'reactions' | 'attachments' | 'activities' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'text' | 'data' | 'card' | 'visibility' | 'teamId' | 'schoolId' | 'createdAt' | 'updatedAt'
    }
  }
  VerificationRequest: {

  }
  Team: {
    members: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'school' | 'schoolId' | 'team' | 'teamId' | 'teaches' | 'ballots' | 'attachments' | 'discussions' | 'reactions' | 'voted' | 'activity' | 'work' | 'createdAt' | 'updatedAt' | 'Team'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'schoolId' | 'teamId' | 'createdAt' | 'updatedAt'
    }
    ballots: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'titlede' | 'titlefr' | 'titleit' | 'description' | 'descriptionde' | 'descriptionfr' | 'descriptionit' | 'body' | 'bodyde' | 'bodyfr' | 'bodyit' | 'originalLocale' | 'start' | 'end' | 'scope' | 'canton' | 'school' | 'schoolId' | 'team' | 'teamId' | 'creator' | 'creatorId' | 'options' | 'voted' | 'votes' | 'attachments' | 'ballotRuns' | 'activity' | 'discussion' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'titlede' | 'titlefr' | 'titleit' | 'description' | 'descriptionde' | 'descriptionfr' | 'descriptionit' | 'body' | 'bodyde' | 'bodyfr' | 'bodyit' | 'originalLocale' | 'start' | 'end' | 'scope' | 'canton' | 'schoolId' | 'teamId' | 'creatorId' | 'createdAt' | 'updatedAt'
    }
    User: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'school' | 'schoolId' | 'team' | 'teamId' | 'teaches' | 'ballots' | 'attachments' | 'discussions' | 'reactions' | 'voted' | 'activity' | 'work' | 'createdAt' | 'updatedAt' | 'Team'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'schoolId' | 'teamId' | 'createdAt' | 'updatedAt'
    }
    BallotRuns: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'start' | 'end' | 'vote' | 'ballot' | 'ballotId' | 'team' | 'teamId'
      ordering: 'id' | 'start' | 'end' | 'ballotId' | 'teamId'
    }
    Vote: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballot' | 'ballotId' | 'ballotRun' | 'ballotRunId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballotId' | 'ballotRunId' | 'teamId' | 'schoolId'
    }
    Voted: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'signature' | 'user' | 'userId' | 'ballot' | 'ballotId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'signature' | 'userId' | 'ballotId' | 'teamId' | 'schoolId'
    }
    discussion: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'ballot' | 'ballotId' | 'reactions' | 'attachments' | 'createdAt' | 'updatedAt' | 'Activity'
      ordering: 'id' | 'title' | 'text' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'ballotId' | 'createdAt' | 'updatedAt'
    }
    activity: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'ballot' | 'ballotId' | 'time'
      ordering: 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'workId' | 'ballotId' | 'time'
    }
    attachment: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'file' | 'title' | 'type' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'ballot' | 'ballotId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'file' | 'title' | 'type' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'ballotId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    work: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'data' | 'card' | 'visibility' | 'team' | 'teamId' | 'school' | 'schoolId' | 'users' | 'reactions' | 'attachments' | 'activities' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'text' | 'data' | 'card' | 'visibility' | 'teamId' | 'schoolId' | 'createdAt' | 'updatedAt'
    }
  }
  School: {
    members: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'school' | 'schoolId' | 'team' | 'teamId' | 'teaches' | 'ballots' | 'attachments' | 'discussions' | 'reactions' | 'voted' | 'activity' | 'work' | 'createdAt' | 'updatedAt' | 'Team'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'schoolId' | 'teamId' | 'createdAt' | 'updatedAt'
    }
    teams: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'invite' | 'code' | 'year' | 'cards' | 'prefs' | 'notes' | 'school' | 'schoolId' | 'teacher' | 'teacherId' | 'members' | 'ballots' | 'domain' | 'domainId' | 'User' | 'BallotRuns' | 'Vote' | 'Voted' | 'discussion' | 'activity' | 'attachment' | 'work' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'name' | 'invite' | 'code' | 'year' | 'cards' | 'prefs' | 'notes' | 'schoolId' | 'teacherId' | 'domainId' | 'createdAt' | 'updatedAt'
    }
    ballots: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'titlede' | 'titlefr' | 'titleit' | 'description' | 'descriptionde' | 'descriptionfr' | 'descriptionit' | 'body' | 'bodyde' | 'bodyfr' | 'bodyit' | 'originalLocale' | 'start' | 'end' | 'scope' | 'canton' | 'school' | 'schoolId' | 'team' | 'teamId' | 'creator' | 'creatorId' | 'options' | 'voted' | 'votes' | 'attachments' | 'ballotRuns' | 'activity' | 'discussion' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'titlede' | 'titlefr' | 'titleit' | 'description' | 'descriptionde' | 'descriptionfr' | 'descriptionit' | 'body' | 'bodyde' | 'bodyfr' | 'bodyit' | 'originalLocale' | 'start' | 'end' | 'scope' | 'canton' | 'schoolId' | 'teamId' | 'creatorId' | 'createdAt' | 'updatedAt'
    }
    Vote: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballot' | 'ballotId' | 'ballotRun' | 'ballotRunId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballotId' | 'ballotRunId' | 'teamId' | 'schoolId'
    }
    Voted: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'signature' | 'user' | 'userId' | 'ballot' | 'ballotId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'signature' | 'userId' | 'ballotId' | 'teamId' | 'schoolId'
    }
    discussion: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'ballot' | 'ballotId' | 'reactions' | 'attachments' | 'createdAt' | 'updatedAt' | 'Activity'
      ordering: 'id' | 'title' | 'text' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'ballotId' | 'createdAt' | 'updatedAt'
    }
    activity: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'ballot' | 'ballotId' | 'time'
      ordering: 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'workId' | 'ballotId' | 'time'
    }
    attachment: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'file' | 'title' | 'type' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'ballot' | 'ballotId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'file' | 'title' | 'type' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'ballotId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    work: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'data' | 'card' | 'visibility' | 'team' | 'teamId' | 'school' | 'schoolId' | 'users' | 'reactions' | 'attachments' | 'activities' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'title' | 'text' | 'data' | 'card' | 'visibility' | 'teamId' | 'schoolId' | 'createdAt' | 'updatedAt'
    }
  }
  Domain: {
    schools: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'city' | 'canton' | 'zip' | 'address' | 'type' | 'domain' | 'domainId' | 'members' | 'teams' | 'ballots' | 'Vote' | 'Voted' | 'discussion' | 'activity' | 'attachment' | 'work'
      ordering: 'id' | 'name' | 'city' | 'canton' | 'zip' | 'address' | 'type' | 'domainId'
    }
    Team: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'invite' | 'code' | 'year' | 'cards' | 'prefs' | 'notes' | 'school' | 'schoolId' | 'teacher' | 'teacherId' | 'members' | 'ballots' | 'domain' | 'domainId' | 'User' | 'BallotRuns' | 'Vote' | 'Voted' | 'discussion' | 'activity' | 'attachment' | 'work' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'name' | 'invite' | 'code' | 'year' | 'cards' | 'prefs' | 'notes' | 'schoolId' | 'teacherId' | 'domainId' | 'createdAt' | 'updatedAt'
    }
  }
  Ballot: {
    options: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'vote' | 'title' | 'ballot' | 'ballotId'
      ordering: 'id' | 'vote' | 'title' | 'ballotId'
    }
    voted: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'signature' | 'user' | 'userId' | 'ballot' | 'ballotId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'signature' | 'userId' | 'ballotId' | 'teamId' | 'schoolId'
    }
    votes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballot' | 'ballotId' | 'ballotRun' | 'ballotRunId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballotId' | 'ballotRunId' | 'teamId' | 'schoolId'
    }
    attachments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'file' | 'title' | 'type' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'ballot' | 'ballotId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'file' | 'title' | 'type' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'ballotId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    ballotRuns: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'start' | 'end' | 'vote' | 'ballot' | 'ballotId' | 'team' | 'teamId'
      ordering: 'id' | 'start' | 'end' | 'ballotId' | 'teamId'
    }
    activity: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'ballot' | 'ballotId' | 'time'
      ordering: 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'workId' | 'ballotId' | 'time'
    }
    discussion: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'text' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'ballot' | 'ballotId' | 'reactions' | 'attachments' | 'createdAt' | 'updatedAt' | 'Activity'
      ordering: 'id' | 'title' | 'text' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'ballotId' | 'createdAt' | 'updatedAt'
    }
  }
  BallotRun: {
    vote: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballot' | 'ballotId' | 'ballotRun' | 'ballotRunId' | 'team' | 'teamId' | 'school' | 'schoolId'
      ordering: 'id' | 'vote' | 'verify' | 'year' | 'canton' | 'schooltype' | 'locale' | 'ballotId' | 'ballotRunId' | 'teamId' | 'schoolId'
    }
  }
  Option: {

  }
  Voted: {

  }
  Vote: {

  }
  Attachment: {

  }
  Discussion: {
    reactions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'emoij' | 'stars' | 'feedback' | 'user' | 'userId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'emoij' | 'stars' | 'feedback' | 'userId' | 'discussionId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    attachments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'file' | 'title' | 'type' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'ballot' | 'ballotId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'file' | 'title' | 'type' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'ballotId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    Activity: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'ballot' | 'ballotId' | 'time'
      ordering: 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'workId' | 'ballotId' | 'time'
    }
  }
  Work: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'school' | 'schoolId' | 'team' | 'teamId' | 'teaches' | 'ballots' | 'attachments' | 'discussions' | 'reactions' | 'voted' | 'activity' | 'work' | 'createdAt' | 'updatedAt' | 'Team'
      ordering: 'id' | 'name' | 'email' | 'emailVerified' | 'verified' | 'lastname' | 'image' | 'campaign' | 'locale' | 'password' | 'gender' | 'year' | 'canton' | 'role' | 'schoolId' | 'teamId' | 'createdAt' | 'updatedAt'
    }
    reactions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'emoij' | 'stars' | 'feedback' | 'user' | 'userId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'emoij' | 'stars' | 'feedback' | 'userId' | 'discussionId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    attachments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'file' | 'title' | 'type' | 'card' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'ballot' | 'ballotId' | 'work' | 'workId' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'file' | 'title' | 'type' | 'card' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'ballotId' | 'workId' | 'createdAt' | 'updatedAt'
    }
    activities: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'user' | 'userId' | 'team' | 'teamId' | 'school' | 'schoolId' | 'discussion' | 'discussionId' | 'work' | 'workId' | 'ballot' | 'ballotId' | 'time'
      ordering: 'id' | 'type' | 'visibility' | 'card' | 'summary' | 'userId' | 'teamId' | 'schoolId' | 'discussionId' | 'workId' | 'ballotId' | 'time'
    }
  }
  Reaction: {

  }
  Activity: {

  }
  Swissvote: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    verificationRequest: 'VerificationRequest'
    verificationRequests: 'VerificationRequest'
    team: 'Team'
    teams: 'Team'
    school: 'School'
    schools: 'School'
    domain: 'Domain'
    domains: 'Domain'
    ballot: 'Ballot'
    ballots: 'Ballot'
    ballotRun: 'BallotRun'
    ballotRuns: 'BallotRun'
    option: 'Option'
    options: 'Option'
    voted: 'Voted'
    voteds: 'Voted'
    vote: 'Vote'
    votes: 'Vote'
    attachment: 'Attachment'
    attachments: 'Attachment'
    discussion: 'Discussion'
    discussions: 'Discussion'
    work: 'Work'
    works: 'Work'
    reaction: 'Reaction'
    reactions: 'Reaction'
    activity: 'Activity'
    activities: 'Activity'
    swissvote: 'Swissvote'
    swissvotes: 'Swissvote'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
    createOneVerificationRequest: 'VerificationRequest'
    updateOneVerificationRequest: 'VerificationRequest'
    updateManyVerificationRequest: 'AffectedRowsOutput'
    deleteOneVerificationRequest: 'VerificationRequest'
    deleteManyVerificationRequest: 'AffectedRowsOutput'
    upsertOneVerificationRequest: 'VerificationRequest'
    createOneTeam: 'Team'
    updateOneTeam: 'Team'
    updateManyTeam: 'AffectedRowsOutput'
    deleteOneTeam: 'Team'
    deleteManyTeam: 'AffectedRowsOutput'
    upsertOneTeam: 'Team'
    createOneSchool: 'School'
    updateOneSchool: 'School'
    updateManySchool: 'AffectedRowsOutput'
    deleteOneSchool: 'School'
    deleteManySchool: 'AffectedRowsOutput'
    upsertOneSchool: 'School'
    createOneDomain: 'Domain'
    updateOneDomain: 'Domain'
    updateManyDomain: 'AffectedRowsOutput'
    deleteOneDomain: 'Domain'
    deleteManyDomain: 'AffectedRowsOutput'
    upsertOneDomain: 'Domain'
    createOneBallot: 'Ballot'
    updateOneBallot: 'Ballot'
    updateManyBallot: 'AffectedRowsOutput'
    deleteOneBallot: 'Ballot'
    deleteManyBallot: 'AffectedRowsOutput'
    upsertOneBallot: 'Ballot'
    createOneBallotRun: 'BallotRun'
    updateOneBallotRun: 'BallotRun'
    updateManyBallotRun: 'AffectedRowsOutput'
    deleteOneBallotRun: 'BallotRun'
    deleteManyBallotRun: 'AffectedRowsOutput'
    upsertOneBallotRun: 'BallotRun'
    createOneOption: 'Option'
    updateOneOption: 'Option'
    updateManyOption: 'AffectedRowsOutput'
    deleteOneOption: 'Option'
    deleteManyOption: 'AffectedRowsOutput'
    upsertOneOption: 'Option'
    createOneVoted: 'Voted'
    updateOneVoted: 'Voted'
    updateManyVoted: 'AffectedRowsOutput'
    deleteOneVoted: 'Voted'
    deleteManyVoted: 'AffectedRowsOutput'
    upsertOneVoted: 'Voted'
    createOneVote: 'Vote'
    updateOneVote: 'Vote'
    updateManyVote: 'AffectedRowsOutput'
    deleteOneVote: 'Vote'
    deleteManyVote: 'AffectedRowsOutput'
    upsertOneVote: 'Vote'
    createOneAttachment: 'Attachment'
    updateOneAttachment: 'Attachment'
    updateManyAttachment: 'AffectedRowsOutput'
    deleteOneAttachment: 'Attachment'
    deleteManyAttachment: 'AffectedRowsOutput'
    upsertOneAttachment: 'Attachment'
    createOneDiscussion: 'Discussion'
    updateOneDiscussion: 'Discussion'
    updateManyDiscussion: 'AffectedRowsOutput'
    deleteOneDiscussion: 'Discussion'
    deleteManyDiscussion: 'AffectedRowsOutput'
    upsertOneDiscussion: 'Discussion'
    createOneWork: 'Work'
    updateOneWork: 'Work'
    updateManyWork: 'AffectedRowsOutput'
    deleteOneWork: 'Work'
    deleteManyWork: 'AffectedRowsOutput'
    upsertOneWork: 'Work'
    createOneReaction: 'Reaction'
    updateOneReaction: 'Reaction'
    updateManyReaction: 'AffectedRowsOutput'
    deleteOneReaction: 'Reaction'
    deleteManyReaction: 'AffectedRowsOutput'
    upsertOneReaction: 'Reaction'
    createOneActivity: 'Activity'
    updateOneActivity: 'Activity'
    updateManyActivity: 'AffectedRowsOutput'
    deleteOneActivity: 'Activity'
    deleteManyActivity: 'AffectedRowsOutput'
    upsertOneActivity: 'Activity'
    createOneSwissvote: 'Swissvote'
    updateOneSwissvote: 'Swissvote'
    updateManySwissvote: 'AffectedRowsOutput'
    deleteOneSwissvote: 'Swissvote'
    deleteManySwissvote: 'AffectedRowsOutput'
    upsertOneSwissvote: 'Swissvote'
  },
  User: {
    id: 'String'
    name: 'String'
    email: 'String'
    emailVerified: 'DateTime'
    verified: 'Boolean'
    lastname: 'String'
    image: 'String'
    campaign: 'String'
    locale: 'String'
    password: 'String'
    gender: 'Gender'
    year: 'Int'
    canton: 'String'
    role: 'Role'
    school: 'School'
    schoolId: 'String'
    team: 'Team'
    teamId: 'String'
    teaches: 'Team'
    ballots: 'Ballot'
    attachments: 'Attachment'
    discussions: 'Discussion'
    reactions: 'Reaction'
    voted: 'Voted'
    activity: 'Activity'
    work: 'Work'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    Team: 'Team'
  }
  VerificationRequest: {
    id: 'String'
    identifier: 'String'
    token: 'String'
    expires: 'DateTime'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Team: {
    id: 'String'
    name: 'String'
    invite: 'String'
    code: 'String'
    year: 'Int'
    cards: 'String'
    prefs: 'Json'
    notes: 'Json'
    school: 'School'
    schoolId: 'String'
    teacher: 'User'
    teacherId: 'String'
    members: 'User'
    ballots: 'Ballot'
    domain: 'Domain'
    domainId: 'String'
    User: 'User'
    BallotRuns: 'BallotRun'
    Vote: 'Vote'
    Voted: 'Voted'
    discussion: 'Discussion'
    activity: 'Activity'
    attachment: 'Attachment'
    work: 'Work'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  School: {
    id: 'String'
    name: 'String'
    city: 'String'
    canton: 'String'
    zip: 'String'
    address: 'String'
    type: 'String'
    domain: 'Domain'
    domainId: 'String'
    members: 'User'
    teams: 'Team'
    ballots: 'Ballot'
    Vote: 'Vote'
    Voted: 'Voted'
    discussion: 'Discussion'
    activity: 'Activity'
    attachment: 'Attachment'
    work: 'Work'
  }
  Domain: {
    id: 'String'
    name: 'String'
    approved: 'Boolean'
    schools: 'School'
    Team: 'Team'
  }
  Ballot: {
    id: 'String'
    title: 'String'
    titlede: 'String'
    titlefr: 'String'
    titleit: 'String'
    description: 'String'
    descriptionde: 'String'
    descriptionfr: 'String'
    descriptionit: 'String'
    body: 'String'
    bodyde: 'String'
    bodyfr: 'String'
    bodyit: 'String'
    originalLocale: 'String'
    start: 'DateTime'
    end: 'DateTime'
    scope: 'BallotScope'
    canton: 'String'
    school: 'School'
    schoolId: 'String'
    team: 'Team'
    teamId: 'String'
    creator: 'User'
    creatorId: 'String'
    options: 'Option'
    voted: 'Voted'
    votes: 'Vote'
    attachments: 'Attachment'
    ballotRuns: 'BallotRun'
    activity: 'Activity'
    discussion: 'Discussion'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  BallotRun: {
    id: 'String'
    start: 'DateTime'
    end: 'DateTime'
    vote: 'Vote'
    ballot: 'Ballot'
    ballotId: 'String'
    team: 'Team'
    teamId: 'String'
  }
  Option: {
    id: 'String'
    vote: 'Int'
    title: 'String'
    ballot: 'Ballot'
    ballotId: 'String'
  }
  Voted: {
    id: 'String'
    signature: 'String'
    user: 'User'
    userId: 'String'
    ballot: 'Ballot'
    ballotId: 'String'
    team: 'Team'
    teamId: 'String'
    school: 'School'
    schoolId: 'String'
  }
  Vote: {
    id: 'String'
    vote: 'Int'
    verify: 'String'
    year: 'Int'
    canton: 'String'
    schooltype: 'String'
    locale: 'String'
    ballot: 'Ballot'
    ballotId: 'String'
    ballotRun: 'BallotRun'
    ballotRunId: 'String'
    team: 'Team'
    teamId: 'String'
    school: 'School'
    schoolId: 'String'
  }
  Attachment: {
    id: 'String'
    file: 'String'
    title: 'String'
    type: 'String'
    card: 'String'
    user: 'User'
    userId: 'String'
    team: 'Team'
    teamId: 'String'
    school: 'School'
    schoolId: 'String'
    discussion: 'Discussion'
    discussionId: 'String'
    ballot: 'Ballot'
    ballotId: 'String'
    work: 'Work'
    workId: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Discussion: {
    id: 'String'
    title: 'String'
    text: 'String'
    card: 'String'
    user: 'User'
    userId: 'String'
    team: 'Team'
    teamId: 'String'
    school: 'School'
    schoolId: 'String'
    ballot: 'Ballot'
    ballotId: 'String'
    reactions: 'Reaction'
    attachments: 'Attachment'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    Activity: 'Activity'
  }
  Work: {
    id: 'String'
    title: 'String'
    text: 'String'
    data: 'Json'
    card: 'String'
    visibility: 'Visibility'
    team: 'Team'
    teamId: 'String'
    school: 'School'
    schoolId: 'String'
    users: 'User'
    reactions: 'Reaction'
    attachments: 'Attachment'
    activities: 'Activity'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Reaction: {
    id: 'String'
    emoij: 'String'
    stars: 'Int'
    feedback: 'String'
    user: 'User'
    userId: 'String'
    discussion: 'Discussion'
    discussionId: 'String'
    work: 'Work'
    workId: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Activity: {
    id: 'Int'
    type: 'ActivityType'
    visibility: 'Visibility'
    card: 'String'
    summary: 'String'
    user: 'User'
    userId: 'String'
    team: 'Team'
    teamId: 'String'
    school: 'School'
    schoolId: 'String'
    discussion: 'Discussion'
    discussionId: 'String'
    work: 'Work'
    workId: 'String'
    ballot: 'Ballot'
    ballotId: 'String'
    time: 'DateTime'
  }
  Swissvote: {
    anr: 'String'
    datum: 'DateTime'
    titel_kurz_d: 'String'
    titel_off_d: 'String'
    stichwort: 'String'
    swissvoteslink: 'String'
    rechtsform: 'Int'
    poster_ja: 'String'
    poster_nein: 'String'
    annahme: 'Int'
    volk: 'Int'
    stand: 'Int'
    kategorien: 'String'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  VerificationRequest: Typegen.NexusPrismaFields<'VerificationRequest'>
  Team: Typegen.NexusPrismaFields<'Team'>
  School: Typegen.NexusPrismaFields<'School'>
  Domain: Typegen.NexusPrismaFields<'Domain'>
  Ballot: Typegen.NexusPrismaFields<'Ballot'>
  BallotRun: Typegen.NexusPrismaFields<'BallotRun'>
  Option: Typegen.NexusPrismaFields<'Option'>
  Voted: Typegen.NexusPrismaFields<'Voted'>
  Vote: Typegen.NexusPrismaFields<'Vote'>
  Attachment: Typegen.NexusPrismaFields<'Attachment'>
  Discussion: Typegen.NexusPrismaFields<'Discussion'>
  Work: Typegen.NexusPrismaFields<'Work'>
  Reaction: Typegen.NexusPrismaFields<'Reaction'>
  Activity: Typegen.NexusPrismaFields<'Activity'>
  Swissvote: Typegen.NexusPrismaFields<'Swissvote'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  