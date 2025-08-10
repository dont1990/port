import bcrypt from "bcryptjs";

const password = "121212";
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log("Hashed password:", hash);
});
