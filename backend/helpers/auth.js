import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) 

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                console.error("Error generating salt:", err);
                return reject(new Error("Password hashing failed."));
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return reject(new Error("Password hashing failed."));
                }
                resolve(hash);
            });
        });
    });
};

export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};