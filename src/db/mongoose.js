const mongoose = require('mongoose');
const connectionUrl = process.env.MONGODB_URL;

mongoose.connect(connectionUrl);

// const validator = require('validator');

// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validadte(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error('The email is invalid'); 
//       }
//     }
//   },
//   password: {
//     type: String,
//     trim: true,
//     required: true,
//     minLength: 7,
//     validadte(value) {
//       if (value.toLowerCase().includes('password')) {
//         throw new Error('Password should not contain "password"'); 
//       }
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error('Age should be more then 0'); 
//       }
//     }
//   }
// });

// const me = new User({name: 'Tom', age: 33, email: 'test@tes.com', password: 'qwerty123'});

// me.save()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// const Task = mongoose.model('Task', {
//   description: {
//     type: String
//   },
//   completed: {
//     type: Boolean
//   }
// });

// const newTask = new Task({
//   description: 'Setup mongoose db',
//   completed: false
// });

// newTask.save()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));