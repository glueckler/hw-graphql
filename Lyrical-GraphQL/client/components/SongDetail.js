import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { fetchSongById } from '../queries';

class SongDetail extends PureComponent {
  render() {
    const { song } = this.props.data;
    if (!song) return <div>Loading...</div>;

    return (
      <div>
        <Link to="/">Home</Link>
        <h3>{song.title}</h3>
      </div>
    );
  }
}

export default graphql(fetchSongById, {
  options(props) {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
