"use client";

import React from "react";

export default function Songs() {
  // const audioContext = new AudioContext();
  // const buffer = audioContext.createBuffer(2, 22050, 44100);
  // const channelData = buffer.getChannelData(0);
  // for (let i = 0; i < channelData.length; i++) {
  //   channelData[i] = Math.random() * 2 - 1;
  // }

  // function playWhiteNoise(e) {
  //   e.preventDefault();
  //   const source = audioContext.createBufferSource();
  //   source.buffer = buffer;
  //   source.connect(audioContext.destination);
  //   source.start();
  // }
  return (
    <>
      <h1 className="H1">Songs</h1>
      {/* <button onClick={playWhiteNoise}>White Noise</button> */}
    </>
  );
}
