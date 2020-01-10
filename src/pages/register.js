import React, { useState, useContext } from 'react';
import { Form, Input, Button } from '../components/common';
import { FirebaseContext } from '../components/firebase';

const Register = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '', confirmPassword: '' });
    const { firebase } = useContext(FirebaseContext);

    function handleSubmit(e) {
        e.preventDefault();
        if (formValues.password === formValues.confirmPassword) {
            firebase.register({ email: formValues.email, password: formValues.password })
        }
    }

    function handleInputChange(e) {
        e.persist();
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }));
    }
    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="email" onChange={handleInputChange} required />
                <Input name="password" type="password" placeholder="password" minLength={3} onChange={handleInputChange} required />
                <Input name="confirmPassword" type="password" placeholder="confirm password" minLength={3} onChange={handleInputChange} required />
                <Button type="submit" block> Register </Button>
            </Form>
        </section>
    );
}

export default Register;