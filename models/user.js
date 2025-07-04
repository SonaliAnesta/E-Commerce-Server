const connection = require("../db");
const { userRoles } = require("../utils/constants");

const userSchema = new connection.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [userRoles.ADMIN, userRoles.CUSTOMER],
      default: userRoles.CUSTOMER,
    }
  },
  { timestamps: true }
);

module.exports = connection.model("user", userSchema);
