import { useState, useEffect } from 'react'
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

    useEffect(() => { 
        fetchData()
    }, [postId])
 
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
            </div>
            <Loader isActive={isLoading}/>
        </>
    )          
}