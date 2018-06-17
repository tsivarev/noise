import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Shuffle from '@vkontakte/icons/dist/24/shuffle';
import './App.css';
import logo from './logo.jpg';
import {IconWind} from "./components/icons/wind/IconWind";
import {IconBirds} from "./components/icons/birds/IconBirds";
import {IconRain} from "./components/icons/rain/IconRain";
import {IconFire} from "./components/icons/fire/IconFire";
import {SoundEffectView} from "./components/SoundEffectView";
import {IconWaves} from "./components/icons/waves/IconWaves";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = App.getInitState();

    this.shuffle = this.shuffle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static getInitState() {
    return {
      fire: 0,
      rain: 0,
      wind: 0,
      birds: 0,
      waves: 0,
    };
  }

  shuffle() {
    let newState = App.getInitState();

    let rand = Math.floor(Math.random() * 5);

    switch (rand) {
      case 0:
        newState.birds = 50;
        newState.rain = 50;
        break;

      case 1:
        newState.fire = 50;
        newState.rain = 50;
        break;

      case 2:
        newState.wind = 50;
        newState.fire = 50;
        break;

      case 3:
        newState.wind = 25;
        newState.waves = 50;
        break;

      case 4:
        newState.birds = 25;
        newState.waves = 50;
        break;
    }

    this.setState(newState);
  }

  handleChange(name, value) {
    switch (name) {
      case 'fire':
        this.setState({fire: value});
        break;
      case 'rain':
        this.setState({rain: value});
        break;
      case 'wind':
        this.setState({wind: value});
        break;
      case 'birds':
        this.setState({birds: value});
        break;
      case 'waves':
        this.setState({waves: value});
        break;
      default:
        console.log('unknown name', name);
    }
  }

  render() {
    const LogoStyle = {backgroundImage: `url(${logo})`};

    return (
      <UI.Root activeView="mainView">
        <UI.View id="mainView" activePanel="progress" header={false}>
          <UI.Panel id="progress">
            <UI.Div className="logo" style={LogoStyle}>
              <UI.Button
                className="logo__shuffle"
                onClick={this.shuffle}
                level="1"
                before={<Icon24Shuffle/>}
                size="xl"
              >Случайный набор</UI.Button>
            </UI.Div>
            <UI.Group title="Звуки">
              <UI.List>
                <UI.ListItem
                  before={<IconFire size={32}/>}>
                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/fire.mp3'} onChange={this.handleChange} name="fire" value={this.state.fire}/>
                </UI.ListItem>
                <UI.ListItem
                  before={<IconRain size={32}/>}>
                  <SoundEffectView url={process.env.PUBLIC_URL + '/samples/rain.mp3'} onChange={this.handleChange} name="rain" value={this.state.rain}/>
                </UI.ListItem>
                <UI.ListItem
                  before={<IconWind size={32}/>}>
                  <SoundEffectView url={process.env.PUBLIC_URL + '/samples/wind.mp3'} onChange={this.handleChange} name="wind" value={this.state.wind}/>
                </UI.ListItem>
                <UI.ListItem
                  before={<IconBirds size={32}/>}>
                  <SoundEffectView url={process.env.PUBLIC_URL + '/samples/birds.mp3'} onChange={this.handleChange} name="birds" value={this.state.birds}/>
                </UI.ListItem>
                <UI.ListItem
                  before={<IconWaves size={32}/>}>
                  <SoundEffectView url={process.env.PUBLIC_URL + '/samples/waves.mp3'} onChange={this.handleChange} name="waves" value={this.state.waves}/>
                </UI.ListItem>
              </UI.List>
            </UI.Group>
          </UI.Panel>
        </UI.View>
      </UI.Root>
    );
  }
}

export default App;
