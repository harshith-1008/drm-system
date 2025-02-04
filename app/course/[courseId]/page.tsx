import { ChevronLeft, Clock, Video, Book } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function CourseContent() {
  return (
    <div className="min-h-screen bg-[#020817] text-white p-6">
      {/* Header */}
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2012.38.18%E2%80%AFAM-2rZXeu27KVwq6X87jZen8B3fRLy1yc.png"
            alt="User"
            className="rounded-full"
          />
        </Avatar>
      </div>

      <div className="max-w-7xl mx-auto">
        <p className="text-gray-400 mb-8">E-Learning Learn anytime, anywhere with our e-learning course.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Syllabus Timeline */}
          <div className="space-y-8">
            {syllabus.map((topic, index) => (
              <div key={index} className="relative pl-8 border-l border-gray-800">
                <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-violet-600" />
                <h3 className="text-xl font-semibold mb-4">{topic.title}</h3>
                <ul className="space-y-3">
                  {topic.items.map((item, i) => (
                    <li key={i} className="text-gray-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="space-y-8">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2012.38.18%E2%80%AFAM-2rZXeu27KVwq6X87jZen8B3fRLy1yc.png"
                alt="UI/UX Design"
                className="w-full object-cover"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-4">
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

            {/* Quizzes */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Quizzes</h3>
              <div className="space-y-4">
                {quizzes.map((quiz, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-900/30 border border-gray-800">
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
  )
}

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
]

const quizzes = [
  {
    title: "Quiz_1",
    topics: [
      "Difference between UI and UX",
      "Key design principles (contrast, alignment, proximity)",
      "Role of user research in UX",
    ],
  },
  {
    title: "Quiz_2",
    topics: [
      "Low-fidelity vs. high-fidelity wireframes",
      "Tools for wireframing (Figma, Adobe XD, Sketch)",
      "Importance of prototyping in UI/UX",
    ],
  },
  {
    title: "Quiz_3",
    topics: [
      "Web Content Accessibility Guidelines (WCAG)",
      "Importance of usability testing",
      "Designing for different user needs",
    ],
  },
]