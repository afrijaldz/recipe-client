import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getData()
  }
  
  getData() {
    /** API FROM recipe-api repository */
    fetch('http://localhost:3000')
      .then(data => {
        if (data) return data.json()
      })
      .then(data => {
        this.setState({ data: data.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  delete(data) {
    const verify = window.confirm(`Do you really want to delete ${data.name}?`)
    if (verify) {
      fetch(`http://localhost:3000/${data.id}`, {
        method: 'delete',
      }).then(() => {
        this.getData()
      }).catch(error => {
        console.log(error)
      });
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map((data, i) => (
            <li key={i}>
              {i+1} {data.name} <button onClick={() => this.delete(data)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
