// all knowledge for graphql to know our database
const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

const UserType = new GraphQLObjectType({
  // name: also a string that defines the type we're describing
  // capitalized by convention
  name: 'User',
  // fields: tells gql about the properties of the type
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
})

// a root query tells graphql specifically where to begin it's query
// in this case we begin by querying for a user node
// if we give gql the id of the user (args), gql will return a user type (type)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // hardcode users for now
        const users = [
          { id: '23', firstName: 'Dean' },
          { id: '22', firstName: 'Joel' },
        ]
        return _.find(users, { id: args.id })
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})