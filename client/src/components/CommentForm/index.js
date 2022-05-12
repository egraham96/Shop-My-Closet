import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ productId }) => {
    const [commentText, setCommentText] = useState('');

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    productId,
                    commentText,
                    commentAuthor: Auth.getProfile().data.email,
                },
            });

            setCommentText('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'commentText') {
            setCommentText(value);
        }
    };

    return (
        <div>

            {Auth.loggedIn() ? (
                <>
                    <div className="container">
                        <div className="columns">
                            <div className="column is-half is-offset-one-quarter">
                                <label>
                                    What are your thoughts on this item?
                                </label>
                                <form
                                    className="flex-row justify-center justify-space-between-md align-center"
                                    onSubmit={handleFormSubmit}
                                >
                                    <textarea
                                        name="commentText"
                                        className="textarea is-primary"
                                        placeholder="Delicious!"
                                        value={commentText}
                                        style={{ lineHeight: '1.5', resize: 'vertical' }}
                                        onChange={handleChange}
                                    ></textarea>
                                    <button className="button is-primary my-4" type="submit">
                                        Add a Comment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="commentcontainer">
                    <div>
                        <div>
                            <p>
                                You need to be logged in add your comment. Please{' '}
                                <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentForm;
