import { prismaClient } from '../../prisma/prisma.client'
import { User } from './user';

class UserRepository {

    async create(user: User) {
        return await prismaClient.user.create({
            data: {
                ...user
            },
        }).catch((e) => {
            throw e;
        })
        .finally(async () => {
            await prismaClient.$disconnect();
        });
    }

    /**
     * Lists all users
     * @returns User[]
     */
    async list() {
        return await prismaClient.user.findMany({ 
            select: {
                id: true,
                username: true,
                createdAt: true,
            }
        })
        .catch((e) => {
            throw e;
        })
        .finally(async () => {
            await prismaClient.$disconnect();
        });
    }
}

export const userRepository = new UserRepository();