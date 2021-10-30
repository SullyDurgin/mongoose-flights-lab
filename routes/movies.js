import { Router } from 'express'
import * as moviesCtrl from "../controllers/movies.js"
const router = Router()

// localhost:3000/movies - GET
router.get("/", moviesCtrl.index)
// localhost:3000/movies/new - GET
router.get("/new", moviesCtrl.new)
// localhost:3000/movies/:id - GET
router.get("/:id", moviesCtrl.show)
// localhost:3000/movies/:id/edit
router.get("/:id/edit", moviesCtrl.edit)

// localhost:3000/movies - POST
router.post("/", moviesCtrl.create)
// loclhost:3000/movies/:id/reviews
router.post("/:id/reviews", moviesCtrl.createReview)

// localhost:3000/movies/:id - DELETE
router.delete("/:id", moviesCtrl.delete)

// localhost:3000/movies/:id - PUT
router.put("/:id", moviesCtrl.update)

export {
  router
}
