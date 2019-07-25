// Import our Controllers
const tenantController = require('../controllers/tenantController')

// Import Swagger documentation
// const documentation = require('./documentation/tenantApi')

const routes = [
  {
    method: 'GET',
    url: '/api/tenants',
    handler: tenantController.getTenants
  },
  {
    method: 'GET',
    url: '/api/tenants/:id',
    handler: tenantController.getSingleTenant
  },
  {
    method: 'POST',
    url: '/api/tenants',
    handler: tenantController.addTenant
    // schema: documentation.addTenantSchema
  },
  {
    method: 'PUT',
    url: '/api/tenants/:id',
    handler: tenantController.updateTenant
  },
  {
    method: 'DELETE',
    url: '/api/tenants/:id',
    handler: tenantController.deleteTenant
  }
]

module.exports = routes
