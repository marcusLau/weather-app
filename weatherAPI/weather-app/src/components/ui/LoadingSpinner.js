import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  return (
    <div className={`spinner spinner--${size}`}>
      <div className="spinner-inner"></div>
    </div>
  );
};

export default LoadingSpinner;