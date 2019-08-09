import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { faMoon, faTint, faWind, faTemperatureLow, faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loading from '/Users/hh/Documents/Coding/hackReactor/hratx41-mvp-starter/react-client/dist/loading.gif';
import MoonPhase from '/Users/hh/Documents/Coding/hackReactor/hratx41-mvp-starter/react-client/src/components/MoonPhase.jsx';
import Graph from './components/Graph.jsx';
import css from '/Users/hh/Documents/Coding/hackReactor/hratx41-mvp-starter/react-client/dist/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      forecast: {},
      moonPhase: 0,
      uvIndexes: [],
      temperatures: [],
      hours: [],
      zipCode: 0
    }
    this.getWeather = this.getWeather.bind(this);
    this.getUVMessage = this.getUVMessage.bind(this);
    this.getNext12Hours = this.getNext12Hours.bind(this);
  }

  componentDidMount() {
    // default zip code is downtown Austin, TX
    this.getWeather(78701);
  }

  getWeather(zipCode) {
    axios.get('/' + zipCode)
      .then(({ data }) => {
        const {uvIndexes, temperatures, hours} = this.getNext12Hours(data.hourly.data)
        this.setState({ 
          forecast: data.currently,
          moonPhase: data.daily.data[0].moonPhase * 100,
          uvIndexes: uvIndexes,
          temperatures: temperatures,
          zipCode: zipCode,
          hours: hours
        })
      })
      .catch((error) => console.log(error));
  }

  getNext12Hours(hourlyForecast) {
    const uvIndexes = [];
    const temperatures = [];
    const hours = [];
    for (let i = 0; i < 12; i++) {
      uvIndexes.push(hourlyForecast[i].uvIndex);
      temperatures.push(hourlyForecast[i].temperature);
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hour = date.getHours();  
      // push next twelve hours onto array for labeling graphs
      hours.push((new Date(year, month, day, hour + i)).getHours() + ":00");
    }
    return {uvIndexes, temperatures, hours}
  }

  getUVMessage() {
    // display message based on UV index
    const messages = ["Take a moonlit stroll", "Perfect for a graveyard picnic", "Lurk in the shadows", "Don't forget your cape", "Retreat to dungeon", "Cuddle in a coffin"];
    if (this.state.forecast.uvIndex < 6) {
      return messages[this.state.forecast.uvIndex];
    }
    return messages[5];
  }

  render () {
    let newLocation = ''
    function updateLocation(enteredLocation) {
      newLocation = enteredLocation;
    }
    return (
      <div>

        {/* header, logo with search */}
        <div style={{ width: "100%", float: "left", backgroundColor: "rgb(54, 36, 54)", padding: "15px", marginTop: "-10px"}}>
          <div className = "logo">
            <span>vo</span><FontAwesomeIcon icon = {faMoon} /><span>n</span>
          </div>
          <div className = "searchBar">
            <span className = "search">
              <input type = "text" placeholder = "78701" onChange = {(e) => updateLocation(e.target.value)}></input>
              <button onClick = {() => this.getWeather(newLocation)}>Submit</button>
            </span>
          </div>
        </div>

        { this.state.moonPhase 

          ?

          <div>

            {/* forecast content */}
            <div style = {{padding: "15px"}}>
              <div style = {{width: "100%", float: "left", textAlign: "center"}}>
                <h1>
                  <span className = "lightFont">{this.state.zipCode}:</span> {this.state.forecast.summary}
                </h1>
                <h2 style={{ color: "rgb(129, 30, 40)"}}>{this.getUVMessage()}</h2>
              </div>

              <div style = {{width: "100%", margin: "auto"}}>

                <content className = "halfToFull"style={{ textAlign: "center" }}>
                  <h1>UV Index: <span className="lightFont">{this.state.forecast.uvIndex}</span></h1>
                  <Graph label = "UV Index By Hour" data={this.state.uvIndexes} labels={this.state.hours}/>
                </content>

                <content className = "halfToFull summary">
                  <ul>
                    <li><h2><span><FontAwesomeIcon icon={faTemperatureLow}/></span><span className = "spacing">--.</span>Temp: <span className="lightFont">{this.state.forecast.temperature}<span>&#176;</span></span></h2><h2><span className = "spacing">----</span>  Feels: <span className="lightFont">{this.state.forecast.apparentTemperature}<span>&#176;</span></span></h2></li>
                    <li><h2><span><FontAwesomeIcon icon={faTint} /></span><span className="spacing">---</span>Humidity: <span className="lightFont">{this.state.forecast.humidity * 100 + "%"}</span></h2></li>
                    <li><h2><span><FontAwesomeIcon icon={faCloudMoon} /></span><span className="spacing">--</span>Cloud Coverage: <span className="lightFont">{(this.state.forecast.cloudCover * 100).toFixed(2) + "%"}</span></h2></li>
                    <li><h2><span><FontAwesomeIcon icon={faWind} /></span><span className="spacing">--.</span>Wind speed: <span className="lightFont">{this.state.forecast.windSpeed} mph</span></h2></li>
                  </ul>
                </content>
              </div>

              <div style = {{width: "100%", float: "left"}}>
                <content className = "halfToFull">
                  <MoonPhase moonPhase = {this.state.moonPhase}/>
                </content>

                <content className="halfToFull" style={{ textAlign: "center" }}>
                    <h1>Temperature: <span className = "lightFont">{this.state.temperatures[0]}</span></h1>
                  <Graph label = "Temperatures By Hour" data={this.state.temperatures} labels={this.state.hours} />
                </content>
              </div>

            </div>
          </div>

          :
          // display loading gif while forecast is fetched from the API
          <div style={{
            backgroundImage: 'url(' + loading + ')', height: '200px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', float: "left", width: "100%", marginTop: "150px"}}>
          </div>
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));