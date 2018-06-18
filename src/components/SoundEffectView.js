import React, {Component} from 'react';
import * as UI from '@vkontakte/vkui';

export class SoundEffectView extends Component {

    constructor(props) {
        super(props);

        this.maxValue = 100;
        this.minValue = 0;

        this.onChange = this.onChange.bind(this);
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


        return (
            <UI.Div>
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
