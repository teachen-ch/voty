from locust import HttpUser, task, between
import logging
import random
import json

teacher = {"email": "teacher@teachen.ch", "password": "teachen"}
student = {"email": "student@teachen.ch", "password": "teachen"}


class GraphQLUser(HttpUser):
    abstract = True
    host = "http://localhost:3000"
    api = "/api/graphql"
    token = None
    wait_time = between(1, 20)
    user = None
    school = None

    def query(self, name, args=None, fields=None):
        return self.graphql("query", name, args, fields)

    def mutation(self, name, args=None, fields=None):
        return self.graphql("mutation", name, args, fields)

    def graphql(self, cmd, name, args=None, fields=None):
        a = "(%s)" % args if args else ""
        data = {"query": "%s %s{ %s %s {%s}}" % (cmd, name, name, a, fields)}
        # if (name == "getTeamDiscussions"):
        #    print("%s %s{ %s %s {%s}}" % (cmd, name, name, a, fields))
        headers = {"x-access-token": self.token} if self.token else {}
        result = self.client.post(
            self.api, json=data, headers=headers, name=name)
        j = result.json()
        return j['data'] if 'data' in j else j

    def login(self, user, password):
        response = self.mutation(
            name="login",
            args='email: "%s", password: "%s"' % (user, password),
            fields='token user { id school { id } }')
        self.token = response['login']['token']
        self.user = response['login']['user']['id']
        self.school = response['login']['user']['school']['id']
        return response


class Teacher(GraphQLUser):
    weight = 1
    teams = []

    @task
    def teacherpage(self):
        self.client.get("/teacher")
        self.query("teams",
                   args='where: {teacherId: {equals: "%s" } }' % self.user,
                   fields="id cards members { id name email shortname }")

    @task
    def teampage(self):
        for team in self.teams:
            self.client.get("/team/%s" % team)
            self.query("getBallotRuns", args='teamId: "%s"' % team,
                       fields="id")
            self.query("activities", fields="id user { name } type time")

    @task
    def cards(self):
        self.query("cards", args='keywords:"gewalt", age:"sek-1"',
                   fields="id title age")

    def on_start(self):
        self.client.get("/")
        self.client.get("/user/login")
        self.login(teacher["email"], teacher["password"])
        self.query("me", fields="id, school { name }")
        r = self.query("teams",
                       args='where: {teacherId: {equals: "%s" } }' % self.user,
                       fields="id cards members { id name email shortname }")
        self.teams = [team['id'] for team in r['teams']]
        #print("TEAMS: %s" % self.teams)


class Student(GraphQLUser):
    weight = 1
    team = None

    @task
    def studentpage(self):
        self.client.get("/student")
        self.activities()

    @task
    def swissvotes(self):
        self.client.get("/team/%s/cards/swissvotes" % self.team)
        keyword = random.choice(["Frau", "a", "b", "s",
                                 "Stimm", "verkehr", "bauer"])
        typ = random.randint(1, 4)
        result = random.randint(0, 1)
        self.query("swissvotes",
                   args='keywords: "%s", result: %d, type: %d' % (
                       keyword, result, typ),
                   fields="titel_kurz_d volk stand kategorien rechtsform annahme")
        self.discussions(card="swissvotes")

    def passion(self):
        self.client.get("/team/%s/cards/passion" % self.team)
        self.works(card="passion")

    def activities(self):
        self.query("activities", args='where: {teamId: {equals: "%s" } }' % self.team,
                   fields="id user { name } type time summary")

    def works(self, card=None):
        c = ', card: { equals: "%s"}' % card if card else ""
        self.query("works", args='where: {teamId: {equals: "%s"} %s }' % (self.team, c),
                   fields="id title text data updatedAt users { id name shortname }")

    def discussions(self, card=None):
        c = ', card: "%s"' % card if card else ""
        self.query("getTeamDiscussions", args='teamId: "%s"%s' % (self.team, c),
                   fields="id title text")

    def on_start(self):
        self.client.get("/")
        self.client.get("/user/login")
        self.login(student["email"], student["password"])
        r = self.query("me", fields="id, team { id name }")
        self.team = r['me']['team']['id']
