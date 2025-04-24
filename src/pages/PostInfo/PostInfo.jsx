import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/shared/Loader/Loader'
import PostCard from '../../components/features/PostCard/PostCard'
import Comment from '../../components/features/Comment/Comment'
import './PostInfo.css'
import { API_URL_DUMMY } from '../../constants/api'

export default function PostInfo() {
    const [postInfo, setPostInfo] = useState(null) 
    const [comments, setComments] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [errorPosts, setErrorPosts] = useState("")
    const [errorComments, setErrorComments] = useState("")
    const { postId } = useParams()

    const fetchPostInfo = async () => {
        try {
            const response = await fetch(`${API_URL_DUMMY}/post/${postId}`)
            const data = await response.json()
            setPostInfo(data)
        } catch (error) {
            setErrorPosts('Ошибка при получении информации о посте.')
        }
    }

    const fetchComments = async () => {
        try {
            const response = await fetch(`${API_URL_DUMMY}/comments/post/${postId}`)
            const data = await response.json()
            setComments(data.comments)
        } catch (error) {
            setErrorComments('Ошибка при получении коментариев поста.')
        }
    }

    const fetchData = async () => {
        setIsLoading(true);
        await Promise.all([fetchPostInfo(), fetchComments()]);
        setIsLoading(false);
    };
    const [users, setUsers] = useState([])

    const getUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => res.json())
            .then((userList) => setUsers(userList))
            .catch((error) => console.log('Error:', error))
    }

    const getUsers2 = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await res.json()
            setUsers(data)
        }
        catch (error) {
            console.log('Error:', error)
        }
    }
    const [showPhone, setShowPhone] = useState(false)

    useEffect(() => { 
        // fetchData()
        getUsers()
    }, [])

    const handleChangeVisibility = (userId) => {
        const foundUser = users.find((user) => user.id = userId)
        const userPhone = foundUser.phone.split('').map((digit) => '*').join('')
        console.log('click', userPhone)
    }

    return (
        <>  
            <h3>Информация о посте</h3>
            <div className='container'>
                {postInfo && <PostCard key={postInfo.id} post={postInfo}/>}
                {errorPosts && <p className='errorText'>Что-то пошло не так. {errorPosts}</p>}
                <div>
                    {comments && comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
                    {errorComments && <p className='errorText'>Что-то пошло не так. {errorComments}</p>}
                    {(comments.length < 1 && !errorComments && !isLoading) && "У поста нет комментариев."}
                </div>
                {users?.map((user) => 
                    <div key={user.id}>
                        <span>{user.phone}</span>
                        <button onClick={() => useCallback(handleChangeVisibility(user.id))}>'Vis'</button>
                    </div>
                )}
            </div>
            <Loader isActive={isLoading}/>
        </>
    )          
}