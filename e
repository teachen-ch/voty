graphql/permissions.ts:71:16 - error TS7006: Parameter 'field' implicitly has an 'any' type.

71 const isOwn = (field) =>
                  ~~~~~
graphql/permissions.ts:82:3 - error TS2345: Argument of type '(parent: any, args: any, ctx: NexusContext, info: GraphQLResolveInfo) => Promise<boolean | undefined>' is not assignable to parameter of type 'IRuleFunction'.
  Type 'Promise<boolean | undefined>' is not assignable to type 'string | boolean | Error | Promise<IRuleResult>'.
    Type 'Promise<boolean | undefined>' is not assignable to type 'Promise<IRuleResult>'.
      Type 'boolean | undefined' is not assignable to type 'IRuleResult'.
        Type 'undefined' is not assignable to type 'IRuleResult'.

82   async (parent, args, ctx: NexusContext, info) => {
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
graphql/user.ts:19:27 - error TS2531: Object is possibly 'null'.

19         return `${name} ${lastname.substring(0, 1).toUpperCase()}.`;
                             ~~~~~~~~
graphql/user.ts:86:46 - error TS2345: Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

86         authentication.sendVerificationEmail(args.email, args.purpose, ctx.db),
                                                ~~~~~~~~~~
util/authentication.ts:4:20 - error TS7016: Could not find a declaration file for module 'bcrypt'. '/Users/stefan/code/voty/node_modules/bcrypt/bcrypt.js' implicitly has an 'any' type.
  Try `npm install @types/bcrypt` if it exists or add a new declaration (.d.ts) file containing `declare module 'bcrypt';`

4 import bcrypt from "bcrypt";
                     ~~~~~~~~
util/authentication.ts:23:29 - error TS7006: Parameter '_root' implicitly has an 'any' type.

23 export async function login(_root, args, ctx): Promise<ResponseLogin> {
                               ~~~~~
util/authentication.ts:23:36 - error TS7006: Parameter 'args' implicitly has an 'any' type.

23 export async function login(_root, args, ctx): Promise<ResponseLogin> {
                                      ~~~~
util/authentication.ts:23:42 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.

23 export async function login(_root, args, ctx): Promise<ResponseLogin> {
                                            ~~~
util/authentication.ts:43:44 - error TS2769: No overload matches this call.
  Overload 1 of 3, '(payload: string | object | Buffer, secretOrPrivateKey: Secret, options?: SignOptions | undefined): string', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'Secret'.
      Type 'undefined' is not assignable to type 'Secret'.
  Overload 2 of 3, '(payload: string | object | Buffer, secretOrPrivateKey: Secret, callback: SignCallback): void', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'Secret'.
      Type 'undefined' is not assignable to type 'Secret'.

43   const token: string = jwt.sign({ user }, secret, {
                                              ~~~~~~

util/authentication.ts:51:32 - error TS7006: Parameter 'user' implicitly has an 'any' type.

51 export function setRequestUser(user, ctx: NexusContext) {
                                  ~~~~
util/authentication.ts:59:34 - error TS7006: Parameter '_root' implicitly has an 'any' type.

59 export async function createUser(_root, args, ctx: NexusContext) {
                                    ~~~~~
util/authentication.ts:59:41 - error TS7006: Parameter 'args' implicitly has an 'any' type.

59 export async function createUser(_root, args, ctx: NexusContext) {
                                           ~~~~
util/authentication.ts:76:5 - error TS2722: Cannot invoke an object which is possibly 'undefined'.

76     logger.mail(`New user created: ${name} ${lastname} <${email}>: ${role}`);
       ~~~~~~~~~~~
util/authentication.ts:88:36 - error TS7006: Parameter '_root' implicitly has an 'any' type.

88 export async function acceptInvite(_root, args, ctx: NexusContext) {
                                      ~~~~~
util/authentication.ts:88:43 - error TS7006: Parameter 'args' implicitly has an 'any' type.

88 export async function acceptInvite(_root, args, ctx: NexusContext) {
                                             ~~~~
util/authentication.ts:106:41 - error TS7006: Parameter '_root' implicitly has an 'any' type.

106 export async function createInvitedUser(_root, args, ctx) {
                                            ~~~~~
util/authentication.ts:106:48 - error TS7006: Parameter 'args' implicitly has an 'any' type.

106 export async function createInvitedUser(_root, args, ctx) {
                                                   ~~~~
util/authentication.ts:106:54 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.

106 export async function createInvitedUser(_root, args, ctx) {
                                                         ~~~
util/authentication.ts:122:34 - error TS7006: Parameter '_root' implicitly has an 'any' type.

122 export async function updateUser(_root, args, ctx: NexusContext) {
                                     ~~~~~
util/authentication.ts:122:41 - error TS7006: Parameter 'args' implicitly has an 'any' type.

122 export async function updateUser(_root, args, ctx: NexusContext) {
                                            ~~~~
util/authentication.ts:124:11 - error TS2339: Property 'id' does not exist on type 'User | undefined'.

124   const { id: userId, role } = getRequestUser(ctx);
              ~~
util/authentication.ts:124:23 - error TS2339: Property 'role' does not exist on type 'User | undefined'.

124   const { id: userId, role } = getRequestUser(ctx);
                          ~~~~
util/authentication.ts:138:17 - error TS7053: Element implicitly has an 'any' type because expression of type '"x-access-token"' can't be used to index type 'Headers'.
  Property 'x-access-token' does not exist on type 'Headers'.

138   const token = req.headers["x-access-token"];
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
util/authentication.ts:142:17 - error TS2339: Property 'user' does not exist on type 'never'.

142     return jwt?.user;
                    ~~~~
util/authentication.ts:146:51 - error TS2366: Function lacks ending return statement and return type does not include 'undefined'.

146 export async function getUser(ctx: NexusContext): Promise<User> {
                                                      ~~~~~~~~~~~~~
util/authentication.ts:148:13 - error TS2339: Property 'id' does not exist on type 'User | undefined'.

148     const { id, role } = getRequestUser(ctx);
                ~~
util/authentication.ts:148:17 - error TS2339: Property 'role' does not exist on type 'User | undefined'.

148     const { id, role } = getRequestUser(ctx);
                    ~~~~
util/authentication.ts:150:7 - error TS2322: Type 'User | null' is not assignable to type 'User'.
  Type 'null' is not assignable to type 'User'.

150       return await ctx.db.user.findOne({ where: { id } });
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
util/authentication.ts:157:27 - error TS7006: Parameter 'token' implicitly has an 'any' type.

157 export function verifyJWT(token) {
                              ~~~~~
util/authentication.ts:159:30 - error TS2769: No overload matches this call.
  Overload 1 of 3, '(token: string, secretOrPublicKey: Secret, options?: VerifyOptions | undefined): string | object', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'Secret'.
      Type 'undefined' is not assignable to type 'Secret'.
  Overload 2 of 3, '(token: string, secretOrPublicKey: string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret, callback?: VerifyCallback | undefined): void', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret'.
      Type 'undefined' is not assignable to type 'string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret'.
  Overload 3 of 3, '(token: string, secretOrPublicKey: string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret, options?: VerifyOptions | undefined, callback?: VerifyCallback | undefined): void', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret'.
      Type 'undefined' is not assignable to type 'string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret'.

159     return jwt.verify(token, secret);
                                 ~~~~~~

util/authentication.ts:184:21 - error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ verification: string; reset: string; login: string; }'.
  No index signature with a parameter of type 'string' was found on type '{ verification: string; reset: string; login: string; }'.

184     const subject = subjects[purpose];
                        ~~~~~~~~~~~~~~~~~
util/authentication.ts:188:20 - error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

188     await sendMail(from, email, subject, purpose, conf);
                       ~~~~
util/authentication.ts:197:62 - error TS7006: Parameter 'identifier' implicitly has an 'any' type.

197 async function createVerificationToken(prisma: PrismaClient, identifier) {
                                                                 ~~~~~~~~~~
util/authentication.ts:213:41 - error TS7006: Parameter '_root' implicitly has an 'any' type.

213 export async function checkVerification(_root, args, ctx) {
                                            ~~~~~
util/authentication.ts:213:48 - error TS7006: Parameter 'args' implicitly has an 'any' type.

213 export async function checkVerification(_root, args, ctx) {
                                                   ~~~~
util/authentication.ts:213:54 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.

213 export async function checkVerification(_root, args, ctx) {
                                                         ~~~
util/authentication.ts:231:38 - error TS7006: Parameter '_root' implicitly has an 'any' type.

231 export async function changePassword(_root, args, ctx) {
                                         ~~~~~
util/authentication.ts:231:45 - error TS7006: Parameter 'args' implicitly has an 'any' type.

231 export async function changePassword(_root, args, ctx) {
                                                ~~~~
util/authentication.ts:231:51 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.

231 export async function changePassword(_root, args, ctx) {
                                                      ~~~
util/authentication.ts:248:28 - error TS7006: Parameter 'token' implicitly has an 'any' type.

248 async function verifyToken(token, prisma: PrismaClient) {
                               ~~~~~
util/authentication.ts:260:36 - error TS7006: Parameter 'prisma' implicitly has an 'any' type.

260 async function deleteExpiredTokens(prisma) {
                                       ~~~~~~
util/email.ts:33:45 - error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '{ host: string | undefined; port: string | undefined; auth: { user: string | undefined; pass: string | undefined; }; }' is not assignable to parameter of type 'TransportOptions | Transport'.
      Type '{ host: string | undefined; port: string | undefined; auth: { user: string | undefined; pass: string | undefined; }; }' is missing the following properties from type 'Transport': name, version, send

33   const mailer = nodemailer.createTransport(server);
                                               ~~~~~~

  node_modules/@types/nodemailer/index.d.ts:59:17
    59 export function createTransport(transport: Transport | TransportOptions, defaults?: TransportOptions): Mail;
                       ~~~~~~~~~~~~~~~
    The last overload is declared here.
util/email.ts:66:21 - error TS2345: Argument of type 'MJMLParseError[]' is not assignable to parameter of type 'string'.

66     throw new Error(errors);
                       ~~~~~~
util/logger.ts:73:10 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

73   tags: [process.env.NODE_ENV],
            ~~~~~~~~~~~~~~~~~~~~

Error: graphql/permissions.ts:71:16 - error TS7006: Parameter 'field' implicitly has an 'any' type.

71 const isOwn = (field) =>
                  ~~~~~
graphql/permissions.ts:82:3 - error TS2345: Argument of type '(parent: any, args: any, ctx: NexusContext, info: GraphQLResolveInfo) => Promise<boolean | undefined>' is not assignable to parameter of type 'IRuleFunction'.
  Type 'Promise<boolean | undefined>' is not assignable to type 'string | boolean | Error | Promise<IRuleResult>'.
    Type 'Promise<boolean | undefined>' is not assignable to type 'Promise<IRuleResult>'.
      Type 'boolean | undefined' is not assignable to type 'IRuleResult'.
        Type 'undefined' is not assignable to type 'IRuleResult'.

82   async (parent, args, ctx: NexusContext, info) => {
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
graphql/user.ts:19:27 - error TS2531: Object is possibly 'null'.

19         return `${name} ${lastname.substring(0, 1).toUpperCase()}.`;
                             ~~~~~~~~
graphql/user.ts:86:46 - error TS2345: Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

86         authentication.sendVerificationEmail(args.email, args.purpose, ctx.db),
                                                ~~~~~~~~~~
util/authentication.ts:4:20 - error TS7016: Could not find a declaration file for module 'bcrypt'. '/Users/stefan/code/voty/node_modules/bcrypt/bcrypt.js' implicitly has an 'any' type.
  Try `npm install @types/bcrypt` if it exists or add a new declaration (.d.ts) file containing `declare module 'bcrypt';`

4 import bcrypt from "bcrypt";
                     ~~~~~~~~
util/authentication.ts:23:29 - error TS7006: Parameter '_root' implicitly has an 'any' type.

23 export async function login(_root, args, ctx): Promise<ResponseLogin> {
                               ~~~~~
util/authentication.ts:23:36 - error TS7006: Parameter 'args' implicitly has an 'any' type.

23 export async function login(_root, args, ctx): Promise<ResponseLogin> {
                                      ~~~~
util/authentication.ts:23:42 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.

23 export async function login(_root, args, ctx): Promise<ResponseLogin> {
                                            ~~~
util/authentication.ts:43:44 - error TS2769: No overload matches this call.
  Overload 1 of 3, '(payload: string | object | Buffer, secretOrPrivateKey: Secret, options?: SignOptions | undefined): string', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'Secret'.
      Type 'undefined' is not assignable to type 'Secret'.
  Overload 2 of 3, '(payload: string | object | Buffer, secretOrPrivateKey: Secret, callback: SignCallback): void', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'Secret'.
      Type 'undefined' is not assignable to type 'Secret'.

43   const token: string = jwt.sign({ user }, secret, {
                                              ~~~~~~

util/authentication.ts:51:32 - error TS7006: Parameter 'user' implicitly has an 'any' type.

51 export function setRequestUser(user, ctx: NexusContext) {
                                  ~~~~
util/authentication.ts:59:34 - error TS7006: Parameter '_root' implicitly has an 'any' type.

59 export async function createUser(_root, args, ctx: NexusContext) {
                                    ~~~~~
util/authentication.ts:59:41 - error TS7006: Parameter 'args' implicitly has an 'any' type.

59 export async function createUser(_root, args, ctx: NexusContext) {
                                           ~~~~
util/authentication.ts:76:5 - error TS2722: Cannot invoke an object which is possibly 'undefined'.

76     logger.mail(`New user created: ${name} ${lastname} <${email}>: ${role}`);
       ~~~~~~~~~~~
util/authentication.ts:88:36 - error TS7006: Parameter '_root' implicitly has an 'any' type.

88 export async function acceptInvite(_root, args, ctx: NexusContext) {
                                      ~~~~~
util/authentication.ts:88:43 - error TS7006: Parameter 'args' implicitly has an 'any' type.

88 export async function acceptInvite(_root, args, ctx: NexusContext) {
                                             ~~~~
util/authentication.ts:106:41 - error TS7006: Parameter '_root' implicitly has an 'any' type.

106 export async function createInvitedUser(_root, args, ctx) {
                                            ~~~~~
util/authentication.ts:106:48 - error TS7006: Parameter 'args' implicitly has an 'any' type.

106 export async function createInvitedUser(_root, args, ctx) {
                                                   ~~~~
util/authentication.ts:106:54 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.

106 export async function createInvitedUser(_root, args, ctx) {
                                                         ~~~
util/authentication.ts:122:34 - error TS7006: Parameter '_root' implicitly has an 'any' type.

122 export async function updateUser(_root, args, ctx: NexusContext) {
                                     ~~~~~
util/authentication.ts:122:41 - error TS7006: Parameter 'args' implicitly has an 'any' type.

122 export async function updateUser(_root, args, ctx: NexusContext) {
                                            ~~~~
util/authentication.ts:124:11 - error TS2339: Property 'id' does not exist on type 'User | undefined'.

124   const { id: userId, role } = getRequestUser(ctx);
              ~~
util/authentication.ts:124:23 - error TS2339: Property 'role' does not exist on type 'User | undefined'.

124   const { id: userId, role } = getRequestUser(ctx);
                          ~~~~
util/authentication.ts:138:17 - error TS7053: Element implicitly has an 'any' type because expression of type '"x-access-token"' can't be used to index type 'Headers'.
  Property 'x-access-token' does not exist on type 'Headers'.

138   const token = req.headers["x-access-token"];
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
util/authentication.ts:142:17 - error TS2339: Property 'user' does not exist on type 'never'.

142     return jwt?.user;
                    ~~~~
util/authentication.ts:146:51 - error TS2366: Function lacks ending return statement and return type does not include 'undefined'.

146 export async function getUser(ctx: NexusContext): Promise<User> {
                                                      ~~~~~~~~~~~~~
util/authentication.ts:148:13 - error TS2339: Property 'id' does not exist on type 'User | undefined'.

148     const { id, role } = getRequestUser(ctx);
                ~~
util/authentication.ts:148:17 - error TS2339: Property 'role' does not exist on type 'User | undefined'.

148     const { id, role } = getRequestUser(ctx);
                    ~~~~
util/authentication.ts:150:7 - error TS2322: Type 'User | null' is not assignable to type 'User'.
  Type 'null' is not assignable to type 'User'.

150       return await ctx.db.user.findOne({ where: { id } });
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
util/authentication.ts:157:27 - error TS7006: Parameter 'token' implicitly has an 'any' type.

157 export function verifyJWT(token) {
                              ~~~~~
util/authentication.ts:159:30 - error TS2769: No overload matches this call.
  Overload 1 of 3, '(token: string, secretOrPublicKey: Secret, options?: VerifyOptions | undefined): string | object', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'Secret'.
      Type 'undefined' is not assignable to type 'Secret'.
  Overload 2 of 3, '(token: string, secretOrPublicKey: string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret, callback?: VerifyCallback | undefined): void', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret'.
      Type 'undefined' is not assignable to type 'string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret'.
  Overload 3 of 3, '(token: string, secretOrPublicKey: string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret, options?: VerifyOptions | undefined, callback?: VerifyCallback | undefined): void', gave the following error.
    Argument of type 'string | undefined' is not assignable to parameter of type 'string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret'.
      Type 'undefined' is not assignable to type 'string | Buffer | { key: string | Buffer; passphrase: string; } | GetPublicKeyOrSecret'.

159     return jwt.verify(token, secret);
                                 ~~~~~~

util/authentication.ts:184:21 - error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ verification: string; reset: string; login: string; }'.
  No index signature with a parameter of type 'string' was found on type '{ verification: string; reset: string; login: string; }'.

184     const subject = subjects[purpose];
                        ~~~~~~~~~~~~~~~~~
util/authentication.ts:188:20 - error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

188     await sendMail(from, email, subject, purpose, conf);
                       ~~~~
util/authentication.ts:197:62 - error TS7006: Parameter 'identifier' implicitly has an 'any' type.

197 async function createVerificationToken(prisma: PrismaClient, identifier) {
                                                                 ~~~~~~~~~~
util/authentication.ts:213:41 - error TS7006: Parameter '_root' implicitly has an 'any' type.

213 export async function checkVerification(_root, args, ctx) {
                                            ~~~~~
util/authentication.ts:213:48 - error TS7006: Parameter 'args' implicitly has an 'any' type.

213 export async function checkVerification(_root, args, ctx) {
                                                   ~~~~
util/authentication.ts:213:54 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.

213 export async function checkVerification(_root, args, ctx) {
                                                         ~~~
util/authentication.ts:231:38 - error TS7006: Parameter '_root' implicitly has an 'any' type.

231 export async function changePassword(_root, args, ctx) {
                                         ~~~~~
util/authentication.ts:231:45 - error TS7006: Parameter 'args' implicitly has an 'any' type.

231 export async function changePassword(_root, args, ctx) {
                                                ~~~~
util/authentication.ts:231:51 - error TS7006: Parameter 'ctx' implicitly has an 'any' type.

231 export async function changePassword(_root, args, ctx) {
                                                      ~~~
util/authentication.ts:248:28 - error TS7006: Parameter 'token' implicitly has an 'any' type.

248 async function verifyToken(token, prisma: PrismaClient) {
                               ~~~~~
util/authentication.ts:260:36 - error TS7006: Parameter 'prisma' implicitly has an 'any' type.

260 async function deleteExpiredTokens(prisma) {
                                       ~~~~~~
util/email.ts:33:45 - error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type '{ host: string | undefined; port: string | undefined; auth: { user: string | undefined; pass: string | undefined; }; }' is not assignable to parameter of type 'TransportOptions | Transport'.
      Type '{ host: string | undefined; port: string | undefined; auth: { user: string | undefined; pass: string | undefined; }; }' is missing the following properties from type 'Transport': name, version, send

33   const mailer = nodemailer.createTransport(server);
                                               ~~~~~~

  node_modules/@types/nodemailer/index.d.ts:59:17
    59 export function createTransport(transport: Transport | TransportOptions, defaults?: TransportOptions): Mail;
                       ~~~~~~~~~~~~~~~
    The last overload is declared here.
util/email.ts:66:21 - error TS2345: Argument of type 'MJMLParseError[]' is not assignable to parameter of type 'string'.

66     throw new Error(errors);
                       ~~~~~~
util/logger.ts:73:10 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

73   tags: [process.env.NODE_ENV],
            ~~~~~~~~~~~~~~~~~~~~

    at Object.emitTSProgram (/Users/stefan/code/voty/node_modules/nexus/src/lib/tsc.ts:108:11)
    at Object.buildNexusApp (/Users/stefan/code/voty/node_modules/nexus/src/lib/build/build.ts:97:3)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at Build.parse (/Users/stefan/code/voty/node_modules/nexus/src/cli/commands/build.ts:35:5)
error Command failed with exit code 1.
