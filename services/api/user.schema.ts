export const userRequestSchema = {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 2 }
    },
    required: ['username', 'password']
  }
  
export const userResponseSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      username: { type: 'string' },
    },
  },
}

export const userLoginResponseSchema = {
    type: 'object',
    properties: {
      username: { type: 'string' },
      token: { type: 'string' },
    },
}