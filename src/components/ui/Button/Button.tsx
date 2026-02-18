// ============================================
// GLASSPANEL ADMIN - BUTTON COMPONENT
// Glassmorphism Buttons with multiple variants
// ============================================

import React from 'react';
import styled, { css } from 'styled-components';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'glass' | 'gradient';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  to?: string;
  href?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  isFullWidth?: boolean;
  isRounded?: boolean;
  isIconOnly?: boolean;
}

const getColorValue = (color: ButtonColor, theme: any) => {
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

const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    xs: css`
      height: 28px;
      padding: 0 10px;
      font-size: 0.75rem;
      gap: 4px;
    `,
    sm: css`
      height: 34px;
      padding: 0 14px;
      font-size: 0.8125rem;
      gap: 6px;
    `,
    md: css`
      height: 40px;
      padding: 0 18px;
      font-size: 0.875rem;
      gap: 8px;
    `,
    lg: css`
      height: 48px;
      padding: 0 24px;
      font-size: 1rem;
      gap: 10px;
    `,
    xl: css`
      height: 56px;
      padding: 0 32px;
      font-size: 1.125rem;
      gap: 12px;
    `,
  };
  return sizes[size];
};

const getVariantStyles = (variant: ButtonVariant, color: ButtonColor, theme: any) => {
  const colorValue = getColorValue(color, theme);

  const variants = {
    solid: css`
      background: ${colorValue};
      color: white;
      border: none;
      box-shadow: 0 4px 14px ${colorValue}40;

      &:hover:not(:disabled) {
        background: ${colorValue}dd;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px ${colorValue}50;
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }
    `,
    outline: css`
      background: transparent;
      color: ${colorValue};
      border: 2px solid ${colorValue};

      &:hover:not(:disabled) {
        background: ${colorValue}15;
      }

      &:active:not(:disabled) {
        background: ${colorValue}25;
      }
    `,
    ghost: css`
      background: transparent;
      color: ${colorValue};
      border: none;

      &:hover:not(:disabled) {
        background: ${colorValue}15;
      }

      &:active:not(:disabled) {
        background: ${colorValue}25;
      }
    `,
    glass: css`
      background: ${theme.glass.surface};
      backdrop-filter: blur(${theme.glass.blur});
      -webkit-backdrop-filter: blur(${theme.glass.blur});
      color: ${theme.glass.text};
      border: 1px solid ${theme.glass.border};

      &:hover:not(:disabled) {
        background: ${theme.glass.surfaceHover};
        border-color: ${colorValue}50;
      }

      &:active:not(:disabled) {
        background: ${theme.glass.surface};
      }
    `,
    gradient: css`
      background: linear-gradient(135deg, ${colorValue} 0%, ${colorValue}bb 100%);
      color: white;
      border: none;
      box-shadow: 0 4px 14px ${colorValue}40;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px ${colorValue}50;
        filter: brightness(1.1);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }
    `,
  };
  return variants[variant];
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $color: ButtonColor;
  $size: ButtonSize;
  $isFullWidth?: boolean;
  $isRounded?: boolean;
  $isIconOnly?: boolean;
  $isLoading?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border-radius: ${({ theme, $isRounded }) =>
    $isRounded ? theme.borderRadius.full : theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  user-select: none;
  position: relative;
  overflow: hidden;

  ${({ $size }) => getSizeStyles($size)}
  ${({ $variant, $color, theme }) => getVariantStyles($variant, $color, theme)}
  
  ${({ $isFullWidth }) =>
    $isFullWidth &&
    css`
      width: 100%;
    `}

  ${({ $isIconOnly, $size }) => {
    if (!$isIconOnly) return '';
    const sizes = {
      xs: '28px',
      sm: '34px',
      md: '40px',
      lg: '48px',
      xl: '56px',
    };
    return css`
      width: ${sizes[$size]};
      padding: 0;
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      color: transparent !important;
      pointer-events: none;
    `}
`;

const LoadingSpinner = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      as,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      isLoading = false,
      isFullWidth = false,
      isRounded = false,
      isIconOnly = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const iconSize = {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 22,
    }[size];

    return (
      <StyledButton
        ref={ref}
        as={as as any}
        $variant={variant}
        $color={color}
        $size={size}
        $isFullWidth={isFullWidth}
        $isRounded={isRounded}
        $isIconOnly={isIconOnly}
        $isLoading={isLoading}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <LoadingSpinner>
            <Loader2 size={iconSize} color="currentColor" />
          </LoadingSpinner>
        )}
        {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
        {children}
        {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

// Button Group Component
export const ButtonGroup = styled.div<{ $attached?: boolean }>`
  display: inline-flex;
  gap: ${({ $attached, theme }) => ($attached ? 0 : theme.spacing.sm)};

  ${({ $attached }) =>
    $attached &&
    css`
      & > button {
        border-radius: 0;

        &:first-child {
          border-radius: ${({ theme }) =>
            `${theme.borderRadius.md} 0 0 ${theme.borderRadius.md}`};
        }

        &:last-child {
          border-radius: ${({ theme }) =>
            `0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0`};
        }

        &:not(:last-child) {
          border-right: none;
        }
      }
    `}
`;

export default Button;
