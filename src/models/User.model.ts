import { Model, model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  avatar?: string;
  password: string;
}

interface IUserMethods {
  matchPassword(enteredPassword: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      default: "No name",
    },
    avatar: {
      type: String,
      require: true,
      default: "https://localhost:2030/static/images/avatar-default.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (this, next) {
  if (!this.isModified("password")) {
    console.log("Password changed");
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

userSchema.method("matchPassword", function (enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
});

const User = model("User", userSchema);

export default User;
export { UserModel, IUser };
