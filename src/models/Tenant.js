// External Dependancies
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const tenantSchema = new mongoose.Schema({
	name: String,
	email: String,
	address: String,
  city: String,
  state: String,
  country: String,
  phone: String
})

module.exports = mongoose.model('Tenant', tenantSchema)
