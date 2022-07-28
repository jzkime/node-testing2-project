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

const server = require('../server')

describe("Death Note Endpoints", () => {

})