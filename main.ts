import HttpGateway from "./HttpGateway";
import BaseController from "./controllers/BaseController";

(async function main() {
    // Init Fastify router
    const http = new HttpGateway()

    // Controllers
    new BaseController(http.router)

    // Fastify router start
    await http.start()
})()
