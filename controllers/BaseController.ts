import {FastifyInstance} from "fastify";
import EasterEgg from "../domain/egg";
import { githubApiService } from '../services/github.service'

export default class BaseController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api',
            this.sayHello.bind(this))

        router.get('/api/timemachine/logs/mcfly',
            this.easterEggs.bind(this))
        
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

    async easterEggs() : Promise<EasterEgg[]> {
        var easterEggs: EasterEgg[] = [];

        var e1 = new EasterEgg("My mom is in love with me", "1.0", -446723100);
        var e2 = new EasterEgg("I go to the future and my mom end up with the wrong guy", "2.0", 1445470140)
        var e3 = new EasterEgg("I go to the past and you will not believe what happens next", "3.0", Number.MAX_VALUE)

        easterEggs = [e1, e2, e3]
        return easterEggs;
    }
}

