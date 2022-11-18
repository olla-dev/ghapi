import { User } from "../repositories/users/user";
import { userRepository } from "../repositories/users/users.repository";
import bcrypt from 'bcrypt';

class UserService {
    /**
     * Store a user in db 
     * @returns 
     */
    async create(user: User) {
        // hash password
        user.password = bcrypt.hashSync(user.password, 12)
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


    /**
     * Login a user
     * @returns 
     */
     async login(user: User) {
        var userInDb = await userRepository.find(user);

        if(!userInDb) {
            throw 'User not found';
        }

        // check given password against db hash
        if(!bcrypt.compareSync(user.password, userInDb.password)) {
            throw 'Wrong password'
        }

        var jwt = ''

        return jwt;
    }
}

export const userService = new UserService();