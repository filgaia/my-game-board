import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class GameList extends Component {
  render() {
    const { games } = this.props;
    return (
      <ul className="box">
        {games.map(this.renderGame.bind(this))}
      </ul>
    );
  }

  renderGame(game) {
    const name = game.company ? `${game.name} at ${game.company.name}` : game.name;
    return (
      <li className="media" key={game.id}>
        <div className="media-content">
          <Link to={`/games/${game.id}`}>{name}</Link>
        </div>
      </li>
    );
  }
}
