const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  
  if (req.user.role === 'ADMIN') {
    
    const deletedUser = await prisma.user.delete({
      where: {
        id
      }
    })

    return res.status(201).json({ user: {
      username: deletedUser.username,
      id: deletedUser.id
    }})
  }
  return res.status(400).json({ error: 'Not authorized' })
})

module.exports = router;