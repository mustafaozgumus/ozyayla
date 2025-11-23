import React, { useState, useEffect } from 'react';
import { URLS } from '../constants';
import { NewsItem } from '../types';

export const NewsSlider: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // URL Fixer Helper
  const fixUrl = (src: string | null, base: string) => {
    if (!src) return "";
    if (src.startsWith("http")) return src;
    if (src.startsWith("//")) return "https:" + src;
    if (src.startsWith("/")) return base + src;
    return base + "/" + src;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const BASE = URLS.NEWS_BASE;
        const TARGET_URL = BASE + "/icerikler/icerikler/listele__Haberler";
        // Use allorigins.win for reliable CORS handling
        const PROXY_URL = "https://api.allorigins.win/get?url=" + encodeURIComponent(TARGET_URL);

        const res = await fetch(PROXY_URL);
        if (!res.ok) throw new Error("Proxy Error");

        const data = await res.json();
        // allorigins returns the HTML in the 'contents' property
        const html = data.contents;
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        
        const items = Array.from(doc.querySelectorAll(".haberler ul li"));
        const parsedNews: NewsItem[] = [];

        items.slice(0, 4).forEach((li, idx) => {
            const imgEl = li.querySelector("img");
            const linkEl = li.querySelector("a");
            const pEl = li.querySelector("p");

            if (imgEl && linkEl) {
                const rawSrc = imgEl.getAttribute("src");
                const fixedSrc = fixUrl(rawSrc, BASE);
                const title = pEl ? pEl.textContent?.trim() : "Haber";
                
                parsedNews.push({
                    id: idx,
                    title: title || "Başlıksız Haber",
                    imageUrl: fixedSrc
                });
            }
        });

        if (parsedNews.length > 0) {
            setNews(parsedNews);
        } else {
             setNews(getFallbackNews());
        }

      } catch (e) {
        console.error("News Fetch Error", e);
        setNews(getFallbackNews());
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getFallbackNews = () => [
    { id: 1, title: "Okulumuzda Eğitim Öğretim Tüm Hızıyla Devam Ediyor", imageUrl: "https://picsum.photos/800/600?random=1" },
    { id: 2, title: "Öğrencilerimizden Büyük Başarı", imageUrl: "https://picsum.photos/800/600?random=2" }
  ];

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [news]);

  if (loading) return <div className="w-full h-full bg-slate-900/50 flex items-center justify-center text-slate-400 text-xs">HABERLER...</div>;
  if (news.length === 0) return null;

  const currentNews = news[currentIndex];

  return (
    <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-slate-700/30 shadow-[0_26px_60px_rgba(15,23,42,1)] bg-[#020617]">
        {/* Overlay Gradient (Multiply effect in CSS) */}
        <div className="absolute inset-0 z-20 pointer-events-none" 
             style={{
               background: `linear-gradient(to top, rgba(2,6,23,0.96) 0%, rgba(2,6,23,0.8) 32%, rgba(15,23,42,0.55) 60%, rgba(15,23,42,0.92) 100%)`,
               mixBlendMode: 'multiply'
             }} 
        />

        {/* Image */}
        {news.map((item, index) => (
             <div key={item.id} 
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
                <img 
                    src={item.imageUrl} 
                    className="w-full h-full object-cover filter brightness-[0.86] saturate-[1.12]" 
                    alt="News" 
                />
             </div>
        ))}

        {/* Title Box */}
        <div className="absolute left-[22px] bottom-[20px] max-w-[80%] z-30">
            <div className="px-4 py-2 rounded-full border border-slate-50/20 shadow-[0_16px_40px_rgba(15,23,42,1)]"
                 style={{
                    background: `linear-gradient(120deg, rgba(15,23,42,0.95), rgba(15,23,42,0.8))`
                 }}>
                <h2 className="text-[18px] font-extrabold text-slate-50 leading-[1.3] line-clamp-2">
                    {currentNews.title}
                </h2>
            </div>
        </div>
    </div>
  );
};