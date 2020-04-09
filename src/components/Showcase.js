import React, { Component } from "react";

export default class Showcase extends Component {
  render() {
    return (
      <div className="showcase">
        <div className="overlay"></div>
        <div className="main">
          <h4>Covid-19 Live Stats</h4>
          <div className="card-holder">
            <div className="card image">
              <img
                style={{ width: "150px" }}
                src={this.props.report.flag}
                alt="state"
              />
              <p style={{ color: "#b7ffaa" }}>{this.props.report.country}</p>
            </div>
            <div style={{ color: "#f9fb48" }} className="card">
              <h5>Confirmed:</h5>
              <p>{this.props.report.confirmed}</p>
            </div>
            <div style={{ color: "#78fd78" }} className="card">
              <h5>Recovered:</h5>
              <p>{this.props.report.recovered}</p>
            </div>
            <div style={{ color: "#fd5050" }} className="card">
              <h5>Deaths:</h5>
              <p>{this.props.report.deaths}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
