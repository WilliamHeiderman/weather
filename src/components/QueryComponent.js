import React from "react"
import FormStatus from "./forms/FormStatusComponent"
import Config from "../config/config.dev"
import WeatherResult from "./WeatherResultComponent"

const queryFactory = string => {
  if (string.match(/[a-z]/i)) {
    return `q=${string}`;
  } else {
    const arr = string.split(/[ ,]+/);
    return `lat=${arr[0].trim()}&lon=${arr[1].trim()}`;
  }
};

export default class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      query: "",
      error: null,
      weather: null
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getWeather() {
    fetch(
      `${Config.OpenWeatherUrl}?${queryFactory(this.state.query)}&APPID=${Config.OpenWeatherAPPID}&lang=en&units=metric`
    )
      .then(response => response.json())
      .then(
        result => {
          console.log(result);
          if (result.cod === "404") {
            this.setState({
              isLoaded: true,
              error: result.message
            });
          } else {
            const {
              main: { humidity, temp, pressure }
            } = result;
            this.setState({
              isLoaded: true,
              weather: {
                humidity: {
                  label: "Humidity",
                  symbol: "%",
                  value: humidity
                },
                temp: {
                  label: "Temperature",
                  symbol: "\u00b0C",
                  value: temp
                },
                pressure: {
                  label: "Pressure",
                  symbol: "",
                  value: pressure
                }
              }
            });
          }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          query: `${position.coords.latitude} ${position.coords.longitude}`
        });
        this.getWeather();
      },
      error => {
        throw error;
      }
    );
  }
  handleSubmit = event => {
    event.preventDefault();
    console.debug("Querying", this.state.query);
    this.setState({
      isLoaded: false,
      error: null
    });
    this.getWeather();
  };
  handleQueryChange = event => {
    this.setState({ query: event.target.value });
  };
  render() {
    const { isLoaded, query, error, weather } = this.state;
    console.log({ weather });
    return isLoaded ? (
      <form className="input_wrapper" onSubmit={this.handleSubmit}>
        <label htmlFor="query_input">Query:</label>
        <input
          type="text"
          name="query_input"
          id="query_input"
          onChange={this.handleQueryChange}
        />

        <FormStatus {...{ isLoaded, query, error }} />

        { weather && <WeatherResult {...weather}/> }

        
      </form>
    ) : <h1>Loading...</h1>;
  }
}
