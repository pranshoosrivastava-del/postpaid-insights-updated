// ============================================
// GLASSPANEL ADMIN - TYPE DEFINITIONS
// ============================================

// Theme Types
export type ThemeMode = 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  info: string;
  infoLight: string;
}

export interface GlassColors {
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderLight: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  shadow: string;
  shadowLight: string;
  overlay: string;
  blur: string;
}

export interface GlassTheme {
  mode: ThemeMode;
  direction: Direction;
  colors: ThemeColors;
  glass: GlassColors;
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: string;
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    fontWeights: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
    lineHeights: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  zIndex: {
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
  elevation: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'admin' | 'user' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  title: string;
  path?: string;
  icon?: React.ComponentType<{ size?: number }>;
  badge?: string | number;
  badgeColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  children?: NavItem[];
  isNew?: boolean;
  isExternal?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

// Dashboard Widget Types
export interface StatWidget {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: React.ComponentType<{ size?: number }>;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
  }[];
}

// Table Types
export interface TableColumn<T> {
  id: string;
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// Form Types
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Message Types
export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  subject: string;
  preview: string;
  content: string;
  read: boolean;
  starred: boolean;
  createdAt: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

// Task/Todo Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: User;
  dueDate?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// Calendar Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  location?: string;
  attendees?: User[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationState;
}

// Layout Types
export type SidebarVariant = 'full' | 'mini' | 'hidden';
export type HeaderVariant = 'fixed' | 'static';

export interface LayoutConfig {
  sidebarVariant: SidebarVariant;
  headerVariant: HeaderVariant;
  sidebarCollapsed: boolean;
  showFooter: boolean;
}

// Export styled-components theme augmentation
declare module 'styled-components' {
  export interface DefaultTheme extends GlassTheme {}
}
