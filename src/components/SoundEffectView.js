import React, {Component} from 'react';
import { Div, Slider, platform, IOS, Progress } from '@vkontakte/vkui';

export class SoundEffectView extends Component {

    constructor(props) {
        super(props);

        this.osName = platform();

        this.maxValue = 100;
        this.minValue = 0;

        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.enable = this.enable.bind(this);
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

    enable() {
        if (this.props.value === 0) {
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
                        });
                    }
                }
            } else {
                if (isPlaying) {
                    this.audio.pause();
                }
            }

            if (this.osName !== IOS) {
                this.audio.volume = this.props.value / this.maxValue;
            }
        }

        if (this.osName === IOS || this.props.value === 0) {
            return (
                <Div onClick={this.toggle}>
                    <Progress
                        value={this.props.value ? 70 : 0}
                        style={{margin: 12}} //fix for migration from Progress to Slider
                    />
                </Div>
            );
        } else {
            return (
            <Div onClick={this.enable}>
                <Slider
                    min={this.minValue}
                    max={this.maxValue}
                    value={Number(this.props.value)}
                    onChange={this.onChange}
                />
            </Div>
            );
        }
    }
}
