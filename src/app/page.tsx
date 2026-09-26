"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import SplitType from "split-type";
import { siteInfo, galleryItems } from "@/data/siteContent";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);
    const ctx = gsap.context(() => {
      // 1. Hero Text Stagger
      const title = new SplitType("#hero-title", { types: "chars" });
      const sub = new SplitType("#hero-subtitle", { types: "words" });
      
      gsap.to(title.chars, { y: 0, opacity: 1, stagger: 0.08, duration: 1.5, ease: "expo.out", delay: 0.2 });
      gsap.to(sub.words, { y: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: "expo.out", delay: 1.0 });

      // 2. Apple Sequence Animation
      const canvas = document.getElementById("scroll-canvas") as HTMLCanvasElement;
      const canvasCtx = canvas?.getContext("2d");
      if (canvas && canvasCtx) {
        canvas.width = 1920;
        canvas.height = 1080;
        const frameCount = 20;
        const images: HTMLImageElement[] = [];
        const seq = { frame: 0 };

        for (let i = 1; i <= frameCount; i++) {
          const img = new Image();
          img.src = `/sequence/ezgif-frame-${i.toString().padStart(3, '0')}.png`;
          images.push(img);
        }

        const tlSequence = gsap.timeline({
          scrollTrigger: {
            trigger: ".video-section",
            start: "top top",
            end: "+=2500",
            scrub: 0.8,
            pin: true,
          }
        });

        tlSequence.to(seq, {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          duration: 1,
          onUpdate: () => {
            if (images[seq.frame] && images[seq.frame].complete) {
              canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
              canvasCtx.drawImage(images[seq.frame], 0, 0, canvas.width, canvas.height);
            }
          }
        }, 0);

        images[0].onload = () => {
          canvasCtx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
        };

        tlSequence.to("#video-text-1", { opacity: 1, duration: 0.1 }, 0.1)
                  .to("#video-text-1", { opacity: 0, duration: 0.1 }, 0.4)
                  .to("#video-text-2", { opacity: 1, duration: 0.1 }, 0.6)
                  .to("#video-text-2", { opacity: 0, duration: 0.1 }, 0.9);
      }

      // 3. SVG Mask Reveal
      const tlMask = gsap.timeline({
        scrollTrigger: { trigger: ".mask-section", start: "top top", end: "+=1500", scrub: 0.8, pin: true }
      });
      // Fix: Fade out and slide up the background text to prevent overlap when circle expands
      tlMask.to("#mask-bg-text", { opacity: 0, y: -50, duration: 0.3, ease: "power2.out" }, 0);
      tlMask.to(".mask-container", { "--mask": "250vmax", duration: 1, ease: "power1.inOut" }, 0.1);
      tlMask.to("#mask-reveal-text", { opacity: 1, duration: 0.2 }, 0.6);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 4. Flip Animation for Gallery
  const handleFilter = (newFilter: string) => {
    const state = Flip.getState(".gallery-item");
    setFilter(newFilter);
    setTimeout(() => {
      Flip.from(state, {
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.05,
        scale: true,
        absolute: true,
        onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4 }),
        onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 })
      });
    }, 0);
  };

  return (
    <main ref={containerRef}>
      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative z-10">
        <div className="clip-text overflow-hidden">
          <h1 id="hero-title" className="font-serif text-6xl md:text-9xl font-bold text-gradient pb-2 tracking-wide">{siteInfo.name}</h1>
        </div>
        <div className="clip-text overflow-hidden mt-6">
          <p id="hero-subtitle" className="text-xl md:text-3xl text-caramel italic">{siteInfo.subtitle}</p>
        </div>
      </section>

      {/* Sequence Scroll */}
      <section className="video-section h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
          <canvas id="scroll-canvas" className="w-full h-full object-cover opacity-70 max-w-full"></canvas>
          <div id="video-text-1" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-serif text-4xl md:text-6xl tracking-widest opacity-0 w-full text-center drop-shadow-2xl">每一個清晨，從純粹開始。</div>
          <div id="video-text-2" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-serif text-4xl md:text-6xl tracking-widest opacity-0 w-full text-center drop-shadow-2xl">為您準備好，專屬的靜謐角落。</div>
        </div>
      </section>

      {/* Mask Reveal */}
      <section className="mask-section h-[250vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center bg-oat overflow-hidden">
          <h2 id="mask-bg-text" className="text-4xl md:text-6xl font-serif text-coffee text-center z-0 px-4 tracking-widest">探索，極致工藝</h2>
          <div className="mask-container z-10 absolute inset-0 w-full h-full">
            <img src="/cozy_coffee_latte_art_1790311102024.jpg" className="w-full h-full object-cover brightness-85" alt="Latte Art" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2 id="mask-reveal-text" className="text-5xl md:text-7xl font-serif text-white opacity-0 tracking-widest text-center px-4 drop-shadow-2xl">
                精湛工藝<br/><span className="text-3xl text-caramel italic mt-4 inline-block">暖心拿鐵</span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-32 px-8 max-w-6xl mx-auto relative z-20">
        <h2 className="font-serif text-5xl text-center mb-12 tracking-widest">關於我們</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "space", "team"].map(f => (
            <button key={f} onClick={() => handleFilter(f)} className={`px-8 py-3 rounded-full border border-caramel transition font-medium tracking-wide focus:outline-none focus:ring-2 focus:ring-coffee focus:ring-offset-2 focus:ring-offset-oat ${filter === f ? 'bg-caramel text-coffee shadow-md' : 'text-coffee hover:bg-caramel hover:text-coffee'}`}>
              {f === 'all' ? '全部 (All)' : f === 'space' ? '空間 (Space)' : '靈魂人物 (Team)'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="gallery">
          {galleryItems.map(item => (
            <div key={item.id} data-category={item.category} className={`gallery-item relative aspect-square rounded-xl overflow-hidden group ${filter === 'all' || filter === item.category ? 'block' : 'hidden'}`}>
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 font-serif opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-coffee text-oat py-16 text-center border-t-8 border-caramel">
        <p className="font-serif text-4xl mb-4 tracking-widest">{siteInfo.name}</p>
        <p className="text-sm opacity-60 font-serif italic mb-6">{siteInfo.subtitle}</p>
        <p className="opacity-50 text-xs tracking-wider">© 2026 {siteInfo.name}. Address: {siteInfo.address}</p>
      </footer>
    </main>
  );
}
