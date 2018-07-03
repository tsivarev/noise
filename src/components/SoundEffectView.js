import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';

export class SoundEffectView extends Component {

    constructor(props) {
        super(props);

        this.osName = UI.platform();

        this.maxValue = 100;
        this.minValue = 0;

        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.audio = new Audio(this.props.url);
        this.audio.addEventListener('ended', function () {
            this.play();
        }, false);
    }

    onChange(value) {
        this.props.onChange(this.props.name, value);
    }

    toggle() {
        if (this.props.value > 0) {
            this.props.onChange(this.props.name, 0);
        } else {
            this.props.onChange(this.props.name, 70);
        }
    }

    render() {
        if (this.audio) {
            let isPlaying = !this.audio.paused;
            if (this.props.value > this.minValue) {
                if (!isPlaying) {
                    let playPromise = this.audio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(function () {
                            // Automatic playback started!
                        }).catch(function (error) {
                            // Automatic playback failed.
                            // alert(error);
                        });
                    }
                }
            } else {
                if (isPlaying) {
                    this.audio.pause();
                }
            }

            this.audio.volume = this.props.value / this.maxValue;
        }

        if (this.osName === UI.IOS) {
            return (
                <UI.Div onClick={this.toggle}>
                    <UI.Progress
                        value={this.props.value ? 70 : 0}
                    />
                </UI.Div>
            );
        } else {
            return (
            <UI.Div onClick={this.toggle}>
                <UI.Slider
                    min={this.minValue}
                    max={this.maxValue}
                    value={Number(this.props.value)}
                    onChange={this.onChange}
                />
            </UI.Div>
            );
        }
    }
}
