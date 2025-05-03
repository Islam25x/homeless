import { useState } from 'react';
import { useGetCommentsQuery, useAddCommentMutation } from '../../RTK/CommentApi/CommentApi';
import './Comments.css';

interface CommentsProps {
  propertyId: number;
}

function Comments({ propertyId }: CommentsProps) {
  const [commentText, setCommentText] = useState('');
  const userId = localStorage.getItem('userId') || '';

  const { data: comments, isLoading, error, refetch } = useGetCommentsQuery(
    { PropertyId: propertyId },
    {
      skip: !propertyId || isNaN(propertyId),
    }
  );

  const [addComment] = useAddCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await addComment({
        userId: Number(userId),
        propertyId,
        content: commentText,
      }).unwrap();

      setCommentText('');
      refetch(); // Reload comments after adding
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <section id="Comment" className="mt-4">
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          type="text"
          placeholder="Write your comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>

      <div className="users-comments mt-3">
        {isLoading ? (
          <p>Loading comments...</p>
        ) : error ? (
          <p className="text-danger">An error occurred while loading comments.</p>
        ) : comments ? (
          comments.map((comment: any) => (
            <div key={comment.userId} className="comment-box p-2 mb-2 border rounded d-flex gap-2 align-items-start">
              <img
                src={comment.image || 'https://img.freepik.com/vecteurs-premium/icones-utilisateur-comprend-icones-utilisateur-symboles-icones-personnes-elements-conception-graphique-qualite-superieure_981536-526.jpg?semt=ais_hybrid&w=740'}
                alt="User"
              />
              <div>
                <strong>{comment.name}</strong>
                <span className="text-muted ms-2">({comment.role})</span>
                <p className="mb-0">{comment.commentContent}</p>
                <small className="text-muted">{new Date(comment.createAt).toLocaleString()}</small>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </section>
  );
}

export default Comments;
