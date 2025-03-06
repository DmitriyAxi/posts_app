import './PostCard.css'
import likes from '../../assets/thumbs-up-regular.svg'
import dislikes from '../../assets/thumbs-down-regular.svg'
import viewers from '../../assets/eye-regular.svg'
import arrowRight from '../../assets/circle-right-regular.svg'
import { useNavigate } from 'react-router-dom'

export default function PostCard({post}) {
    const navigate = useNavigate()
    return (
        <>
            <div class="card">
                <p className='postTitle'>{post.title}</p>
                <div class="body">
                    <p class="text">{post.body}</p>
                    <div class="footer">
                        <div>
                            <img src={likes} alt="likes" className='icon'/>
                            <span style={{marginRight: '5px'}}>{post.reactions.likes}</span>
                            <img src={dislikes} alt="dislikes" className='icon'/>
                            <span style={{marginRight: '5px'}}>{post.reactions.dislikes}</span>
                            <img src={viewers} alt="viewer" className='icon'/>
                            <span style={{marginRight: '5px'}}>{post.views}</span>
                        </div>
                        <img 
                            src={arrowRight} 
                            style={{cursor: 'pointer'}} 
                            alt="arrowRight" 
                            className='icon'
                            onClick={() => navigate(`/post/${post.id}`)}
                        />
                    </div>
                </div>
            </div>
        </>
    )          
}