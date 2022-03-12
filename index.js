const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';

const typeDefs = gql`
    type Todo {
        userId: Int
        id: Int
        title: String
        completed: Boolean
    }
    
    type Query {
        todos(limit: Int! = 5, start: Int! = 0): [Todo]
        todo(id: String): Todo
    }
`;

const loadData = (url) => {
    return fetch(url)
        .then((res) => res.json());
}

const resolvers = {
    Query: {
        todos: (obj, { start, limit }) => {
            const url = new URL(todosUrl);
            url.searchParams.append('_start', start);
            url.searchParams.append('_limit', limit);
            loadData(url).then((result) => result)
        },
        todo: (obj, { id }) => loadData(`${todosUrl}/${id}`)
            .then((result) => result),
    },
}

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(({ url }) => {
    console.log('___', `Server ready at ${url}`);
});