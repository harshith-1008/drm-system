import { ChevronLeft, Clock, Video, Book } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CourseContent() {
  return (
    <div className="min-h-screen bg-[#020817] text-white px-6 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold">UI/UX Development</h1>
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
        <p className="text-gray-400 mb-6">
          E-Learning: Learn anytime, anywhere with our e-learning course.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Syllabus Timeline */}
          <div className="space-y-6">
            {syllabus.map((topic, index) => (
              <div
                key={index}
                className="relative pl-6 border-l border-gray-800"
              >
                <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-violet-600" />
                <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
                <ul className="space-y-2">
                  {topic.items.map((item, i) => (
                    <li key={i} className="text-gray-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Course Content */}
          <div className="space-y-6">
            {/* Image Section */}

            <div className="rounded-lg overflow-hidden">
              <img
                src="/image3.jpg"
                alt="UI/UX Design"
                className="w-[100%] h-[100%] object-cover aspect-[16/6] rounded-md"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>32hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span>8+ videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span>25+</span>
                </div>
              </div>
            </div>

            {/* Quizzes Section */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Quizzes</h3>
              <div className="space-y-4">
                {quizzes.map((quiz, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-900/30 border border-gray-800"
                  >
                    <h4 className="font-medium mb-2">{quiz.title}</h4>
                    <ul className="space-y-1">
                      {quiz.topics.map((topic, i) => (
                        <li key={i} className="text-sm text-gray-400">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Syllabus Data
const syllabus = [
  {
    title: "Introduction to UI/UX",
    items: [
      "Understanding UI vs. UX",
      "Importance of UI/UX in product design",
      "Career paths in UI/UX",
      "Overview of design tools (Figma, Adobe XD, Sketch)",
    ],
  },
  {
    title: "Design Principles & User Research",
    items: [
      "Principles of good UI/UX design",
      "Color theory, typography, and layout",
      "User research methods & techniques",
      "Creating user personas & journey maps",
    ],
  },
  {
    title: "Wireframing & Prototyping",
    items: [
      "Basics of wireframing",
      "Low-fidelity vs. high-fidelity wireframes",
      "Tools for wireframing and prototyping",
      "Interactive prototyping basics",
    ],
  },
  {
    title: "UI Design & Visual Aesthetics",
    items: [
      "Creating UI components (buttons, forms, navigation)",
      "Design consistency & branding",
      "Responsive & adaptive design principles",
      "Designing for mobile vs. web",
    ],
  },
];

// Quizzes Data
const quizzes = [
  {
    title: "Quiz 1",
    topics: [
      "Difference between UI and UX",
      "Key design principles (contrast, alignment, proximity)",
      "Role of user research in UX",
    ],
  },
  {
    title: "Quiz 2",
    topics: [
      "Low-fidelity vs. high-fidelity wireframes",
      "Tools for wireframing (Figma, Adobe XD, Sketch)",
      "Importance of prototyping in UI/UX",
    ],
  },
  {
    title: "Quiz 3",
    topics: [
      "Web Content Accessibility Guidelines (WCAG)",
      "Importance of usability testing",
      "Designing for different user needs",
    ],
  },
];
