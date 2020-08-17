import React from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import "../App.css";
class MapCom extends React.Component {
  state = {
    center: {
      lat: 50,
      lng: 100
    },
    zoom: 5
  };

  showCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude]
        });
      },
      error => {
        this.setState({
          error: "Error Getting Current Position!"
        });
      }
    );
  };

  componentDidMount() {
    this.showCurrentLocation();
  }

  handleClick = (e: Object) => {
    const map = this.leafletMap.leafletElement;
    const geocoder = L.Control.Geocoder.nominatim();
    let marker;
    geocoder.reverse(
      e.latlng,
      map.options.crs.scale(map.getZoom()),
      results => {
        var r = results[0];
        if (r) {
          if (marker) {
            marker.openPopup();
          } else {
            marker = L.marker(r.center)
              .bindPopup(r.name)
              .addTo(map)
              .openPopup();
            this.props.mapFun(r);
          }
        }
      }
    );
  };

  render() {
    return (
      <Map
        // center={[30.4418778, -84.3006776]}
        // zoom={15}
        center={this.state.center}
        zoom={this.state.zoom}
        onClick={this.handleClick}
        ref={m => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}
export default MapCom;
