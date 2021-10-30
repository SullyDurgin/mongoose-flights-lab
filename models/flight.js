import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flightSchema = new Schema(
	{
		airline: {
			type: String,
			required: true,
		},

		flightNo: {
			type: Number,
		},

		airport: {
			type: String,
			enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
		},
		departs: [String],
		seatsAvail: Boolean,
	},
	{
		timestamps: true,
	}
)

const ticketSchema = new Schema({
	seat: {
		type: String,
	},

	price: {
		type: Number,
	},
})

const Flight = mongoose.model('Flight', flightSchema, 'Tickets', ticketSchema)

export { Flight }
