"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function CofficeLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero 入場動畫 (文字淡入與錯位浮現)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".hero-bg", 
      { scale: 1.15, filter: "brightness(0.3)" },
      { scale: 1, filter: "brightness(0.6)", duration: 2.5 }
    )
    .fromTo(".hero-title-word",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
      "-=1.5"
    )
    .fromTo(".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );

    // 2. GSAP Pin Spacing (固定視差滾動) - 產地故事區塊
    ScrollTrigger.create({
      trigger: ".story-section",
      start: "top top",
      end: "+=1000",
      pin: true,
      pinSpacing: true,
      scrub: 1, // 加入 scrub 綁定滾輪，支援完美倒帶與刷碟效果
      animation: gsap.timeline()
        .fromTo(".story-text", { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 1 })
        .fromTo(".story-image-overlay", { xPercent: 100 }, { xPercent: 0, duration: 1 }, "<")
        .fromTo(".story-quote", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
    });

    // 3. 豆單卡片交錯進場 (ScrollTrigger Stagger)
    gsap.fromTo(".bean-card",
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".beans-section",
          start: "top 70%",
        }
      }
    );

    // 4. Parallax Image Effect
    gsap.utils.toArray<HTMLElement>('.parallax-img').forEach(img => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-coffice-bg text-coffice-text font-sans selection:bg-coffice-gold selection:text-coffice-bg overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 flex justify-between items-center p-6 bg-coffice-bg/80 backdrop-blur-md border-b border-[#333333]">
        <div className="text-2xl font-serif text-coffice-gold tracking-widest uppercase">Coffice</div>
        <div className="hidden md:flex gap-8 text-sm tracking-widest text-coffice-text/70">
          <a href="#beans" className="hover:text-coffice-gold transition-colors">單品豆單</a>
          <a href="#story" className="hover:text-coffice-gold transition-colors">產地故事</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/bg.jpg" alt="Coffice Background" className="hero-bg w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-coffice-bg"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 overflow-hidden">
          <h1 className="text-6xl md:text-8xl font-serif mb-6 text-white tracking-widest flex justify-center gap-4 overflow-hidden py-2">
            <span className="hero-title-word inline-block">尋找</span>
            <span className="hero-title-word inline-block text-coffice-gold">極致</span>
            <span className="hero-title-word inline-block">的風味</span>
          </h1>
          <p className="hero-subtitle text-lg md:text-2xl font-light tracking-[0.2em] text-coffice-text/80 mt-8">
            精品職人烘焙 ‧ 探索世界咖啡莊園
          </p>
        </div>
      </header>

      {/* Origin Story Section (Pinned) */}
      <section id="story" className="story-section relative h-screen w-full flex items-center bg-coffice-bg overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
           <div className="w-full h-full overflow-hidden">
             <img src="/images/cozy_coffee_latte_art_1790311102024.jpg" alt="Latte Art" className="parallax-img w-full h-[120%] object-cover opacity-30" />
           </div>
           {/* Slider Overlay */}
           <div className="story-image-overlay absolute inset-0 w-full h-full bg-coffice-dark z-10 flex flex-col justify-center items-center text-center px-6">
              <div className="story-quote max-w-4xl">
                 <h2 className="text-4xl md:text-6xl font-serif text-coffice-gold mb-8">從種子到杯中</h2>
                 <p className="text-xl md:text-2xl text-coffice-text/80 font-light leading-relaxed">
                   每一顆豆子都經歷了風土的洗禮與職人的精確烘焙。<br/>我們堅持淺焙，只為還原最初的純粹。
                 </p>
              </div>
           </div>
        </div>
        
        <div className="story-text relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 text-coffice-gold">產地風土的對話</h2>
          <p className="text-xl leading-relaxed text-white/90 max-w-2xl font-light drop-shadow-lg">
            從衣索比亞的高海拔莊園，到哥倫比亞的火山土壤。我們親自尋訪世界各地的獨立咖啡農，將最純粹的風土氣息完美呈現在您的杯中。往下滾動探索我們的堅持...
          </p>
        </div>
      </section>

      {/* Featured Beans */}
      <section id="beans" className="beans-section py-32 bg-coffice-dark relative z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif text-white mb-6 tracking-widest">本月限定單品</h2>
            <div className="w-16 h-[2px] bg-coffice-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "衣索比亞 耶加雪菲 果丁丁",
                roast: "淺焙",
                desc: "茉莉花香、檸檬皮、水蜜桃酸甜感，尾韻如大吉嶺紅茶般優雅。",
                img: "/images/cozy_coffee_entrance_1790311210385.jpg"
              },
              {
                title: "黑貓莊園 (特選配方)",
                roast: "中淺焙",
                desc: "酒香發酵感、黑櫻桃、黑巧克力，如店貓般神秘而深邃的風味。",
                img: "/images/black_cat_portrait_1790312058979.jpg",
                color: "bg-coffice-copper"
              },
              {
                title: "巴拿馬 翡翠莊園 藝伎",
                roast: "極淺焙",
                desc: "爆炸性的白花香氣、荔枝、佛手柑，咖啡界的頂級奢華享受。",
                img: "/images/Gemini_Generated_Image_p7c672p7c672p7c6.jpg"
              }
            ].map((bean, idx) => (
              <div key={idx} className="bean-card group cursor-pointer bg-coffice-bg/50 border border-[#333333] hover:border-coffice-gold transition-colors duration-500 rounded-lg overflow-hidden">
                <div className="relative h-80 overflow-hidden">
                  <img src={bean.img} alt={bean.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className={`absolute top-4 right-4 ${bean.color || 'bg-coffice-gold'} text-coffice-bg text-xs font-bold px-4 py-1 tracking-widest uppercase rounded-full`}>
                    {bean.roast}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-coffice-gold transition-colors">{bean.title}</h3>
                  <p className="text-coffice-text/70 text-sm leading-loose">{bean.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black text-center text-coffice-text/50 text-sm relative z-30">
        <p className="font-serif text-3xl text-coffice-gold mb-6 tracking-widest">Coffice</p>
        <p className="tracking-wider">© 2026 Coffice Roastery. All rights reserved.</p>
      </footer>
    </div>
  );
}
