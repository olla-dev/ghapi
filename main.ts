import HttpGateway from "./HttpGateway";
import BaseController from "./controllers/BaseController";
import UserController from "./controllers/UserController";

(async function main() {
    // Init Fastify router
    const http = new HttpGateway()

    // Controllers
    new BaseController(http.router)
    new UserController(http.router)

    // Fastify router start
    await http.start()
})()
