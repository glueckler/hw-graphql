import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import { fetchSongs as query } from '../queries';

class SongCreate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        title: this.state.title,
      },
      refetchQueries: [{ query }],
    }).then(() => {
      hashHistory.push('/');
    });
  }

  render() {
    return (
      <div>
        <div>Create a New Song</div>
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            onChange={(e) => {
              this.setState({ title: e.target.value });
            }}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong ($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
