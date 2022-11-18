import {FastifyInstance} from "fastify";
import { userResponseSchema } from "../services/api/user.schema";
import { userService } from '../services/user.service'

export default class UserController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api/users', {
            schema: {
                response: {
                    200: userResponseSchema
                },
            },
            handler: async (request: any, reply: any) => {
                try {
                    const users = await userService.list();
                    return reply.code(200).send(users);
                } catch (error) {
                    request.log.error(error!);
                    return reply.code(500).send(error);
                }
            }
        });
    }
}