
import { Flight } from '../models/flight.js'


function newFlight(req, res) {
	res.render('flights/new', {
		airline: 'Add Flight',
	})
}

//
function create(req, res) {

	req.body.departure = !!req.body.departure
	console.log(req.body)

	if (req.body.cast) {
		req.body.cast = req.body.cast.split(', ')
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
	Flight.find({}, function (error, flightss) {
		res.render('flights/index', {
			flights,
			error,
			airline: 'All Flights',
		})
	})
}

function show(req, res) {
	Flight.findById(req.params.id, function (err, flight) {
		res.render('flights/show', {
			airline: `${flight.airline}'s Details`,
			flight,
		})
	})
}

function deleteFlight(req, res) {
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
			airline: 'Edit Flight Information',
			flight,
		})
	})
}

function update(req, res) {
	console.log('editing a flight:', req.params.id)
	req.body.departure = !!req.body.departure

	for (let key in req.body) {
		if (req.body[key] === '') {
			delete req.body[key]
		}
	}
	Flight.findByIdAndUpdate(req.params.id, req.body, function (err, flight) {
		res.redirect(`/flights/${flight._id}`)
	})
}

function createReview(req, res) {
	console.log('creating review associated with:', req.params.id)
	console.log(req.body)
	Flight.findById(req.params.id, function (error, flight) {
		flight.reviews.push(req.body)
		console.log(flight)
		flight.save(function (err) {
			res.redirect(`/flights/${flight._id}`)
		})
	})
}

export {
	newFlight as new,
	create,
	index,
	show,
	deleteFlight as delete,
	edit,
	update,
	createReview,
}
