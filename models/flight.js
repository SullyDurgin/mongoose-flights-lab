import mongoose from "mongoose"

const Schema = mongoose.Schema


const flightSchema = new Schema({
  airline: {
    type: String,
    required: true
  },

  flightNo: {
    type: Number, 
  },

  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"]
  },
  departs: [String],
  seatsAvail: Boolean,
}, {
  timestamps: true
})

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight,
}