const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
// Connect Database
connectDB()

app.use(express.json())

app.use('/api/users/', authRoutes)
app.use('/api/posts/', postsRoutes)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))