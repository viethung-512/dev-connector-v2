const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      enabled: {
        type: Boolean,
        default: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
