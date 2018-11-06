import React, { PureComponent } from 'react';

class SongCreate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    return (
      <div>
        <div>Create a New Song</div>
        <form>
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

export default SongCreate;
