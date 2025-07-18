const request = require('supertest');
const app = require('../app');
const Bug = require('../models/Bug');

describe('Bug API', () => {
    beforeEach(async () => {
        await Bug.deleteMany({});
    });

    it('should create a new bug', async () => {
        const res = await request(app)
            .post('/api/bugs')
            .send({
                title: 'Test Bug',
                description: 'This is a test bug',
                priority: 'medium'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe('Test Bug');
    });

    it('should get all bugs', async () => {
        await Bug.create([
            { title: 'Bug 1', description: 'Desc 1' },
            { title: 'Bug 2', description: 'Desc 2' }
        ]);

        const res = await request(app).get('/api/bugs');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(2);
    });
});