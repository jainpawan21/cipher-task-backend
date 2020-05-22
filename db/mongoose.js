const mongoose = require('mongoose')

mongoose.connect(('mongodb://localhost:27017/myapp'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, console.log('MongoDB connected'))