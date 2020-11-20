import React, {useState,useEffect} from 'react';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
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
        return ()=> window.removeEventListener("scroll",()=> true)
    },[]);
    
    useEffect(()=>{
        window.addEventListener("resize",()=> {            
            window.innerWidth > 510 && setBurgerMenu(false)
        })
        return ()=> window.removeEventListener("resize",()=> true)
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
    const handleBurgerBrowse = e =>{
        setShowBrowse(!showBrowse);
        setBurgerMenu(!burgerMenu);
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
                {showBrowse && <Browse  setShowBrowse={setShowBrowse}/>}
            </div>
            <div id="nav-right-box">
                <div id="search-container">                    
                    <SearchIcon 
                        style={{ 
                            marginRight: "5px",
                            cursor: "pointer" 
                        }}
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
                    <PersonIcon 
                        style={{
                            fontSize: 30,
                            color: "red",
                            cursor: "pointer"
                        }}
                    />
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
                        <li onClick={handleBurgerBrowse}>Browse</li>
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
