// ============================================
// GLASSPANEL ADMIN - BADGE COMPONENT
// ============================================

import React from 'react';
import styled, { css } from 'styled-components';

type BadgeVariant = 'solid' | 'outline' | 'subtle' | 'glass';
type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  rounded?: boolean;
  dot?: boolean;
  className?: string;
}

const getColorValue = (color: BadgeColor, theme: any) => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    info: theme.colors.info,
  };
  return colors[color];
};

const getSizeStyles = (size: BadgeSize) => {
  const sizes = {
    sm: css`
      padding: 2px 8px;
      font-size: 0.6875rem;
    `,
    md: css`
      padding: 4px 10px;
      font-size: 0.75rem;
    `,
    lg: css`
      padding: 6px 14px;
      font-size: 0.8125rem;
    `,
  };
  return sizes[size];
};

const StyledBadge = styled.span<{
  $variant: BadgeVariant;
  $color: BadgeColor;
  $size: BadgeSize;
  $rounded: boolean;
  $dot: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  border-radius: ${({ theme, $rounded }) =>
    $rounded ? theme.borderRadius.full : theme.borderRadius.sm};
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ $size }) => getSizeStyles($size)}

  ${({ $variant, $color, theme }) => {
    const colorValue = getColorValue($color, theme);

    switch ($variant) {
      case 'solid':
        return css`
          background: ${colorValue};
          color: white;
        `;
      case 'outline':
        return css`
          background: transparent;
          color: ${colorValue};
          border: 1.5px solid ${colorValue};
        `;
      case 'subtle':
        return css`
          background: ${colorValue}20;
          color: ${colorValue};
        `;
      case 'glass':
        return css`
          background: ${colorValue}25;
          backdrop-filter: blur(8px);
          color: ${colorValue};
          border: 1px solid ${colorValue}30;
        `;
      default:
        return '';
    }
  }}

  ${({ $dot, $color, theme }) =>
    $dot &&
    css`
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${getColorValue($color, theme)};
      }
    `}
`;

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  rounded = true,
  dot = false,
  className,
}) => {
  return (
    <StyledBadge
      $variant={variant}
      $color={color}
      $size={size}
      $rounded={rounded}
      $dot={dot}
      className={className}
    >
      {children}
    </StyledBadge>
  );
};

// Status Badge Component
const StatusBadgeWrapper = styled.span<{ $status: string; $size: BadgeSize }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ $size }) =>
    $size === 'sm' ? '0.75rem' : $size === 'lg' ? '0.875rem' : '0.8125rem'};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.glass.textSecondary};
`;

const StatusDot = styled.span<{ $status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $status, theme }) => {
    switch ($status) {
      case 'online':
      case 'active':
      case 'success':
        return theme.colors.success;
      case 'offline':
      case 'inactive':
      case 'error':
        return theme.colors.danger;
      case 'away':
      case 'warning':
      case 'pending':
        return theme.colors.warning;
      case 'busy':
      case 'info':
        return theme.colors.info;
      default:
        return theme.glass.textMuted;
    }
  }};

  ${({ $status }) =>
    ($status === 'online' || $status === 'active') &&
    css`
      animation: pulse 2s ease-in-out infinite;

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `}
`;

interface StatusBadgeProps {
  status: string;
  label?: string;
  size?: BadgeSize;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
}) => {
  return (
    <StatusBadgeWrapper $status={status} $size={size}>
      <StatusDot $status={status} />
      {label || status}
    </StatusBadgeWrapper>
  );
};

export default Badge;
