import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import { getAccessToken, isLoggedIn } from './auth';

const endpointURL = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
    if (isLoggedIn()) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${getAccessToken()}`
            }
        });
    }

    return forward(operation);
});

const client = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({ uri: endpointURL })
    ]),
    cache: new InMemoryCache()
});

const gameDetailFragment = gql`
  fragment GameDetail on Game {
	id
    name
    company {
        id
        name
    }
    description
  }
`;

const createGameMutation = gql`
    mutation CreateGame($input: CreateGameInput) {
        game: createGame(input: $input) {
            ...GameDetail
        }
    }
    ${gameDetailFragment}
`;

const companyQuery = gql`
    query CompanyQuery($id: ID!) {
        company(id: $id) {
            id
            name
            description
            games {
                id
                name
            }
        }
    }`;

const gameQuery = gql`
    query GameQuery($id: ID!) {
        game(id: $id) {
            ...GameDetail
        }
    }
    ${gameDetailFragment}
`;

const gamesQuery = gql`
    query GamesQuery {
        games {
            id,
            name,
            company {
                id,
                name,
            }
        }
    }`;

export async function createGame(input) {
    const { data: { game } } = await client.mutate({
        mutation: createGameMutation,
        variables: { input },
        update: (cache, { data }) => {
            cache.writeQuery({
                query: gameQuery,
                variables: { id: data.game.id },
                data
            });
        }
    });
    return game;
}

export async function loadCompany(id) {
    const { data: { company } } = await client.query({ query: companyQuery, variables: { id }, fetchPolicy: 'no-cache' });
    return company;
}

export async function loadGame(id) {
    const { data: { game } } = await client.query({ query: gameQuery, variables: { id } });
    return game;
}

export async function loadGames() {
    const { data: { games } } = await client.query({ query: gamesQuery, fetchPolicy: 'no-cache' });
    return games;
}