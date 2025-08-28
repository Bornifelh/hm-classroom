import React from "react";
import "./CircularProgress.css";

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 60,
  strokeWidth = 6,
  showPercentage = true,
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`circular-progress ${className}`}
      style={{ width: size, height: size }}>
      <svg width={size} height={size} className="circular-progress-svg">
        {/* Cercle de fond */}
        <circle
          className="circular-progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Cercle de progression */}
        <circle
          className="circular-progress-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* Pourcentage au centre */}
      {showPercentage && (
        <div className="circular-progress-text">{Math.round(progress)}%</div>
      )}
    </div>
  );
};

export default CircularProgress;
