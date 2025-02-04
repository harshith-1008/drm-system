"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChevronLeft, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import VideoPlayer from "@/components/videojsPlayer";
import "video.js/dist/video-js.css";
import { useRef, useEffect, useState } from "react";

export default function LessonView() {
  const playerRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/");
  const videoId = segments[segments.length - 1] || "";
  const [videoLink, setVideoLink] = useState<string>();
  const [videoData, setVideoData] = useState();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/video/getVideo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: videoId,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setVideoData(data.data);
          setVideoLink(data.data.bucketLink);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    if (videoId) fetchVideo();
  }, [videoId]);

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
        withCredentials: true,
      },
    ],
    userActions: {
      doubleClick: true,
      hotkeys: false,
    },
    controlbar: {
      fullScreenToggle: true,
      playToggle: true,
    },
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  useEffect(() => {
    const disableRightClick = (event: MouseEvent) => event.preventDefault();
    const disableShortcuts = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        (event.key === "u" ||
          event.key === "s" ||
          event.key === "i" ||
          event.key === "j" ||
          event.key === "c")
      ) {
        event.preventDefault();
      }
      if (event.key === "F12") {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableShortcuts);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold">UI/UX Development</h1>
          </div>
          <Select defaultValue="week1">
            <SelectTrigger className="w-[120px] bg-gray-900/50 border-gray-800">
              <SelectValue placeholder="Select week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week1">Week 1</SelectItem>
              <SelectItem value="week2">Week 2</SelectItem>
              <SelectItem value="week3">Week 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Avatar className="h-12 w-12">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2011.43.58%E2%80%AFAM-3n2FuAQu4u3tro7fh9uhFhGct34e29.png"
            alt="User"
            className="rounded-full"
          />
        </Avatar>
      </div>

      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 mb-8">
          E-Learning Learn anytime, anywhere with our e-learning course.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Introduction to UI/UX
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800" />

              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={index} className="relative pl-8 py-2">
                    <div
                      className={`absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full ${
                        index === 0 ? "bg-violet-600" : "bg-gray-800"
                      } z-10`}
                    />
                    <div
                      className={`${
                        index === 0 ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {lesson.title}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="relative bg-violet-700 rounded-lg overflow-hidden h-[18rem]">
              {/* <VideoPlayer
                options={{
                  controls: true,
                  responsive: true,
                  fluid: true,
                  sources: [
                    {
                      src: "https://drm-system-hackatho.s3.ap-south-2.amazonaws.com/a863daf9-3526-4571-a5ce-ed496b187905", // The encrypted M3U8 link
                      type: "application/x-mpegURL",
                    },
                  ],
                }}
                onReady={(player) => {
                  console.log("Player is ready", player);
                }}
              /> */}
              {videoLink && (
                <VideoPlayer
                  options={videoPlayerOptions}
                  onReady={handlePlayerReady}
                />
              )}
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Key Points</h3>
              <ul className="space-y-4 text-gray-400">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex gap-2">
                    <span>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const lessons = [
  { title: "Understanding UI vs. UX", duration: "2hrs" },
  { title: "Importance of UI/UX in product design", duration: "2hrs30mins" },
  { title: "Career paths in UI/UX", duration: "1hr" },
  {
    title: "Overview of design tools (Figma, Adobe XD, Sketch)",
    duration: "2hrs",
  },
];

const keyPoints = [
  "UI vs. UX – Know the difference and importance understand user needs and behaviors design for all users.",
  "User Research – Understand user needs and behaviors plan and visualize designs.",
  "Wireframing & Prototyping – Plan and visualize designs focus on colors, typography, and layout.",
  "Visual Design – Focus on colors, typography, and layout.",
  "Usability & Accessibility – Design for all users typography, and layout.",
  "Testing & Iteration – Improve through feedback.",
];
