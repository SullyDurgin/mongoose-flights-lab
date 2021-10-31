import { Router } from 'express'
const router = Router()

router.get('/', function (req, res) {
	res.render('index', { airline: 'Welcome to the Flight Database' })
})

export { router }
