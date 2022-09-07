const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

const auth = async (req, res, next) => {

  const [bearer, token] = req.get('authorization').split(' ')

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const foundUser = await prisma.user.findFirst({
      where: {
        username: decode.username
      }
    })

    req.user = foundUser

    next()

  } catch (e) {
    
    return res.status(500).json({ error: 'Something went wrong' })
    
  }
}

module.exports = auth