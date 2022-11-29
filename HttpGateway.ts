import fastify, {FastifyInstance} from 'fastify'
const fastifyEnv = require('@fastify/env')

const schema = {
    type: 'object',
    required: [ 'SCRET_KEY' ],
    properties: {
      SCRET_KEY: {
        type: 'string',
        default: 'sample-jwt-secret'
      }
    }
  }

export default class HttpGateway  {
    private readonly instance: FastifyInstance

    constructor() {
        this.instance = fastify({logger: true});

        // configure env
        const options = {
            confKey: 'config',
            dotenv: true,
            schema: schema,
            data: process.env
        }
        this.instance
        .register(fastifyEnv, options)
        .ready((err) => {
            if (err) console.error(err)
            console.log(process.env.SECRET_KEY);
        })
    }

    get router() {
        return this.instance
    }

    get port() {
        return 3000
    }

    async start() {
        await this.instance.listen(this.port, '127.0.0.1')
    }

}
