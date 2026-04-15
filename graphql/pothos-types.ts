/* eslint-disable */
import type { Prisma, User, VerificationRequest, Team, School, Domain, Ballot, BallotRun, Option, Voted, Vote, Attachment, Discussion, Work, Reaction, Activity, Swissvote } from "@prisma/client";
import type { PothosPrismaDatamodel } from "@pothos/plugin-prisma";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "school" | "team" | "teaches" | "ballots" | "attachments" | "discussions" | "reactions" | "voted" | "activity" | "work";
        ListRelations: "teaches" | "ballots" | "attachments" | "discussions" | "reactions" | "voted" | "activity" | "work";
        Relations: {
            school: {
                Shape: School | null;
                Name: "School";
                Nullable: true;
            };
            team: {
                Shape: Team | null;
                Name: "Team";
                Nullable: true;
            };
            teaches: {
                Shape: Team[];
                Name: "Team";
                Nullable: false;
            };
            ballots: {
                Shape: Ballot[];
                Name: "Ballot";
                Nullable: false;
            };
            attachments: {
                Shape: Attachment[];
                Name: "Attachment";
                Nullable: false;
            };
            discussions: {
                Shape: Discussion[];
                Name: "Discussion";
                Nullable: false;
            };
            reactions: {
                Shape: Reaction[];
                Name: "Reaction";
                Nullable: false;
            };
            voted: {
                Shape: Voted[];
                Name: "Voted";
                Nullable: false;
            };
            activity: {
                Shape: Activity[];
                Name: "Activity";
                Nullable: false;
            };
            work: {
                Shape: Work[];
                Name: "Work";
                Nullable: false;
            };
        };
    };
    VerificationRequest: {
        Name: "VerificationRequest";
        Shape: VerificationRequest;
        Include: never;
        Select: Prisma.VerificationRequestSelect;
        OrderBy: Prisma.VerificationRequestOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationRequestWhereUniqueInput;
        Where: Prisma.VerificationRequestWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Team: {
        Name: "Team";
        Shape: Team;
        Include: Prisma.TeamInclude;
        Select: Prisma.TeamSelect;
        OrderBy: Prisma.TeamOrderByWithRelationInput;
        WhereUnique: Prisma.TeamWhereUniqueInput;
        Where: Prisma.TeamWhereInput;
        Create: {};
        Update: {};
        RelationName: "school" | "teacher" | "members" | "ballots" | "domain" | "BallotRuns" | "Vote" | "Voted" | "discussion" | "activity" | "attachment" | "work";
        ListRelations: "members" | "ballots" | "BallotRuns" | "Vote" | "Voted" | "discussion" | "activity" | "attachment" | "work";
        Relations: {
            school: {
                Shape: School;
                Name: "School";
                Nullable: false;
            };
            teacher: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            members: {
                Shape: User[];
                Name: "User";
                Nullable: false;
            };
            ballots: {
                Shape: Ballot[];
                Name: "Ballot";
                Nullable: false;
            };
            domain: {
                Shape: Domain | null;
                Name: "Domain";
                Nullable: true;
            };
            BallotRuns: {
                Shape: BallotRun[];
                Name: "BallotRun";
                Nullable: false;
            };
            Vote: {
                Shape: Vote[];
                Name: "Vote";
                Nullable: false;
            };
            Voted: {
                Shape: Voted[];
                Name: "Voted";
                Nullable: false;
            };
            discussion: {
                Shape: Discussion[];
                Name: "Discussion";
                Nullable: false;
            };
            activity: {
                Shape: Activity[];
                Name: "Activity";
                Nullable: false;
            };
            attachment: {
                Shape: Attachment[];
                Name: "Attachment";
                Nullable: false;
            };
            work: {
                Shape: Work[];
                Name: "Work";
                Nullable: false;
            };
        };
    };
    School: {
        Name: "School";
        Shape: School;
        Include: Prisma.SchoolInclude;
        Select: Prisma.SchoolSelect;
        OrderBy: Prisma.SchoolOrderByWithRelationInput;
        WhereUnique: Prisma.SchoolWhereUniqueInput;
        Where: Prisma.SchoolWhereInput;
        Create: {};
        Update: {};
        RelationName: "domain" | "members" | "teams" | "ballots" | "Vote" | "Voted" | "discussion" | "activity" | "attachment" | "work";
        ListRelations: "members" | "teams" | "ballots" | "Vote" | "Voted" | "discussion" | "activity" | "attachment" | "work";
        Relations: {
            domain: {
                Shape: Domain | null;
                Name: "Domain";
                Nullable: true;
            };
            members: {
                Shape: User[];
                Name: "User";
                Nullable: false;
            };
            teams: {
                Shape: Team[];
                Name: "Team";
                Nullable: false;
            };
            ballots: {
                Shape: Ballot[];
                Name: "Ballot";
                Nullable: false;
            };
            Vote: {
                Shape: Vote[];
                Name: "Vote";
                Nullable: false;
            };
            Voted: {
                Shape: Voted[];
                Name: "Voted";
                Nullable: false;
            };
            discussion: {
                Shape: Discussion[];
                Name: "Discussion";
                Nullable: false;
            };
            activity: {
                Shape: Activity[];
                Name: "Activity";
                Nullable: false;
            };
            attachment: {
                Shape: Attachment[];
                Name: "Attachment";
                Nullable: false;
            };
            work: {
                Shape: Work[];
                Name: "Work";
                Nullable: false;
            };
        };
    };
    Domain: {
        Name: "Domain";
        Shape: Domain;
        Include: Prisma.DomainInclude;
        Select: Prisma.DomainSelect;
        OrderBy: Prisma.DomainOrderByWithRelationInput;
        WhereUnique: Prisma.DomainWhereUniqueInput;
        Where: Prisma.DomainWhereInput;
        Create: {};
        Update: {};
        RelationName: "schools" | "Team";
        ListRelations: "schools" | "Team";
        Relations: {
            schools: {
                Shape: School[];
                Name: "School";
                Nullable: false;
            };
            Team: {
                Shape: Team[];
                Name: "Team";
                Nullable: false;
            };
        };
    };
    Ballot: {
        Name: "Ballot";
        Shape: Ballot;
        Include: Prisma.BallotInclude;
        Select: Prisma.BallotSelect;
        OrderBy: Prisma.BallotOrderByWithRelationInput;
        WhereUnique: Prisma.BallotWhereUniqueInput;
        Where: Prisma.BallotWhereInput;
        Create: {};
        Update: {};
        RelationName: "school" | "team" | "creator" | "options" | "voted" | "votes" | "attachments" | "ballotRuns" | "activity" | "discussion";
        ListRelations: "options" | "voted" | "votes" | "attachments" | "ballotRuns" | "activity" | "discussion";
        Relations: {
            school: {
                Shape: School | null;
                Name: "School";
                Nullable: true;
            };
            team: {
                Shape: Team | null;
                Name: "Team";
                Nullable: true;
            };
            creator: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            options: {
                Shape: Option[];
                Name: "Option";
                Nullable: false;
            };
            voted: {
                Shape: Voted[];
                Name: "Voted";
                Nullable: false;
            };
            votes: {
                Shape: Vote[];
                Name: "Vote";
                Nullable: false;
            };
            attachments: {
                Shape: Attachment[];
                Name: "Attachment";
                Nullable: false;
            };
            ballotRuns: {
                Shape: BallotRun[];
                Name: "BallotRun";
                Nullable: false;
            };
            activity: {
                Shape: Activity[];
                Name: "Activity";
                Nullable: false;
            };
            discussion: {
                Shape: Discussion[];
                Name: "Discussion";
                Nullable: false;
            };
        };
    };
    BallotRun: {
        Name: "BallotRun";
        Shape: BallotRun;
        Include: Prisma.BallotRunInclude;
        Select: Prisma.BallotRunSelect;
        OrderBy: Prisma.BallotRunOrderByWithRelationInput;
        WhereUnique: Prisma.BallotRunWhereUniqueInput;
        Where: Prisma.BallotRunWhereInput;
        Create: {};
        Update: {};
        RelationName: "vote" | "ballot" | "team";
        ListRelations: "vote";
        Relations: {
            vote: {
                Shape: Vote[];
                Name: "Vote";
                Nullable: false;
            };
            ballot: {
                Shape: Ballot;
                Name: "Ballot";
                Nullable: false;
            };
            team: {
                Shape: Team;
                Name: "Team";
                Nullable: false;
            };
        };
    };
    Option: {
        Name: "Option";
        Shape: Option;
        Include: Prisma.OptionInclude;
        Select: Prisma.OptionSelect;
        OrderBy: Prisma.OptionOrderByWithRelationInput;
        WhereUnique: Prisma.OptionWhereUniqueInput;
        Where: Prisma.OptionWhereInput;
        Create: {};
        Update: {};
        RelationName: "ballot";
        ListRelations: never;
        Relations: {
            ballot: {
                Shape: Ballot;
                Name: "Ballot";
                Nullable: false;
            };
        };
    };
    Voted: {
        Name: "Voted";
        Shape: Voted;
        Include: Prisma.VotedInclude;
        Select: Prisma.VotedSelect;
        OrderBy: Prisma.VotedOrderByWithRelationInput;
        WhereUnique: Prisma.VotedWhereUniqueInput;
        Where: Prisma.VotedWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "ballot" | "team" | "school";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            ballot: {
                Shape: Ballot;
                Name: "Ballot";
                Nullable: false;
            };
            team: {
                Shape: Team | null;
                Name: "Team";
                Nullable: true;
            };
            school: {
                Shape: School | null;
                Name: "School";
                Nullable: true;
            };
        };
    };
    Vote: {
        Name: "Vote";
        Shape: Vote;
        Include: Prisma.VoteInclude;
        Select: Prisma.VoteSelect;
        OrderBy: Prisma.VoteOrderByWithRelationInput;
        WhereUnique: Prisma.VoteWhereUniqueInput;
        Where: Prisma.VoteWhereInput;
        Create: {};
        Update: {};
        RelationName: "ballot" | "ballotRun" | "team" | "school";
        ListRelations: never;
        Relations: {
            ballot: {
                Shape: Ballot;
                Name: "Ballot";
                Nullable: false;
            };
            ballotRun: {
                Shape: BallotRun | null;
                Name: "BallotRun";
                Nullable: true;
            };
            team: {
                Shape: Team | null;
                Name: "Team";
                Nullable: true;
            };
            school: {
                Shape: School | null;
                Name: "School";
                Nullable: true;
            };
        };
    };
    Attachment: {
        Name: "Attachment";
        Shape: Attachment;
        Include: Prisma.AttachmentInclude;
        Select: Prisma.AttachmentSelect;
        OrderBy: Prisma.AttachmentOrderByWithRelationInput;
        WhereUnique: Prisma.AttachmentWhereUniqueInput;
        Where: Prisma.AttachmentWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "team" | "school" | "discussion" | "ballot" | "work";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            team: {
                Shape: Team;
                Name: "Team";
                Nullable: false;
            };
            school: {
                Shape: School | null;
                Name: "School";
                Nullable: true;
            };
            discussion: {
                Shape: Discussion | null;
                Name: "Discussion";
                Nullable: true;
            };
            ballot: {
                Shape: Ballot | null;
                Name: "Ballot";
                Nullable: true;
            };
            work: {
                Shape: Work | null;
                Name: "Work";
                Nullable: true;
            };
        };
    };
    Discussion: {
        Name: "Discussion";
        Shape: Discussion;
        Include: Prisma.DiscussionInclude;
        Select: Prisma.DiscussionSelect;
        OrderBy: Prisma.DiscussionOrderByWithRelationInput;
        WhereUnique: Prisma.DiscussionWhereUniqueInput;
        Where: Prisma.DiscussionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "team" | "school" | "ballot" | "reactions" | "attachments" | "Activity";
        ListRelations: "reactions" | "attachments" | "Activity";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            team: {
                Shape: Team;
                Name: "Team";
                Nullable: false;
            };
            school: {
                Shape: School | null;
                Name: "School";
                Nullable: true;
            };
            ballot: {
                Shape: Ballot | null;
                Name: "Ballot";
                Nullable: true;
            };
            reactions: {
                Shape: Reaction[];
                Name: "Reaction";
                Nullable: false;
            };
            attachments: {
                Shape: Attachment[];
                Name: "Attachment";
                Nullable: false;
            };
            Activity: {
                Shape: Activity[];
                Name: "Activity";
                Nullable: false;
            };
        };
    };
    Work: {
        Name: "Work";
        Shape: Work;
        Include: Prisma.WorkInclude;
        Select: Prisma.WorkSelect;
        OrderBy: Prisma.WorkOrderByWithRelationInput;
        WhereUnique: Prisma.WorkWhereUniqueInput;
        Where: Prisma.WorkWhereInput;
        Create: {};
        Update: {};
        RelationName: "team" | "school" | "users" | "reactions" | "attachments" | "activities";
        ListRelations: "users" | "reactions" | "attachments" | "activities";
        Relations: {
            team: {
                Shape: Team;
                Name: "Team";
                Nullable: false;
            };
            school: {
                Shape: School;
                Name: "School";
                Nullable: false;
            };
            users: {
                Shape: User[];
                Name: "User";
                Nullable: false;
            };
            reactions: {
                Shape: Reaction[];
                Name: "Reaction";
                Nullable: false;
            };
            attachments: {
                Shape: Attachment[];
                Name: "Attachment";
                Nullable: false;
            };
            activities: {
                Shape: Activity[];
                Name: "Activity";
                Nullable: false;
            };
        };
    };
    Reaction: {
        Name: "Reaction";
        Shape: Reaction;
        Include: Prisma.ReactionInclude;
        Select: Prisma.ReactionSelect;
        OrderBy: Prisma.ReactionOrderByWithRelationInput;
        WhereUnique: Prisma.ReactionWhereUniqueInput;
        Where: Prisma.ReactionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "discussion" | "work";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            discussion: {
                Shape: Discussion | null;
                Name: "Discussion";
                Nullable: true;
            };
            work: {
                Shape: Work | null;
                Name: "Work";
                Nullable: true;
            };
        };
    };
    Activity: {
        Name: "Activity";
        Shape: Activity;
        Include: Prisma.ActivityInclude;
        Select: Prisma.ActivitySelect;
        OrderBy: Prisma.ActivityOrderByWithRelationInput;
        WhereUnique: Prisma.ActivityWhereUniqueInput;
        Where: Prisma.ActivityWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "team" | "school" | "discussion" | "work" | "ballot";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            team: {
                Shape: Team;
                Name: "Team";
                Nullable: false;
            };
            school: {
                Shape: School;
                Name: "School";
                Nullable: false;
            };
            discussion: {
                Shape: Discussion | null;
                Name: "Discussion";
                Nullable: true;
            };
            work: {
                Shape: Work | null;
                Name: "Work";
                Nullable: true;
            };
            ballot: {
                Shape: Ballot | null;
                Name: "Ballot";
                Nullable: true;
            };
        };
    };
    Swissvote: {
        Name: "Swissvote";
        Shape: Swissvote;
        Include: never;
        Select: Prisma.SwissvoteSelect;
        OrderBy: Prisma.SwissvoteOrderByWithRelationInput;
        WhereUnique: Prisma.SwissvoteWhereUniqueInput;
        Where: Prisma.SwissvoteWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}
