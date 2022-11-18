import { User } from "../repositories/users/user";
import { userRepository } from "../repositories/users/users.repository";

class UserService {
    /**
     * Store a user in db 
     * @returns 
     */
    async create(user: User) {
        return await userRepository.create(user);
    }

    /**
     * Lists all users in db
     * @param
     * @returns 
     */
    async list() {
        return await userRepository.list();
    }
}

export const userService = new UserService();