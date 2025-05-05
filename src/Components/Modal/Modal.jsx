import { useEffect } from 'react';
import './Modal.scss';

export default function Modal({isVisible, children, onClose}){
    useEffect(()=>{
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
          };
    }, [onClose])

    if (!isVisible) return null;
    return(
        <div className="modal-body">{children}</div>
    )
}