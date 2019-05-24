import React, {useEffect, useRef} from 'react';
import { Div, Slider, platform, IOS, Progress } from '@vkontakte/vkui';

const SoundEffectView = props => {
    const osName = platform();
    const maxValue = 100;
    const minValue = 0;
    const audio = useRef();

    useEffect(() => {
        audio.current = new Audio(props.url);
        audio.current.addEventListener('ended', function () {
            this.play();
        }, false);
    }, [])

    const onChange = value => {
        props.onChange(props.name, value);
    }

    const toggle = () => {
        props.onChange(props.name, props.value > 0 ? 0 : 70);
    }

    const enable = () => {
        if (props.value === 0) {
            props.onChange(props.name, 70);
        }
    }

    if (audio.current) {
        let isPlaying = !audio.current.paused;
        if (props.value > minValue) {
            if (!isPlaying) {
                let playPromise = audio.current.play();
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
                audio.current.pause();
            }
        }

        if (osName !== IOS) {
            audio.current.volume = props.value / maxValue;
        }
    }

    if (osName === IOS || props.value === 0) {
        return (
            <Div onClick={toggle}>
                <Progress
                    value={props.value ? 70 : 0}
                    style={{margin: 12}} //fix for migration from Progress to Slider
                />
            </Div>
        );
    } else {
        return (
        <Div onClick={enable}>
            <Slider
                min={minValue}
                max={maxValue}
                value={Number(props.value)}
                onChange={onChange}
            />
        </Div>
        );
    }
}

export default SoundEffectView
