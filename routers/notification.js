const express = require('express')
const Notification = require('../models/notifications')
const router = new express.Router()


router.post('/notifications', async (req,res) => {
  //const notification = new notification(req.body)
  const notification = new Notification({
    ...req.body, 
  })
  try {
    await notification.save()
    res.status(201).send(notification)
  } catch (e) {
    res.status(400).send(e)
  }
  
})


router.get('/notifications',async (req,res) =>{

// console.log(req.body)
  try {
    const notification = await Notification.find({}).sort( { updatedAt: -1 } )
    res.status(200).send(notification);
  } 
  catch (e) {
    res.status(500).send(e.message)
  }
   
})

router.get('/notification/:id', async (req,res) =>{
  const _id = req.params.id

  try {
    //const notification = await notification.findById(_id)
    const notification = await Notification.findOne({_id})

    if(!notification) {
      return res.status(404).send()
    }
    res.send(notification)
  } catch (e) {
    res.status(500).send()
  }  
})

router.patch('/notification/:id',async(req,res) => {
  try {

    const notification = await Notification.findOne({ _id: req.params.id})
    
    if(!notification) {
      return res.status(404).send()
    }
    notification.description = req.body.description;
    notification.url = req.body.url;
    await notification.save()

    res.send(notification)

  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/notification/:id',async (req,res) =>{
 

  try {
    const notification = await Notification.findOneAndDelete({_id: req.params.id})
    console.log(req.params.id)
    if(!notification) {
      return res.status(404).send()
    }
    res.send(notification)
  } catch (e) {
    res.status(500).send()
  }  
})

module.exports = router