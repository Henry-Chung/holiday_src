import React from "react";
import Notes from "./Notes";
import { Table, Button, FormGroup } from "reactstrap";

export default class Information extends React.Component {
  _isMounted = false;

  state = {
    listOfData: [],
    isOpen: false,
    businessesClosed: null,
    banksClosed: null,
    religiousHoliday: null,
    religion: null,
    dis: null,
    holidayNote: null
  };

  async componentDidMount() {
    this._isMounted = true;

    const url =
      // "https://cors-anywhere.herokuapp.com/http://www.worldholidaysandevents.com/HolidaysRESTJSON/webresources/holidaysandevents/holidaysAndEvents/" +
      "https://cors-anywhere.herokuapp.com/http://54.241.167.36/HolidaysRESTJSON/webresources/holidaysandevents/holidaysAndEvents/" +
      this.props.country +
      (this.props.countryState === ""
        ? "/none"
        : "/" + this.props.countryState) +
      (this.props.city === "" ? "/none/" : "/" + this.props.city + "/") +
      this.props.year +
      "/1/1/" +
      this.props.year +
      "/12/31";

    const response = await fetch(url);

    const data = await response.json();

    if (this._isMounted) {
      this.setState({ listOfData: data.theList });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = event => {
    this.props.handler(true);
  };

  handleClickNotes = item => {
    this.setState({
      isOpen: true,
      businessesClosed: item.businessesClosed,
      banksClosed: item.banksClosed,
      religiousHoliday: item.religiousHoliday,
      religion: item.religion,
      dis: item.dis,
      holidayNote: item.holidayNote
    });
  };

  render() {
    return (
      <div>
        <style>
          {
            "Table, th, td{ border: 3px groove;  margin-left: auto;margin-right: auto; padding: 5px;}"
          }
        </style>
        <h2>Holiday and Event List</h2>
        <h4>
          {this.props.country}
          {this.props.countryState === ""
            ? " "
            : ", " + this.props.countryState}
          {this.props.city === "" ? " " : ", " + this.props.city}
        </h4>

        <center>
          <Table responsive striped>
            <tbody>
              <tr>
                <th>
                  <font color="blue">Start Date</font>
                </th>
                <th>
                  <font color="blue">End Date</font>
                </th>
                <th>
                  <font color="blue">Name</font>
                </th>
                <th>
                  <font color="blue">Info</font>
                </th>
              </tr>
              {this.state.listOfData.map((holiday, i) => (
                <tr key={`holiday-${i}`}>
                  <td value={holiday.startDate}>{holiday.startDate}</td>
                  <td
                    value={
                      holiday.endDate === undefined ? " " : holiday.endDate
                    }
                  >
                    {holiday.endDate === undefined ? " " : holiday.endDate}
                  </td>
                  <td value={holiday.name}>{holiday.name}</td>
                  <td>
                    <button
                      value={i}
                      onClick={this.handleClickNotes.bind(this, holiday)}
                    >
                      Notes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <FormGroup>
            <div>
              <Button
                color="secondary"
                onClick={this.handleSubmit}
                type="submit"
              >
                Back to previous page
              </Button>
            </div>
          </FormGroup>
        </center>
        <Notes
          isOpen={this.state.isOpen}
          onClose={e => {
            this.setState({ isOpen: false });
          }}
        >
          <div>
            Businesses Closed:
            <font color="blue"> {this.state.businessesClosed}</font>
          </div>
          <div>
            Banks Closed:<font color="blue"> {this.state.banksClosed}</font>
          </div>
          <div>
            Religious Holiday:
            <font color="blue"> {this.state.religiousHoliday}</font>
          </div>
          <div>
            Religion:<font color="blue"> {this.state.religion}</font>
          </div>
          <div>
            Disrespectful to Hold an Event:
            <font color="blue"> {this.state.dis}</font>
          </div>
          <div>
            Holiday Note:<font color="blue"> {this.state.holidayNote}</font>
          </div>
        </Notes>
      </div>
    );
  }
}
