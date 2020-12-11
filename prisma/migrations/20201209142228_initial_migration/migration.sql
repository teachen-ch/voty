-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('User', 'Admin', 'Student', 'Teacher', 'Principal');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Unkown', 'Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "public"."BallotScope" AS ENUM ('Public', 'National', 'Cantonal', 'School', 'Team');

-- CreateEnum
CREATE TYPE "public"."VotingStatus" AS ENUM ('Restricted', 'Open', 'Voted', 'NotStarted', 'Closed');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "verified" BOOLEAN DEFAULT false,
    "lastname" TEXT,
    "image" TEXT,
    "password" TEXT,
    "gender" "Gender",
    "year" INTEGER,
    "canton" TEXT,
    "role" "Role" NOT NULL DEFAULT E'Student',
    "school_id" TEXT,
    "team_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_requests" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "invite" TEXT,
    "code" TEXT,
    "year" INTEGER,
    "school_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "domain_id" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schools" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT E'',
    "canton" TEXT NOT NULL DEFAULT E'',
    "zip" TEXT NOT NULL DEFAULT E'',
    "address" TEXT NOT NULL DEFAULT E'',
    "type" TEXT NOT NULL DEFAULT E'',
    "domain_id" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ballots" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "scope" "BallotScope" NOT NULL DEFAULT E'Public',
    "canton" TEXT,
    "school_id" TEXT,
    "team_id" TEXT,
    "creator_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ballot_runs" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "ballot_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "vote" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "ballot_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voted" (
    "id" TEXT NOT NULL,
    "signature" TEXT,
    "user_id" TEXT NOT NULL,
    "ballot_id" TEXT NOT NULL,
    "team_id" TEXT,
    "school_id" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "vote" INTEGER NOT NULL,
    "verify" TEXT,
    "year" INTEGER,
    "canton" TEXT,
    "schooltype" TEXT,
    "ballot_id" TEXT NOT NULL,
    "ballotrun_id" TEXT,
    "team_id" TEXT,
    "school_id" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "user_id" TEXT NOT NULL,
    "ballot_id" TEXT,
    "thread_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "text" TEXT NOT NULL DEFAULT E'',
    "ref" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "schoolId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "id" TEXT NOT NULL,
    "emoij" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "thread_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swissvotes" (
    "anr" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "titel_kurz_d" TEXT NOT NULL,
    "titel_off_d" TEXT,
    "stichwort" TEXT,
    "swissvoteslink" TEXT NOT NULL,
    "rechtsform" INTEGER NOT NULL,
    "poster_ja" TEXT,
    "poster_nein" TEXT,
    "annahme" INTEGER NOT NULL,
    "volk" INTEGER NOT NULL,
    "stand" INTEGER NOT NULL,
    "kategorien" TEXT,

    PRIMARY KEY ("anr")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests.token_unique" ON "verification_requests"("token");

-- CreateIndex
CREATE UNIQUE INDEX "teams.invite_unique" ON "teams"("invite");

-- CreateIndex
CREATE UNIQUE INDEX "teams.code_unique" ON "teams"("code");

-- CreateIndex
CREATE UNIQUE INDEX "domains.name_unique" ON "domains"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ballot_runs.ballot_id_team_id_unique" ON "ballot_runs"("ballot_id", "team_id");

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD FOREIGN KEY("teacher_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD FOREIGN KEY("domain_id")REFERENCES "domains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schools" ADD FOREIGN KEY("domain_id")REFERENCES "domains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ballots" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ballots" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ballots" ADD FOREIGN KEY("creator_id")REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ballot_runs" ADD FOREIGN KEY("ballot_id")REFERENCES "ballots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ballot_runs" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD FOREIGN KEY("ballot_id")REFERENCES "ballots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voted" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voted" ADD FOREIGN KEY("ballot_id")REFERENCES "ballots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voted" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voted" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD FOREIGN KEY("ballot_id")REFERENCES "ballots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD FOREIGN KEY("ballotrun_id")REFERENCES "ballot_runs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD FOREIGN KEY("school_id")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("ballot_id")REFERENCES "ballots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY("thread_id")REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD FOREIGN KEY("team_id")REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD FOREIGN KEY("schoolId")REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD FOREIGN KEY("thread_id")REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
