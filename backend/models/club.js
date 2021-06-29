const { Schema, model } = require('mongoose');

const clubSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    index: true
  },
  description: {
    type: String,
    maxlen: 255,
  },
  image_url: {
    type: String,
    maxlen: 255,
  },
  members: [
    {
      id: {
        type: Schema.Types.ObjectId, // Schema.Types.ObjectId
        ref: 'User',
      },
      name: String,
    },
  ],
  moderators: [
    {
      id: {
        type: Schema.Types.ObjectId, // Schema.Types.ObjectId
        ref: 'User',
      },
      name: String,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Club = model('Club', clubSchema);
module.exports = Club;
