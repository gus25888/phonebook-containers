const app = require('./app')
const PORT = process.env.PORT || 3001

/* *********** SERVER INIT *********** */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} at ${new Date().toISOString()}`)
})