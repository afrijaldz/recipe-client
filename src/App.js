import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      form: {
        name: '',
      }
    }

    this.submit = this.submit.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.getData = this.getData.bind(this)
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

  handleForm(e) {
    const form = {...this.state.form}
    form.name = e.target.value
    this.setState({ form })
  }

  submit(e) {
    e.preventDefault()
    axios.post('http://localhost:3000', this.state.form).then(data => {
      this.getData()
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input name={this.state.form.name} onChange={this.handleForm} value={this.state.form.name} placeholder="Input the name" />
          <button>Add the recipe </button>
        </form>
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
