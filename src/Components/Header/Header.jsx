import './Header.scss';
import Logo from './assets/settings-timer.svg'
export default function Header({openModal}){
    return(
        <header className="header">
            <div className="container">

                <div className="logo">
                    <h1>pomodoro</h1>
                </div>
                <div className="settings">
                    <img src={Logo} alt="se" onClick={openModal}/>
                </div>
            </div>
        </header>
    );
}