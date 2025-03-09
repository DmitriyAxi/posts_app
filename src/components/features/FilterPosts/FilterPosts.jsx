import Button from '../../shared/Button/Button'
import './FilterPosts.css'

export default function FilterPosts({tag, isActive, onTagClick}) {
    const color = isActive ? '#aef0ff' : '#f9f9f9'
    return (
        <Button text={tag} color={color} handleClick={onTagClick}/>
    )          
}