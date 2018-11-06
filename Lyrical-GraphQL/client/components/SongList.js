import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends PureComponent {
  renderSongs() {
    if (!this.props.data.songs) {
      return <div>Loading...</div>;
    }
    return this.props.data.songs.map(song => (<li key={song.id}>{song.title}</li>));
  }

  render() {
    return (
      <ul>{this.renderSongs()}</ul>
    );
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
