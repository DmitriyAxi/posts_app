import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import PostCard from '../PostCard/PostCard'
import Comment from '../Comment/Comment'
import './PostInfo.css'

export default function PostInfo() {
    const [postInfo, setPostInfo] = useState(null) 
    const [comments, setComments] = useState([]) 
    const [isLoading, setIsLoading] = useState(false)
    const [errorPosts, setErrorPosts] = useState("")
    const [errorComments, setErrorComments] = useState("")
    const { postId } = useParams()

    useEffect(() => { 
        const fetchPostInfo = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/post/${postId}`)
                const data = await response.json()
                setPostInfo(data)
            } catch (error) {
                setErrorPosts('Ошибка при получении информации о посте.')
            }
        }

        const fetchComments = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/comments/post/${postId}`)
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

        fetchData()
    }, [postId])
 
    return (
        <>  
            <h3>Информация о посте</h3>
            <div className='container'>
                {postInfo && <PostCard key={postInfo.id} post={postInfo}></PostCard>}
                {errorPosts && <p style={{color: 'red'}}>Что-то пошло не так. {errorPosts}</p>}
                <div>
                    {comments && comments.map((comment) => <Comment key={comment.id} comment={comment}></Comment>)}
                    {errorComments && <p style={{color: 'red'}}>Что-то пошло не так. {errorComments}</p>}
                    {(comments.length < 1 && !errorComments && !isLoading) && "У поста нет комментариев."}
                </div>
            </div>
            <Loader isActive={isLoading}></Loader>
        </>
    )          
}