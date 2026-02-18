// ============================================
// GLASSPANEL ADMIN - CARD COMPONENT
// Glassmorphism Card with multiple variants
// ============================================

import React from 'react';
import styled, { css } from 'styled-components';

type CardVariant = 'default' | 'gradient' | 'outline' | 'solid';
type CardColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  color?: CardColor;
  noPadding?: boolean;
  hoverable?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

const getColorValue = (color: CardColor, theme: any) => {
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

const CardContainer = styled.div<{
  $variant: CardVariant;
  $color?: CardColor;
  $noPadding?: boolean;
  $hoverable?: boolean;
  $clickable?: boolean;
}>`
  background: ${({ theme }) => theme.glass.surface};
  backdrop-filter: blur(${({ theme }) => theme.glass.blur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glass.blur});
  border: 1px solid ${({ theme }) => theme.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.glass.shadowLight};
  transition: all ${({ theme }) => theme.transitions.normal};
  overflow: hidden;

  ${({ $hoverable, theme }) =>
    $hoverable &&
    css`
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${theme.glass.shadow};
        border-color: ${theme.colors.primary}40;
      }
    `}

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
    `}

  ${({ $variant, $color, theme }) => {
    if ($variant === 'gradient' && $color) {
      const colorValue = getColorValue($color, theme);
      return css`
        background: linear-gradient(135deg, ${colorValue}20 0%, ${colorValue}05 100%);
        border-color: ${colorValue}30;
      `;
    }
    if ($variant === 'outline' && $color) {
      const colorValue = getColorValue($color, theme);
      return css`
        background: transparent;
        border-color: ${colorValue};
        border-width: 2px;
      `;
    }
    if ($variant === 'solid' && $color) {
      const colorValue = getColorValue($color, theme);
      return css`
        background: linear-gradient(135deg, ${colorValue} 0%, ${colorValue}dd 100%);
        border-color: transparent;
        color: white;

        * {
          color: white;
        }
      `;
    }
    return '';
  }}
`;

const StyledCardHeader = styled.div<{ $hasAction?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $hasAction }) => ($hasAction ? 'space-between' : 'flex-start')};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.glass.borderLight};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.glass.text};
  margin: 0;
`;

const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.glass.textMuted};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StyledCardBody = styled.div<{ $noPadding?: boolean }>`
  padding: ${({ theme, $noPadding }) => ($noPadding ? 0 : theme.spacing.lg)};
`;

const StyledCardFooter = styled.div<{ $align?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => {
    switch ($align) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      case 'between':
        return 'space-between';
      default:
        return 'flex-start';
    }
  }};
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-top: 1px solid ${({ theme }) => theme.glass.borderLight};
  background: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)'};
`;

// Main Card Component
export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Title: React.FC<{ children: React.ReactNode }>;
  Subtitle: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
} = ({ children, variant = 'default', color, className, noPadding, hoverable, onClick, ...props }) => {
  return (
    <CardContainer
      $variant={variant}
      $color={color}
      $noPadding={noPadding}
      $hoverable={hoverable}
      $clickable={!!onClick}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

// Card Header
const CardHeader: React.FC<CardHeaderProps> = ({ children, className, action }) => {
  return (
    <StyledCardHeader className={className} $hasAction={!!action}>
      <HeaderContent>{children}</HeaderContent>
      {action && <HeaderAction>{action}</HeaderAction>}
    </StyledCardHeader>
  );
};

// Card Body
const CardBody: React.FC<CardBodyProps> = ({ children, className, noPadding }) => {
  return (
    <StyledCardBody className={className} $noPadding={noPadding}>
      {children}
    </StyledCardBody>
  );
};

// Card Footer
const CardFooter: React.FC<CardFooterProps> = ({ children, className, align = 'left' }) => {
  return (
    <StyledCardFooter className={className} $align={align}>
      {children}
    </StyledCardFooter>
  );
};

// Attach sub-components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
