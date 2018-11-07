const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // root query must have at least one field
    dummyField: { type: GraphQLID }
  }
});

module.exports = RootQueryType;
