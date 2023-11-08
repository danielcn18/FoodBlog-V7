const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    confirmpassword: String,
    profileImg: String,
    profileBio: String,
    blogsIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    }] /* ref = 'model name' of schema you're referencing */
}, {
    collection: 'users',
});

module.exports = mongoose.model('user', usersSchema);