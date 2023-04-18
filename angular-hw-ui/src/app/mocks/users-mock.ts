import { User } from '../models/user';

export const usersMock: User[] = [
    {
        email: 'user1@g.com',
        password: '1111',
        token: 'token_u1'
    },

    {
        email: 'user2@g.com',
        password: '2222',
        token: 'token _u2'
    },

    {
        email: 'user3@g.com',
        password: '3333',
        token: 'token _u3'
    },

    {
        email: 'user4@g.com',
        password: '4444',
        token: 'token_u4'
    }
];

export const newUserMock: User = {
    email: 'userNew@g.com',
    password: 'newnew',
    token: 'token_uNew'
};
