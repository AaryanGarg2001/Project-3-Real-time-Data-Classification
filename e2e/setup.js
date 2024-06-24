import mongoose from 'mongoose';
import { app } from '../src/main';

// Before running the tests, connect to the test database
before(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Ensure the server is running
  await app.ready();
});

// After running the tests, close the database connection
after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await app.close();
});
