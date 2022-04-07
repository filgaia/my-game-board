import React, { Component } from 'react';
import { GameList } from './GameList';
import { loadGames } from './request';

export class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }

  async componentDidMount() {
    const games = await loadGames();
    this.setState({ games });
  }

  render() {
    const { games } = this.state;

    return (
      <div>
        <h1 className="title">Games Board</h1>
        <GameList games={games} />
      </div>
    );
  }
}
