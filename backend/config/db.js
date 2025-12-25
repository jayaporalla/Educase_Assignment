const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) throw new Error('Missing MongoDB URI');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });
}

module.exports = { connectDB };

