const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write("."); //print a dot to show we're still waiting
      checkPostgres(); //recursive call until it's ready
      return;
    }

    console.log("\n\n🟢 Postgres is ready!\n");
  }
}

process.stdout.write("\n\n🔴 Waiting for Postgres to be ready...");

checkPostgres();
