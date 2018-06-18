import React, {Component} from 'react';
import wind from './icon.svg';

export class IconLeaves extends Component {
    render() {
        return (
            <img height={this.props.size} width={this.props.size} src={wind} alt="leaves"/>
        );
    }

}
