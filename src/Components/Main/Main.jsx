import { useEffect, useRef, useState } from 'react';
import Relax from './assets/relax.mp4';
import Work from './assets/work.mp4';
import './Main.scss';
import Modal from '../Modal/Modal';
import alarm from './assets/alarm.mp3';
import workSound from './assets/sound_for_work.mp3';
import breakSound from './assets/sound_for_breack.mp3';
export default function Main({DefoultSet}){
    const [run, setRun] = useState(false);
    const [min, setMin] = useState(4);
    const [secod, setSecod] = useState(59);
    const play = useRef(null);
    const stop = useRef(null);
    const  [totalSecond, setTotalSecond] = useState(0);
    const animateRef = useRef(null);
    const [currentVideo, setCurrentVideo] = useState('relax');
    const [playSound, setPlaySound] = useState(false);
    const alarmSoundRef = useRef(new Audio(alarm));
    const workSoundRef = useRef(new Audio(workSound));
    const breakSoundRef = useRef(new Audio(breakSound));
    
    const video = {
        relax:Relax,
        work:Work,
    };

    useEffect(() => {
        setTotalSecond(min * 60 + secod);
    }, [min, secod])
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(run){
                
                    setSecod((secod) => secod - 1);
                    if (secod < 1){
                        setMin(min - 1);
                        setSecod(5);
                        if(min <= 0 && secod == 0){
                            setRun(false);
                            setMin(0);
                            setSecod(0);
                            if (!playSound) {
                                alarmSoundRef.current.play();
                            }
                        }
                    }
                    animateRef.current.unpauseAnimations();
                }
                else{
                    setRun(false);  
                    animateRef.current.pauseAnimations();
                }
                
        }, 1000)
        return () => clearInterval(interval);
    }, [run, min, secod, playSound])
    
    
    const Star = () =>{
        setRun(true);
        play.current.style.display = 'none'
        stop.current.style.display = 'block'
        setTotalSecond(min * 60 + secod)
        setPlaySound(false);
        
    }
    const Stop = () =>{
        setRun(false);
        stop.current.style.display = 'none'
        play.current.style.display = 'block'
        alarmSoundRef.current.pause();
        alarmSoundRef.current.currentTime = 0;
        setPlaySound(true);
        
    }
    const BreackSoundPlayer = () =>{
        breakSoundRef.current.loop = true;
        breakSoundRef.current.play();
        workSoundRef.current.pause();
        setCurrentVideo('relax')
    }
    const WorkTime = () =>{
        setMin(DefoultSet.work);
        setCurrentVideo('work');
        workSoundRef.current.loop = true;
        workSoundRef.current.play();        
        breakSoundRef.current.pause();

    }
    const Breack = () =>{
        setMin(DefoultSet.break);
        BreackSoundPlayer()
    }
    const LongBreack = () =>{
        setMin(DefoultSet.longBreack);
        BreackSoundPlayer()
    }
    return(
        <main className="main">
            <video
                key={currentVideo}
                autoPlay
                muted
                loop
                playsInline
                style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1,
                top: 0,
                left: 0
                }}
            >
                <source src={video[currentVideo]} type="video/mp4" />
            </video>
            <div className="container">
                <div className="timer">
                    <div className="timer__display">
                    <svg
                        ref={animateRef}
                        width="400"
                        height="400"
                        viewBox="0 0 200 200"
                        style={{ display: "block" }}
                    >
                        <circle
                        cx="100"
                        cy="100"
                        r="90"
                        stroke="blue"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="566"
                        >
                        <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to="566"
                            dur={`${totalSecond}s`}
                            fill="freeze"
                        />
                        </circle>
                    </svg>
                    </div>
                    <div className="timer__control">
                        <div className="timer__number">
                            <span>{min}:{secod}</span>
                        </div>
                        <div className="timer__button">
                            <button className="play" ref={play} onClick={Star}>▶</button>
                            <button className="stop" ref={stop}  onClick={Stop}>⏹</button>
                        </div>
                    </div>
                    <div className="timer__modes">
                        <button className="work" onClick={WorkTime}>Работа</button>
                        <button className="long-break" onClick={LongBreack}>Большой перерыв</button>
                        <button className="break" onClick={Breack}>перерыв</button>
                    </div>
                </div>
            </div>
            
        </main>
    )
}