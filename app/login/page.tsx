"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [visitorId, setVisitorId] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [fingerprints, setFingerprints] = useState<string[]>([]);
  const [isMulti, setIsMulti] = useState(false);

  useEffect(() => {
    const fetchFingerprint = async () => {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      console.log(result);
      setVisitorId(result.visitorId);
    };

    fetchFingerprint();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          deviceFingerprint: visitorId,
        }),
      });

      if (response.status === 200) {
        router.push("/home");
      }

      if (response.status === 401) {
        const data = await response.json();
        setUserId(data.userId);
        setFingerprints(data.fingerprints);
        setIsMulti(true);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logoutDevice = async (deviceFingerprint: string) => {
    try {
      const res = await fetch("/api/user/logout-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          deviceToDelete: deviceFingerprint,
        }),
      });
      if (res.status == 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      {isMulti ? (
        <div className="flex flex-col w-full h-screen bg-black items-center p-4">
          <div className="flex flex-col items-center mt-10 gap-4 w-full max-w-lg text-center">
            <p className="text-white font-semibold text-2xl md:text-3xl">
              Log Out of Other Sessions
            </p>
            <p className="text-gray-500 text-sm md:text-base">
              You are logged in on multiple devices. To ensure account security
              and optimal performance, please log out from other devices or
              continue with this session only.
            </p>
          </div>

          <div className="flex flex-col w-full max-w-md mt-6 gap-4 space-y-4">
            {/* <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-lg w-full">
              <img
                className="w-12 h-12 rounded-full border border-white"
                src="/smartphone.png"
                alt="Smartphone"
              />
              <div className="flex flex-col flex-1">
                <p className="text-white">{fingerprints[0]}</p>
                <p className="text-gray-400 text-sm">
                  Miyapur, Hyderabad, Telangana 3 days ago
                </p>
              </div>
              <button className="bg-black text-white border border-white px-4 py-1 text-sm rounded-lg">
                Log out
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-lg w-full">
              <img
                className="w-12 h-12 rounded-full border border-white"
                src="/laptop.png"
                alt="Laptop"
              />
              <div className="flex flex-col flex-1">
                <p className="text-white">{fingerprints[1]}</p>
                <p className="text-gray-400 text-sm">
                  Miyapur, Hyderabad, Telangana 5 days ago
                </p>
              </div>
              <button className="bg-black text-white border border-white px-4 py-1 text-sm rounded-lg">
                Log out
              </button>
            </div> */}
            {fingerprints.length > 0 && (
              <div className="flex flex-col items-center justify-center space-y-4">
                {fingerprints.map((fingerprint, id) => (
                  <div
                    key={id}
                    className="flex flex-row items-center justify-center gap-4 p-4 border border-gray-700 rounded-lg"
                  >
                    <p className="text-white">Device ID: {fingerprint}</p>
                    <Button
                      className="bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-md transition-colors"
                      onClick={() => logoutDevice(fingerprint)}
                    >
                      Logout
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 rounded-lg border border-gray-800 bg-[#020817]/50 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold text-white mb-2">Login</h1>
          <p className="text-gray-400 mb-6">
            Enter your email and password to login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email
              </label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-400">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="text-sm">
              <span className="text-gray-400">Forgot Password? </span>
              <a href="#" className="text-violet-500 hover:text-violet-400">
                Click here
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2 rounded-md transition-colors"
            >
              Login
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
