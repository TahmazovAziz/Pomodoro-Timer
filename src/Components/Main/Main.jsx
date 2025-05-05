import { useEffect, useRef, useState } from 'react';
import Relax from './assets/relax.mp4';
import Work from './assets/work.mp4';
import './Main.scss';
import Modal from '../Modal/Modal';
export default function Main(){
    const [run, setRun] = useState(false);
    const [min, setMin] = useState(5)
    const [secod, setSecod] = useState(5)
    const play = useRef(null)
    const stop = useRef(null)
    const  [totalSecond, setTotalSecond] = useState(0)
    const animateRef = useRef(null);
    const [currentVideo, setCurrentVideo] = useState('relax')
    const [value, setValue] = useState(min)
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const video = {
        relax:Relax,
        work:Work,
    };
    const [DefoultSet, setDefoultSet] = useState({
        work:25,
        longBreack:15,
        break:5,
    })
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
    })
    
    
    const Star = () =>{
        setRun(true);
        play.current.style.display = 'none'
        stop.current.style.display = 'block'
        setTotalSecond(min * 60 + secod)
    }
    const Stop = () =>{
        setRun(false);
        stop.current.style.display = 'none'
        play.current.style.display = 'block'
        
    }
    
    return(
        <main className="main">
            <p onClick={openModal}>lkjasdfvgljhnkgfeds;lojhngfdeslojknhfgds</p>
            <Modal isVisible={isOpen} onClose={closeModal}>
                <div
                    className="overlay"
                    id="settingsOverlay"
                    aria-hidden="true"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="popupTitle"
                    style={{ display: 'block' }} // Управляйте видимостью через состояние в React
                >
                    <div className="popup" role="document">
                    <h2 id="popupTitle">Настройки времени</h2>
                    <form id="settingsForm">
                        <label htmlFor="workTime">Время работы (минуты):</label>
                        <input
                        type="number"
                        id="workTime"
                        name="workTime"
                        min="1"
                        max="180"
                        onChange={(e)=>setDefoultSet({...DefoultSet, work:Number(e.target.value)})}
                        required
                        />

                        <label htmlFor="shortBreak">Время отдыха (минуты):</label>
                        <input
                        type="number"
                        id="shortBreak"
                        name="shortBreak"
                        min="1"
                        max="60"
                        defaultValue={DefoultSet.break}
                        onChange={(e)=>setDefoultSet({...DefoultSet, break:Number(e.target.value)})}
                        required
                        />

                        <label htmlFor="longBreak">Время большого отдыха (минуты):</label>
                        <input
                        type="number"
                        id="longBreak"
                        name="longBreak"
                        min="1"
                        max="120"
                        defaultValue={DefoultSet.longBreack}
                        onChange={(e)=>setDefoultSet({...DefoultSet, longBreack:Number(e.target.value)})}
                        required
                        />
                        <button onClick={closeModal}>Закрыть</button>
                        
                    </form>
                    </div>
                </div>

            </Modal>
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
                        <button className="work" onClick={() => {setMin(DefoultSet.work); setCurrentVideo('work')}}>Работа</button>
                        <button className="long-break" onClick={() => {setMin(DefoultSet.longBreack);setCurrentVideo('relax')}}>Большой перерыв</button>
                        <button className="break" onClick={() => {setMin(DefoultSet.break);setCurrentVideo('relax')}}>перерыв</button>
                    </div>
                </div>
            </div>
            
        </main>
    )
}