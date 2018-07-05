import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import * as VKConnect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Shuffle from '@vkontakte/icons/dist/24/shuffle';
import './App.css';
import {IconWind} from "./components/icons/wind/IconWind";
import {IconBirds} from "./components/icons/birds/IconBirds";
import {IconRain} from "./components/icons/rain/IconRain";
import {IconFire} from "./components/icons/fire/IconFire";
import {SoundEffectView} from "./components/SoundEffectView";
import {IconWaves} from "./components/icons/waves/IconWaves";
import {IconLeaves} from "./components/icons/leaves/IconLeaves";
import {IconLogo} from "./components/icons/logo/IconLogo";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = App.getInitState();

        this.shuffle = this.shuffle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openCredits = this.openCredits.bind(this);
        VKConnect.subscribe(this.navigationListener.bind(this));
    }

    static getInitState() {
        return {
            fire: 0,
            rain: 0,
            wind: 0,
            birds: 0,
            waves: 0,
            leaves: 0,
            activeView: 'mainView'
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

            case 5:
                newState.fair = 40;
                newState.leaves = 25;
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
            case 'leaves':
                this.setState({leaves: value});
                break;
            default:
                console.log('unknown name', name);
        }
    }

    render() {
        return (
            <UI.Root activeView={this.state.activeView}>
                <UI.View id="mainView" activePanel="mainPanel" header={false}>
                    <UI.Panel id="mainPanel">
                        <UI.Group>
                            <UI.Div className="header">
                                <IconLogo height={150} className="header__logo"/>
                                <UI.Button className="header__shuffle"
                                           onClick={this.shuffle}
                                           level="1"
                                           before={<Icon24Shuffle/>}
                                           size="l"
                                >Случайный набор</UI.Button>
                            </UI.Div>
                        </UI.Group>
                        <UI.Group title="Звуки">
                            <UI.List>
                                <UI.ListItem
                                    before={<IconFire color={this.state.fire ? UI.colors.black : UI.colors.lightGray}
                                                      size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/fire.mp3'}
                                                     onChange={this.handleChange}
                                                     name="fire" value={this.state.fire}/>
                                </UI.ListItem>
                                <UI.ListItem
                                    before={<IconRain color={this.state.rain ? UI.colors.black : UI.colors.lightGray}
                                                      size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/rain.mp3'}
                                                     onChange={this.handleChange}
                                                     name="rain" value={this.state.rain}/>
                                </UI.ListItem>
                                <UI.ListItem
                                    before={<IconWind color={this.state.wind ? UI.colors.black : UI.colors.lightGray}
                                                      size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/wind.mp3'}
                                                     onChange={this.handleChange}
                                                     name="wind" value={this.state.wind}/>
                                </UI.ListItem>
                                <UI.ListItem
                                    before={<IconLeaves
                                        color={this.state.leaves ? UI.colors.black : UI.colors.lightGray}
                                        size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/leaves.mp3'}
                                                     onChange={this.handleChange}
                                                     name="leaves" value={this.state.leaves}/>
                                </UI.ListItem>
                                <UI.ListItem
                                    before={<IconBirds color={this.state.birds ? UI.colors.black : UI.colors.lightGray}
                                                       size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/birds.mp3'}
                                                     onChange={this.handleChange}
                                                     name="birds" value={this.state.birds}/>
                                </UI.ListItem>
                                <UI.ListItem
                                    before={<IconWaves color={this.state.waves ? UI.colors.black : UI.colors.lightGray}
                                                       size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/waves.mp3'}
                                                     onChange={this.handleChange}
                                                     name="waves" value={this.state.waves}/>
                                </UI.ListItem>
                            </UI.List>
                        </UI.Group>
                        <UI.Div className="footer">
                            <UI.Button type="cell" align="center" onClick={this.openCredits}>О программе</UI.Button>
                        </UI.Div>
                    </UI.Panel>
                </UI.View>
                <UI.View id="creditsView" activePanel="creditsPanel">
                    <UI.Panel id="creditsPanel">
                        <UI.PanelHeader>О программе</UI.PanelHeader>
                        <UI.Group title="Лицензии">
                            <UI.List>
                                <UI.ListItem multiline>
                                    Иконки – <a href="http://www.freepik.com" title="Freepik">Freepik</a>. Лицензия <a
                                    href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0"
                                    target="_blank">CC 3.0 BY</a>.
                                </UI.ListItem>
                                <UI.ListItem multiline>
                                    Звуки – <a href="http://www.freesfx.co.uk/" title="freesfx.co.uk">freesfx.co.uk</a>.
                                </UI.ListItem>
                            </UI.List>
                        </UI.Group>
                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }

    openCredits() {
        this.setState({activeView: 'creditsView'});
        VKConnect.send('VKWebAppViewUpdateNavigationState', {"can_back": true, "can_forward": false});
    }

    navigationListener(e) {
        e = e.detail;
        if (e['type'] === 'VKWebAppGoBack') {
            VKConnect.send('VKWebAppViewUpdateNavigationState', {"can_back": false, "can_forward": false});
            this.setState({activeView: 'mainView'});
        }
    }
}

export default App;
