const express = require('express');
const Club = require('../models/club');
const Event = require('../models/event');
const handleAsync = require('../utils/handleAsync');
const AppError = require('../utils/AppError')

const router = express.Router();

router.get(
  '/:cid',
  handleAsync(async (req, res, next) => {
    const club = await Club.findById(req.params.cid);
    if (!club) return next(new AppError('The club doesnot exist', 404));
    return res.status(200).json({
      suc: true,
      object: club,
    });
  })
);

router.get(
  '/:cid/events',
  handleAsync(async (req, res, next) => {
    const club = await Club.findById(req.params.cid);
    if (!club) return next(new AppError('The club doesnot exist', 404));

    const events = await Event.find({
      'club.id': club._id,
    }).exec();

    return res.status(200).json({
      suc: true,
      object: events,
    });
  })
);

router.post(
  '/', handleAsync(async (req, res, next) => {
    const { name, description, image_url } = req.body;
    const { _id, name: username, image_url: user_image_url } = req.user;
    obj = {
      name,
      description,
      image_url,
      members: [],
      moderators: [{ id: _id, name: username, image_url: user_image_url }],
    };
    const club = await Club.create(obj);
    return res.status(201).json({
      suc: true,
      object: club,
    });
  })
);

router.patch(
  '/:cid/join', handleAsync(async (req, res, next) => {
    let club = await Club.findById(req.params.cid);
    if (!club) return next(new AppError('The club doesnot exist', 404));
    const { _id, name: username, image_url: user_image_url } = req.user;
    const userData = { id: _id, name: username, image_url: user_image_url };
    if (
      club.memebers.includes(userData) ||
      club.moderators.includes(userData)
    ) {
      return next(new AppError('Already a member', 400));
    }
    club.members.push(userData);
    await club.save();
    return res.status(202).json({
      suc: true,
    });
  })
);

router.patch(
  '/:cid/mod', handleAsync(async (req, res, next) => {
    let club = await Club.findById(req.params.cid);
    if (!club) return next(new AppError('The club doesnot exist', 404));

    const { _id, name: username, image_url: user_image_url } = req.user;
    const selfData = { id: _id, name: username, image_url: user_image_url };

    const { id: userid } = req.body;
    const user = await User.findById(userid); // person to promote

    const userData = {
      id: user._id,
      name: user.name,
      image_url: user.image_url,
    };

    if (
      !(club.members.includes(userData) && club.moderators.includes(selfData))
    ) {
      return next(new AppError('Cannot be made moderator', 400));
    }

    club.members = club.members.map((el) => el !== userData);

    club.moderators.push(userData);
    await club.save();
    return res.status(200).json({
      suc: true,
    });
  })
);

router.post(
  '/:cid',
  handleAsync(async (req, res, next) => {
    const club = await Club.findById(req.params.cid);
    if (!club) return next(new AppError('The club doesnot exist', 404));
    const { name, description, image_url, start_time, end_time } = req.body;

    if (
      !(
        start_time < end_time &&
        start_time > Date.now() &&
        end_time > Date.now()
      )
    )
      return next(new AppError('The date must be in future', 400));
    const { _id, name: username, image_url: user_image_url } = req.user;
    const isMod = club.moderators.filter((el) => el.id === _id).length() != 0;
    if (!isMod) {
      return next(new AppError('Only Mods can add events', 400));
    }
    const obj = {
      name,
      description,
      image_url,
      start_time,
      end_time,
      club: { id: club._id, name: club.name, image_url: club.image_url },
      creator: {
        id: _id,
        name: username,
        image_url: user_image_url,
      },
    };
    const event = await Event.create(obj);

    return res.status(201).json({
      suc: true,
      object: event,
    });
  })
);

module.exports = router;
