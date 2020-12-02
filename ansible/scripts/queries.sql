
-- how many votes per ballot
select ballots.title, count(1) from voted, ballots where voted.ballot_id = ballots.id group by ballot_id, ballots.title;

-- % results per ballot
select ballots.title, vote, 100. * count(*) / sum(count(*)) over() from votes, ballots where votes.ballot_id = ballots.id and ballots.title='Verantwortungsvolle Unternehmen' group by ballots.title, vote;
select ballots.title, vote, 100. * count(*) / sum(count(*)) over() from votes, ballots where votes.ballot_id = ballots.id and ballots.title='Finanzierungsverbot' group by ballots.title, vote;

-- which classes have how many votes
select schools.name, teams.name, count(1) from voted, teams, schools where voted.team_id
= teams.id and teams.school_id = schools.id group by teams.id, schools.name;

-- how many classes participated per school type
select schools.type, count(distinct teams.id) from schools, voted, teams where voted.team_id = teams.id and teams.school_id = schools.id group by schools.type;