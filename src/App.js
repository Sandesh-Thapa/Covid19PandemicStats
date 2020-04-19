import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Showcase from "./components/Showcase";
import Table from "./components/Table";
import Axios from "axios";
import virus from "./assets/virus.png";

export default class App extends Component {
  // state = {
  //   confirmed: 0,
  //   recovered: 0,
  //   deaths: 0,
  //   countries: [],
  //   country: "Worldwide",
  //   flag: virus,
  // };

  constructor(props) {
    super(props);
    this.state = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      countries: [],
      country: "Worldwide",
      flag: virus,
    };

    this.selectCountry = this.selectCountry.bind(this);
    this.getdata = this.getdata.bind(this);
    this.getCountriesData = this.getCountriesData.bind(this);
  }

  componentDidMount() {
    this.getdata(this.state.country);
  }

  async selectCountry(Name) {
    //console.log(Name);
    if (Name === "Select country here...") {
      this.getWorldData();
    } else {
      const url = `https://corona.lmao.ninja/v2/countries/${Name}`;
      const countryNameRes = await Axios.get(url);
      //console.log(countryNameRes);
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
    //return countryName;
    if (
      countryName === "Select country here..." ||
      countryName === "Worldwide"
    ) {
      this.getWorldData();
    } //else {
    // const url = `https://corona.lmao.ninja/countries/${countryName}`;
    // const countryNameRes = await Axios.get(url);
    // this.setState({
    //   confirmed: countryNameRes.data.cases,
    //   recovered: countryNameRes.data.recovered,
    //   deaths: countryNameRes.data.deaths,
    // });
    //}
    this.getCountriesData();
  }

  async getCountriesData() {
    const countries = await Axios.get("https://corona.lmao.ninja/v2/countries");
    //console.log(countries);
    this.setState({
      countries: countries.data,
    });
  }

  async getWorldData() {
    const report = await Axios.get("https://corona.lmao.ninja/v2/all");
    this.setState({
      confirmed: report.data.cases,
      recovered: report.data.recovered,
      deaths: report.data.deaths,
      flag: virus,
      country: "Worldwide",
    });
  }
  // async getdata() {
  //   // const selectCountry = this.selectCountry();
  //   // if (!selectCountry) {
  //   const report = await Axios.get("https://corona.lmao.ninja/all");
  //   const countries = await Axios.get("https://corona.lmao.ninja/countries");
  //   //console.log(countries);
  //   this.setState({
  //     confirmed: report.data.cases,
  //     recovered: report.data.recovered,
  //     deaths: report.data.deaths,
  //     countries: countries.data,
  //   });
  //   //} else {
  //   // const url = `https://corona.lmao.ninja/countries/${selectCountry}`;
  //   // const countryName = await Axios.get(url);
  //   // this.setState({
  //   //   confirmed: countryName.data.cases,
  //   //   recovered: countryName.data.recovered,
  //   //   deaths: countryName.data.deaths,
  //   // });
  //   //}
  // }

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
