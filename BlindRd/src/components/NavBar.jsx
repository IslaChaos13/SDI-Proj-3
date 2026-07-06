import '../css/Navbar.css'

import { useNavigate } from 'react-router-dom'

export default function Navbar() {

    const navigate = useNavigate();

    const handleAccountClick = () => {
        const token = localStorage.getItem('token');

        if(token) {
            navigate('/my-account');
        } else {
            navigate('/login')
        }
    };

    return (
        <>
        <a className="nav-logo" href="#" onClick= {() => navigate('/')}>BLIND RD.</a>
        <ul className="nav-links">


            <li><a href="#signup" onClick={() => navigate('/signup')}>Sign up</a></li>

            <li><a href ="#login" onClick={()=>navigate('/login')}>Login</a></li>

            <li><a href="#myAccount" onClick={(e)=> {e.preventDefault(); handleAccountClick()}}>My Account</a></li>

        <li><a href="#drop" onClick={() => {navigate('/collection')}}>Collection</a></li>



        </ul>
        </>

    )
}