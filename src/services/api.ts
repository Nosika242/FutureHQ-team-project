import axios, { AxiosResponse, AxiosError } from 'axios';
import type {
  User,
  Article,
  Comment,
  ArticleReaction,
  CommentReaction,
  CreateUserRequest,
  UpdateUserRequest,
  CreateArticleRequest,
  CreateCommentRequest,
  ArticleFilterParams,
  CommentFilterParams,
  PaginationParams,
  SearchResult,
  Notification,
  PaginatedArticleList,
  PaginatedCommentList,
  PaginatedUserList,
  PaginatedNotificationList,
  NotificationPreferences,
  ApiError,
  ReactionType,
  ID,
  DateISO
} from '../types';

// API Configuration
const API_BASE_URL = 'https://titusukpono.pythonanywhere.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced API Functions with better type safety

// User API
export const getCurrentUser = async (): Promise<User> => {
  const response: AxiosResponse<User> = await api.get('/user/me/');
  return response.data;
};

export const updateCurrentUser = async (userData: UpdateUserRequest): Promise<User> => {
  const response: AxiosResponse<User> = await api.put('/user/me/', userData);
  return response.data;
};

export const getUserProfile = async (userId: ID): Promise<User> => {
  const response: AxiosResponse<User> = await api.get(`/users/${userId}/`);
  return response.data;
};

export const getUsers = async (params?: PaginationParams): Promise<PaginatedUserList> => {
  const response: AxiosResponse<PaginatedUserList> = await api.get('/users/', { params });
  return response.data;
};

// Articles API
export const getArticles = async (params?: ArticleFilterParams): Promise<PaginatedArticleList> => {
  const response: AxiosResponse<PaginatedArticleList> = await api.get('/articles/', { params });
  return response.data;
};

export const getArticle = async (id: ID): Promise<Article> => {
  const response: AxiosResponse<Article> = await api.get(`/articles/${id}/`);
  return response.data;
};

export const createArticle = async (articleData: CreateArticleRequest): Promise<Article> => {
  const response: AxiosResponse<Article> = await api.post('/articles/', articleData);
  return response.data;
};

export const updateArticle = async (id: ID, articleData: Partial<CreateArticleRequest>): Promise<Article> => {
  const response: AxiosResponse<Article> = await api.patch(`/articles/${id}/`, articleData);
  return response.data;
};

export const deleteArticle = async (id: ID): Promise<void> => {
  await api.delete(`/articles/${id}/`);
};

export const searchArticles = async (query: string, filters?: ArticleFilterParams): Promise<SearchResult<Article>> => {
  const params = { search: query, ...filters };
  const response: AxiosResponse<SearchResult<Article>> = await api.get('/articles/search/', { params });
  return response.data;
};

// Article Reactions API
export const toggleArticleReaction = async (articleId: ID, reactionType: ReactionType): Promise<ArticleReaction[]> => {
  const response: AxiosResponse<ArticleReaction[]> = await api.post(`/articles/${articleId}/reaction/`, {
    reaction_type: reactionType
  });
  return response.data;
};

export const getArticleReactions = async (articleId: ID): Promise<ArticleReaction[]> => {
  const response: AxiosResponse<ArticleReaction[]> = await api.get(`/articles/${articleId}/reactions/`);
  return response.data;
};

export const removeArticleReaction = async (articleId: ID, reactionId: ID): Promise<void> => {
  await api.delete(`/articles/${articleId}/reactions/${reactionId}/`);
};

// Comments API
export const getArticleComments = async (articleId: ID, params?: CommentFilterParams): Promise<PaginatedCommentList> => {
  const response: AxiosResponse<PaginatedCommentList> = await api.get(`/articles/${articleId}/comments/`, { params });
  return response.data;
};

export const getComment = async (articleId: ID, commentId: ID): Promise<Comment> => {
  const response: AxiosResponse<Comment> = await api.get(`/articles/${articleId}/comments/${commentId}/`);
  return response.data;
};

