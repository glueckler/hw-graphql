import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends PureComponent {
  handleLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    if (!this.props.lyrics) return null;
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
        <i
          className="material-icons"
          onClick={() => {
            this.handleLike(id, likes);
          }}
        >
          thumb_up
        </i>
        {content}
        <div>
          likes:
          {' '}
          {likes}
        </div>
      </li>
    ));
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
