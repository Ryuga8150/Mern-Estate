const mongoose = require("mongoose");
const bcryptJS = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "A user must have a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "A password is required"],
    },
    avatar: {
      type: String,
      default:
        "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcryptJS.hashSync(this.password, 12);
  console.log("Password hashed");
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptJS.compareSync(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
