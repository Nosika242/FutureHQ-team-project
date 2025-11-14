import React, { useState, useEffect } from 'react';
import { 
  HiX, 
  HiHeart, 
  HiOutlineHeart, 
  HiReply, 
  HiCheckCircle,
  HiPaperClip,
  HiCamera,
  HiMicrophone,
  HiEmojiHappy,
  HiAtSymbol,
  HiGif
} from 'react-icons/hi';
import { Article, Comment, getArticleComments, createComment, toggleCommentReaction } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

interface ArticleDetailProps {
  article: Article;
  onClose: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [article.id]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const response = await getArticleComments(article.id);
      setComments(response.results);
    } catch (err) {
      console.error('Failed to load comments:', err);
      // Load mock comments for demo
      loadMockComments();
    } finally {
      setLoading(false);
    }
  };

  const loadMockComments = () => {
    const mockComments: Comment[] = [
      {
        id: 1,
        content: 'Thank you for the update. When do you expect this to be resolved?',
        author: {
          id: 3,
          username: 'emmanuel.ekpenyong',
          email: 'emmanuel.ekpenyong@example.com',
          first_name: 'Emmanuel',
          last_name: 'Ekpenyong',
          profile: { id: 3 }
        },
        created_at: '2023-10-22T12:20:00Z',
        updated_at: '2023-10-22T12:20:00Z',
        article: article.id,
        reactions: [
          { id: 1, user: 4, comment: 1, created_at: '2023-10-22T12:25:00Z' },
          { id: 2, user: 5, comment: 1, created_at: '2023-10-22T12:30:00Z' }
        ]
      },
      {
        id: 2,
        content: 'We appreciate your patience during this time.',
        author: {
          id: 1,
          username: 'manasseh.udim',
          email: 'manasseh.udim@example.com',
          first_name: 'Manasseh',
          last_name: 'Udim',
          profile: { id: 1 }
        },
        created_at: '2023-10-22T12:25:00Z',
        updated_at: '2023-10-22T12:25:00Z',
        article: article.id,
        reactions: []
      },
      {
        id: 3,
        content: 'Is there an estimated time for the restoration?',
        author: {
          id: 4,
          username: 'sarah.wilson',
          email: 'sarah.wilson@example.com',
          first_name: 'Sarah',
          last_name: 'Wilson',
          profile: { id: 4 }
        },
        created_at: '2023-10-22T13:00:00Z',
        updated_at: '2023-10-22T13:00:00Z',
        article: article.id,
        reactions: []
      }
    ];
    setComments(mockComments);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const comment = await createComment(article.id, newComment);
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to create comment:', err);
      // For demo, add comment locally
      const newCommentObj: Comment = {
        id: Date.now(),
        content: newComment,
        author: {
          id: 1,
          username: 'current.user',
          email: 'current.user@example.com',
          first_name: 'Current',
          last_name: 'User',
          profile: { id: 1 }
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        article: article.id,
        reactions: []
      };
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentReaction = async (commentId: number) => {
    try {
      await toggleCommentReaction(article.id, commentId);
      await loadComments();
    } catch (err) {
      console.error('Failed to toggle comment reaction:', err);
      // For demo, toggle locally
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          const hasReaction = comment.reactions?.some(r => r.user === 1);
          return {
            ...comment,
            reactions: hasReaction 
              ? (comment.reactions || []).filter(r => r.user !== 1)
              : [...(comment.reactions || []), { id: Date.now(), user: 1, comment: commentId, created_at: new Date().toISOString() }]
          };
        }
        return comment;
      }));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAuthorInitials = (author: any) => {
    if (author.first_name && author.last_name) {
      return `${author.first_name.charAt(0)}${author.last_name.charAt(0)}`;
    }
    return author.username.charAt(0).toUpperCase();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">General Announcements</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <HiX className="h-5 w-5" />
        </button>
      </div>

      {/* Article Summary */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-medium text-xs">
            {getAuthorInitials(article.author)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">
                {article.author.first_name && article.author.last_name
                  ? `${article.author.first_name} ${article.author.last_name}`
                  : article.author.username
                }
              </span>
              <HiCheckCircle className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(article.created_at)}
            </p>
            <h3 className="font-semibold text-gray-900 mt-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{article.content}</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium text-xs">
                  {getAuthorInitials(comment.author)}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {comment.author.first_name && comment.author.last_name
                          ? `${comment.author.first_name} ${comment.author.last_name}`
                          : comment.author.username
                        }
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleCommentReaction(comment.id)}
                      className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary-500 transition-colors"
                    >
                      <HiHeart className={`h-3 w-3 ${comment.reactions?.some(r => r.user === 1) ? 'text-primary-500 fill-current' : ''}`} />
                      <span>{comment.reactions?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmitComment}>
            <div className="mb-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Reply..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
                disabled={submitting}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiPaperClip className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiCamera className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiMicrophone className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiEmojiHappy className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiAtSymbol className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiGif className="h-4 w-4" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!newComment.trim() || submitting}
                className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Posting...' : 'Reply'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;