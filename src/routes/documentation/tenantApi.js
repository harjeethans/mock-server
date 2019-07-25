exports.addTenantSchema = {
  description: 'Create a new tenant',
  tags: ['tenants'],
  summary: 'Creates new tenant with given values',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      address: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      country: { type: 'string' },
      phone: { type: 'string' },
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        country: { type: 'string' },
        phone: { type: 'string' },
        __v: { type: 'number' }
      }
    }
  }
}