export const createComment = async (articleId: ID, commentData: CreateCommentRequest): Promise<Comment> => {
  const response: AxiosResponse<Comment> = await api.post(`/articles/${articleId}/comments/`, commentData);
  return response.data;
};

export const updateComment = async (articleId: ID, commentId: ID, content: string): Promise<Comment> => {
  const response: AxiosResponse<Comment> = await api.patch(`/articles/${articleId}/comments/${commentId}/`, {
    content
  });
  return response.data;
};

export const deleteComment = async (articleId: ID, commentId: ID): Promise<void> => {
  await api.delete(`/articles/${articleId}/comments/${commentId}/`);
};

export const getCommentReplies = async (articleId: ID, commentId: ID, params?: PaginationParams): Promise<PaginatedCommentList> => {
  const response: AxiosResponse<PaginatedCommentList> = await api.get(
    `/articles/${articleId}/comments/${commentId}/replies/`,
    { params }
  );
  return response.data;
};

// Comment Reactions API
export const toggleCommentReaction = async (articleId: ID, commentId: ID, reactionType: ReactionType): Promise<CommentReaction[]> => {
  const response: AxiosResponse<CommentReaction[]> = await api.post(
    `/articles/${articleId}/comments/${commentId}/reaction/`,
    { reaction_type: reactionType }
  );
  return response.data;
};

export const getCommentReactions = async (articleId: ID, commentId: ID): Promise<CommentReaction[]> => {
  const response: AxiosResponse<CommentReaction[]> = await api.get(
    `/articles/${articleId}/comments/${commentId}/reactions/`
  );
  return response.data;
};

export const removeCommentReaction = async (articleId: ID, commentId: ID, reactionId: ID): Promise<void> => {
  await api.delete(`/articles/${articleId}/comments/${commentId}/reactions/${reactionId}/`);
};

// Analytics API
export const getArticleAnalytics = async (articleId: ID, dateFrom?: DateISO, dateTo?: DateISO) => {
  const params = { date_from: dateFrom, date_to: dateTo };
  const response = await api.get(`/articles/${articleId}/analytics/`, { params });
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/analytics/dashboard/');
  return response.data;
};

// Notification API
export const getNotifications = async (params?: PaginationParams): Promise<PaginatedNotificationList> => {
  const response: AxiosResponse<PaginatedNotificationList> = await api.get('/notifications/', { params });
  return response.data;
};

export const markNotificationAsRead = async (notificationId: ID): Promise<Notification> => {
  const response: AxiosResponse<Notification> = await api.patch(`/notifications/${notificationId}/read/`);
  return response.data;
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await api.post('/notifications/mark-all-read/');
};

export const updateNotificationPreferences = async (preferences: NotificationPreferences): Promise<void> => {
  await api.put('/user/me/notification-preferences/', preferences);
};

// Enhanced Error Handling
export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
  status_code: number;
}

export const handleApiError = (error: AxiosError<ApiErrorResponse>): ApiError => {
  if (error.response) {
    const { status, data } = error.response;
    return {
      message: data.message || `HTTP Error ${status}`,
      code: data.code,
      details: data.details,
      status_code: status
    };
  }
  
  if (error.request) {
    return {
      message: 'Network error: No response received from server',
      code: 'NETWORK_ERROR'
    };
  }
  
  return {
    message: error.message || 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  };
};

// Utility functions for API calls
export const createApiCall = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>,
  errorMessage?: string
): Promise<{ data: T | null; error: ApiError | null }> => {
  try {
    const response = await apiCall();
    return { data: response.data, error: null };
  } catch (error) {
    const apiError = handleApiError(error as AxiosError<ApiErrorResponse>);
    return { 
      data: null, 
      error: apiError 
    };
  }
};

// Request/Response interceptors for better error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const apiError = handleApiError(error);
    
    // You can add global error handling here (e.g., showing toast notifications)
    console.error('API Error:', apiError);
    
    return Promise.reject(apiError);
  }
);

export default api;