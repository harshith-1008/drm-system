import React from "react";
import { Upload } from "lucide-react";

export default function Create() {
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center p-4">
      <div className="flex flex-col items-start border border-white p-6 rounded-lg max-w-lg w-full">
        <p className="text-white font-bold text-xl mb-4">Course Details</p>

        <div className="flex flex-col w-full">
          <p className="text-white mb-2">Course Name</p>
          <input
            type="text"
            placeholder="Enter your course name"
            className="bg-gray-800 text-gray-500 p-2 rounded"
          />
        </div>

        <div className="flex flex-col w-full mt-4">
          <p className="text-white mb-2">Description</p>
          <input
            type="text"
            placeholder="Enter course description"
            className="bg-gray-800 text-gray-500 p-2 rounded"
          />
        </div>

        <div className="flex flex-col sm:flex-row w-full mt-4 gap-4">
          <div className="flex flex-col w-full">
            <p className="text-white mb-2">Course Price</p>
            <input
              type="text"
              placeholder="Enter course price"
              className="bg-gray-800 text-gray-500 p-2 rounded"
            />
          </div>

          <div className="flex flex-col w-full">
            <p className="text-white mb-2">Duration</p>
            <input
              type="text"
              placeholder="Enter course duration"
              className="bg-gray-800 text-gray-500 p-2 rounded"
            />
          </div>
        </div>

        <div className="flex flex-col w-full mt-4">
          <p className="text-white mb-2">Course Content</p>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-500 rounded-lg bg-gray-900 cursor-pointer hover:border-gray-300 transition">
            <Upload size={32} className="text-gray-400 mb-2" />
            <p className="text-gray-400 text-sm">Upload course video</p>
            <p className="text-gray-500 text-xs">(10GB)</p>
            <input type="file" className="hidden" />
          </label>
        </div>

        <button className="bg-purple-800 text-white font-bold p-2 rounded mt-4 w-full">
          Submit
        </button>
      </div>
    </div>
  );
}
