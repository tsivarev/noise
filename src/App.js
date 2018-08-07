import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Shuffle from '@vkontakte/icons/dist/24/shuffle';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './App.css';
import {IconWind} from './components/icons/wind/IconWind';
import {IconBirds} from './components/icons/birds/IconBirds';
import {IconRain} from './components/icons/rain/IconRain';
import {IconFire} from './components/icons/fire/IconFire';
import {SoundEffectView} from './components/SoundEffectView';
import {IconWaves} from './components/icons/waves/IconWaves';
import {IconLeaves} from './components/icons/leaves/IconLeaves';
import {IconLogo} from './components/icons/logo/IconLogo';

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
            leaves: 0,
            activePanel: 'mainPanel'
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
        const osname = UI.platform();

        return (
            <UI.Root activeView="mainView">
                <UI.View id="mainView" activePanel={this.state.activePanel}>
                    <UI.Panel id="mainPanel">
                        <UI.PanelHeader>
                            Relax
                        </UI.PanelHeader>
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
                            <UI.Button type="cell" align="center" onClick={this.openCredits.bind(this)}>О
                                программе</UI.Button>
                        </UI.Div>
                    </UI.Panel>
                    <UI.Panel id="creditsPanel">
                        <UI.PanelHeader
                            left={<UI.HeaderButton
                                onClick={this.openMain.bind(this)}>{osname === UI.IOS ?
                                <Icon28ChevronBack/> : <Icon24Back/>}</UI.HeaderButton>}
                        >
                            О программе
                        </UI.PanelHeader>
                        <UI.Group title="Исходный код">
                            <UI.Div>
                                Исходный код доступен на <UI.Link
                                href="https://github.com/tsivarev/noise">GitHub</UI.Link>.
                                <br/>
                                <br/>
                                Документация <UI.Link href="https://vk.com/dev/vk_apps_docs">VK Apps платформы</UI.Link>.
                            </UI.Div>
                        </UI.Group>
                        <UI.Group title="Используемые ресурсы">
                            <UI.List>
                                <UI.ListItem multiline>
                                    Иконки – <UI.Link href="https://www.freepik.com">Freepik</UI.Link>.
                                    Лицензия <UI.Link
                                    href="https://creativecommons.org/licenses/by/3.0/">CC 3.0 BY</UI.Link>.
                                </UI.ListItem>
                                <UI.ListItem multiline>
                                    Звуки – <UI.Link href="https://www.freesfx.co.uk/">freesfx.co.uk</UI.Link>.
                                </UI.ListItem>
                            </UI.List>
                        </UI.Group>
                    </UI.Panel>
                </UI.View>
            </UI.Root>
        );
    }

    openCredits() {
        this.setState({activePanel: 'creditsPanel'});
    }

    openMain() {
        this.setState({activePanel: 'mainPanel'});
    }
}

export default App;
