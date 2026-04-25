"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";

interface MuxVideoPlayerProps {
  playbackId: string;
  className?: string;
}

export default function MuxVideoPlayer({
  playbackId,
  className = "",
}: MuxVideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      loading="viewport"
      autoPlay="muted"
      loop
      muted
      playsInline
      style={{
        aspectRatio: "16/9",
        width: "100%",
        height: "100%",
        // Hide all player UI chrome — we only want the video
        // as a background element
        ["--controls" as string]: "none",
        ["--media-object-fit" as string]: "cover",
        ["--media-object-position" as string]: "center",
      }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
