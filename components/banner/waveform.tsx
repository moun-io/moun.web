"use client";
import React, { use, useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

export default function WaveForm({
  url,
  songId,
  play,
  setPlay,
  large = false,
}: {
  url: string;
  play: string | null;
  songId: string;
  setPlay: any;
  large?: boolean;
}) {
  const waveFormRef = useRef(null);

  // Create your own media element
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveFormRef.current) return;
    // Create a WaveSurfer instance and pass the media element
    wavesurfer.current = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#D9D9D9",
      progressColor: "#292929",
      url: url,

      cursorWidth: 0,
      height: 50,
      barHeight: 0.7,
      barWidth: 1,
      barGap: 1,
    });
    wavesurfer.current.on("click", () => {
      if (wavesurfer.current) setPlay(songId);
    });

    return () => {
      if (wavesurfer.current) wavesurfer.current.destroy();
    };
  }, [url, setPlay, songId]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (play === null) {
        wavesurfer.current.pause();
      } else if (play === songId) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [play, songId]);

  const handlePlay = () => {
    // Check if wavesurfer is already initialized and ready
    if (wavesurfer.current) {
      // If AudioContext is not started, this user gesture can help start it
      wavesurfer.current.playPause(); // Or any appropriate method to start/resume playback
    }
  };

  return (
    <div className="flex gap-4 items-center cursor-pointer">
      <div ref={waveFormRef} className="w-full"></div>
    </div>
  );
}