export function getDatamodel(): PothosPrismaDatamodel { return JSON.parse("{\"datamodel\":{\"models\":{\"User\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"email\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"emailVerified\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"verified\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"lastname\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"image\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"campaign\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"locale\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"password\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Gender\",\"kind\":\"enum\",\"name\":\"gender\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"year\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"canton\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Role\",\"kind\":\"enum\",\"name\":\"role\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToUser\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"TeamMembers\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"teaches\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Teacher\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballots\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Attachment\",\"kind\":\"object\",\"name\":\"attachments\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Discussion\",\"kind\":\"object\",\"name\":\"discussions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiscussionToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Reaction\",\"kind\":\"object\",\"name\":\"reactions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ReactionToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Voted\",\"kind\":\"object\",\"name\":\"voted\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"VotedUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Activity\",\"kind\":\"object\",\"name\":\"activity\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Work\",\"kind\":\"object\",\"name\":\"work\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserToWork\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"VerificationRequest\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"identifier\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"token\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"expires\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Team\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"invite\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"code\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"year\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"cards\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"prefs\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"notes\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToTeam\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"teacher\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"Teacher\",\"relationFromFields\":[\"teacherId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teacherId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"members\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"TeamMembers\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballots\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToTeam\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Domain\",\"kind\":\"object\",\"name\":\"domain\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DomainToTeam\",\"relationFromFields\":[\"domainId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"domainId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BallotRun\",\"kind\":\"object\",\"name\":\"BallotRuns\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotRunToTeam\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Vote\",\"kind\":\"object\",\"name\":\"Vote\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"TeamToVote\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Voted\",\"kind\":\"object\",\"name\":\"Voted\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"TeamToVoted\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Discussion\",\"kind\":\"object\",\"name\":\"discussion\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiscussionToTeam\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Activity\",\"kind\":\"object\",\"name\":\"activity\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToTeam\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Attachment\",\"kind\":\"object\",\"name\":\"attachment\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToTeam\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Work\",\"kind\":\"object\",\"name\":\"work\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"TeamToWork\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"School\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"city\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"canton\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"zip\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"address\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"type\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Domain\",\"kind\":\"object\",\"name\":\"domain\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DomainToSchool\",\"relationFromFields\":[\"domainId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"domainId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"members\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToUser\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"teams\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToTeam\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballots\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToSchool\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Vote\",\"kind\":\"object\",\"name\":\"Vote\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToVote\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Voted\",\"kind\":\"object\",\"name\":\"Voted\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToVoted\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Discussion\",\"kind\":\"object\",\"name\":\"discussion\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiscussionToSchool\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Activity\",\"kind\":\"object\",\"name\":\"activity\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToSchool\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Attachment\",\"kind\":\"object\",\"name\":\"attachment\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToSchool\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Work\",\"kind\":\"object\",\"name\":\"work\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToWork\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Domain\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Boolean\",\"kind\":\"scalar\",\"name\":\"approved\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"schools\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DomainToSchool\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"Team\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DomainToTeam\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Ballot\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"title\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"titlede\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"titlefr\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"titleit\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"descriptionde\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"descriptionfr\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"descriptionit\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"body\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"bodyde\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"bodyfr\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"bodyit\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"originalLocale\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"start\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"end\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BallotScope\",\"kind\":\"enum\",\"name\":\"scope\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"canton\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToSchool\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToTeam\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"creator\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToUser\",\"relationFromFields\":[\"creatorId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"creatorId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Option\",\"kind\":\"object\",\"name\":\"options\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToOption\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Voted\",\"kind\":\"object\",\"name\":\"voted\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"VotedBallot\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Vote\",\"kind\":\"object\",\"name\":\"votes\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToVote\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Attachment\",\"kind\":\"object\",\"name\":\"attachments\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToBallot\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"BallotRun\",\"kind\":\"object\",\"name\":\"ballotRuns\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToBallotRun\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Activity\",\"kind\":\"object\",\"name\":\"activity\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToBallot\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Discussion\",\"kind\":\"object\",\"name\":\"discussion\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToDiscussion\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"BallotRun\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"start\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"end\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Vote\",\"kind\":\"object\",\"name\":\"vote\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotRunToVote\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballot\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToBallotRun\",\"relationFromFields\":[\"ballotId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ballotId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotRunToTeam\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"ballotId\",\"teamId\"]}]},\"Option\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"vote\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"title\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballot\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToOption\",\"relationFromFields\":[\"ballotId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ballotId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Voted\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"signature\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"VotedUser\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballot\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"VotedBallot\",\"relationFromFields\":[\"ballotId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ballotId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"TeamToVoted\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToVoted\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Vote\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"vote\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"verify\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"year\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"canton\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schooltype\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"locale\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballot\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToVote\",\"relationFromFields\":[\"ballotId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ballotId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"BallotRun\",\"kind\":\"object\",\"name\":\"ballotRun\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotRunToVote\",\"relationFromFields\":[\"ballotRunId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ballotRunId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"TeamToVote\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToVote\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Attachment\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"file\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"title\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"type\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"card\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToUser\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToTeam\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToSchool\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Discussion\",\"kind\":\"object\",\"name\":\"discussion\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToDiscussion\",\"relationFromFields\":[\"discussionId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"discussionId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballot\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToBallot\",\"relationFromFields\":[\"ballotId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ballotId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Work\",\"kind\":\"object\",\"name\":\"work\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToWork\",\"relationFromFields\":[\"workId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Discussion\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"title\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"text\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"card\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiscussionToUser\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiscussionToTeam\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiscussionToSchool\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballot\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"BallotToDiscussion\",\"relationFromFields\":[\"ballotId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ballotId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Reaction\",\"kind\":\"object\",\"name\":\"reactions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiscussionToReaction\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Attachment\",\"kind\":\"object\",\"name\":\"attachments\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToDiscussion\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Activity\",\"kind\":\"object\",\"name\":\"Activity\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToDiscussion\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Work\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"title\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"text\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Json\",\"kind\":\"scalar\",\"name\":\"data\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"card\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Visibility\",\"kind\":\"enum\",\"name\":\"visibility\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"TeamToWork\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"SchoolToWork\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"users\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserToWork\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Reaction\",\"kind\":\"object\",\"name\":\"reactions\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ReactionToWork\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Attachment\",\"kind\":\"object\",\"name\":\"attachments\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"AttachmentToWork\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Activity\",\"kind\":\"object\",\"name\":\"activities\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToWork\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Reaction\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"emoij\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"stars\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"feedback\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ReactionToUser\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Discussion\",\"kind\":\"object\",\"name\":\"discussion\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"DiscussionToReaction\",\"relationFromFields\":[\"discussionId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"discussionId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Work\",\"kind\":\"object\",\"name\":\"work\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ReactionToWork\",\"relationFromFields\":[\"workId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"createdAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"updatedAt\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Activity\":{\"fields\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"ActivityType\",\"kind\":\"enum\",\"name\":\"type\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Visibility\",\"kind\":\"enum\",\"name\":\"visibility\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"card\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"summary\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"user\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToUser\",\"relationFromFields\":[\"userId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"userId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Team\",\"kind\":\"object\",\"name\":\"team\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToTeam\",\"relationFromFields\":[\"teamId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"teamId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"School\",\"kind\":\"object\",\"name\":\"school\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToSchool\",\"relationFromFields\":[\"schoolId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"schoolId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Discussion\",\"kind\":\"object\",\"name\":\"discussion\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToDiscussion\",\"relationFromFields\":[\"discussionId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"discussionId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Work\",\"kind\":\"object\",\"name\":\"work\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToWork\",\"relationFromFields\":[\"workId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"workId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Ballot\",\"kind\":\"object\",\"name\":\"ballot\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ActivityToBallot\",\"relationFromFields\":[\"ballotId\"],\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"ballotId\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"time\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Swissvote\":{\"fields\":[{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"anr\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"datum\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"titel_kurz_d\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"titel_off_d\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"stichwort\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"swissvoteslink\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"rechtsform\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"poster_ja\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"poster_nein\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"annahme\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"volk\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"stand\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"kategorien\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]}}}}"); }