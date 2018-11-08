import gql from 'graphql-tag';

// making things tricky with $e and $p as variables
export default gql`
  mutation Login($e: String, $p: String) {
    login(email: $e, password: $p) {
      id
    }
  }
`;
