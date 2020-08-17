import React from "react";
import MapCom from "./MapCom";
import {
  Button,
  Alert,
  Badge,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  Label,
  UncontrolledCollapse,
  CardBody,
  Card
} from "reactstrap";

export default class Main extends React.Component {
  _isMounted = false;

  state = {
    year: "2020",
    country: "",
    countries: [],
    countryState: "",
    countryStates: [],
    city: "",
    cities: [],
    errorMessage: ""
  };

  async componentDidMount() {
    this._isMounted = true;

    const url =
      // "https://cors-anywhere.herokuapp.com/http://www.worldholidaysandevents.com/HolidaysRESTJSON/webresources/holidaysandevents/countries";
      "https://cors-anywhere.herokuapp.com/http://54.241.167.36/HolidaysRESTJSON/webresources/holidaysandevents/countries";
    const response = await fetch(url);
    const data = await response.json();
    if (this._isMounted) {
      this.setState({ countries: data.theList });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getCountryStateList() {
    const url =
      // "https://cors-anywhere.herokuapp.com/http://www.worldholidaysandevents.com/HolidaysRESTJSON/webresources/holidaysandevents/countryStates/" +
      "https://cors-anywhere.herokuapp.com/http://54.241.167.36/HolidaysRESTJSON/webresources/holidaysandevents/countryStates/" +
      this.state.country;
    const response = await fetch(url);
    const data = await response.json();
    if (this._isMounted) {
      this.setState({ countryStates: data.theList }, () => {
        if (!this.state.countryState) {
          this.getCountryCityList();
        } else {
          this.getCountryStateCityList();
        }
      });
    }
  }

  async getCountryCityList() {
    const url =
      // "https://cors-anywhere.herokuapp.com/http://www.worldholidaysandevents.com/HolidaysRESTJSON/webresources/holidaysandevents/countryCities/" +
      "https://cors-anywhere.herokuapp.com/http://54.241.167.36/HolidaysRESTJSON/webresources/holidaysandevents/countryCities/" +
      this.state.country;
    const response = await fetch(url);
    const data = await response.json();
    if (this._isMounted) {
      this.setState({ cities: data.theList });
    }
  }

  async getCountryStateCityList() {
    if (this.state.countryState) {
      const url =
        // "https://cors-anywhere.herokuapp.com/http://www.worldholidaysandevents.com/HolidaysRESTJSON/webresources/holidaysandevents/countryStateCities/" +
        "https://cors-anywhere.herokuapp.com/http://54.241.167.36/HolidaysRESTJSON/webresources/holidaysandevents/countryStateCities/" +
        this.state.country +
        "/" +
        this.state.countryState;
      const response = await fetch(url);
      const data = await response.json();
      if (this._isMounted) {
        this.setState({ cities: data.theList });
      }
    }
  }

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";

    this.setState(
      {
        [event.target.name]: isCheckbox
          ? event.target.checked
          : event.target.value
      },
      () => {
        this.getCountryStateList();
      }
    );
  };

  validate = () => {
    let errorMessage = "";

    if (!document.getElementById("country").value) {
      errorMessage = "Country should not be empty.";
    }
    if (errorMessage) {
      this.setState({
        errorMessage
      });
      return false;
    } else return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.props.handler(
        false,
        this.state.year,
        this.state.country,
        document.getElementById("countryState").value ===
          this.state.countryState
          ? this.state.countryState
          : "",
        this.state.city
      );
    }
  };

  clickEvent = r => {
    document.getElementById("country").value = r.properties.address.country
      ? r.properties.address.country
      : "";
    this.setState(
      {
        country: r.properties.address.country
      },
      () => {
        this.getCountryStateList();
        if (r.properties.address.country === "China") {
          document.getElementById("countryState").value = r.properties.address
            .city
            ? r.properties.address.city
            : "";
        } else {
          document.getElementById("countryState").value = r.properties.address
            .state
            ? r.properties.address.state
            : "";
        }

        this.setState(
          {
            countryState:
              r.properties.address.country === "China"
                ? r.properties.address.city
                : r.properties.address.state
          },
          () => {
            this.getCountryStateCityList();

            if (r.properties.address.city) {
              this.setState(
                {
                  city:
                    r.properties.address.country === "China"
                      ? ""
                      : r.properties.address.city
                },
                () => {
                  document.getElementById("city").value =
                    r.properties.address.city;
                }
              );
            }
          }
        );
      }
    );
  };

  render() {
    return (
      <div>
        <h2>
          <Badge color="danger" pill>
            World Holidays and Events
          </Badge>
        </h2>

        <Form onSubmit={this.handleSubmit}>
          <div>
            <Button
              outline
              color="info"
              id="toggler"
              style={{ marginBottom: "1rem" }}
            >
              General information. Please read.
            </Button>
            <UncontrolledCollapse toggler="#toggler">
              <Card>
                <CardBody>
                  <p>
                    <b>
                      <font color="blue">Hello! </font>
                    </b>
                    This website is a work in progress. You are welcome to use
                    it free of charge until we consider it ready for commercial
                    consumption. In the meantime, please do not be dismayed or
                    surprised if it occasionally becomes inaccessible, crashes,
                    or otherwise misbehaves. Comments and suggestions are
                    appreciated at
                    <font color="green">
                      {" "}
                      info@worldholidaysandevents.com.
                    </font>{" "}
                    The functionality of this website is available as a web
                    service.
                  </p>
                  <p>
                    Select a <font color="purple">locale </font> and a
                    <font color="purple"> time period</font> and obtain a list
                    of holidays that will occur in that locale during that
                    period.
                  </p>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>

          <Alert color="primary">
            How to get the holidays and events for a particular city ? 1. Select
            the drop-down list. 2. Click any place on map.
          </Alert>
          <FormGroup>
            <center>
              <Col xs={10} sm={2} md={2} lg={1}>
                <Label for="Year">Year</Label>
                <Input
                  type="number"
                  name="year"
                  value={this.state.year}
                  onChange={this.handleChange}
                  placeholder="Year"
                />
              </Col>
            </center>
          </FormGroup>
          <FormGroup>
            <center>
              <Row>
                <Col
                  sm={5}
                  md={{ span: 3, offset: 1 }}
                  lg={{ span: 3, offset: 3 }}
                  xl={2}
                >
                  <Label for="Country">Country</Label>
                  <Input
                    id="country"
                    type="select"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleChange}
                  >
                    <option value="">Select</option>
                    {this.state.countries.map(countries => (
                      <option key={countries} value={countries}>
                        {countries}
                      </option>
                    ))}
                  </Input>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.errorMessage}
                  </div>
                </Col>
                <Col sm={3} md={3} lg={3} xl={2}>
                  <Label for="State/Province">State/Province</Label>
                  <Input
                    id="countryState"
                    type="select"
                    name="countryState"
                    value={this.state.countryState}
                    onChange={this.handleChange}
                  >
                    <option value="">Select</option>
                    {this.state.countryStates.map(countryStates => (
                      <option key={countryStates} value={countryStates}>
                        {countryStates}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col sm={3} md={3} lg={2} xl={2}>
                  <Label for="City">City</Label>
                  <Input
                    id="city"
                    type="select"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                  >
                    <option value="">Select</option>
                    {this.state.cities.map(cities => (
                      <option key={cities} value={cities}>
                        {cities}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
            </center>
          </FormGroup>

          <FormGroup>
            <Button color="secondary" type="submit">
              Get Holiday List!
            </Button>
          </FormGroup>
        </Form>

        <MapCom mapFun={this.clickEvent} />
      </div>
    );
  }
}
