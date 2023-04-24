const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const User = require('../src/models/user');
const { userOneId, userOne, userTwo, setupDatabase, taskOne, taskTwo, taskThree } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Test task',
      completed: false
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('Should fetch task', async () => {
  const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.description).toEqual(taskOne.description);
});

test('Should not fetch task for unauthenticated user', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .send()
    .expect(401);
});

test('Should delete task', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const task = await Task.findById(taskOne._id);
  expect(task).toBeNull();
});

test('Should not delete task for unauthenticated user', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .send()
    .expect(401);

  expect(Task.findById(taskOne._id)).not.toBeNull();
});

test('Should update task', async () => {
  const response = await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      completed: true
    })
    .expect(200);

  expect(response.body.completed).toEqual(true);
});

test('Should not delete task for another user', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});

test('Should fetch a page of tasks', async () => {
  const response = await request(app)
    .get('/tasks?page=1')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test('Should sort tasks by completed status', async () => {
  const response = await request(app)
    .get('/tasks?sortBy=completed:desc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].description).toEqual(taskTwo.description);
});

test('Should sort tasks by createdAt date', async () => {
  const response = await request(app)
    .get('/tasks?sortBy=createdAt:desc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].description).toEqual(taskTwo.description);
});

test('Should not fetch other user tasks by id', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  expect(Task.findById(taskOne._id)).not.toBeNull();
});