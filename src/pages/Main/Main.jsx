import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Posts from '../Posts/Posts'
import ROUTES from '../../constants/routes'

export default function Main() {
    const user = JSON.parse(localStorage.getItem('user'))

    const navigate = useNavigate()

    useEffect(() => {
        !user && navigate(ROUTES.home)
    }, [])

    return (
        <>
            <span>Здравствуйте, </span>
            <span className='userNameText'>{user.name}</span>
            <Posts/>
        </>
    )          
}