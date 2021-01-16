#!node_modules/.bin/ts-node
import yargs from "yargs";
import { loadFixture } from "../../util/prisma-loader";

// working around pre-commit git hooks...
const cons = console;

void run();

async function run() {
  try {
    const argv = cliOptions();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const logger = argv.quiet ? () => 0 : cons.log;

    for (let i = 0; i < argv._.length; ++i) {
      const fixtureFile = String(argv._[i]);
      await loadFixture(fixtureFile, logger);
    }

    process.exit();
  } catch (err) {
    console.error("There was an error loading your data", err.message);
    process.exit(1);
  }
}

function cliOptions() {
  return yargs
    .usage(
      "npx prisma-loader data.yml    Load data from YAML-file into Prisma schema"
    )
    .options("quiet", {
      alias: "q",
      description: "Suppress output",
      type: "boolean",
    })
    .demandCommand(1)
    .alias("help", "h").argv;
}
