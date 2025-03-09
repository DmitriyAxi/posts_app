import './Button.css'

export default function Button({ text, handleClick, color }) {
    return (
        <button onClick={handleClick} style={{backgroundColor: color}}>{text}</button>
    )          
}