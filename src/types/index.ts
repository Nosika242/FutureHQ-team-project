// Base Types
export type ID = number;
export type UUID = string;
export type DateISO = string;
export type Email = string;
export type Username = string;

// Enums and Union Types
export enum ReactionType {
  LIKE = 'like',
  LOVE = 'love',
  LAUGH = 'laugh',
  ANGRY = 'angry',
  SAD = 'sad'
}

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
  GUEST = 'guest'
}

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum ArticleSortBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  TITLE = 'title',
  COMMENTS_COUNT = 'comments_count'
}

export enum CommentSortBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}

export enum NotificationType {
  ARTICLE = 'article',
  COMMENT = 'comment',
  REACTION = 'reaction',
  MENTION = 'mention',
  SYSTEM = 'system'
}

// API Response Types
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
  status_code?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// User Types
export interface Profile {
  id: ID;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  preferences?: {
    notifications_email?: boolean;
    notifications_push?: boolean;
    theme?: 'light' | 'dark' | 'system';
  };
}

export interface User {
  id: ID;
  username: Username;
  email: Email;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  last_login?: DateISO;
  date_joined: DateISO;
  profile?: Profile;
}

// Article Types
export interface ArticleMetadata {
  reading_time?: number;
  word_count?: number;
  featured_image?: string;
  tags?: string[];
  category?: string;
  is_pinned?: boolean;
  is_featured?: boolean;
}

export interface ArticleReactions {
  like: number;
  love: number;
  laugh: number;
  angry: number;
  sad: number;
  total: number;
}

export interface ArticleStats {
  views: number;
  unique_views: number;
  share_count: number;
  reactions: ArticleReactions;
  comments_count: number;
  last_activity: DateISO;
}

export interface Article {
  id: ID;
  title: string;
  content: string;
  excerpt?: string;
  status: ArticleStatus;
  author: User;
  metadata?: ArticleMetadata;
  reactions?: ArticleReaction[];
  comments?: Comment[];
  stats?: ArticleStats;
  created_at: DateISO;
  updated_at: DateISO;
  published_at?: DateISO;
  is_liked?: boolean;
  comments_count?: number;
}

// Comment Types
export interface CommentReactions {
  like: number;
  love: number;
  laugh: number;
  angry: number;
  sad: number;
  total: number;
}

export interface CommentStats {
  reactions: CommentReactions;
  reply_count: number;
  last_activity: DateISO;
}

export interface Comment {
  id: ID;
  content: string;
  author: User;
  article: ID;
  parent_comment?: ID; // For nested comments
  is_edited: boolean;
  reactions?: CommentReaction[];
  stats?: CommentStats;
  created_at: DateISO;
  updated_at: DateISO;
  is_liked?: boolean;
}

// Reaction Types
export interface UserReaction {
  user: ID;
  article?: ID;
  comment?: ID;
  reaction_type: ReactionType;
  created_at: DateISO;
}

export interface ArticleReaction {
  id: ID;
  user: ID;
  article: ID;
  reaction_type: ReactionType;
  created_at: DateISO;
  user_data?: Pick<User, 'id' | 'username' | 'first_name' | 'last_name'>;
}

export interface CommentReaction {
  id: ID;
  user: ID;
  comment: ID;
  reaction_type: ReactionType;
  created_at: DateISO;
  user_data?: Pick<User, 'id' | 'username' | 'first_name' | 'last_name'>;
}

// Form Types for Create/Update Operations
export interface CreateUserRequest {
  username: Username;
  email: Email;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateUserRequest {
  username?: Username;
  email?: Email;
  first_name?: string;
  last_name?: string;
  profile?: Partial<Profile>;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  excerpt?: string;
  status?: ArticleStatus;
  metadata?: Partial<ArticleMetadata>;
}

export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  id: ID;
}

export interface CreateCommentRequest {
  content: string;
  parent_comment?: ID;
}

export interface UpdateCommentRequest {
  content: string;
}

