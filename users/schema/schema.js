// all knowledge for graphql to know our database
const graphql = require('graphql')
const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql

// remember that order of declaration is important
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  // use arrow function to prevent circular reference to "UserType"
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(r => r.data)
      },
    },
  }),
})

const UserType = new GraphQLObjectType({
  // name: also a string that defines the type we're describing
  // capitalized by convention
  name: 'User',
  // fields: tells gql about the properties of the type
  fields: () => ({
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
  }),
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
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(res => res.data)
      },
    },
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      // type of data we will eventually return from resolve()
      // may not always be the same as type we're adding
      // although it usually is..
      type: UserType,
      // data we pass into the resolve()
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, age }) {
        return axios
          .post(`http://localhost:3000/users`, { firstName, age })
          .then(r => r.data)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  mutation,
  query: RootQuery,
})
