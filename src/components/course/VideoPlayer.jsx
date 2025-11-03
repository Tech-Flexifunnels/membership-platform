import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoUrl, poster, onTimeUpdate, onEnded, className = '' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        poster={poster}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
