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
const tenantController = require('../controllers/tenantController')

// Define Object Types
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
