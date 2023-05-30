const {basedir} = global
const Photos = require(`${basedir}/models/photos`)

const getAll = async (req, res) => {
      const photos = await Photos.find({})
      // const {id: owner} = req.user
      // const {page = 1, limit = 20} = req.query
      // const skip = (page - 1) * limit
      // const photos = await Photos.find({owner}, '', {skip, limit: Number(limit)}).populate("owner", "email")
      res.json({ status: 'success', code: 200, data: {photos}})
}

module.exports = getAll