const { Schema, model } = require('mongoose');
const validator = require('validator');

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      index: true,
    },
    description: {
      type: String,
    },
    image_url: {
      type: String,
      maxlen: 255,
    },
    start_time: {
      type: Date,
      required: [true, 'Start time for the event is required.'],
      validate: {
        validator: function (date) {
          return new Date(date) > Date.now();
        },
        message: 'The time must be in future.',
      },
      index: true,
    },
    end_time: {
      type: Date,
      required: [true, 'Start time for the event is required.'],
      validate: {
        validator: function (date) {
          return new Date(date) > Date.now();
        },
        message: 'The time must be in future.',
      },
      index: true,
    },
    creator: {
      id: {
        type: Schema.Types.ObjectId, // mongoose.Schema.Types.ObjectId
        ref: 'User',
      },
      name: String,
    },
  },
  {
    collection: 'Event',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

eventSchema.index({});
const Event = model('Event', userSchema);
module.exports = Event;
