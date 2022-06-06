const crypto = require("crypto");

module.exports.encryptData = (data) => {
  const algorithm = "aes-256-cbc";
  const key = Buffer.from(process.env.CIPHER_SECRET);
  const iv = Buffer.from(crypto.randomBytes(16));

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypt = cipher.update(data);

  const encrypted = Buffer.concat([encrypt, cipher.final()]);

  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};
