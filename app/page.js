"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  BsFillStopFill,
  BsFillPlayFill,
  BsSkipForward,
  BsSkipBackward,
} from "react-icons/bs";

export default function Home() {
  const waveformRef = useRef(null);
  let wavesurfer;

  useEffect(() => {
    wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#34374B",
      progressColor: "#F90",
      url: "/oceans.mp3",
      dragToSeek: true,
      width: "35vw",
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 60,
      barHeight: 20,
      barRadius: 20,
      barWidth: 5,
    });

    wavesurfer.on("finish", () => {
      console.log("song finished");
    });

    wavesurfer.on("ready", () => {
      console.log("Waveform is ready");
    });

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  const handleStop = () => {
    if (wavesurfer) {
      wavesurfer.stop();
    }
  };

  const handlePause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  const handleSkipForward = () => {
    if (wavesurfer) {
      wavesurfer.skip(2);
    }
  };

  const handleSkipBack = () => {
    if (wavesurfer) {
      wavesurfer.skip(-2);
    }
  };

  return (
    <div className="container">
      <div className="sub-container">
        <Image
          src="/oceans.jpg"
          width={1000}
          height={1000}
          className="audio-image"
        />
        <p>Oceans</p>
        <div ref={waveformRef} className="wavesurfer-container" />
        <div className="wavesurfer-controls">
          <button onClick={handleSkipBack}>
            <BsSkipBackward />
          </button>
          <button onClick={handlePause}>
            <BsFillPlayFill />
          </button>
          <button onClick={handleStop}>
            <BsFillStopFill />
          </button>
          <button onClick={handleSkipForward}>
            <BsSkipForward />
          </button>
        </div>
      </div>
    </div>
  );
}
