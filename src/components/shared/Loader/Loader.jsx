import './Loader.css'

export default function Loader({ isActive }) {
    return (
        <>
            { isActive && <div className='loader'/> }
        </>
    )          
}