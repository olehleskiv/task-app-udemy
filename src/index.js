const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server is up on port ', PORT);
});

// const express = require('express');
// require('./db/mongoose');

// const userRouter = require('./routers/user');
// const taskRouter = require('./routers/task');

// const app = express();


// app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

// app.post('/users', (req, res) => {
//   const user = new User(req.body);
//   user.save().then(res => {
//       res.status(201).send(res);
//     }).catch(err => {
//       res.status(400).send(err);
//     });
// });

// app.get('/users', (req, res) => {
//   User.find({}).then(users => {
//     res.status(200).send(users);
//   }).catch(err => {
//     res.status(500).send();
//   });
// });

// app.get('/users/:id', (req, res) => {
//   User.findById(req.params.id).then(user => {
//     if (!user) {
//       return res.status(404).send();
//     }

//     res.status(200).send(user);
//   }).catch(err => {
//     res.status(500).send();
//   });
// });

// app.post('/tasks', (req, res) => {
//   const task = new Task(req.body);
//   task.save().then(res => {
//       res.status(201).send(res);
//     }).catch(err => {
//       res.status(400).send(err);
//     });
// });

// app.get('/tasks', (req, res) => {
//   Task.find({}).then(tasks => {
//       res.status(200).send(tasks);
//     }).catch(err => {
//       res.status(500).send();
//     });
// });

// app.get('/tasks/:id', (req, res) => {
//   Task.findById(req.params.id).then(task => {
//     if (!task) {
//       return res.status(404).send();
//     }

//     res.status(200).send(task);
//     }).catch(err => {
//       res.status(500).send();
//     });
// });
