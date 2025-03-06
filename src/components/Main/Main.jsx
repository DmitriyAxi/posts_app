import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Posts from '../Posts/Posts'

export default function Main() {
    const user = JSON.parse(localStorage.getItem('user'))

    const navigate = useNavigate()

    useEffect(() => {
        !user && navigate('/')
    }, [])

    return (
        <>
            <span>Здравствуйте, </span>
            <span style={{fontWeight: 'bold', fontSize: '20px'}}>{user.name}</span>
            <Posts></Posts>
        </>
    )          
}