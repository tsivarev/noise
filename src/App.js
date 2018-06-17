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

class App extends Component {

  constructor(props) {
    super(props);

    this.maxValue = 100;
    this.minValue = 0;
    this.defaultValue = 0;

    this.types = {
      fire: 'fire',
      rain: 'rain',
      wind: 'wind',
      birds: 'birds',
    };

    this.audios = {
      fire: App.initAudio(process.env.PUBLIC_URL + '/samples/fire.mp3'),
      rain: App.initAudio(process.env.PUBLIC_URL + '/samples/rain.mp3'),
      wind: App.initAudio(process.env.PUBLIC_URL + '/samples/wind.mp3'),
      birds: App.initAudio(process.env.PUBLIC_URL + '/samples/birds.mp3'),
    };

    this.state = {
      fire: this.defaultValue,
      rain: this.defaultValue,
      wind: this.defaultValue,
      birds: this.defaultValue,
    };
  }

  static initAudio(url) {
    let audio = new Audio(url);
    audio.addEventListener('ended', function() {
      this.play();
    }, false);

    return audio;
  }

  shuffle() {
    let newState = {
      fire: this.defaultValue,
      rain: this.defaultValue,
      wind: this.defaultValue,
      birds: this.defaultValue
    };

    this.audios.fire.pause();
    this.audios.rain.pause();
    this.audios.wind.pause();
    this.audios.birds.pause();

    let rand = Math.floor(Math.random() * 3);

    switch (rand) {
      case 0:
        newState.birds = 50;
        newState.rain = 50;
        this.audios.birds.volume = 0.5;
        this.audios.rain.volume = 0.5;
        this.audios.birds.play();
        this.audios.rain.play();
        break;

      case 1:
        newState.fire = 50;
        newState.rain = 50;
        this.audios.fire.volume = 0.5;
        this.audios.rain.volume = 0.5;
        this.audios.fire.play();
        this.audios.rain.play();
        break;

      case 2:
        newState.wind = 50;
        newState.fire = 50;
        this.audios.fire.volume = 0.5;
        this.audios.wind.volume = 0.5;
        this.audios.fire.play();
        this.audios.wind.play();
        break;
    }

    this.setState(newState);
  }


  onChangeVolume(type, newValue) {
    let newVolume = newValue / this.maxValue;

    let oldValue = 0;
    let audio = null;

    switch (type) {
      case this.types.fire:
        audio = this.audios.fire;
        oldValue = this.state.fire;
        this.setState({fire: newValue});
        break;
      case this.types.wind:
        audio = this.audios.wind;
        oldValue = this.state.wind;
        this.setState({wind: newValue});
        break;
      case this.types.rain:
        audio = this.audios.rain;
        oldValue = this.state.rain;
        this.setState({rain: newValue});
        break;
      case this.types.birds:
        audio = this.audios.birds;
        oldValue = this.state.birds;
        this.setState({birds: newValue});
        break;
      default:
        return false;
    }

    if (oldValue > 0 && newValue === 0) {
      audio.pause();
    } else if (oldValue === 0 && newValue > 0) {
      audio.play();
    }

    audio.volume = newVolume;

    return true;
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
                onClick={this.shuffle.bind(this)}
                level="1"
                before={<Icon24Shuffle/>}
                size="xl"
              >Случайный набор</UI.Button>
            </UI.Div>
            <UI.Group title="Звуки">
              <UI.List>
                <UI.ListItem
                  before={<IconFire size={32}/>}>
                  <UI.Div>
                    <UI.Slider
                      min={this.minValue}
                      max={this.maxValue}
                      value={Number(this.state.fire)}
                      onChange={value => this.onChangeVolume(this.types.fire, value)}
                    />
                  </UI.Div>
                </UI.ListItem>
                <UI.ListItem
                  before={<IconRain size={32}/>}>
                  <UI.Div>
                    <UI.Slider
                      min={this.minValue}
                      max={this.maxValue}
                      value={Number(this.state.rain)}
                      onChange={value => this.onChangeVolume(this.types.rain, value)}
                    />
                  </UI.Div>
                </UI.ListItem>
                <UI.ListItem
                  before={<IconWind size={32}/>}>
                  <UI.Div>
                    <UI.Slider
                      min={this.minValue}
                      max={this.maxValue}
                      value={Number(this.state.wind)}
                      onChange={value => this.onChangeVolume(this.types.wind, value)}
                    />
                  </UI.Div>
                </UI.ListItem>
                <UI.ListItem
                  before={<IconBirds size={32}/>}>
                  <UI.Div>
                    <UI.Slider
                      min={this.minValue}
                      max={this.maxValue}
                      value={Number(this.state.birds)}
                      onChange={value => this.onChangeVolume(this.types.birds, value)}
                    />
                  </UI.Div>
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
