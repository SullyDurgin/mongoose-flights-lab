import { Flight } from '../models/flight.js'
import { Destination } from '../models/destination.js'

function newFlight(req, res) {
	res.render('flights/new', {
		title: 'Add Flight',
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
			title: 'All flights',
		})
	})
}


function show(req, res) {
	Flight.findById(req.params.id)
		.populate('destinations')
		.exec(function (error, flight) {
			Destination.find(
				{ _id: { $nin: flight.destinations } },
				function (error, destinations) {
					console.log(error)
					res.render('flights/show', {
						title: `${flight.flightNo}'s Details`,
						flight,
						destinations,
					})
				}
			)
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
			title: 'Edit a flight!',
			flight,
		})
	})
}

function update(req, res) {
	console.log('updating a flight:', req.params.id)
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

function createTicket(req, res) {
	console.log('creating ticket for', req.params.id)
	console.log(req.body)
	Flight.findById(req.params.id, function (error, flight) {
		flight.tickets.push(req.body)
		flight.save(function (err) {
			res.redirect(`/flights/${flight._id}`)
		})
	})
}

function deleteTicket(req, res) {
	console.log('deleting ticket:', req.params.id)
	Flight.findById(req.params.flightID, function (error, flight) {
		flight.tickets.remove({ _id: req.params.ticketId })
		flight.save(function (error) {
			res.redirect(`/flights/${flight._id}`)
		})
	})
}

function addToDestinations(req, res) {
	console.log(req.body)
	Flight.findById(req.params.id, function (err, flight) {
		flight.destinations.push(req.body.destinationId)
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
	createTicket,
	deleteTicket,
	addToDestinations,
}
