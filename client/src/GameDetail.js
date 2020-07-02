import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadGame } from './request';

export class GameDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { game: null };
  }

  async componentDidMount() {
    const { gameId } = this.props.match.params;
    const game = await loadGame(gameId);
    this.setState({ game });
  }

  render() {
    const { game } = this.state;

    return game ? (
      <div>
        <h1 className="title">{game.name}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${game.company.id}`}>{game.company.name}</Link>
        </h2>
        <div className="box">{game.description}</div>
      </div>
    ) : null;
  }
}
