// Captures the original Error out-of-band so server.js can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.
let lastCapturedError;
const TTL_MS = 5_000;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
export function consumeLastCapturedError() {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
