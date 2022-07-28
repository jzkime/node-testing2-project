const db = require('../../data/db-config')
const dnMod = require('./dnModel');

test('sanity test', () => {
    expect(true).toBe(true);
});

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db.seed.run();
})

afterAll(async () => {
    await db.destroy('death-note')
})

const expected = [
    {id: 1, name: 'Light', description: 'has deathnote'},
    {id: 2, name: 'Ryuk', description: 'shinigami'},
    {id: 3, name: 'L', description: 'human'}
]

const newChar = {name: 'Misa'}
const newDefault = {id: 4, description: 'n/a'}
const invalidChar = {message: 'no such character!'}

describe("Death Note Model", () => {
    test("getAll()", async () => {
        let result = await dnMod.getAll();
        expect(result).toHaveLength(3);
        expect(result).toEqual(expected);
        expect(result[2]).toEqual(expected[2]);
    })

    test("getBy(filter)", async () => {
        let result = await dnMod.getBy({name: "Light"});
        expect(result).toEqual(expected[0]);
        result = await dnMod.getBy({id: 2});
        expect(result).toEqual(expected[1]);
        result = await dnMod.getBy({id: 99});
        expect(result).not.toBeDefined();
    })
    test("create(char)", async () => {
        let result = await dnMod.create(newChar);
        expect(result).toEqual({...newChar, ...newDefault});
        result = await dnMod.getAll();
        expect(result).toHaveLength(4);
    })
    test("update()", async () => {
        let result = await dnMod.update(3, {description: 'best detective'});
        expect(result).toEqual({...expected[2], description: 'best detective'});
        result = await dnMod.getAll();
        expect(result).toHaveLength(3);
        result = await dnMod.update(99, {name: 'Eren Yaeger'});
        expect(result).not.toBeDefined();
    })
    test("remove()", async () => {
        let result = await dnMod.remove(3);
        expect(result).toEqual(expected[2]);
        result = await dnMod.getAll();
        expect(result).toHaveLength(2);
        result = await dnMod.remove(3);
        expect(result).not.toBeDefined();
        result = await dnMod.remove(99);
        expect(result).not.toBeDefined();
    })
})

const request = require('supertest');
const server = require('../server');

describe("Death Note Endpoints", () => {
    test("[GET] /death-note", async () => {
        let result = await request(server).get('/death-note');
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(expected);
        expect(result.body).toHaveLength(3);
    });
    test("[GET] /death-note/:id", async () => {
        let result = await request(server).get('/death-note/1');
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(expected[0]);
        result = await request(server).get('/death-note/99');
        expect(result.statusCode).toBe(404);
        expect(result.body).toEqual(invalidChar)
    });
    test("[POST] /death-note", async () => {
        let result = await request(server).post('/death-note').send(newChar);
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual({...newChar, ...newDefault});
        result = await request(server).get('/death-note');
        expect(result.body).toHaveLength(4);
    });
    test("[PUT] /death-note/:id", async () => {
        let result = await request(server).put('/death-note/3').send({description: 'best detective'});
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual({...expected[2], description: 'best detective'});
        result = await request(server).put('/death-note/99').send({name: 'Eren Yaeger'});
        expect(result.statusCode).toBe(404);
        expect(result.body).toEqual(invalidChar);
    });
    test("[DELETE] /death-note", async () => {
        let result = await request(server).delete('/death-note/3');
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(expected[2]);
        result = await dnMod.getAll();
        expect(result).toHaveLength(2);
        result = await request(server).delete('/death-note/3');
        expect(result.statusCode).toBe(404);
        expect(result.body).toEqual(invalidChar)
        result = await request(server).delete('/death-note/99');
        expect(result.statusCode).toBe(404);
        expect(result.body).toEqual(invalidChar)
    });
})