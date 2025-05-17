import Main from './Components/Main/Main'
import Header from './Components/Header/Header'
import { useState } from 'react';
import Modal from './Components/Modal/Modal';

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [DefoultSet, setDefoultSet] = useState({
          work:24,
          longBreak:14,
          break:4,
    })
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
  return (
    <>
    <div className="wrapper">
      <Header openModal={openModal}/>
      <Modal isVisible={isOpen} onClose={closeModal} DefoultSet={DefoultSet} setDefoultSet={setDefoultSet}></Modal>
      <Main DefoultSet={DefoultSet}/>
    </div>
    </>
  )
}

export default App
