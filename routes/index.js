import { Router } from 'express'
const router = Router()

router.get('/', function (req, res) {
	res.render('index', { airline: 'Airline Flights' })
})

export { router }
