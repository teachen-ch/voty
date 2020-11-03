--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ballots; Type: TABLE; Schema: public; Owner: voty
--

CREATE TABLE public.ballots (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    body text NOT NULL,
    start timestamp(3) without time zone NOT NULL,
    "end" timestamp(3) without time zone NOT NULL,
    scope public."BallotScope" DEFAULT 'Public'::public."BallotScope" NOT NULL,
    canton text,
    school_id text,
    team_id text,
    creator_id text,
    thread_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.ballots OWNER TO voty;

--
-- Data for Name: ballots; Type: TABLE DATA; Schema: public; Owner: voty
--

COPY public.ballots (id, title, description, body, start, "end", scope, canton, school_id, team_id, creator_id, thread_id, created_at, updated_at) FROM stdin;
