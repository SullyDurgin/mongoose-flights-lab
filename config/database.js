import mongoose from "mongoose"

// Connecting to the database on Atlas
mongoose.connect(process.env.DATABASE_URL)

// Logging out the conection to the database on Atlas
const db = mongoose.connection

db.on("connected", function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})