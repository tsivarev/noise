import React, {Component} from 'react';
import wind from './icon.svg';

export class IconWaves extends Component {
    render() {
        return (
            <img height={this.props.size} width={this.props.size} src={wind} alt="waves"/>
        );
    }

}
