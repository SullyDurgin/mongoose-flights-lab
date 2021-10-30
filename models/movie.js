import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    defaut: 5,
  }
}, {
  timestamps: true
})

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number, 
    default: function() {
      return new Date().getFullYear()
    },
    min: 1927,
  },
  mpaaRating: {
    type: String,
    enum: ["G", "PG", "PG-13", "R"]
  },
  cast: [String],
  nowShowing: Boolean,
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Movie = mongoose.model("Movie", movieSchema)

export {
  Movie
}

// const todoSchema = new Schema({
//   text: String,
//   done: Boolean
// })