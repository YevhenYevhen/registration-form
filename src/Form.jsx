import React, { useState } from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css'

const schema = yup.object().shape({
    firstName: yup.string().required('Please, enter your first name'),
    lastName: yup.string().required('Please, enter your last name'),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().max(200).required(),
    password: yup.string().min(4).max(12).required('Please, enter your password'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null])
})

export const Form = () => {
    const [submitted, setSubmitted] = useState(false)
    const [data, setData] = useState({})

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const submitForm = (userData) => {
        setData(userData)
        setSubmitted(true)
    }

    console.log(data);

    return (
        <div className='container'>
            {submitted
                ? <div className='form'>
                    <div className='title'>Your data has been submitted!</div>
                    <button className='button' onClick={() => window.location.reload()}>Ok</button>
                </div>
                : <div className="form">
                    <div className="title">Sign up</div>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="inputs">
                            <div>
                                <input type="text" name='firstName' placeholder='First name...' {...register('firstName')} />
                                <div className='errors' >{errors.firstName?.message}</div>
                            </div>
                            <div>
                                <input type="text" name='lastName' placeholder='Last name...' {...register('lastName')} />
                                <div className='errors' >{errors.lastName?.message}</div>
                            </div>
                            <div>
                                <input type="text" name='email' placeholder='Email...' {...register('email')} />
                                <div className='errors' >
                                    {errors.email?.type === 'required' && 'Please, enter your email'}
                                    {errors.email?.type === 'email' && 'Email is invalid'}
                                </div>
                            </div>
                            <div>
                                <input type="number" name='age' placeholder='Age...' {...register('age')} />
                                <div className='errors' >
                                    {errors.age?.type === 'typeError' && 'Please, enter your age'}
                                    {errors.age?.type === 'min' && 'Age must be a positive number'}
                                    {errors.age?.type === 'max' && 'Age is invalid'}
                                    {errors.age?.type === 'integer' && 'Age must be an integer'}
                                </div>
                            </div>
                            <div>
                                <input type="password" name='password' placeholder='Password...' {...register('password')} />
                                <div className='errors' >
                                    {errors.password?.type === 'required' && 'Please, enter your password'}
                                    {errors.password?.type === 'min' && 'Password must be 4-12 characters long'}
                                    {errors.password?.type === 'max' && 'Password must be 4-12 characters long'}
                                </div>
                            </div>
                            <div>
                                <input type="password"
                                    name='confirmPassword'
                                    placeholder='Confirm password...'
                                    {...register('confirmPassword')} />
                                <div className='errors' >{errors.confirmPassword && 'Passwords do not match'}</div>
                            </div>
                            <div>
                                <button className='button' type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}
