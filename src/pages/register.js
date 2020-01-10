import React, { useState, useContext } from 'react';
import { Form, Input, Button, ErrorMessage } from '../components/common';
import { FirebaseContext } from '../components/firebase';

const Register = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '', confirmPassword: '', username: '' });
    const { firebase } = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (formValues.password === formValues.confirmPassword) {
            firebase.register({ email: formValues.email, password: formValues.password, username: formValues.username })
                .catch(error => {
                    setErrorMessage(error.message);
                });
        } else {
            setErrorMessage('Password and Confirm Password fields must match.');
        }
    }

    function handleInputChange(e) {
        e.persist();
        setErrorMessage('');
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }));
    }
    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <Input name="username" value={formValues.username} type="text" placeholder="username" onChange={handleInputChange} required />
                <Input name="email" value={formValues.email} type="email" placeholder="email" onChange={handleInputChange} required />
                <Input name="password" value={formValues.password} type="password" placeholder="password" minLength={6} onChange={handleInputChange} required />
                <Input name="confirmPassword" value={formValues.confirmPassword} type="password" placeholder="confirm password" minLength={6} onChange={handleInputChange} required />
                {!!errorMessage &&
                    <ErrorMessage>
                        {errorMessage}
                    </ErrorMessage>
                }
                <Button type="submit" block> Register </Button>
            </Form>
        </section>
    );
}

export default Register;