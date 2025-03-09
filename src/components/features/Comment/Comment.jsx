import './Comment.css'
import likes from '../../../assets/thumbs-up-regular.svg'
import user from '../../../assets/user-regular.svg'

export default function Comment({comment}) {
    return (
        <div className='commentSection'>
            <img src={user} alt="user" className='icon'/>
            <span className='commentUserName'>{comment.user.fullName}</span>
            <p className='commentBody'>{comment.body}</p>
            <div>
                <img src={likes} alt="likes" className='icon'/>
                <span className='commentLikesCount'>{comment.likes}</span>
            </div>
        </div>
    )          
}