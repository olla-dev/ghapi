import { prismaClient } from '../../prisma/prisma.client'
import { User } from './user';

class UserRepository {

    async create(user: User) {
        let userInDb = await prismaClient.user.count(
            {
              where: {
                username: user.username
              }
            }
        )

        if (userInDb > 0) {
            throw 'User already exists'
        } 

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

    async update(user: User) {
        return await prismaClient.user.update({
            where: {
                id: user.id
            },
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

    /**
     * Find a specific user
     * @returns User
     */
     async find(user: User) {
        return await prismaClient.user.findFirst({ 
            where: {
                username: user.username
            }
        })
        .catch((e) => {
            throw e;
        })
        .finally(async () => {
            await prismaClient.$disconnect();
        });
    }

    /**
     * Find a specific user by username
     * @returns User
     */
     async findByUsername(username: string) {
        return await prismaClient.user.findFirst({ 
            where: {
                username: username
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