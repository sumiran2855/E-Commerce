'use client';

import { useRef } from 'react';
import { cn } from '@nextcommerce/utilities';

export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  hasError?: boolean;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  hasError = false,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, idx) => value[idx] ?? '');

  function updateDigit(index: number, char: string) {
    const clean = char.replace(/\D/g, '');
    if (!clean) {
      const next = digits.map((d, i) => (i === index ? '' : d)).join('');
      onChange(next);
      return;
    }

    if (clean.length > 1) {
      const pasted = clean.slice(0, length);
      onChange(pasted);
      const focusIdx = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIdx]?.focus();
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = clean;
    onChange(nextDigits.join(''));
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  }

  return (
    <div className="flex items-center justify-between gap-2" role="group" aria-label="6-digit OTP">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={length}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          onChange={(e) => updateDigit(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            'h-12 w-11 rounded-lg border bg-[var(--nc-bg)] text-center text-lg font-bold text-[var(--nc-text)] transition-colors focus:border-[var(--nc-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--nc-primary)]/20 disabled:opacity-50 sm:w-12',
            hasError ? 'border-[var(--nc-danger)]' : 'border-[var(--nc-border)]',
          )}
        />
      ))}
    </div>
  );
}
