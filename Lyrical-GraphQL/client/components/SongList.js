import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { fetchSongs as query, deleteSong as mutation } from '../queries';

class SongList extends PureComponent {
  handleDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => {
        // this is a great way to refetch data associated with this component
        this.props.data.refetch();
      });
  }

  renderSongs() {
    if (!this.props.data.songs) {
      return <div>Loading...</div>;
    }

    return this.props.data.songs.map(song => (
      <li key={song.id}>
        <i
          className="material-icons"
          onClick={() => {
            this.handleDelete(song.id);
          }}
        >
          delete
        </i>
        <span>{song.title}</span>
      </li>
    ));
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

export default graphql(mutation)(graphql(query)(SongList));
