const db = require('./db');

const Query = {
    company: (root, { id }) => db.companies.get(id),
    game: (root, { id }) => db.games.get(id),
    games: () => db.games.list()
};

const Mutation = {
    createGame: (root, { input }, { user }) => {
        if (!user) {
            throw new Error('Unauthorized');
        }

        const id = db.games.create({ ...input, companyId: user.companyId });
        return db.games.get(id);
    }
};

const Company = {
    games: (company) => db.games.list()
        .filter(game => game.companyId === company.id)
}

const Game = {
    company: (game) => db.companies.get(game.companyId)
}

module.exports = { Query, Mutation, Company, Game };