const app = require('./app')
const PORT = process.env.PORT || 3001

/* *********** SERVER INIT *********** */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ${new Date().toISOString()}`)
})