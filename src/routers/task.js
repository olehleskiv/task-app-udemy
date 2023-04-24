const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET tasks?completed=true&limit=10&skip=10&sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {}
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    // const tasks = await Task.find({owner: req.user._id});

    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    });
    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Task.findById(req.params.id);
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id});
    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const allowedUpdates = ['description', 'completed' ];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates'});
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    // const task = await Task.findById(req.params.id);
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id});
    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    if (!task) {
      return res.status(404).send();
    }

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});


router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);

    const _id = req.params.id;
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id});

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;

