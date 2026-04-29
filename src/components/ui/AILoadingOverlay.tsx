"use client";

import { useEffect, useState } from "react";
import { FiZap, FiCpu, FiEdit3, FiCheckCircle } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  stage?: "analyzing" | "translating" | "generating" | "finalizing";
}

const STAGES = [
  {
    key: "analyzing",
    icon: FiCpu,
    title: "Menganalisis Input",
    description: "AI sedang memahami produk dan target audience Anda...",
    color: "text-blue-400",
  },
  {
    key: "translating",
    icon: FiEdit3,
    title: "Menerjemahkan Konten",
    description: "Mengadaptasi konten ke bahasa target...",
    color: "text-purple-400",
  },
  {
    key: "generating",
    icon: FiZap,
    title: "Membuat Sales Page",
    description: "AI sedang menulis copy yang persuasif dan menarik...",
    color: "text-brand-400",
  },
  {
    key: "finalizing",
    icon: FiCheckCircle,
    title: "Finalisasi",
    description: "Menyempurnakan dan mengoptimalkan konten...",
    color: "text-green-400",
  },
];

export function AILoadingOverlay({ isOpen, stage = "analyzing" }: Props) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [dots, setDots] = useState("");

  // Auto-progress stages
  useEffect(() => {
    if (!isOpen) return;

    const stageIndex = STAGES.findIndex((s) => s.key === stage);
    if (stageIndex !== -1) {
      setCurrentStageIndex(stageIndex);
    }

    // Simulate stage progression if no specific stage provided
    if (stage === "analyzing") {
      const interval = setInterval(() => {
        setCurrentStageIndex((prev) => {
          if (prev < STAGES.length - 1) return prev + 1;
          return prev;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOpen, stage]);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const currentStage = STAGES[currentStageIndex];
  const Icon = currentStage.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/95 backdrop-blur-sm">
      <div className="max-w-md w-full mx-4">
        {/* Main Card */}
        <div className="card p-8 space-y-6 animate-fade-in">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Pulsing background */}
              <div className="absolute inset-0 bg-brand-500/20 rounded-full animate-ping" />
              
              {/* Icon container */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                <Icon className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h3 className={`text-xl font-bold ${currentStage.color}`}>
              {currentStage.title}{dots}
            </h3>
            <p className="text-white/60 text-sm">
              {currentStage.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/40">
              <span>Progress</span>
              <span>{Math.round(((currentStageIndex + 1) / STAGES.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-1000 ease-out"
                style={{
                  width: `${((currentStageIndex + 1) / STAGES.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="flex justify-between">
            {STAGES.map((stage, index) => {
              const StageIcon = stage.icon;
              const isActive = index === currentStageIndex;
              const isCompleted = index < currentStageIndex;

              return (
                <div
                  key={stage.key}
                  className={`flex flex-col items-center gap-2 transition-all ${
                    isActive
                      ? "scale-110"
                      : isCompleted
                      ? "opacity-50"
                      : "opacity-30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? "bg-green-500/20 border-green-500"
                        : isActive
                        ? "bg-brand-500/20 border-brand-500 animate-pulse"
                        : "bg-dark-700 border-dark-500"
                    }`}
                  >
                    <StageIcon
                      className={`w-5 h-5 ${
                        isCompleted
                          ? "text-green-400"
                          : isActive
                          ? "text-brand-400"
                          : "text-white/30"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-white/40 text-center max-w-[60px]">
                    {stage.title.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tips */}
          <div className="bg-brand-500/10 border border-brand-500/30 rounded-lg p-4">
            <p className="text-xs text-brand-300 text-center">
              💡 <strong>Tip:</strong> Proses ini biasanya memakan waktu 5-10 detik. 
              AI sedang membuat konten berkualitas tinggi untuk Anda.
            </p>
          </div>
        </div>

        {/* Powered by */}
        <div className="text-center mt-4 text-xs text-white/30">
          Powered by Advanced AI
        </div>
      </div>
    </div>
  );
}
