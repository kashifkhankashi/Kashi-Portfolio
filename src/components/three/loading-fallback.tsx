"use client";

export default function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/50">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

