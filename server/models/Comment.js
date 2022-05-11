const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Product = require('./Product')


const commentSchema = new Schema({
    commentAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    commentText: {
        type: String,
        minlength: 1,
        maxlength: 2000,
        trim: true,
    },
    commentDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});



const Comment = model('Comment', commentSchema);

module.exports = Comment;
