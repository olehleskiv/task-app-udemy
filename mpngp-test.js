const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';
const ObjectId = mongodb.ObjectId;

const client = new MongoClient(connectionUrl);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const userCollection = db.collection('users');
  const tasksCollection = db.collection('tasks');
  // const insertedUser = await userCollection.insertOne({
  //   name: 'Oleh',
  //   age: 30
  // });

  // console.log(insertedUser);

  // const insertedTasks = await tasksCollection.insertMany([
  //   {
  //     descrition: 'Setup mongo db',
  //     completed: true
  //   }, 
  //   {
  //     descrition: 'Create more collections',
  //     completed: false
  //   }
  // ]);

  // console.log(insertedTasks);

  
  const findedUser = await userCollection.find({name: 'Oleh'}).toArray();
  console.log(findedUser);

  const findedTask = await tasksCollection.findOne({_id: new ObjectId('642b54b674ce99800b2837e2')});
  console.log(findedTask);

  const updatedUser = await userCollection.updateOne({_id: new ObjectId('642b548324ad5a72ab80fa81')}, { $set: {name: 'Andrew'}, $inc: {age: 1} } );
  console.log(updatedUser);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
