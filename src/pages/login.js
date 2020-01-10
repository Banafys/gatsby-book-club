import React, { useState, useContext } from "react"
import { FirebaseContext } from '../components/firebase';
import { navigate } from "gatsby";

import Form from '../components/common/Form';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const { firebase } = useContext(FirebaseContext);

    function handleSubmit(e) {
        e.preventDefault();
        firebase.login({ email: formValues.email, password: formValues.password }).then(() => navigate('/'));
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
                <Input value={formValues.email} name="email" onChange={handleInputChange} type="email" placeholder="email" />
                <Input value={formValues.password} name="password" onChange={handleInputChange} type="password" placeholder="password" />
                <Button type="submit" block> Login </Button>
            </Form>
        </section>
    );
}

export default Login