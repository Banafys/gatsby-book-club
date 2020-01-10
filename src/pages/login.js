import React, { useState, useContext } from "react"
import { FirebaseContext } from '../components/firebase';
import { navigate } from "gatsby";

import { Form, Input, Button, ErrorMessage } from '../components/common';

const Login = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const { firebase } = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        firebase.login({ email: formValues.email, password: formValues.password })
            .catch(error => {
                setErrorMessage(error.message);
            });
    }

    function handleInputChange(e) {
        e.persist();

        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }));

        setErrorMessage('');

    }

    return (
        <section>

            <Form onSubmit={handleSubmit}>
                <Input value={formValues.email} name="email" onChange={handleInputChange} type="email" placeholder="email" require />
                <Input value={formValues.password} name="password" onChange={handleInputChange} type="password" placeholder="password" require />
                <Button type="submit" block> Login </Button>

                {!!errorMessage &&
                    <ErrorMessage>
                        {errorMessage}
                    </ErrorMessage>
                }
            </Form>
        </section>
    );
}

export default Login