import React, { Component } from "react";

export default class Navbar extends Component {
  sortedCountries = () => {
    return this.props.countries.sort(function (a, b) {
      if (a.country.toLowerCase() < b.country.toLowerCase()) return -1;
      if (a.country.toLowerCase() < b.country.toLowerCase()) return 1;
      return 0;
    });
  };

  renderCountry = () => {
    //let sortedCountries = this.props.countries.sort();
    return this.sortedCountries().map((country, i) => {
      return <option key={i}>{country.country}</option>;
    });
  };

  handleChange = (e) => {
    this.props.select(e.target.value);
  };

  render() {
    //console.log(this.props.countries);
    return (
      <div className="nav">
        <div className="container">
          <h1>COVID-19</h1>
          <div className="select">
            <select className="select" onChange={this.handleChange}>
              <option>Select country here...</option>
              {this.renderCountry()}
            </select>
          </div>
          <div className="live-map">
            <a
              href="https://www.google.com/covid19-map/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Live Map
            </a>
          </div>
        </div>
      </div>
    );
  }
}
