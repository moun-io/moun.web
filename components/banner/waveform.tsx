"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import WaveSurfer from "wavesurfer.js";

const AudioWaveform = ({ url }: { url: string }) => {
  const waveFormRef = useRef(null);

  // Create your own media element
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveFormRef.current) return;
    // Create a WaveSurfer instance and pass the media element
    wavesurfer.current = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "black",
      progressColor: "purple",
      url: url,
      cursorWidth: 0,

      interact: true,
      height: 50,
      width: 300,
      barHeight: 0.7,
      barWidth: 0.5,
      barGap: 1,
    });
    wavesurfer.current.on("click", () => {
      if (wavesurfer.current) wavesurfer.current.play();
    });

    return () => {
      if (wavesurfer.current) wavesurfer.current.destroy();
    };
  }, [url]);

  const handlePlay = () => {
    // Check if wavesurfer is already initialized and ready
    if (wavesurfer.current) {
      // If AudioContext is not started, this user gesture can help start it
      wavesurfer.current.playPause(); // Or any appropriate method to start/resume playback
    }
  };

  return (
    <div className="flex gap-4 items-center">
      {/* <button
        onClick={handlePlay}
        className="rounded-full size-10 bg-purple-300 cursor-pointer"
      >
        p
      </button> */}
      <div ref={waveFormRef}></div>
    </div>
  );
};

export default AudioWaveform;
