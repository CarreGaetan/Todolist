import React, { useState, useRef } from "react";
import './Timer.scss';

function Timer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes en secondes
    const [isRunning, setIsRunning] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false); // État pour play/pause de la musique
    const [volume, setVolume] = useState(1); // Volume initial (1 = 100%)
    const timerRef = useRef(null);
    const audioRef = useRef(null); // Référence pour le fichier audio

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);

            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        setIsRunning(false);

                        // Arrête la musique lorsque le timer se termine
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                            setIsPlayingAudio(false);
                        }

                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTimeLeft(25 * 60); // Réinitialise à 25 minutes

        // Réinitialise le son
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlayingAudio(false);
        }
    };

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlayingAudio) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlayingAudio(!isPlayingAudio);
        }
    };

    const changeVolume = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="pomodoro-timer">
            <h2>Pomodoro Timer</h2>
            <p>{formatTime(timeLeft)}</p>
            <div className="buttons">
                <button onClick={startTimer} disabled={isRunning}>
                    Start
                </button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
                <button onClick={toggleAudio}>
                    {isPlayingAudio ? "Pause Music" : "Play Music"}
                </button>
            </div>
            <div className="volume-control">
                <label htmlFor="volume">Volume: </label>
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={changeVolume}
                />
            </div>
            <audio ref={audioRef} src="/audio.mp3" loop></audio> {/* Utilisation de la route absolue pour accéder au fichier */}
        </div>
    );
}

export default Timer;
