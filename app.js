const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const { authorize, listFiles } = require('./googleDrive');

global.basedir = __dirname

const photosRouter = require('./routes/api/photos')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.get('/api/google-drive/callback', async (req, res) => {
  const authCode = req.query.code;

  try {
    const authClient = await authorize(authCode);
    await listFiles();
    res.json({ status: 'success', message: 'Files retrieved from Google Drive' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to retrieve files from Google Drive' });
  }
});

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/photos', photosRouter)

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ status: 'fail', code: 500, message: err.message })
})

module.exports = app