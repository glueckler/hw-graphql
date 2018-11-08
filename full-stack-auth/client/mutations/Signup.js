import gql from 'graphql-tag';

export default gql`
  mutation Signup($e: String, $p: String) {
    signup(email: $e, password: $p) {
      id
    }
  }
`;
