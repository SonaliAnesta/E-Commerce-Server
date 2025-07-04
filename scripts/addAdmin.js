require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env.development"),
});
const mongoose = require("mongoose");

const User = require("../models/user");
const { userRoles } = require("../utils/constants");
const { hashPassword } = require("../utils/auth");

async function addAdminUser(email, password) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`❌ Admin '${email}' already exists.`);
      return;
    }

    const user = new User({
      email,
      password: hashPassword(password),
      role: userRoles.ADMIN,
      firstName: "Admin",
      lastName: "User",
    });
    await user.save();
    console.log(`✅ Admin user '${email}' added successfully.`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

addAdminUser(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
