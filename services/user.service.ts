import { User } from "../repositories/users/user";
import { userRepository } from "../repositories/users/users.repository";
import { JwtToken } from "../domain/api";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;


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

        const token = sign({ 
            id: userInDb.id.toString(), 
            username: userInDb.username 
        }, process.env.SECRET_KEY!, {expiresIn: '10d'});

        // store token in db
        userInDb.token = token;
        userRepository.update(userInDb);

        return token;
    }

    /**
     * Return authenticated username
     * @returns 
     */
     async profile(authToken: string) {
        if(!authToken) {
            throw 'Auth info missing'
        }

        var decodedToken = verify(
            authToken, 
            process.env.SECRET_KEY!) as JwtToken;
        
        var userInDb = await userRepository.findByUsername(decodedToken.username);

        if(!userInDb) {
            throw 'User not found';
        }
        
        return userInDb;
    }
}

export const userService = new UserService();