const express = require('express');
const Club = require('../models/club');
const User = require('../models/user');
const Event = require('../models/event');
const handleAsync = require('../utils/handleAsync');
const { ClientError } = require('../utils/error');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.get(
  '/',
  handleAsync(async (req, res, next) => {
    const { q } = req.query;
    const regex = new RegExp(
      q ? q.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : '.*?',
      'gi'
    );
    const pipeline = [
      {
        $match: {
          $or: [{ name: regex }, { description: regex }],
        },
      },
      {
        $addFields: {
          count: {
            $sum: [{ $size: '$members' }, { $size: '$moderators' }],
          },
        },
      },
    ];
    const clubs = await Club.aggregate(pipeline);
    res.status(200).json({
      suc: true,
      obj: clubs,
    });
  })
);

// Get data of single club
router.get(
  '/:cid',
  handleAsync(async (req, res, next) => {
    const club = await Club.findById(req.params.cid);
    if (!club) return next(new ClientError('The club doesnot exist', 404));
    return res.status(200).json({
      suc: true,
      obj: club,
    });
  })
);
router.use(Auth);

// Events
router.use('/:cid/events', require('./event'));

// Create a club
router.post(
  '/',
  handleAsync(async (req, res, next) => {
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
    const clubData = {
      id: club._id,
      name: club.name,
      image_url: club.image_url,
      is_mod: true,
    };
    const user = await User.findByIdAndUpdate(req.user._id, {
      $push: { clubs: clubData },
    });
    return res.status(201).json({
      suc: true,
      obj: club,
    });
  })
);

// Join a club
router.patch(
  '/:cid/join',
  handleAsync(async (req, res, next) => {
    let club = await Club.findById(req.params.cid);
    if (!club) return next(new ClientError('The club doesnot exist', 404));
    const { _id, name: username, image_url: user_image_url } = req.user;
    const userData = { id: _id, name: username, image_url: user_image_url };
    if (
      club.memebers.includes(userData) ||
      club.moderators.includes(userData)
    ) {
      return next(new ClientError('Already a member', 400));
    }
    club.members.push(userData);
    const clubData = {
      id: club._id,
      name: club.name,
      image_url: club.image_url,
    };
    const user = await User.findByIdAndUpdate(req.user._id, {
      $push: { clubs: clubData },
    });
    await club.save();
    return res.status(202).json({
      suc: true,
    });
  })
);

// Promote to a mod of club
router.patch(
  '/:cid/mod',
  handleAsync(async (req, res, next) => {
    let club = await Club.findById(req.params.cid);
    if (!club) return next(new ClientError('The club doesnot exist', 404));

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
      return next(new ClientError('Cannot be made moderator', 400));
    }

    await Club.findByIdAndUpdate(req.params.cid, {
      $pull: { members: userData },
      $push: { moderators: userData },
    });

    await User.findOneAndUpdate(
      { _id: userid, 'club._id': el.id },
      { $set: { 'clubs.$.is_mod': true } }
    );

    return res.status(200).json({
      suc: true,
    });
  })
);

module.exports = router;
