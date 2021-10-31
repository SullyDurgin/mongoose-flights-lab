import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketSchema = new Schema(
	{
		seat: {
			type: String,
			match: /[A-F][1-9]\d?/,
		},
		price: {
			type: Number,
			min: 0,
		},
	},
	{
		timestamps: true,
	}
)

const flightSchema = new Schema(
	{
		airline: {
			type: String,
			required: true,
			type: String,
			required: true,
			enum: ['American', 'Delta', 'Jet Blue', 'United', 'Spirit'],
		},
		airport: {
			type: String,
			required: true,
			default: 'DEN',
			enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
		},
		flightNo: {
			type: Number,
			min: 10,
			max: 9999,
		},
		departs: {
			type: Date,
			default: function () {
				let now = new Date()
				let oneYear = new Date()
				oneYear.setFullYear(now.getFullYear() + 1)
				return oneYear
			},
		},
		tickets: [ticketSchema],
	},
	{
		timestamps: true,
	}
)

const Flight = mongoose.model('Flight', flightSchema)

export { Flight }
