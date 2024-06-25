import { Schema, models, model } from "mongoose"

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true },
    userType: { type: String, default: "user" },
})


const User = models?.User || model("User", UserSchema)

export default User

/* 
import { Schema, model, models } from "mongoose";
// const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true },
    userType: { type: String, default: "user" },
});

console.log(models.User)

const User = models?.User || model("User", UserSchema);
// const User = models.User || model("User", UserSchema);

export default User;



*/