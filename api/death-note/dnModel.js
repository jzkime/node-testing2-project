const db = require('../../data/db-config')

module.exports = {
    getAll() {
        return db('death-note');
    },
    getBy(filter) {
        return db('death-note')
            .where(filter)
            .first();
    },
    async create(char) {
        const [id] = await db('death-note')
            .insert(char);
        return this.getBy({id});
    },
    async update(id, changes) {
        await db('death-note')
            .where({id})
            .update(changes)
        return this.getBy({id})
    },
    async remove(id) {
        const char = await this.getBy({id});
        await db('death-note')
            .delete()
            .where({id});
        return char;
    }
}