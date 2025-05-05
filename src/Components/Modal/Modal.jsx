import { useEffect } from 'react';
import './Modal.scss';

export default function Modal({isVisible,setDefoultSet,DefoultSet,children, onClose}){
    useEffect(()=>{
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
          };
    }, [onClose])

    if (!isVisible) return null;
    return(
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
            defaultValue={DefoultSet.work}
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
            <button onClick={onClose}>Закрыть</button>
            
        </form>
        </div>
    </div>

    )
}