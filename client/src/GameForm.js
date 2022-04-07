import React, { Component } from 'react';
import { createGame } from './request';

export class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    event.preventDefault();
    const { name, description } = this.state;

    createGame({ name, description }).then((game) => {
      this.props.history.push(`/games/${game.id}`);
    });
  }

  render() {
    const { name, description } = this.state;
    return (
      <div>
        <h1 className="title">New Game</h1>
        <div className="box">
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" name="name" value={name}
                  onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea className="input" style={{ height: '10em' }}
                  name="description" value={description} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link" onClick={this.handleClick.bind(this)}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
