// Import External Dependancies
const graphql = require('graphql')

// Destructure GraphQL functions
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql

// Import Controllers
const carController = require('../controllers/carController')
const ownerController = require('../controllers/ownerController')
const serviceController = require('../controllers/serviceController')
const tenantController = require('../controllers/tenantController')

// Define Object Types

const carType = new GraphQLObjectType({
	name: 'Car',
	fields: () => ({
		_id: { type: GraphQLID },
		title: { type: GraphQLString },
		brand: { type: GraphQLString },
		price: { type: GraphQLString },
		age: { type: GraphQLInt },
		owner_id: { type: GraphQLID },
		owner: {
			type: ownerType,
			async resolve(parent, args) {
				return await ownerController.getSingleOwner({ id: parent.owner_id })
			}
		},
		services: {
			type: new GraphQLList(serviceType),
			async resolve(parent, args) {
				return await serviceController.getCarsServices({ id: parent._id })
			}
		}
	})
})

const ownerType = new GraphQLObjectType({
	name: 'Owner',
	fields: () => ({
		_id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		email: { type: GraphQLString },
		cars: {
			type: new GraphQLList(carType),
			async resolve(parent, args) {
				return await ownerController.getOwnersCars({ id: parent._id })
			}
		}
	})
})

const serviceType = new GraphQLObjectType({
	name: 'Service',
	fields: () => ({
		_id: { type: GraphQLID },
		car_id: { type: GraphQLID },
		name: { type: GraphQLString },
		date: { type: GraphQLString },
		car: {
			type: carType,
			async resolve(parent, args) {
				return await carController.getSingleCar({ id: parent.car_id })
			}
		}
	})
})

const tenantType = new GraphQLObjectType({
	name: 'Tenant',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		address: { type: GraphQLString },
		city: { type: GraphQLString },
		state: { type: GraphQLString },
		country: { type: GraphQLString },
		phone: { type: GraphQLString }
	})
})

// Define Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		car: {
			type: carType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await carController.getSingleCar(args)
			}
		},
		cars: {
			type: new GraphQLList(carType),
			async resolve(parent, args) {
				return await carController.getCars()
			}
		},
		owner: {
			type: ownerType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await ownerController.getSingleOwner(args)
			}
		},
		service: {
			type: serviceType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await serviceController.getSingleService(args)
			}
		},
		tenant: {
			type: tenantType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await tenantController.getSingleTenant(args)
			}
		},
		tenants: {
			type: new GraphQLList(tenantType),
			args: { limit: { type: GraphQLInt }, skip: { type: GraphQLInt }, sort: {type: GraphQLString}, order: { type: GraphQLInt }},
			async resolve(parent, args) {
				return await tenantController.getTenants(args)
			}
		}
	}
})

// Define Mutations
const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		addCar: {
			type: carType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				brand: { type: new GraphQLNonNull(GraphQLString) },
				price: { type: GraphQLString },
				age: { type: GraphQLInt },
				owner_id: { type: GraphQLID }
			},
			async resolve(parent, args) {
				const data = await carController.addCar(args)
				return data
			}
		},
		editCar: {
			type: carType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				title: { type: new GraphQLNonNull(GraphQLString) },
				brand: { type: new GraphQLNonNull(GraphQLString) },
				price: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				owner_id: { type: GraphQLID }
			},
			async resolve(parent, args) {
				const data = await carController.updateCar(args)
				return data
			}
		},
		deleteCar: {
			type: carType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args) {
				const data = await carController.deleteCar(args)
				return data
			}
		},

		addTenant: {
			type: tenantType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				address: { type: GraphQLString },
				city: { type: GraphQLInt },
				state: { type: GraphQLInt },
				country: { type: GraphQLInt },
				phone: { type: GraphQLInt }
			},
			async resolve(parent, args) {
				const data = await tenantController.addTenant(args)
				return data
			}
		},
		editTenant: {
			type: tenantType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				address: { type: GraphQLString },
				city: { type: GraphQLInt },
				state: { type: GraphQLInt },
				country: { type: GraphQLInt },
				phone: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const data = await tenantController.updateTenant(args)
				return data
			}
		},
		deleteTenant: {
			type: tenantType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args) {
				const data = await tenantController.deleteTenant(args)
				return data
			}
		}

	}
})

// Export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})
