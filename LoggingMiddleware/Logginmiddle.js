const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

// Use the provided access token
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIxMDAwMDE3ODg5QGRpdC5lZHUuaW4iLCJleHAiOjE3NTgzNTA1MjUsImlhdCI6MTc1ODM0OTYyNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjcyMjllYTI4LTM2NWEtNDQ2Yy04MDc3LTI5ZjgxMGM1N2NhZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWtzaGFtIiwic3ViIjoiMDE1ZTkyMjYtY2I4OC00YmMxLThhMWYtMDI4ZmI5MDE0OTZmIn0sImVtYWlsIjoiMTAwMDAxNzg4OUBkaXQuZWR1LmluIiwibmFtZSI6InNoYWtzaGFtIiwicm9sbE5vIjoiMjIwMTAyMTAxIiwiYWNjZXNzQ29kZSI6IlNrbW5ldyIsImNsaWVudElEIjoiMDE1ZTkyMjYtY2I4OC00YmMxLThhMWYtMDI4ZmI5MDE0OTZmIiwiY2xpZW50U2VjcmV0Ijoid2hISFpSd3RrYVBmZEhiWiJ9.dguV0DTGVZ1rGpRC30lgEV8JjxadaxfaWp5pLtbgtEc";
async function Log(stack, level, pkg, message) {
  try {
    const validStacks = ["backend", "frontend"];
    const validLevels = ["debug", "info", "warn", "error", "fatal"];

    if (!validStacks.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!validLevels.includes(level)) throw new Error(`Invalid level: ${level}`);
    if (!pkg || typeof pkg !== "string") throw new Error(`Invalid package: ${pkg}`);
    if (!message || typeof message !== "string") throw new Error(`Invalid message: ${message}`);

    const logPayload = { stack, level, package: pkg, message, timestamp: new Date().toISOString() };

    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`, // ✅ fixed
      },
      body: JSON.stringify(logPayload),
    });

    if (!response.ok) {
      console.error(`❌ Log API failed: ${response.status}, ${await response.text()}`);
    } else {
      console.log("✅ Log sent successfully:", logPayload);
    }
  } catch (err) {
    console.error("❌ Logging failed:", err.message);
  }
}

export default Log;