const express = require('express');

const Club = require('../models/club');
const Event = require('../models/event');
const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/AppError');
const User = require('../models/user');

// /api/user
const router = express.Router();
router.get(
  '/',
  handleAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
      suc: true,
      obj: user,
    });
  })
);

// Get all clubs of user
router.get(
  '/clubs',
  handleAsync(async (req, res, next) => {
    const clubs = await Club.find({ 'members.id': req.user._id });
    return res.status(200).json({
      suc: true,
      obj: clubs,
    });
  })
);

// get all clubs which he is moderating
router.get(
  '/mod',
  handleAsync(async (req, res, next) => {
    const clubs = await Club.find({ 'moderators.id': req.user._id });
    return res.status(200).json({
      suc: true,
      obj: clubs,
    });
  })
);

// Get top 10 first event from user's clubs
router.get(
  '/events',
  handleAsync(async (req, res, next) => {
    // const user = await User.findById(req.user._id);
    // const clubsId = user.clubs.map((el) => el.id);
    const clubsId = await User.find({ _id: req.user._id })
      .select({ 'clubs._id': 1 })
      .exec();

    const events = await Event.find({
      'club.id': {
        $in: clubsId,
      },
    })
      .sort({ start_time: 'asc' })
      .limit(10)
      .exec();

    return res.status(200).json({
      suc: true,
      obj: events,
    });
  })
);

module.exports = router;
