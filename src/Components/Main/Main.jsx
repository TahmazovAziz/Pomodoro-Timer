import { useEffect, useRef, useState } from 'react';
import Relax from './assets/relax.mp4';
import Work from './assets/work.mp4';
import './Main.scss';
import alarm from './assets/alarm.mp3';
import workSound from './assets/sound_for_work.mp3';
import breakSound from './assets/sound_for_breack.mp3';
import Button from '../Button/Button';
import Video from '../Video/Video';
import Circle from '../Circle/Circle';
import usePlayer from '../../hooks/usePlayer';

export default function Main({DefoultSet}){
    const {
        run,
        setRun,
        min, 
        setMin, 
        second, 
        setSecond, 
        totalSecond, 
        setTotalSecond, 
        setPlaySound, 
        animateRef
    } = usePlayer()
    const [currentVideo, setCurrentVideo] = useState('relax');
    const alarmSoundRef = useRef(new Audio(alarm));
    const workSoundRef = useRef(new Audio(workSound));
    const breakSoundRef = useRef(new Audio(breakSound));

    const video = {
        relax:Relax,
        work:Work,
    };
    
    const Star = () =>{
        setRun(true);
        let mol = min * 60
        setTotalSecond(mol + second)
        setPlaySound(false);
        
    }
    const Stop = () =>{
        setRun(false);
        alarmSoundRef.current.pause();
        alarmSoundRef.current.currentTime = 0;
        setPlaySound(true);
        
    }
    const BreakSoundPlayer = () =>{
        breakSoundRef.current.loop = true;
        breakSoundRef.current.play();
        workSoundRef.current.pause();
        setCurrentVideo('relax')
        setSecond(59)
    }
    const WorkTime = () =>{
        setMin(DefoultSet.work);
        setCurrentVideo('work');
        setSecond(59)
        workSoundRef.current.loop = true;
        workSoundRef.current.play();        
        breakSoundRef.current.pause();

    }
    const Break = () =>{
        setMin(DefoultSet.break);
        BreakSoundPlayer()
    }
    const LongBreak = () =>{
        setMin(DefoultSet.longBreak);
        BreakSoundPlayer()
    }
    return(
        <main className="main">
            <Video currentVideo={currentVideo} video={video} />
            <div className="container">
                <div className="timer">
                    <Circle animateRef={animateRef} totalSecond={totalSecond}/>
                    <div className="timer__control">
                        <div className="timer__number">
                            <span>{min}:{second < 10 ? `0${second}` : second}</span>
                        </div>
                        <div className="timer__button">
                            {!run ? 
                            <Button  PlayerState={Star}>▶</Button>
                            : 
                            <Button  PlayerState={Stop}>⏹</Button>
                            }

                            
                        </div>
                    </div>
                    <div className="timer__modes">
                        <Button  ButtonClass={"work"} PlayerState={WorkTime} >Работа</Button>
                        <Button  ButtonClass={"long-break"} PlayerState={LongBreak} >Длинный перерыв</Button>
                        <Button  ButtonClass={"break"} PlayerState={Break} >перерыв</Button>
                    </div>
                </div>
            </div>
            
        </main>
    )
}