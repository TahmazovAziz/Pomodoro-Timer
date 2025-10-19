import { useEffect, useState, useRef} from "react";
import alarm from '../Components/Main/assets/alarm.mp3';

export default function usePlayer(){
        const [run, setRun] = useState(false);
        const [min, setMin] = useState(5);
        const [second, setSecond] = useState(0);
        const [initialTime, setInitialTime] = useState(5 * 60);
        const [playSound, setPlaySound] = useState(false);
        const alarmSoundRef = useRef(new Audio(alarm));

        useEffect(()=>{
            const interval = setInterval(()=>{
                if(run){
                    if(second  > 0 ){
                        setSecond(second - 1)
                    }
                    else if(min > 0){
                        setMin(min - 1)
                        setSecond(59)
                    }
                    else{
                        setRun(false)
                        if (!playSound) {
                            alarmSoundRef.current.play();
                        }
                    }
                }
                    
            }, 1000)
            return () => clearInterval(interval);
        }, [run, min, second, playSound, ])


     return {
        run,
        setRun,
        min,
        setMin,
        second,
        setSecond,
        playSound,
        setPlaySound,
        initialTime,
        setInitialTime,
        alarmSoundRef
    };
    
}