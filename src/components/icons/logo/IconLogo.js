import React, {Component} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import logo from './logo.svg';

export class IconLogo extends Component {

  render() {
    return (
      <img height={this.props.height} className={this.props.className} src={logo} alt="logo"/>);
  }
}