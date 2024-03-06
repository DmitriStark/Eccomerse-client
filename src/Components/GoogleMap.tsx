import { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, GoogleAPI, IMapProps } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './MapContainer.css';
import React from 'react';

interface MapContainerProps {
  google: GoogleAPI;
}

interface MapContainerState {
  address: string;
  showingInfoWindow: boolean;
  activeMarker: unknown;
  selectedPlace: unknown;
  mapCenter: {
    lat: number;
    lng: number;
  };
}

class MapContainer extends Component<MapContainerProps, MapContainerState> {
  constructor(props: MapContainerProps) {
    super(props);
    this.state = {
      address: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 31.8944,
        lng: 34.8115,
      },
    };
  }

  handleChange = (address: string) => {
    this.setState({ address });
  };

  handleSelect = (address: string) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng);
        this.setState({ mapCenter: latLng });
      })
      .catch((error) => console.error('Error', error));
  };

  render() {
    const mapProps: IMapProps = {
      google: this.props.google,
      initialCenter: {
        lat: this.state.mapCenter.lat,
        lng: this.state.mapCenter.lng,
      },
      center: {
        lat: this.state.mapCenter.lat,
        lng: this.state.mapCenter.lng,
      },
    };

    return (
      <div id='googleMaps'>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer', color: 'black' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer', color: 'black' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div className='map'>
          <Map {...mapProps}>
            <Marker
              position={{
                lat: this.state.mapCenter.lat,
                lng: this.state.mapCenter.lng,
              }}
            />
          </Map>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_GoogleMapKey as string,
})(MapContainer);
