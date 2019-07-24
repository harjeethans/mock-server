// Import external dependancies
const faker = require('faker')
const boom = require('boom')

// Import internal dependancies
const fastify = require('../server.js')

// Fake data
const tenantsJson = require('./tenants.json');

// Get Data Models
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const tenantSchema = new mongoose.Schema({
	name: String,
	email: String,
	address: String,
  city: String,
  state: String,
  country: String,
  phone: String,
	id: ObjectId
})

const Tenant = mongoose.model('Tenant', tenantSchema)

console.log(tenantsJson.data.length);

fastify.ready().then(
	async () => {
		try {
			const tenants = await Tenant.insertMany(tenantsJson.data)
			// const tenants = await Tenant.create({"tid":"047fa844-f07b-4b70-b1d9-c58c06f49b7b","name":"Quamba","email":"acricket0@prnewswire.com","address":"236 Meadow Ridge Point","city":"Lafayette","state":"IN","country":"United States","phone":"765-870-2106"})
			console.log(`
      Data successfully added:
        - ${tenants.length} tenants added.
      `)
		} catch (err) {
			throw boom.boomify(err)
		}
		process.exit()
	},
	err => {
		console.log('An error occured: ', err)
		process.exit()
	}
)