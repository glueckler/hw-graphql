import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends PureComponent {
  renderSongs() {
    if (!this.props.data.songs) {
      return <div>Loading...</div>;
    }
    return this.props.data.songs.map(song => (<li key={song.id}>{song.title}</li>));
  }

  render() {
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">ADD</Link>
      </div>
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
