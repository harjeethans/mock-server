// External Dependancies
const boom = require('boom')

// Get Data Models
const Tenant = require('../models/Tenant')

// Get all tenants
exports.getTenants = async ( req ) => {
	try {
    console.log('PARAMS passed : '  + JSON.stringify(req));
    const limit = req.limit || 10;
    const skip = req.skip || 0;
    const sort = req.sort;
    const order = req.order || 1;
    const params = {limit, skip};
    // const tenants = await Tenant.find().limit(limit)
    if(sort) {
      params.sort = {[sort]: order};
    }
    const tenants = await Tenant.find({}, null, params)
    return tenants
	} catch (err) {
    console.log('WE HAVE AN ERROR');
		throw boom.boomify(err)
	}
}

// Get single tenant by ID
exports.getSingleTenant = async req => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const tenant = await Tenant.findById(id)
		return tenant
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new tenant
exports.addTenant = async req => {
	try {
		const tenant = new Tenant(req)
		const newTenant = await tenant.save()
		return newTenant
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing tenant
exports.updateTenant = async req => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const updateData = req.params === undefined ? req : req.params
		const update = await Tenant.findByIdAndUpdate(id, updateData, { new: true })
		return update
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a tenant
exports.deleteTenant = async req => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const tenant = await Tenant.findByIdAndRemove(id)
		return tenant
	} catch (err) {
		throw boom.boomify(err)
	}
}
