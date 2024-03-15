import crypto from "crypto";
export const generateHash = (key: string) => {
  const hash = crypto.createHash("sha1");
  hash.update(key);
  return hash.digest("hex");
};
