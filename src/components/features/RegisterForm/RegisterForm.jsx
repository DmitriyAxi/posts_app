import './RegisterForm.css'
import Modal from '../../shared/Modal/Modal'
import Button from '../../shared/Button/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import ROUTES from '../../../constants/routes'

export default function RegisterForm() {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [registerForm, setRegisterForm] = useState({
        name: '',
        password: '',
        email: ''
    })
    const [formErrors, setFormErrors] = useState({})

    const navigate = useNavigate()

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

        if (!registerForm.name.trim()) {
            errors.name = 'Имя не может быть пустым';
        }
        if (!registerForm.password.trim()) {
            errors.password = 'Пароль не может быть пустым';
        }
        if (!registerForm.email.trim()) {
            errors.email = 'Email не может быть пустым';
        } else if (!emailRegex.test(registerForm.email)) {
            errors.email = 'Некорректный формат email';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; 
    };

    const handleChange = (e) => {
        const { id, value } = e.target
        setRegisterForm((prev) => ({ ...prev, [id]: value }));        
        setFormErrors((prev) => ({ ...prev, [id]: '' }))
    }

    const handleContinue = (e) => {
        e.preventDefault()
        if (validateForm()) {
            const userInfoJson = JSON.stringify(registerForm);
            localStorage.setItem('user', userInfoJson);
            setIsOpenModal(false);
            navigate(ROUTES.main);
        }
    }

    return (
        <>
            <Modal isOpen={isOpenModal}>
                <h3 style={{textAlign: 'center'}}>Зарегистрироваться</h3>
                <form>
                    <div className='coolinput'>
                        <label htmlFor="name" class="text">Ваше имя *</label>
                        <input 
                            type="text" 
                            id="name"
                            class="input"
                            style={{
                                border: formErrors['name'] ? '1px solid red' : null,
                            }}
                            onChange={handleChange}
                            placeholder="Введите имя"
                        />
                        {formErrors['name'] && <p className='errorContainer'>{formErrors['name']}</p>}
                    </div>
                    <div className='coolinput'>
                        <label htmlFor="password" class="text">Пароль *</label>
                        <input 
                            type="text" 
                            id="password"
                            class="input"
                            style={{
                                border: formErrors['password'] ? '1px solid red' : null,
                            }}
                            onChange={handleChange}
                            placeholder="Введите пароль"
                        />
                        {formErrors['password'] && <p className='errorContainer'>{formErrors['password']}</p>}
                    </div>
                    <div className='coolinput'>
                        <label htmlFor="email" class="text">Почта *</label>
                        <input 
                            type="text" 
                            id="email"
                            class="input"
                            style={{
                                marginBottom: '5px',
                                border: formErrors['email'] ? '1px solid red' : null,
                            }}
                            onChange={handleChange}
                            placeholder="Введите почту"
                        />
                        {formErrors['email'] && <p className='errorContainer'>{formErrors['email']}</p>}
                    </div>
                    <div className='registerButtons'>
                    <Button text='Закрыть' handleClick={() => setIsOpenModal(false)} color='#dff4fe'/>
                    <Button text='Продолжить' handleClick={handleContinue} color='#e3fedf'/>
                    </div>
                </form> 
            </Modal>
            <Button text='Регистрация' handleClick={() => setIsOpenModal(true)}/>
        </>
    )          
}