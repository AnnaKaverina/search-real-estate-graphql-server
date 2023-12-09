// const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
import { ApolloServer, gql } from 'apollo-server';
// import fetch from 'node-fetch';
import stubData from './stub/realEstateObjects.js'

const typeDefs = gql`
    type House {
        id: ID!
        square: Int
    }

    type LandPlot {
        id: ID!
        square: Int
    }

    type RealEstateObject {
        id: ID!
        type: String!
        cost: Int
        landPlot: LandPlot!
        house: House
    }

    input Filter {
        minLandPlotSquare: Int
        maxLandPlotSquare: Int
        minHouseSquare: Int
        maxHouseSquare: Int
        minCost: Int
        maxCost: Int
    }

    type Query {
        realEstateObject(filter: Filter): [RealEstateObject]!
        realEstateObjects(limit: Int! = 5, start: Int! = 0): [RealEstateObject]!
    }
`;

// const loadData = (url) => fetch(url).then((res) => res.json());


const resolvers = {
    Query: {
        // todos: (obj, { start, limit }) => {
        //     const url = new URL(todosUrl);
        //     url.searchParams.append('_start', start);
        //     url.searchParams.append('_limit', limit);
        //     return loadData(url).then((result) => result);
        // },
        // todo: (obj, { id }) => loadData(`${todosUrl}/${id}`)
        //     .then((result) => result),
        realEstateObjects: (props) => {
            console.log('___', props);
        }
    },
}

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(({ url }) => {
    console.log('___', `Server ready at ${url}`);
});