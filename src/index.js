import React from 'react';
import ReactDOM from 'react-dom';
import * as VKConnect from '@vkontakte/vkui-connect';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

VKConnect.send('VKWebAppInit', {});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
