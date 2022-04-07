import React, { Component } from 'react';
import { GameList } from './GameList';
import { loadCompany } from './request';

export class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { company: null };
  }

  async componentDidMount() {
    const { companyId } = this.props.match.params;
    const company = await loadCompany(companyId);
    this.setState({ company });
  }

  render() {
    const { company } = this.state;
    return company ? (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h5 className="title is-5">Games at {company.name}</h5>
        <GameList games={company.games} />
      </div>
    ) : null;
  }
}
