import { Flight } from '../models/flight.js'

function newflight(req, res) {
	res.render('flights/new', {
		airline: 'Add Flight',
	})
}

function create(req, res) {
	req.body.seatsAvail = !!req.body.seatsAvail
	console.log(req.body)
	if (req.body.departs) {
		req.body.departs = req.body.departs.split(', ')
	}
	for (let key in req.body) {
		if (req.body[key] === '') {
			delete req.body[key]
		}
	}

	Flight.create(req.body, function (error, flight) {
		if (error) {
			console.log(error)
			return res.redirect('/flights/new')
		}
		res.redirect('/flights')
	})
}

function index(req, res) {
	Flight.find({}, function (error, flights) {
		res.render('flights/index', {
			flights,
			error,
			airline: 'All flights',
		})
	})
}

function show(req, res) {
	Flight.findById(req.params.id, function (err, flight) {
		res.render('flights/show', {
			airline: `Flight Number ${flight.flightNo}'s Details`,
			flight,
		})
	})
}

function deleteflight(req, res) {
	console.log('deleting flight: ', req.params.id)
	Flight.findByIdAndDelete(req.params.id, function (err, flight) {
		console.log(flight)
		res.redirect('/flights')
	})
}

function edit(req, res) {
	console.log('editing flight:', req.params.id)
	Flight.findById(req.params.id, function (error, flight) {
		console.log(flight)
		res.render('flights/edit', {
			airline: 'Edit a flight!',
			flight,
		})
	})
}

function update(req, res) {
	console.log('remaking a flight:', req.params.id)
	req.body.seatsAvail = !!req.body.seatsAvail

	for (let key in req.body) {
		if (req.body[key] === '') {
			delete req.body[key]
		}
	}
	Flight.findByIdAndUpdate(req.params.id, req.body, function (err, flight) {
		res.redirect(`/flights/${flight._id}`)
	})
}

export {
	newflight as new,
	create,
	index,
	show,
	deleteflight as delete,
	edit,
	update,
}
