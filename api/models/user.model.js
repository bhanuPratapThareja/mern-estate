import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    gender: { type: String, enum: ["male", "female"] },
    listings: [{
      type: mongoose.Types.ObjectId,
      ref: 'Listing',
      required: true
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
