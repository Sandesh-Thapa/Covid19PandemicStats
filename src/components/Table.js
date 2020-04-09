import React, { Component } from "react";

export default class Table extends Component {
  renderCountryTable() {
    return this.props.countries.map((country, i) => {
      return (
        <tr key={i}>
          <td>
            <img src={country.countryInfo.flag} alt="Country-Flag" />
          </td>
          <td>{country.country}</td>
          <td>{country.tests}</td>
          <td>{country.cases}</td>
          <td>{country.recovered}</td>
          <td>{country.deaths}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Country</th>
                <th>Total Cases</th>
                <th>Total Confirmed</th>
                <th>Total Recovered</th>
                <th>Total Deaths</th>
              </tr>
            </thead>
            <tbody>{this.renderCountryTable()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
