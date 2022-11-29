export type User = {
    id?: number;
    createdAt?: Date;
    username: string;
    password: string;
    token?: String;
    tokenExpires?: String;
};