// Pagination and Filtering Types
export interface PaginationParams {
  page?: number;
  page_size?: number;
  ordering?: string;
}

export interface ArticleFilterParams extends PaginationParams {
  status?: ArticleStatus | 'all';
  author?: ID;
  category?: string;
  tags?: string[];
  search?: string;
  date_from?: DateISO;
  date_to?: DateISO;
  is_pinned?: boolean;
  is_featured?: boolean;
}

export interface CommentFilterParams extends PaginationParams {
  article?: ID;
  author?: ID;
  search?: string;
  date_from?: DateISO;
  date_to?: DateISO;
}

// Search and Filter Types
export interface SearchResult<T> {
  results: T[];
  total: number;
  suggestions?: string[];
  facets?: Record<string, Record<string, number>>;
}

export interface SearchFilters {
  articles?: ArticleFilterParams;
  comments?: CommentFilterParams;
  users?: {
    role?: UserRole;
    search?: string;
  };
}

// Notification Types
export interface NotificationPreferences {
  email: {
    new_articles: boolean;
    comments: boolean;
    reactions: boolean;
    mentions: boolean;
    weekly_digest: boolean;
  };
  push: {
    new_articles: boolean;
    comments: boolean;
    reactions: boolean;
    mentions: boolean;
  };
}

export interface Notification {
  id: ID;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  data?: Record<string, any>;
  created_at: DateISO;
  read_at?: DateISO;
}

// Paginated Types
export interface PaginatedArticleList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

export interface PaginatedCommentList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Comment[];
}

export interface PaginatedUserList {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

export interface PaginatedNotificationList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notification[];
}

// React Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

export interface ArticleCardProps extends BaseComponentProps {
  article: Article;
  onReaction: (articleId: ID, reactionType: ReactionType) => void;
  onComment?: (articleId: ID) => void;
  onShare?: (article: Article) => void;
  onAuthorClick?: (userId: ID) => void;
  showFullContent?: boolean;
}

export interface CommentCardProps extends BaseComponentProps {
  comment: Comment;
  articleId: ID;
  onReaction: (commentId: ID, reactionType: ReactionType) => void;
  onReply?: (parentCommentId: ID) => void;
  onAuthorClick?: (userId: ID) => void;
  showReplies?: boolean;
  onToggleReplies?: () => void;
  depth?: number; // For nested comments
}

export interface HeaderProps extends BaseComponentProps {
  user: User | null;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  notifications?: Notification[];
  unreadCount?: number;
}

export interface SidebarProps extends BaseComponentProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  user: User | null;
}

export interface ArticleDetailProps extends BaseComponentProps {
  article: Article | null;
  comments: Comment[];
  isLoading?: boolean;
  onAddComment?: (content: string, parentId?: ID) => void;
  onReaction?: (commentId: ID, reactionType: ReactionType) => void;
  onClose?: () => void;
}

export interface AnnouncementsPageProps extends BaseComponentProps {
  onArticleSelect?: (article: Article) => void;
  selectedArticle?: Article | null;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];
export type OptionalKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T];
export type RequiredExcept<T, K extends keyof T> = Omit<T, K> & Pick<T, RequiredKeys<Omit<T, K>>>;

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

// Analytics Types
export interface AnalyticsData {
  total_articles: number;
  total_users: number;
  total_comments: number;
  total_reactions: number;
  articles_this_month: number;
  users_this_month: number;
  comments_this_month: number;
  reactions_this_month: number;
  top_articles: Array<{
    id: ID;
    title: string;
    views: number;
    comments_count: number;
  }>;
  recent_activity: Array<{
    type: 'article' | 'comment' | 'user';
    id: ID;
    title: string;
    timestamp: DateISO;
  }>;
}

// Error Boundary Types
export interface ErrorInfo {
  componentStack: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error?: ApiError | null;
  data?: any;
}

export interface AsyncOperationState<T> extends LoadingState {
  data?: T;
}

// Form Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Export all types for convenience
export * from './api';

// Default export for easier imports
export default {};