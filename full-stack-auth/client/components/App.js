import React, { PureComponent } from 'react'
import Header from './Header'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
