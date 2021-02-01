const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json({extended: true}));
app.use('/api/movie', require('./routes/movie.route'));

const PORT = config.get('PORT') || 4000;

async function start() {
      try{
          await mongoose.connect(config.get('mongoUri'), {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true
          })
          app.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`))
      } catch (e) {
          console.log('Server Error', e.message)
          process.exit(1)
      }
  }
  
start()