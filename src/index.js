import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

connect.send('VKWebAppInit', {});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
