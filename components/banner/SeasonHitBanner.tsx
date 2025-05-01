"use client"

import { useRef, useEffect, useState } from "react"

interface SeasonHitBannerProps {
  subtitle?: string
  className?: string
  videoUrl?: string
}

export default function SeasonHitBanner({
  subtitle,
  className = "",
  videoUrl = "/assets/flames.mp4",
}: SeasonHitBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoaded = () => {
      setIsVideoLoaded(true)
    }

    video.addEventListener("loadeddata", handleLoaded)

    // If video is already loaded
    if (video.readyState >= 3) {
      setIsVideoLoaded(true)
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoaded)
    }
  }, [])

  return (
    <div
      className={`season-hit-banner ${className}`}
      style={{
        position: "relative",
        height: "100px",
        width: "100%",
        overflow: "hidden",
        borderRadius: "6px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Video Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
        {isVideoLoaded ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Skeleton loading animation
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))",
            zIndex: 2,
          }}
        />
      </div>

      {/* Text Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            padding: 0,
            fontSize: "24px",
            fontWeight: 700,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>Хіт</span>
          <span style={{ fontWeight: 500 }}>сезону</span>
          {subtitle && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "10px",
                opacity: 0.9,
              }}
            >
              {subtitle}
            </span>
          )}
        </h2>
      </div>

      {/* Add global style for skeleton animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}
