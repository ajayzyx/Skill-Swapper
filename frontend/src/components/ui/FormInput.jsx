import React, { useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';

const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  icon: Icon,
  error,
  success,
  disabled = false,
  maxLength,
  minLength,
  pattern,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validateInput = (inputValue) => {
    if (required && !inputValue.trim()) {
      return `${label} is required`;
    }
    
    if (minLength && inputValue.length < minLength) {
      return `${label} must be at least ${minLength} characters`;
    }
    
    if (maxLength && inputValue.length > maxLength) {
      return `${label} must be no more than ${maxLength} characters`;
    }
    
    if (pattern && !new RegExp(pattern).test(inputValue)) {
      return `Please enter a valid ${label.toLowerCase()}`;
    }
    
    if (type === 'email' && inputValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
      return 'Please enter a valid email address';
    }
    
    return '';
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (hasBeenTouched) {
      const error = validateInput(newValue);
      setValidationError(error);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setHasBeenTouched(true);
    const error = validateInput(value);
    setValidationError(error);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const isValid = hasBeenTouched && !validationError && value.trim();
  const hasError = hasBeenTouched && (validationError || error);
  const showSuccess = success || isValid;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className={`w-5 h-5 transition-colors duration-200 ${
              isFocused 
                ? 'text-blue-500' 
                : hasError 
                  ? 'text-red-400' 
                  : 'text-gray-400'
            }`} />
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-200
            ${Icon ? 'pl-12' : 'pl-4'}
            ${showSuccess && !hasError ? 'pr-12' : hasError ? 'pr-12' : 'pr-4'}
            ${isFocused 
              ? 'border-blue-500 ring-4 ring-blue-500/10 bg-white' 
              : hasError 
                ? 'border-red-300 bg-red-50/50' 
                : showSuccess 
                  ? 'border-green-300 bg-green-50/50'
                  : 'border-gray-300 bg-white/50'
            }
            ${disabled 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
              : 'hover:border-gray-400'
            }
            backdrop-blur-sm
            placeholder:text-gray-400
            focus:outline-none
            text-gray-900
          `}
        />

        {/* Success/Error Icon */}
        {(showSuccess || hasError) && !disabled && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {hasError ? (
              <AlertCircle className="w-5 h-5 text-red-400" />
            ) : showSuccess ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : null}
          </div>
        )}

        {/* Character Count */}
        {maxLength && (
          <div className="absolute right-3 bottom-1 text-xs text-gray-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{validationError || error}</span>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && !hasError && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Looks good!</span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
