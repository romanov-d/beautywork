"use client";

import { useRef, useEffect } from "react";

interface BunnyBackgroundProps {
  src: string;
  placeholder?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  children?: React.ReactNode;
}

export default function BunnyBackground({
  src,
  placeholder,
  className = "",
  autoPlay = true,
  loop = true,
  children
}: BunnyBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: any = null;
    async function initVideo() {
      const video = videoRef.current;
      if (!video) return;

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        if (autoPlay) video.play().catch(() => {});
      } else {
        try {
          const Hls = (await import("hls.js")).default;
          if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (autoPlay) video.play().catch(() => {});
            });
          }
        } catch { /* no HLS support */ }
      }
    }
    initVideo();
    return () => {
      if (hls) hls.destroy();
    };
  }, [src, autoPlay]);

  return (
    <div 
      className={`bunny-bg ${className}`}
      data-bunny-background-init=""
      data-player-src={src}
      data-player-status="idle"
      data-player-lazy="false"
      data-player-autoplay={autoPlay}
      data-player-activated="false"
    >
      <video 
        ref={videoRef}
        preload="metadata"
        width={1920}
        height={1080}
        playsInline
        muted
        loop={loop}
        className="bunny-bg__video"
      />
      {placeholder && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="bunny-bg__placeholder" src={placeholder} alt="" loading="lazy" />
      )}
      <div data-player-control="playpause" className="bunny-bg__playpause">
        <div className="bunny-bg__btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="bunny-bg__pause-svg">
            <path d="M16 5V19" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" />
            <path d="M8 5V19" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="bunny-bg__play-svg">
            <path d="M6 12V5.01109C6 4.05131 7.03685 3.4496 7.87017 3.92579L14 7.42855L20.1007 10.9147C20.9405 11.3945 20.9405 12.6054 20.1007 13.0853L14 16.5714L7.87017 20.0742C7.03685 20.5503 6 19.9486 6 18.9889V12Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="bunny-bg__loading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" className="bunny-bg__loading-svg vimeo-player__loading-svg" fill="none">
          <path fill="currentColor" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      {children}
    </div>
  );
}
