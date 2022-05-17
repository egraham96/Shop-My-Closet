import React from 'react';

const CommentList = ({ comments = [] }) => {
    if (!comments.length) {
        return <p className="comment-p">Be the first to comment!</p>;
    }



    return (
        <>


            
            <div className="comment-header"><h2>Comments:</h2>
                {comments &&
                    comments.map((comment) => (
                        <div className="comment-container" key={comment._id}>
            
                            <div className="comment-box"> 
                            <br></br>
                                        <div className="comment-author">
                                            Comment by 
                                            <span id="bold"> {comment.commentAuthor}</span>
                                            {` on ${comment.commentDate}`}: {' '}
                                        </div>
                                            <div className="comment-content">
                                                {comment.commentText}
                                            </div>
                                </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default CommentList;

