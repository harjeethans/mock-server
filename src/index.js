// Import Server
const fastify = require('./server.js')

// Import external dependancies
const gql = require('fastify-gql')

// Import GraphQL Schema
const schema = require('./schema')

// Register Fastify GraphQL
fastify.register(gql, {
	schema,
	graphiql: true
})

// Import Routes
const routes = require('./routes')

// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

fastify.get('/', function (request, reply) {
	reply.code(200)
		.header('Content-Type', 'application/json; charset=utf-8')
		.header('x-okta-token', 'eyJraWQiOiI2QTJOZU56MVZmRV9na1V0R3dlRXVrQ25aR2pVbUFEcVd1cExrN3pKbDRrIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnRkY0otZEJkcUNudldjTmU5eldOWlJBRmdWYTM0dXNxeUJrbFNlNW94VWciLCJpc3MiOiJodHRwczovL2Rldi0zMTgzODMub2t0YXByZXZpZXcuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTU2MzQ4NTQ3NywiZXhwIjoxNTYzNDg5MDc3LCJjaWQiOiIwb2FtNHphYmt5MkdqOWNXQTBoNyIsInVpZCI6IjAwdW03ejMwMGhWZ2pvTUptMGg3Iiwic2NwIjpbIm9wZW5pZCJdLCJzdWIiOiJhdmluYXNoQG5pbGUtZ2xvYmFsLmNvbSIsImdyb3VwcyI6WyJFdmVyeW9uZSIsIkhSIl0sInRlbmFudCI6IkNPS0UifQ.oAws0HBAl6BjI2o-zdAfrSNxrzisbB1yw9rVbBFu_BsLlJ-7jnEJPioyCsclNPjzPX4KNGcJsKzS560u5R9UllfsU2gfy2V1Da8sg9sHc6Iu1gCyQ00fOwpUphKcnK1nJdQTqbn9pdwLe1DwMaqL-9l902QArBf2NOeGlVO_mdQBI7eHrfwyfs_LbQc-EbxTo3MF2w_xYyVgK_XxstjVvc_783twQOhCymWN2O13wH6Qd5WOud3lyu1SoNgTCMeD4dflGi9OqGRa3MmWdjeK9deXc-nUs5u6Seg3pNRUYwpPqEALc7T5xyLWbwX51nMpiK-gRLefBWI6XIkD0XXZ_g')
    .send({ hello: 'Hello from Mock Server' })
})

// Loop over each route
routes.forEach((route, index) => {
	fastify.route(route)
})

// Run the server!
const start = async () => {
	try {
		await fastify.listen(3000, '0.0.0.0')
		fastify.swagger()
		fastify.log.info(`server listening on ${fastify.server.address().port}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()
