import React, {useState,useEffect} from 'react';
import Browse from '../components/Browse';
import '../styles/Nav.css';

let arrowSpin = false;

function Nav() {
    const [show, setShow] = useState(false);
    const [showBrowse, setShowBrowse] = useState(false);
    const [burgerMenu, setBurgerMenu] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=> {
            setShow(window.scrollY > 25? true:false);
            setBurgerMenu(false); 
        })
        return ()=> window.removeEventListener("scroll")
    },[]);
    
    const browseToggle = e =>{
        arrowSpin = !arrowSpin;
        e.target.style.animationName = arrowSpin? "redSpin":"";
        setShowBrowse(!showBrowse);
    }
    const handleBurger = e =>{
        setBurgerMenu(!burgerMenu);
        setShowBrowse(false);
    }

    return (
        <div className={`nav ${show && "nav-black"}`}>
            <div id="logo-browse-box">
                <img 
                    className="nav-logo"
                    src='/images/webflix.png'
                    alt='webflix-logo'
                /> 
                <div id="browse-arrow" >
                    <h4 style={{color:"red"}}>Browse</h4>
                    <img 
                        src="/images/redDownArrow.png" 
                        alt="red down arrow"
                        id="red-arrow"
                        onClick={browseToggle}
                    />
                </div> 
                {showBrowse && <Browse />}
            </div>
            <div id="nav-right-box">
                <div id="search-container">                    
                    <img 
                        src="/images/searcher.png" 
                        alt="search logo"
                        id="magnifier"
                    />
                    <input 
                        type="text" 
                        id="search-box"
                        placeholder="Search"
                     />                
                </div>
                <div id="user-box">
                    <img 
                        className="bell"
                        src='/images/bell.png'
                        alt='bell'
                    />
                    <img 
                        className="avatar"
                        src='/images/avatar.png'
                        alt='avatar'
                    />
                    <p>Jimmy User</p>
                </div>    
            </div> 
            <img 
                src="/images/redBurger.png" 
                alt="burger"
                id="burger"
                onClick={handleBurger}
            />
            {burgerMenu && (
                <div id="burger-menu-box">
                    <ul>
                        <li onClick={handleBurger}>Browse</li>
                        <li onClick={handleBurger}>Search</li>
                        <li onClick={handleBurger}>Notifications</li>
                        <li onClick={handleBurger}>Logout</li>
                    </ul>
                </div>
            )}     
        </div>
    )
}
export default Nav
