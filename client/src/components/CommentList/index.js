import React from 'react';

const CommentList = ({ comments = [] }) => {
    if (!comments.length) {
        return <h3>Be the first to comment!</h3>;
    }

    return (
        <>

            <div>
                {comments &&
                    comments.map((comment) => (

                        <div key={comment._id}>

                            <div className="container">
                                <div className="columns">
                                    <div className="column is-half is-offset-one-quarter">
                                        <div className="has-text-left">
                                            comment by {comment.commentAuthor}: {' '}
                                        </div>
                                        <div className="card has-background-grey-lighter">
                                            <div className="card-content">
                                                {comment.commentText}
                                            </div>
                                        </div>
                                        <div className="has-text-right">
                                            {comment.createdAt}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default CommentList;

