const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const notificationRouter = require('./routers/notification')
const app = express()
const port = '3001'

app.use(require('./cors'));
app.use(express.json())
app.use(userRouter)
app.use(notificationRouter)


app.listen(port , () => {
  console.log('Server is up on port ' + port)
})
