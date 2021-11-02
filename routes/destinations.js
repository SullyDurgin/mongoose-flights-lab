import { Router } from 'express'
import * as destinationsCtrl from '../controllers/destinations.js'

const router = Router()

// localhost:3000/destinations/new - GET
router.get('/new', destinationsCtrl.new)
// localhost:3000/destinations - POST
router.post('/', destinationsCtrl.create)

export { router }
