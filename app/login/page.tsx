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

  useEffect(() => {
    const fetchFingerprint = async () => {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
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
        router.push("/course/1");
      }
      if (response.status === 401) {
        const data = await response.json();
        setUserId(data.userId);
        setFingerprints(data.fingerprints);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logoutDevice = async (DeviceFingerprint: string) => {
    try {
      const response = await fetch("/api/user/logout-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          deviceToDelete: DeviceFingerprint,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-lg border border-gray-800 bg-[#020817]/50 backdrop-blur-sm">
        <h1 className="text-2xl font-semibold text-white mb-2">Login</h1>
        <p className="text-gray-400 mb-6">
          Enter your email and password to login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-gray-400">
              email
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
      {userId && (
        <div>
          {fingerprints.length > 0 && (
            <div>
              {fingerprints.map((fingerprint, id) => (
                <div
                  key={id}
                  className="flex flex-row items-center justify-center"
                >
                  <p className="text-white">{fingerprint}</p>
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
      )}
    </div>
  );
}
