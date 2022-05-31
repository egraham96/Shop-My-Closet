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
                    commentAuthor: Auth.getProfile().data.email,
                    commentText,
                    commentDate: Date.now()
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
                    <div className="comment-container">
                        <div>
                            <div >
                                <label>
                                    What are your thoughts on this item?
                                </label>
                                <form
                                    onSubmit={handleFormSubmit}
                                >
                                    <textarea
                                        name="commentText"
                                        className=""
                                        value={commentText}
                                        style={{ lineHeight: '1.5', resize: 'vertical' }}
                                        onChange={handleChange}
                                    ></textarea>
                                    <button className="card-button" type="submit">
                                        Add a Comment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <br></br>
                        <div className="comment-error">
                            <p>
                                You need to be logged in to add your comment. Please{' '}
                                <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                            </p>
                        </div>
                        <br></br>
                    </div>
            )}
        </div>
    );
};

export default CommentForm;
