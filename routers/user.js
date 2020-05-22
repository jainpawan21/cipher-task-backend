const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/temp', async(req,res) => {
  res.send('Hello')
})


router.post('/users', async (req, res) => {
  const user = new User(req.body)
  if(req.body.email === 'admin@cipher.com'){
    user.isAdmin = true;
  } else {
    user.isAdmin = false;
  }
  try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
  } catch (e) {
      res.status(400).send(e)
  }
})

router.post('/users/login', async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    
    const token = await user.generateAuthToken()
    
    res.send({ user: user, token })

  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router