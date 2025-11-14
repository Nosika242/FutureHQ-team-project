import React, { useEffect, useState } from 'react';
import { Article, getArticles, toggleArticleReaction, getArticleComments, createComment } from '../../services/api';
import ArticleCard from '../ArticleCard';
import LoadingSpinner from '../LoadingSpinner';
import { HiPlus } from 'react-icons/hi';

const AnnouncementsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await getArticles(1, 20);
      setArticles(response.results);
    } catch (err) {
      console.error('Failed to load articles:', err);
      setError('Failed to load announcements');
      // Load mock data for demo purposes
      loadMockArticles();
    } finally {
      setLoading(false);
    }
  };

  const loadMockArticles = () => {
    // Mock data for demonstration
    const mockArticles: Article[] = [
      {
        id: 1,
        title: 'Electricity Issues',
        content: 'We are currently experiencing electricity issues in the building. Our maintenance team is working to resolve this as quickly as possible. Please click the button below to proceed to your learning dashboard.',
        author: {
          id: 2,
          username: 'manasseh.udim',
          email: 'manasseh.udim@example.com',
          first_name: 'Manasseh',
          last_name: 'Udim',
          profile: { id: 2 }
        },
        created_at: '2023-10-22T12:15:00Z',
        updated_at: '2023-10-22T12:15:00Z',
        reactions: [
          { id: 1, user: 3, article: 1, created_at: '2023-10-22T12:20:00Z' }
        ],
        comments_count: 13,
        is_liked: false
      },
      {
        id: 2,
        title: 'Future Anniversary',
        content: 'Welcome to Future Labs! We are excited to announce our upcoming anniversary celebration. Join us for an amazing day of learning, networking, and fun activities.',
        author: {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          first_name: 'Admin',
          last_name: 'User',
          profile: { id: 1 }
        },
        created_at: '2023-10-21T15:30:00Z',
        updated_at: '2023-10-21T15:30:00Z',
        reactions: [],
        comments_count: 0,
        is_liked: true
      },
      {
        id: 3,
        title: 'Welcome to Future Labs',
        content: 'Welcome to Future Labs! We are excited to have you join our community. This platform is designed to help you connect, learn, and grow together with fellow members.',
        author: {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          first_name: 'Admin',
          last_name: 'User',
          profile: { id: 1 }
        },
        created_at: '2023-10-20T09:00:00Z',
        updated_at: '2023-10-20T09:00:00Z',
        reactions: [
          { id: 2, user: 3, article: 3, created_at: '2023-10-20T10:00:00Z' },
          { id: 3, user: 4, article: 3, created_at: '2023-10-20T11:00:00Z' }
        ],
        comments_count: 5,
        is_liked: false
      }
    ];
    setArticles(mockArticles);
  };

  const handleReaction = async (articleId: number) => {
    try {
      await toggleArticleReaction(articleId);
      await loadArticles(); // Reload to get updated data
    } catch (err) {
      console.error('Failed to toggle reaction:', err);
      // For demo purposes, toggle locally
      setArticles(prev => prev.map(article => {
        if (article.id === articleId) {
          const isLiked = article.is_liked;
          return {
            ...article,
            is_liked: !isLiked,
            reactions: isLiked 
              ? (article.reactions || []).filter(r => r.user !== 1)
              : [...(article.reactions || []), { id: Date.now(), user: 1, article: articleId, created_at: new Date().toISOString() }]
          };
        }
        return article;
      }));
    }
  };

  const handleCreateArticle = () => {
    setCreating(true);
    // TODO: Implement create article modal
    setTimeout(() => setCreating(false), 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-error-500 mb-4">{error}</div>
        <button
          onClick={loadArticles}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">General Announcements</h1>
            <p className="mt-2 text-sm text-gray-600">
              Stay updated with the latest news and important updates
            </p>
          </div>
          <button
            onClick={handleCreateArticle}
            disabled={creating}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <HiPlus className="mr-2 h-4 w-4" />
            {creating ? 'Creating...' : 'New Announcement'}
          </button>
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onReaction={() => handleReaction(article.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {articles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No announcements yet</div>
          <button
            onClick={handleCreateArticle}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Create First Announcement
          </button>
        </div>
      )}

      {/* Permission Message */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-20">
        Only certain people can send messages to this channel.
      </div>
    </div>
  );
};

export default AnnouncementsPage;