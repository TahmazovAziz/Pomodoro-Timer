import { useEffect, useState, useRef} from "react";

export default function usePlayer(){
        const [run, setRun] = useState(false);
        const [min, setMin] = useState(4);
        const [second, setSecond] = useState(59);
        const  [totalSecond, setTotalSecond] = useState(0);
        const [playSound, setPlaySound] = useState(false);
        const animateRef = useRef(null);
        useEffect(() => {
        setTotalSecond(min * 60 + second);
    }, [min, second])
        useEffect(()=>{
        const interval = setInterval(()=>{
            if(run){
                
                    setSecond((second) => second - 1);
                    if (second < 1){
                        setMin(min - 1);
                        setSecond(59);
                        if(min <= 0 && second == 0){
                            setRun(false);
                            setMin(0);
                            setSecond(0);
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
    
      return {
        run,
        setRun,
        min,
        setMin,
        second,
        setSecond,
        totalSecond,
        setTotalSecond,
        playSound,
        setPlaySound,
        animateRef,
    };
    
}