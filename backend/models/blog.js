const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let foodSchema = new Schema({
    author: {
        type: String,
    },
    title: {
        type: String,
    }, 
    description: {
        type: String,
    },
    dishOrigin: {
        type: String,
    },
    category: {
        type: String,
    },
    imageUrl: {
        type:String,
    },
}, {
    collection: 'blogs', 
    timestamps: true
})

module.exports = mongoose.model('Blog', foodSchema);