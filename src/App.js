import React from "react";
import "./App.css";
import logo from "./fsulogo.png";
import Main from "./components/Main";
import Information from "./components/Information";

/**
 * App
 * a program starts its execution
 */
class App extends React.Component {
  /**
   * main prop
   * visible, year, country, countryState, city
   * visible: showing main page or information page
   */
  state = {
    visible: true,
    year: "",
    country: "",
    countryState: "",
    city: ""
  };

  // setting
  handler = (val, valYear, valCountry, valCountryState, valCity) => {
    this.setState({
      visible: val,
      year: valYear,
      country: valCountry,
      countryState: valCountryState,
      city: valCity
    });
  };


  render() {
    return (
      <div className="App" style={{ height: "100vh", width: "100%" }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        {this.state.visible ? (
          // main page
          <div>
            <Main handler={this.handler} />
          </div>
        ) : (
          // detail
          <Information
            handler={this.handler}
            year={this.state.year}
            country={this.state.country}
            countryState={this.state.countryState}
            city={this.state.city}
          />
        )}
      </div>
    );
  }
}

export default App;
