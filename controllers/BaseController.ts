import {FastifyInstance} from "fastify";
import {GithubApiInfo} from "../domain/github";

import { githubApiService } from '../services/github.service'

export default class BaseController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api',
            this.sayHello.bind(this))
        
        router.get('/api/healthcheck', {}, async (request: any, reply: any) => {
            try {
                const healthcheck = await githubApiService.healthCheck();
                return reply.code(200).send(healthcheck);
            } catch (error) {
                request.log.error(error!);
                return reply.code(500).send(error);
            }
        });
    }

    async sayHello(request: any, reply: any): Promise<string> {
        return 'Hello, friend'
    }
}

