const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    text:{
        type: String,
        required: true
    },

    location:{
        type: String,
    },

    firstName: {
       type: String
    },

    lastName: {
        type: String
    },

    //user image to be added

    likes: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],

    comments: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],

    date: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    }

});

module.exports = Post = mongoose.model('post', PostSchema);