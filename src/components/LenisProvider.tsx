// src/components/LenisProvider.tsx
// Lenis removed: native browser scrolling is instant and conflict-free.
// The bounce-back was caused by Lenis fighting the browser's own scroll engine.
"use client";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
