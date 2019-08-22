const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require("./utils")

const QuakeAPI = require('./datasources/quake');
const UserAPI = require("./datasources/user")

const store = createStore()


const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        quakeAPI: new QuakeAPI(),
        userAPI: new UserAPI({ store })
    }) 

});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});