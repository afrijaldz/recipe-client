import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    /** API FROM recipe-api repository */

    fetch('http://localhost:3000')
      .then(data => {
        return data.json()
      })
      .then(data => {
        this.setState({ data: data.data })
        console.log(this.state)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map((data, i) => (
            <li key={i}>{i+1} {data.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
