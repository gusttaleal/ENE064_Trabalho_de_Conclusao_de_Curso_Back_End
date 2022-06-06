const crypto = require("crypto");

module.exports.decryptData = (encryptedData) => {
  const algorithm = "aes-256-cbc";
  const key = Buffer.from(process.env.CIPHER_SECRET);
  const iv = Buffer.from(encryptedData.iv, "hex");
  const data = Buffer.from(encryptedData.encryptedData, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypt = decipher.update(data);

  const decrypted = Buffer.concat([decrypt, decipher.final()]);

  return decrypted.toString();
};
