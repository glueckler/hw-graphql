import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { fetchSongs as query, deleteSong as mutation } from '../queries';

class SongList extends PureComponent {
  handleDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => {
        // this is a great way to refetch data associated with this component
        // reminder this does submit another request, which may be avoided using dataIdFromObject
        this.props.data.refetch();
      });
  }

  renderSongs() {
    if (!this.props.data.songs) {
      return <div>Loading...</div>;
    }

    return this.props.data.songs.map(song => (
      <li key={song.id}>
        <Link to={`songs/${song.id}`}>
          <i
            className="material-icons"
            onClick={() => {
              this.handleDelete(song.id);
            }}
          >
          delete
          </i>
          <span>{song.title}</span>
        </Link>
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
