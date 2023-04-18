import { Task } from '../models/task';

export const tasksMock: Task[] = [
    {
        name: 'task 1_b1_u1',
        boardId: '1_u1',
        _id: 'task 1_b1_u1',
        created_at: new Date(),
        status: 'todo',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 2_b1_u1',
        boardId: '1_u1',
        _id: 'task 2_b1_u1',
        created_at: new Date(),
        status: 'todo',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 1_b2_u1',
        boardId: '2_u1',
        _id: 'task 1_b2_u1',
        created_at: new Date(),
        status: 'inProgress',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 2_b2_u1',
        boardId: '2_u1',
        _id: 'task 2_b2_u1',
        created_at: new Date(),
        status: 'inProgress',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 1_b1_u2',
        boardId: '1_u2',
        _id: 'task 1_b1_u2',
        created_at: new Date(),
        status: 'done',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 2_b1_u2',
        boardId: '1_u2',
        _id: 'task 2_b1_u2',
        created_at: new Date(),
        status: 'done',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 1_b2_u2',
        boardId: '2_u2',
        _id: 'task 1_b2_u2',
        created_at: new Date(),
        status: 'archived',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 2_b2_u2',
        boardId: '2_u2',
        _id: 'task 2_b2_u2',
        created_at: new Date(),
        status: 'archived',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 1_b1_u3',
        boardId: '1_u3',
        _id: 'task 1_b1_u3',
        created_at: new Date(),
        status: 'todo',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 2_b1_u3',
        boardId: '1_u3',
        _id: 'task 2_b1_u3',
        created_at: new Date(),
        status: 'todo',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 1_b2_u3',
        boardId: '2_u3',
        _id: 'task 1_b2_u3',
        created_at: new Date(),
        status: 'inProgress',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 2_b2_u3',
        boardId: '2_u3',
        _id: 'task 2_b2_u3',
        created_at: new Date(),
        status: 'inProgress',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 1_b1_u4',
        boardId: '1_u4',
        _id: 'task 1_b1_u4',
        created_at: new Date(),
        status: 'done',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 2_b1_u4',
        boardId: '1_u4',
        _id: 'task 2_b1_u4',
        created_at: new Date(),
        status: 'done',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 1_b2_u4',
        boardId: '2_u4',
        _id: 'task 1_b2_u4',
        created_at: new Date(),
        status: 'archived',
        comments: [
            'comment 1',
            'comment 2'
        ]
    },

    {
        name: 'task 2_b2_u4',
        boardId: '2_u4',
        _id: 'task 2_b2_u4',
        created_at: new Date(),
        status: 'archived',
        comments: [
            'comment 1',
            'comment 2'
        ]
    }
];

export const newTaskMock: Task = {
    name: 'task 3_b1_u1',
    boardId: '1_u1',
    _id: 'task 3_b1_u1',
    created_at: new Date(),
    status: 'todo',
    comments: [
        'comment 1',
        'comment 2'
    ]
}
