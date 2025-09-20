import Log from "./Logginmiddle.js";

(async () => {
  await Log("backend", "error", "handler", "Received string, expected bool");
  await Log("backend", "fatal", "db", "Critical database connection failure.");
  await Log("frontend", "info", "component", "User clicked submit button");
})();