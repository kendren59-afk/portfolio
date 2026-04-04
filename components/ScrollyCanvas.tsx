"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Total number of frames in the sequence
  const frameCount = 75;

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) to frame index (0 to 74)
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Format number to '00' padding
      const paddedIndex = i.toString().padStart(2, "0");
      img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          // All images loaded
          setImages(loadedImages);
          // Draw the first frame on load
          drawFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (index: number, imgArray: HTMLImageElement[] = images) => {
    if (imgArray.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgArray[index];
    if (!img) return;

    // object-fit: cover logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let renderWidth, renderHeight, offsetX = 0, offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      renderHeight = canvas.height;
      offsetX = (canvas.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Add subtle background blending if needed, but our dark bg fixes this
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  // Redraw when scroll progresses
  useMotionValueEvent(currentIndex, "change", (latest: number) => {
    const index = Math.round(latest);
    drawFrame(index);
  });

  // Handle window resize properly
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Adjust resolution for Retina displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        // Re-draw current frame
        drawFrame(Math.round(currentIndex.get()));
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
