import gql from 'graphql-tag';

export const fetchSongs = gql`
  {
    songs {
      id 
      title
    }
  }
`;

export const deleteSong = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`
