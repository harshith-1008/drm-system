import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoPlayer = (props: any) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);
  const [iv, setIv] = useState<string | null>(null);

  const { options, onReady } = props;

  // Function to fetch the encryption key and IV from the backend API
  const fetchEncryptionData = async () => {
    try {
      const res = await fetch("/api/get-keys");
      if (res.ok) {
        const key = await res.text();
        const iv = res.headers.get("X-IV");
        setEncryptionKey(key);
        setIv(iv);
      } else {
        console.error("Failed to fetch encryption data");
      }
    } catch (error) {
      console.error("Error fetching encryption data:", error);
    }
  };

  // Initialize the video.js player and set up the decryption
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      player.on("loadedmetadata", () => {
        if (encryptionKey && iv) {
          setupDecryption(player, encryptionKey, iv);
        }
      });
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options, encryptionKey, iv, videoRef]);

  // Set up decryption for the M3U8 stream
  const setupDecryption = (player: any, encryptionKey: string, iv: string) => {
    const hls = player.tech().hls;
    hls.xhr.beforeRequest = (xhr: any) => {
      xhr.setRequestHeader("X-Encryption-Key", encryptionKey);
      xhr.setRequestHeader("X-IV", iv);
      return xhr;
    };
  };

  // Fetch the encryption key and IV on mount
  useEffect(() => {
    fetchEncryptionData();
  }, []);

  return (
    <div data-vjs-player style={{ width: "600px" }}>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
