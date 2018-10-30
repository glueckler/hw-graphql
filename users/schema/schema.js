// all knowledge for graphql to know our database
const graphql = require('graphql')
const axios = require('axios')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

// remember that order of declaration is important
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
})

const UserType = new GraphQLObjectType({
  // name: also a string that defines the type we're describing
  // capitalized by convention
  name: 'User',
  // fields: tells gql about the properties of the type
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      // company will resolve to companyId in our example
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data)
      },
    },
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
        // you can return a Promise to gql, but make sure to just return the "data"
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
