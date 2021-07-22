const express = require('express');
const Club = require('../models/club');
const User = require('../models/user');
const Event = require('../models/event');
const handleAsync = require('../utils/handleAsync');
const { ClientError } = require('../utils/error');
const Auth = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

// Get all events of a club
// TODO add filtering here
router.get(
  '/',
  handleAsync(async (req, res, next) => {
    const club = await Club.findById(req.params.cid);
    if (!club) return next(new ClientError('The club doesnot exist', 404));

    const events = await Event.aggregate([
      {
        $match: {
          'club.id': club._id,
        },
      },
      {
        $addFields: {
          eventDate: {
            $dateFromParts: {
              year: { $year: '$start_time' },
              month: { $month: '$start_time' },
              day: { $dayOfMonth: '$start_time' },
            },
          },
        },
      },
      {
        $group: {
          _id: '$eventDate',
          events: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $sort: {
          eventDate: -1,
        },
      },
    ]);

    return res.status(200).json({
      suc: true,
      obj: events,
    });
  })
);

// Create event
router.post(
  '/',
  handleAsync(async (req, res, next) => {
    const club = await Club.findById(req.params.cid);
    if (!club) return next(new ClientError('The club doesnot exist', 404));
    const { name, description, image_url } = req.body;
    const start_time = new Date(req.body.start_time);
    const end_time = new Date(req.body.end_time);

    if (
      !(
        start_time < end_time &&
        start_time > Date.now() &&
        end_time > Date.now()
      )
    ) {
      return next(new ClientError('The date must be in future', 400));
    }

    const isMod = club.moderators.find((el) => el.id.equals(req.user._id));

    if (!isMod) {
      return next(new ClientError('Only Moderators can add events', 400));
    }

    const user = await User.findById(req.user._id);
    const obj = {
      name,
      description,
      image_url,
      start_time,
      end_time,
      club: { id: club._id, name: club.name, image_url: club.image_url },
      creator: {
        id: user._id,
        name: user.name,
        image_url: user.image_url,
      },
    };
    const event = await Event.create(obj);

    return res.status(201).json({
      suc: true,
      obj: event,
    });
  })
);

module.exports = router;
