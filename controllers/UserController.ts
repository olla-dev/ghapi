import {FastifyInstance} from "fastify";
import { User } from "../repositories/users/user";
import { userAuthenticationHeaderSchema, userLoginResponseSchema, userProfileResponseSchema, userRequestSchema, userResponseSchema } from "../services/api/user.schema";
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

        router.post('/api/users', {
            schema: {
                body: userRequestSchema,
            },
            handler: async (request: any, reply: any) => {
                try {
                    const { username, password } = request.body;
                    var newUser: User = {
                        username: username,
                        password: password
                    }
                    await userService.create(newUser);
                    return reply.code(200).send('User registred');
                } catch (error) {
                    request.log.error(error!);
                    return reply.code(500).send(error);
                }
            }
        });

        router.post('/api/users/login', {
            schema: {
                body: userRequestSchema,
                response: {
                    200: userLoginResponseSchema
                },
            },
            handler: async (request: any, reply: any) => {
                try {
                    const { username, password } = request.body;
                    var user: User = {
                        username: username,
                        password: password
                    }
                    var jwt = await userService.login(user);
                    return reply.code(200).send({username: username, token: jwt});
                } catch (error) {
                    request.log.error(error!);
                    return reply.code(500).send(error);
                }
            }
        });

        /** PROTECTED ROUTES */
        router.post('/api/users/me', {
            schema: {
                // auth validation can also be done using an interceptor middleware.
                headers: userAuthenticationHeaderSchema,
                response: {
                    200: userProfileResponseSchema
                },
            },
            handler: async (request: any, reply: any) => {
                try {
                    const Authorization = request.headers['x-authorization'];
                    console.log(Authorization);
                    
                    var userInfo = await userService.profile(Authorization);
                    return reply.code(200).send(userInfo);
                } catch (error) {
                    request.log.error(error!);
                    return reply.code(500).send(error);
                }
            }
        });
    }
}