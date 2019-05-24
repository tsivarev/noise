import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import logo from './logo.svg';

const IconLogo = ({height, className}) => (
    <img height={height} className={className} src={logo} alt="logo"/>
);

export default IconLogo
