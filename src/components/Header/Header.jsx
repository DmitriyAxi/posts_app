import './Header.css'
import { useNavigate, useLocation } from 'react-router-dom'; 
import Button from '../Button/Button'

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    const navigate = useNavigate()
    const isShowButton = user || location.pathname === '/analytics';

    return (
        <header>
            { isShowButton && <Button text='Аналитика' color='#c0ffb7' handleClick={() => navigate('/analytics')}></Button>}
        </header>
    )          
}