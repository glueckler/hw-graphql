import React, { PureComponent } from 'react';

class LyricList extends PureComponent {
  renderLyrics() {
    if (!this.props.lyrics) return null
    return this.props.lyrics.map(({ id, content }) => (<li key={id} className="collection-item">{content}</li>));
  }

  render() {
    return (
      <ul className="collection">{this.renderLyrics()}</ul>
    );
  }
}

export default LyricList;
