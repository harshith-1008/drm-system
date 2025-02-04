import { ChevronLeft, Play, Maximize2, Clock } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
          // console.log(data);
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
  // console.log(videoData);
  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
        withCredentials: true, // Set to true if your API requires authentication
      },
    ],
  };
  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // player.on("waiting", () => {
    //   videojs.log("player is waiting");
    // });

    // player.on("dispose", () => {
    //   videojs.log("player will dispose");
    // });
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors ">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <Link href="/course/introduction-to-ui-ux">
              <h2 className="text-2xl font-semibold ">Introduction to UI/UX</h2>
            </Link>
          </div>
        </div>
        <Avatar className="h-12 w-12">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
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
            <div className="relative bg-violet-700 rounded-lg overflow-hidden">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2011.43.58%E2%80%AFAM-3n2FuAQu4u3tro7fh9uhFhGct34e29.png"
                    alt="Instructor"
                    className="rounded-full"
                  />
                </Avatar>
                <span className="text-sm">Sai Harshith</span>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-sm">
                Learn UI/UX design essentials
              </div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2011.43.58%E2%80%AFAM-3n2FuAQu4u3tro7fh9uhFhGct34e29.png"
                alt="Course Video"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Play className="h-6 w-6" />
                  </button>
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-gray-600 rounded-full">
                      <div className="h-full w-2/3 bg-red-500 rounded-full" />
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Maximize2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
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
