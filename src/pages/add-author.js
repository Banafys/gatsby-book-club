import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button } from '../components/common';
import { FirebaseContext } from '../components/firebase';

const AddAuthor = () => {
    const [authorName, setAuthorName] = useState('');
    const { firebase } = useContext(FirebaseContext);
    const [success, setSuccess] = useState(false);
    let isMounted = true;

    useEffect(() => {
        return () => {
            isMounted = false;
        }
    }, []);
    function handleSubmit(e) {
        e.preventDefault();
        firebase.createAuthor({ authorName }).then(() => {
            if (isMounted) {
                setAuthorName('');
                setSuccess(true);
            }

        });
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Input onChange={
                (e) => {
                    e.persist();
                    setSuccess(false);
                    setAuthorName(e.target.value);
                }
            } value={authorName} placeholder="author name" />
            {!!success && <span>Author added successfully!</span>}
            <Button type="submit" block>
                Add new author
            </Button>
        </Form>
    );
}

export default AddAuthor;