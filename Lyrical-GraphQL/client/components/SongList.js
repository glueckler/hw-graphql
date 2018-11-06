import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { fetchSongs as query } from '../queries';

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

export default graphql(query)(SongList);
