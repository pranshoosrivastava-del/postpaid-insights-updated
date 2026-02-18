// ============================================
// GLASSPANEL ADMIN - TEXTAREA COMPONENT
// ============================================

import React from 'react';
import styled from 'styled-components';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.glass.text};

  span {
    color: ${({ theme }) => theme.colors.danger};
    margin-left: 2px;
  }
`;

const StyledTextarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) =>
    theme.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.08)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.danger : theme.glass.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.glass.text};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: inherit;
  resize: vertical;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.glass.border};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) =>
      $hasError ? `${theme.colors.danger}33` : `${theme.colors.primary}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.glass.textMuted};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const HelperText = styled.span<{ $isError?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.danger : theme.glass.textMuted};
`;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, isRequired, ...props }, ref) => {
    return (
      <TextareaWrapper>
        {label && (
          <Label>
            {label}
            {isRequired && <span>*</span>}
          </Label>
        )}
        <StyledTextarea ref={ref} $hasError={!!error} {...props} />
        {(error || helperText) && (
          <HelperText $isError={!!error}>{error || helperText}</HelperText>
        )}
      </TextareaWrapper>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
