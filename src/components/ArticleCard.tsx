import React from 'react';
import type { Article, ArticleCardProps, ReactionType } from '../../types';
import { 
  HiHeart, 
  HiOutlineHeart, 
  HiReply, 
  HiShare,
  HiCheckCircle,
  HiEye,
  HiClock
} from 'react-icons/hi';

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onReaction, 
  onComment, 
  onShare,
  onAuthorClick,
  showFullContent = false,
  className = '',
  ...props 
}) => {
  const formatDate = (dateString: string): string => {
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

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getAuthorInitials = (author: Article['author']): string => {
    if (author.first_name && author.last_name) {
      return `${author.first_name.charAt(0)}${author.last_name.charAt(0)}`;
    }
    return author.username.charAt(0).toUpperCase();
  };

  const getAuthorDisplayName = (author: Article['author']): string => {
    if (author.first_name && author.last_name) {
      return `${author.first_name} ${author.last_name}`;
    }
    return author.username;
  };

  const getUserDisplayName = (author: Article['author']): string => {
    if (author.first_name && author.last_name) {
      return `${author.first_name} ${author.last_name}`;
    }
    return author.username;
  };

  const getUserInitials = (author: Article['author']): string => {
    if (author.first_name && author.last_name) {
      return `${author.first_name.charAt(0)}${author.last_name.charAt(0)}`;
    }
    return author.username.charAt(0).toUpperCase();
  };

  const getReactionCount = (): number => {
    return article.reactions?.length || 0;
  };

  const getReactionTypeCounts = (): Record<ReactionType, number> => {
    const counts: Record<ReactionType, number> = {
      [ReactionType.LIKE]: 0,
      [ReactionType.LOVE]: 0,
      [ReactionType.LAUGH]: 0,
      [ReactionType.ANGRY]: 0,
      [ReactionType.SAD]: 0,
    };
    
    article.reactions?.forEach(reaction => {
      if (reaction.reaction_type in counts) {
        counts[reaction.reaction_type]++;
      }
    });
    
    return counts;
  };

  const handleAuthorClick = (): void => {
    if (onAuthorClick && article.author.id) {
      onAuthorClick(article.author.id);
    }
  };

  const handleReactionClick = (): void => {
    if (onReaction) {
      onReaction(article.id, ReactionType.LIKE);
    }
  };

  const handleCommentClick = (): void => {
    if (onComment) {
      onComment(article.id);
    }
  };

  const handleShareClick = (): void => {
    if (onShare) {
      onShare(article);
    }
  };

  const renderMetadata = (): JSX.Element | null => {
    if (!article.metadata) return null;

    const { reading_time, word_count, tags, category } = article.metadata;

    return (
      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
        {reading_time && (
          <div className="flex items-center space-x-1">
            <HiClock className="h-4 w-4" />
            <span>{reading_time} min read</span>
          </div>
        )}
        
        {word_count && (
          <div className="flex items-center space-x-1">
            <span>{word_count.toLocaleString()} words</span>
          </div>
        )}
        
        {category && (
          <div className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
            {category}
          </div>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <article className={`bg-white rounded-lg shadow-brand-md hover-lift transition-all duration-300 ${className}`} {...props}>
      {/* Article Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start space-x-4">
          {/* Author Avatar */}
          <div className="flex-shrink-0">
            <div 
              className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-medium text-sm cursor-pointer"
              onClick={handleAuthorClick}
            >
              {getAuthorInitials(article.author)}
            </div>
          </div>

          {/* Author Info and Date */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 
                className="text-sm font-medium text-gray-900 cursor-pointer hover:text-primary-600 transition-colors"
                onClick={handleAuthorClick}
              >
                {getAuthorDisplayName(article.author)}
              </h3>
              <HiCheckCircle className="h-4 w-4 text-blue-500" />
              
              {/* Article Status Badges */}
              {article.metadata?.is_pinned && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                  Pinned
                </span>
              )}
              
              {article.metadata?.is_featured && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-xs text-gray-500">
                {formatRelativeTime(article.created_at)}
              </p>
              <span className="text-gray-300">•</span>
              <p className="text-xs text-gray-500">
                {formatDate(article.created_at)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleReactionClick}
              className={`p-2 rounded-full transition-colors ${
                article.is_liked 
                  ? 'text-primary-500 hover:text-primary-700' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label={article.is_liked ? 'Unlike' : 'Like'}
            >
              {article.is_liked ? (
                <HiHeart className="h-5 w-5 fill-current" />
              ) : (
                <HiOutlineHeart className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={handleCommentClick}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Comment"
            >
              <HiReply className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleShareClick}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Share"
            >
              <HiShare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Article Title */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {article.title}
          </h2>
          
          {article.excerpt && (
            <p className="text-gray-700 leading-relaxed mb-3">
              {article.excerpt}
            </p>
          )}
          
          {/* Article Content Preview */}
          <div className="text-gray-700 leading-relaxed">
            {showFullContent ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="line-clamp-3">
                {article.content.length > 200 
                  ? `${article.content.substring(0, 200)}...` 
                  : article.content
                }
              </p>
            )}
          </div>
        </div>

        {/* Metadata */}
        {renderMetadata()}

        {/* Media (if any) */}
        {article.metadata?.featured_image && (
          <div className="mt-4">
            <img
              src={article.metadata.featured_image}
              alt={article.title}
              className="w-full h-48 rounded-lg object-cover"
            />
          </div>
        )}

        {/* Demo Media for specific article */}
        {article.title === 'Future Anniversary' && !article.metadata?.featured_image && (
          <div className="mt-4">
            <div className="w-full h-48 rounded-lg bg-gradient-to-br from-orange-200 to-red-300 flex items-center justify-center">
              <div className="text-white font-semibold text-lg">
                Anniversary Image
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Article Footer */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-500 transition-colors">
              <HiEye className="h-4 w-4" />
              <span>{article.stats?.views || 0} views</span>
            </button>
            
            <button 
              onClick={handleCommentClick}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-500 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 21l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              <span>{article.comments_count || 0} replies</span>
            </button>
          </div>

          <button className="text-sm text-primary-500 hover:text-primary-700 font-medium">
            View details →
          </button>
        </div>

        {/* Reaction Summary */}
        {getReactionCount() > 0 && (
          <div className="mt-3 flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <HiHeart className="h-4 w-4 text-primary-500 fill-current" />
              <span className="text-sm text-gray-600">
                {getReactionCount()} {getReactionCount() === 1 ? 'reaction' : 'reactions'}
              </span>
            </div>
            
            {/* Reaction Type Breakdown */}
            <div className="flex items-center space-x-2">
              {Object.entries(getReactionTypeCounts())
                .filter(([_, count]) => count > 0)
                .slice(0, 3)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 capitalize">{type}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleCard;