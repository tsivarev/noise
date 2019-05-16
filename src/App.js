import React, {Component} from 'react';
import { Root, View, Panel, PanelHeader, Button, platform, Div, Group, List, Cell, IOS, Link, colors, HeaderButton } from '@vkontakte/vkui';
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
        const osname = platform();

        return (
            <Root activeView="mainView">
                <View id="mainView" activePanel={this.state.activePanel}>
                    <Panel id="mainPanel">
                        <PanelHeader>
                            Relax
                        </PanelHeader>
                        <Group>
                            <Div className="header">
                                <IconLogo height={150} className="header__logo"/>
                                <Button className="header__shuffle"
                                           onClick={this.shuffle}
                                           level="1"
                                           before={<Icon24Shuffle/>}
                                           size="l"
                                >Случайный набор</Button>
                            </Div>
                        </Group>
                        <Group title="Звуки">
                            <List>
                                <Cell
                                    before={<IconFire color={this.state.fire ? colors.black : colors.lightGray}
                                                      size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/fire.mp3'}
                                                     onChange={this.handleChange}
                                                     name="fire" value={this.state.fire}/>
                                </Cell>
                                <Cell
                                    before={<IconRain color={this.state.rain ? colors.black : colors.lightGray}
                                                      size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/rain.mp3'}
                                                     onChange={this.handleChange}
                                                     name="rain" value={this.state.rain}/>
                                </Cell>
                                <Cell
                                    before={<IconWind color={this.state.wind ? colors.black : colors.lightGray}
                                                      size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/wind.mp3'}
                                                     onChange={this.handleChange}
                                                     name="wind" value={this.state.wind}/>
                                </Cell>
                                <Cell
                                    before={<IconLeaves
                                        color={this.state.leaves ? colors.black : colors.lightGray}
                                        size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/leaves.mp3'}
                                                     onChange={this.handleChange}
                                                     name="leaves" value={this.state.leaves}/>
                                </Cell>
                                <Cell
                                    before={<IconBirds color={this.state.birds ? colors.black : colors.lightGray}
                                                       size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/birds.mp3'}
                                                     onChange={this.handleChange}
                                                     name="birds" value={this.state.birds}/>
                                </Cell>
                                <Cell
                                    before={<IconWaves color={this.state.waves ? colors.black : colors.lightGray}
                                                       size={32}/>}>
                                    <SoundEffectView url={process.env.PUBLIC_URL + '/samples/waves.mp3'}
                                                     onChange={this.handleChange}
                                                     name="waves" value={this.state.waves}/>
                                </Cell>
                            </List>
                        </Group>
                        <Div className="footer">
                            <Button type="cell" align="center" onClick={this.openCredits.bind(this)}>О
                                программе</Button>
                        </Div>
                    </Panel>
                    <Panel id="creditsPanel">
                        <PanelHeader
                            left={<HeaderButton
                                onClick={this.openMain.bind(this)}>{osname === IOS ?
                                <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}
                        >
                            О программе
                        </PanelHeader>
                        <Group title="Исходный код">
                            <Div>
                                Исходный код доступен на <Link
                                href="https://github.com/tsivarev/noise">GitHub</Link>.
                                <br/>
                                <br/>
                                Документация <Link href="https://vk.com/dev/vk_apps_docs">VK Apps платформы</Link>.
                            </Div>
                        </Group>
                        <Group title="Используемые ресурсы">
                            <List>
                                <Cell multiline>
                                    Иконки – <Link href="https://www.freepik.com">Freepik</Link>.
                                    Лицензия <Link
                                    href="https://creativecommons.org/licenses/by/3.0/">CC 3.0 BY</Link>.
                                </Cell>
                                <Cell multiline>
                                    Звуки – <Link href="https://www.freesfx.co.uk/">freesfx.co.uk</Link>.
                                </Cell>
                            </List>
                        </Group>
                    </Panel>
                </View>
            </Root>
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
