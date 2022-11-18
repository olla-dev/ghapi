import {FastifyInstance} from "fastify";
import {GithubApiInfo} from "../domain/github";

export default class BaseController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api',
            this.sayHello.bind(this))
        router.get('/api/healthcheck', 
            this.healthCheck.bind(this))
    }

    async sayHello(): Promise<string> {
        return 'Hello, friend'
    }

    async healthCheck(): Promise<GithubApiInfo> {
        return {
            "name": "github-api",
            "version": "1.0",
            "time": Date.now()
        }
    }

}

