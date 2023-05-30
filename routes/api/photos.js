const express = require('express')
const router = express.Router()
const {basedir} = global
const {getAll} = require(`${basedir}/controllers/photos`)
const ctrlWrapper = require(`${basedir}/helpers/ctrlWrapper`)

router.get('/', ctrlWrapper(getAll))

module.exports = router