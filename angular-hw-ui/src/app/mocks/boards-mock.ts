import { Board } from '../models/board';

export const boardsMock: Board[] = [
    {
        name: 'board 1_u1',
        _id: '1_u1',
        userId: 'u1',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 1_u1",
        numberOfTasks: 1
    },

    {
        name: 'board 2_u1',
        _id: '2_u1',
        userId: 'u1',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 2_u1",
        numberOfTasks: 2
    },

    {
        name: 'board 1_u2',
        _id: '1_u2',
        userId: 'u2',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 1_u2",
        numberOfTasks: 2
    },

    {
        name: 'board 2_u2',
        _id: '2_u2',
        userId: 'u2',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 2_u2",
        numberOfTasks: 2
    },

    {
        name: 'board 1_u3',
        _id: '1_u3',
        userId: 'u3',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 1_u3",
        numberOfTasks: 2
    },

    {
        name: 'board 2_u3',
        _id: '2_u3',
        userId: 'u3',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 2_u3",
        numberOfTasks: 2
    },

    {
        name: 'board 1_u4',
        _id: '1_u4',
        userId: 'u4',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 1_u4",
        numberOfTasks: 2
    },

    {
        name: 'board 2_u4',
        _id: '2_u4',
        userId: 'u4',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 2_u4",
        numberOfTasks: 2
    }
];

export const newBoardMock: Board = {
        name: 'board 3_u1',
        _id: '3_u1',
        userId: 'u1',
        created_at: new Date(),
        creationDate: '01.03.2023',
        description: "Info about board 3_u1",
        numberOfTasks: 1
    };
