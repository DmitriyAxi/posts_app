import './Header.css'
import { useNavigate, useLocation } from 'react-router-dom'; 
import Button from '../Button/Button'
import ROUTES from '../../../constants/routes'

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    const navigate = useNavigate()
    const isShowButton = user || location.pathname === ROUTES.analytics;

    return (
        <header>
            { isShowButton && <Button text='Аналитика' color='#c0ffb7' handleClick={() => navigate(ROUTES.analytics)}/>}
        </header>
    )          
}