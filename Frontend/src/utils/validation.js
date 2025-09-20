export const isValidUrl = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const isValidInteger = (val) => /^\d+$/.test(val) && parseInt(val) > 0;

export const isValidShortcode = (code) =>
  /^[a-zA-Z0-9_-]+$/.test(code);
