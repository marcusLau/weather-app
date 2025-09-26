import './Input.css';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyPress,
  hasError = false,
  errorMessage,
  className = ''
}) => {
  return (
    <div className={`input-container ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className={`input ${hasError ? 'input--error' : ''}`}
      />
      {hasError && errorMessage && (
        <span className="input-error-message">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;