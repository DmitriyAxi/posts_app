import './Comment.css'
import likes from '../../assets/thumbs-up-regular.svg'
import user from '../../assets/user-regular.svg'

export default function Comment({comment}) {
    return (
        <div className='commentSection'>
            <img src={user} alt="user" className='icon'/>
            <span style={{fontSize: '20px'}}>{comment.user.fullName}</span>
            <p style={{fontWeight: 'bold'}}>{comment.body}</p>
            <div>
                <img src={likes} alt="likes" className='icon'/>
                <span style={{marginRight: '5px'}}>{comment.likes}</span>
            </div>
        </div>
    )          
}