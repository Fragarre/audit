require("graphql-import-node");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = mergeTypeDefs(loadFilesSync(`${__dirname}/**/*.graphql`));
const resolvers = require("../resolvers/resolversMaps");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
