import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CoursesDashboard() {
  return (
    <div className="min-h-screen bg-[#020817] text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Welcome Back!</h1>
          <p className="text-xl text-gray-400">Dhanush</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search courses"
              className="w-[300px] pl-10 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User"
            />
            <AvatarFallback>DN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Course Section */}

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">My Courses</h2>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-gray-900/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ongoing">On Going</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* First Course */}
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800"
            >
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg mb-4">{course.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/75.jpg" />
                    <AvatarFallback>SH</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-400">
                    {course.instructor.name}
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mb-4">
                  <div
                    className="bg-violet-600 h-full rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.videos} videos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.lessons}+</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Second Course - Duplicate First */}
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800"
            >
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg mb-4">{course.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/75.jpg" />
                    <AvatarFallback>SH</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-400">
                    {course.instructor.name}
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mb-4">
                  <div
                    className="bg-violet-600 h-full rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.videos} videos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.lessons}+</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Third Course - Duplicate First */}
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800"
            >
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg mb-4">{course.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/75.jpg" />
                    <AvatarFallback>SH</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-400">
                    {course.instructor.name}
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mb-4">
                  <div
                    className="bg-violet-600 h-full rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.videos} videos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.lessons}+</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Fourth Course - Duplicate First */}
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800"
            >
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg mb-4">{course.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/75.jpg" />
                    <AvatarFallback>SH</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-400">
                    {course.instructor.name}
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full mb-4">
                  <div
                    className="bg-violet-600 h-full rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.videos} videos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{course.lessons}+</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const courses = [
  {
    title: "E-Learning Learn anytime, anywhere with our e-learning course.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2012.36.29%E2%80%AFAM-DxxgErrHdnSZLAXjYwUnZXmB6GzLKa.png",
    instructor: {
      name: "Sai Harshith",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2012.36.29%E2%80%AFAM-DxxgErrHdnSZLAXjYwUnZXmB6GzLKa.png",
    },
    progress: 75,
    duration: "32hrs",
    videos: "8+",
    lessons: "25",
  },
  // Add more courses as needed...
];
