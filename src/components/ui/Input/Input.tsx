// ============================================
// GLASSPANEL ADMIN - INPUT COMPONENT
// Glassmorphism Form Inputs
// ============================================

import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'filled' | 'flushed';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: InputSize;
  variant?: InputVariant;
  isRequired?: boolean;
}

const getSizeStyles = (size: InputSize) => {
  const sizes = {
    sm: css`
      height: 36px;
      font-size: 0.8125rem;
      padding: 0 12px;
    `,
    md: css`
      height: 44px;
      font-size: 0.875rem;
      padding: 0 16px;
    `,
    lg: css`
      height: 52px;
      font-size: 1rem;
      padding: 0 20px;
    `,
  };
  return sizes[size];
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.glass.text};
`;

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.danger};
`;

const InputContainer = styled.div<{
  $size: InputSize;
  $variant: InputVariant;
  $hasError: boolean;
  $hasSuccess: boolean;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
  $isFocused: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  ${({ $variant, theme, $hasError, $hasSuccess, $isFocused }) => {
    const borderColor = $hasError
      ? theme.colors.danger
      : $hasSuccess
      ? theme.colors.success
      : $isFocused
      ? theme.colors.primary
      : theme.glass.borderLight;

    if ($variant === 'filled') {
      return css`
        background: ${theme.mode === 'light'
          ? 'rgba(0, 0, 0, 0.05)'
          : 'rgba(255, 255, 255, 0.08)'};
        border: 2px solid transparent;
        border-radius: ${theme.borderRadius.md};
        transition: all ${theme.transitions.fast};

        &:hover {
          background: ${theme.mode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.12)'};
        }

        ${$isFocused &&
        css`
          background: transparent;
          border-color: ${borderColor};
        `}
      `;
    }

    if ($variant === 'flushed') {
      return css`
        border-bottom: 2px solid ${borderColor};
        border-radius: 0;
        transition: all ${theme.transitions.fast};
      `;
    }

    return css`
      background: ${theme.mode === 'light'
        ? 'rgba(255, 255, 255, 0.5)'
        : 'rgba(255, 255, 255, 0.08)'};
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid ${borderColor};
      border-radius: ${theme.borderRadius.md};
      transition: all ${theme.transitions.fast};

      &:hover {
        border-color: ${theme.glass.border};
      }

      ${$isFocused &&
      css`
        border-color: ${borderColor};
        box-shadow: 0 0 0 3px ${borderColor}33;
      `}
    `;
  }}
`;

const StyledInput = styled.input<{
  $size: InputSize;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
}>`
  flex: 1;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.glass.text};
  ${({ $size }) => getSizeStyles($size)}
  padding-left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? '44px' : undefined)};
  padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? '44px' : undefined)};

  &::placeholder {
    color: ${({ theme }) => theme.glass.textMuted};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${({ $position }) => ($position === 'left' ? 'left: 14px' : 'right: 14px')};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.glass.textMuted};
  pointer-events: none;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.glass.textMuted};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.glass.text};
  }
`;

const HelperText = styled.span<{ $variant?: 'default' | 'error' | 'success' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme, $variant }) => {
    if ($variant === 'error') return theme.colors.danger;
    if ($variant === 'success') return theme.colors.success;
    return theme.glass.textMuted;
  }};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      variant = 'default',
      isRequired,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <InputWrapper>
        {label && (
          <LabelWrapper>
            <Label>
              {label}
              {isRequired && <RequiredMark> *</RequiredMark>}
            </Label>
          </LabelWrapper>
        )}
        <InputContainer
          $size={inputSize}
          $variant={variant}
          $hasError={!!error}
          $hasSuccess={!!success}
          $hasLeftIcon={!!leftIcon}
          $hasRightIcon={!!rightIcon || isPassword}
          $isFocused={isFocused}
        >
          {leftIcon && <IconWrapper $position="left">{leftIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            type={inputType}
            $size={inputSize}
            $hasLeftIcon={!!leftIcon}
            $hasRightIcon={!!rightIcon || isPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {isPassword && (
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
          )}
          {rightIcon && !isPassword && (
            <IconWrapper $position="right">{rightIcon}</IconWrapper>
          )}
        </InputContainer>
        {(error || success || helperText) && (
          <HelperText $variant={error ? 'error' : success ? 'success' : 'default'}>
            {error && <AlertCircle size={14} />}
            {success && <CheckCircle size={14} />}
            {error || success || helperText}
          </HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

// Textarea Component
export const Textarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.08)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.glass.borderLight)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.glass.text};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  resize: vertical;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.glass.border};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? `${theme.colors.danger}33` : `${theme.colors.primary}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.glass.textMuted};
  }
`;

export default Input;
