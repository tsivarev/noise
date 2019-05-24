import React, {useState} from 'react';
import { Root, View, Panel, PanelHeader, Button, platform, Div, Group, List, Cell, IOS, Link, HeaderButton } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Shuffle from '@vkontakte/icons/dist/24/shuffle';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './App.css';
import IconWind from './components/icons/wind/IconWind';
import IconBirds from './components/icons/birds/IconBirds';
import IconRain from './components/icons/rain/IconRain';
import IconFire from './components/icons/fire/IconFire';
import SoundEffectView from './components/SoundEffectView';
import IconWaves from './components/icons/waves/IconWaves';
import IconLeaves from './components/icons/leaves/IconLeaves';
import IconLogo from './components/icons/logo/IconLogo';

const colors = {
    black: '#000',
    lightGray: '#d3d3d3'
}

const values = [
    {name: 'fire', Icon: IconFire},
    {name: 'rain', Icon: IconRain},
    {name: 'wind', Icon: IconWind},
    {name: 'leaves', Icon: IconLeaves},
    {name: 'birds', Icon: IconBirds},
    {name: 'waves', Icon: IconWaves},
]

const App = () => {
    const init = {
        fire: 0,
        rain: 0,
        wind: 0,
        birds: 0,
        waves: 0,
        leaves: 0,
    }

    const osname = platform();

    const [current, setCurrent] = useState(init);
    const [activePanel, setActivePanel] = useState('mainPanel');

    const shuffle = () => {
        let newState = init;

        const rand = Math.floor(Math.random() * 5);

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

        setCurrent(newState);
    }

    const handleChange = (name, value) => {
        switch (name) {
            case 'fire':
                setCurrent({...current, fire: value});
                break;
            case 'rain':
                setCurrent({...current, rain: value});
                break;
            case 'wind':
                setCurrent({...current, wind: value});
                break;
            case 'birds':
                setCurrent({...current, birds: value});
                break;
            case 'waves':
                setCurrent({...current, waves: value});
                break;
            case 'leaves':
                setCurrent({...current, leaves: value});
                break;
            default:
                console.log('unknown name', name);
        }
    }

    const setPanel = value => () => {
        setActivePanel(value);
    }

    const renderCell = (name, Icon) => (
        <Cell before={<Icon color={current[name] ? colors.black : colors.lightGray}
                          size={32}/>} key={name}>
            <SoundEffectView url={`${process.env.PUBLIC_URL}/samples/${name}.mp3`}
                         onChange={handleChange}
                         name={name} value={current[name]}/>
        </Cell>
    )

    return (
        <Root activeView="mainView">
            <View id="mainView" activePanel={activePanel}>
                <Panel id="mainPanel">
                    <PanelHeader>
                        Relax
                    </PanelHeader>
                    <Group>
                        <Div className="header">
                            <IconLogo height={150} className="header__logo"/>
                            <Button className="header__shuffle"
                                       onClick={shuffle}
                                       level="1"
                                       before={<Icon24Shuffle/>}
                                       size="l"
                            >Случайный набор</Button>
                        </Div>
                    </Group>
                    <Group title="Звуки">
                        <List>
                            {values.map(({name, Icon}) => renderCell(name, Icon))}
                        </List>
                    </Group>
                    <Div className="footer">
                        <Button type="cell" align="center" onClick={setPanel('creditsPanel')}>О программе</Button>
                    </Div>
                </Panel>
                <Panel id="creditsPanel">
                    <PanelHeader
                        left={<HeaderButton
                            onClick={setPanel('mainPanel')}>{osname === IOS ?
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

export default App;
