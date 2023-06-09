import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    // id: {
    //     type: String
    // },
    email: {
        type: String,
        // second argument is thrown if it fails
        unique: [true,"Such email is already registered"],
        required: [true,"Email is required!"]
    },
    username: {
        type: String,
        required: [true,"Username is required!"],
        unique: [true,"Such username is already registered"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username is invalid it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
});

// Is User model already exists or not, if it does, then we use existing one, if not, then
// we create a new one using model();
const User = models.User || model("User",UserSchema);

export default User;