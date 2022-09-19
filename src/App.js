import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Showcase from "./components/Showcase";
import Table from "./components/Table";
import Axios from "axios";
import virus from "./assets/virus.png";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      countries: [],
      country: "Worldwide",
      flag: virus,
      baseUrl:"https://disease.sh/v3/covid-19/countries"
    };

    this.selectCountry = this.selectCountry.bind(this);
    this.getdata = this.getdata.bind(this);
    this.getCountriesData = this.getCountriesData.bind(this);
  }

  componentDidMount() {
    this.getdata(this.state.country);
  }

  async selectCountry(Name) {
    if (Name === "Select country here...") {
      this.getWorldData();
    } else {
      const url = `https://disease.sh/v3/covid-19/countries/${Name}`;
      const countryNameRes = await Axios.get(url);
      this.setState({
        confirmed: countryNameRes.data.cases,
        recovered: countryNameRes.data.recovered,
        deaths: countryNameRes.data.deaths,
        country: countryNameRes.data.country,
        flag: countryNameRes.data.countryInfo.flag,
      });
    }
  }

  async getdata(countryName) {
    if (
      countryName === "Select country here..." ||
      countryName === "Worldwide"
    ) {
      this.getWorldData();
    } 
    this.getCountriesData();
  }

  async getCountriesData() {
    const countries = await Axios.get(this.state.baseUrl);
    //console.log(countries);
    this.setState({
      countries: countries.data,
    });
  }

  async getWorldData() {
    const report = await Axios.get("https://disease.sh/v3/covid-19/all");
    this.setState({
      confirmed: report.data.cases,
      recovered: report.data.recovered,
      deaths: report.data.deaths,
      flag: virus,
      country: "Worldwide",
    });
  }


  render() {
    return (
      <div>
        <Navbar countries={this.state.countries} select={this.selectCountry} />
        <Showcase report={this.state} />
        <Table countries={this.state.countries} />
      </div>
    );
  }
}
