import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit() {
    const { id } = this.props;
    this.props.mutate({ variables: { songId: id, content: this.state.value } });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add a Lyric</label>
        <input value={this.state.value} onChange={this.handleInput} />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyric($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
