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
export default function Main({DefoultSet}){
    const [run, setRun] = useState(false);
    const [min, setMin] = useState(4);
    const [second, setsecond] = useState(59);
    const  [totalSecond, setTotalSecond] = useState(0);
    const animateRef = useRef(null);
    const [currentVideo, setCurrentVideo] = useState('relax');
    const [playSound, setPlaySound] = useState(false);
    const alarmSoundRef = useRef(new Audio(alarm));
    const workSoundRef = useRef(new Audio(workSound));
    const breakSoundRef = useRef(new Audio(breakSound));
    console.log(run);
    
    
    const video = {
        relax:Relax,
        work:Work,
    };

    useEffect(() => {
        setTotalSecond(min * 60 + second);
    }, [min, second])
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(run){
                
                    setsecond((second) => second - 1);
                    if (second < 1){
                        setMin(min - 1);
                        setsecond(59);
                        if(min <= 0 && second == 0){
                            setRun(false);
                            setMin(0);
                            setsecond(0);
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
    }, [run, min, second, playSound])
    
    
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
        setsecond(59)
    }
    const WorkTime = () =>{
        setMin(DefoultSet.work);
        setCurrentVideo('work');
        setsecond(59)
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