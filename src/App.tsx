import React, { useState, useEffect } from 'react';
import {
  MapPin,
  BedDouble,
  Bath,
  UtensilsCrossed,
  Sofa,
  CarFront,
  Train,
  ShoppingBag,
  CheckCircle2,
  Phone,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import PanoViewer from './PanoViewer';

type GalleryTab = 'living' | 'second-floor' | 'back-kitchen' | 'outside' | 'pano';

const GALLERY_DATA: Record<GalleryTab, { title: string; images: string[], caption?: string[] }> = {
  'living': {
    title: 'ชั้น 1 โซนรับแขก-ครัวฝรั่ง',
    images: [
      '/living/20260503_142556.webp',
      '/living/20260503_142623.webp',
      '/living/20260503_184544.webp',
      '/living/May 8, 2026, 02_23_50 PM.webp',
      '/living/May 8, 2026, 02_39_09 PM.webp',
      '/living/May 8, 2026, 02_55_17 PM.webp'
    ]
  },
  'second-floor': {
    title: 'ชั้น 2 โซนพักผ่อน-3ห้องนอน 2ห้องน้ำ',
    images: [
      '/second-floor/20260503_152613.webp',
      '/second-floor/20260503_152625.webp',
      '/second-floor/20260503_152638.webp',
      '/second-floor/20260503_152723.webp',
      '/second-floor/20260503_152736.webp',
      '/second-floor/20260503_152815.webp',
      '/second-floor/20260503_152824.webp',
      '/second-floor/20260503_152958.webp',
      '/second-floor/20260503_153009.webp',
      '/second-floor/20260503_153039.webp',
      '/second-floor/20260503_153042.webp',
      '/second-floor/20260503_153051.webp',
      '/second-floor/20260503_153059.webp',
      '/second-floor/20260503_153159.webp',
      '/second-floor/20260503_153214.webp',
      '/second-floor/20260503_153314.webp',
      '/second-floor/20260503_153720.webp',
      '/second-floor/20260503_153747.webp'
    ]
  },
  'back-kitchen': {
    title: 'โซนครัวหลังบ้าน-ต่อเติมปี 2567',
    images: [
      '/back-kitchen/20260503_135439.webp',
      '/back-kitchen/20260503_135500.webp',
      '/back-kitchen/20260503_135518.webp',
      '/back-kitchen/20260503_135550.webp',
      '/back-kitchen/20260503_135611.webp',
      '/back-kitchen/20260503_135737.webp',
      '/back-kitchen/20260503_135812.webp',
      '/back-kitchen/20260503_135907.webp',
      '/back-kitchen/20260503_135934.webp',
      '/back-kitchen/May 8, 2026, 02_14_04 PM.webp'
    ]
  },
  'outside': {
    title: 'ภายนอก จอดรถ2คัน',
    images: [
      '/outside/20260503_171023.webp',
      '/outside/20260503_171030.webp',
      '/outside/20260503_171036.webp',
      '/outside/May 8, 2026, 02_16_18 PM.webp',
      '/outside/May 8, 2026, 02_19_14 PM.webp'
    ]
  },
  'pano': {
    title: 'พาโนราม่า',
    images: [
      '/pano/pano_20260503_152855.webp',
      '/pano/pano_May 8, 2026, 01_58_00 PM.webp',
      '/pano/pano_May 8, 2026, 02_07_25 PM.webp'
    ],
    caption: [
      'ห้องนอนกลาง',
      'ห้องรับแขก',
      'ห้องนอนใหญ่',
    ]
  }
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<GalleryTab>('living');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activeImages = GALLERY_DATA[activeTab].images;
  const activeCaption = GALLERY_DATA[activeTab].caption || [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Kanit'] pb-20 md:pb-0">
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-white drop-shadow-md'}`}>
            ทรัพย์รุ่งเรืองซิตี้
          </div>
          <a href="tel:0970141544" className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${isScrolled ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'}`}>
            <Phone size={18} />
            <span className="hidden sm:inline">ติดต่อคุณหมู 0970141544</span>
            <span className="sm:hidden">โทรเลย</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen w-full flex items-end justify-center pb-20 md:pb-32 px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="/main.webp"
            alt="บ้านแฝด ทรัพย์รุ่งเรืองซิตี้"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-block bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-sm font-medium mb-2 shadow-lg">
              พร้อมอยู่ สภาพเหมือนใหม่
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
              ขายบ้านแฝด <br className="hidden md:block" /> พื้นที่ 37.5 ตรว.
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 flex items-center gap-2 max-w-2xl drop-shadow-md">
              <MapPin className="shrink-0" />
              998/97 ซอย 9 หมู่บ้านทรัพย์รุ่งเรืองซิตี้ จ.สมุทรปราการ
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 drop-shadow-lg">
                ฿ 4,000,000
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 -mt-16 relative z-20">

        {/* Quick Specs Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-16 grid grid-cols-2 md:grid-cols-5 gap-6 divide-x divide-gray-100"
        >
          <div className="flex flex-col items-center justify-center text-center px-2 border-l-0">
            <BedDouble className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-2xl font-bold text-gray-900">3</span>
            <span className="text-sm text-gray-500">ห้องนอน (2 แอร์)</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2">
            <Bath className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-2xl font-bold text-gray-900">3</span>
            <span className="text-sm text-gray-500">ห้องน้ำ</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2">
            <UtensilsCrossed className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-2xl font-bold text-gray-900">2</span>
            <span className="text-sm text-gray-500">ครัว (ไทย-ฝรั่ง)</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2">
            <Sofa className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-2xl font-bold text-gray-900">1</span>
            <span className="text-sm text-gray-500">ห้องรับแขก</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-2">
            <CarFront className="w-8 h-8 text-primary-500 mb-2" />
            <span className="text-2xl font-bold text-gray-900">2</span>
            <span className="text-sm text-gray-500">ที่จอดรถ</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
          {/* Highlights & Details */}
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-primary-500 rounded-full"></div>
                จุดเด่นของบ้าน
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <strong className="text-gray-900">สภาพดี ซื้อเก็บ ไม่โทรม:</strong> เฟอร์นิเจอร์ครบ พร้อมเข้าอยู่ทันที สภาพใหม่มาก
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <strong className="text-gray-900">ระบบสมบูรณ์:</strong> ระบบน้ำ, ปั้มน้ำ, ปลั๊กไฟ ใช้งานได้ปกติ ไม่ต้องซ่อมแซม
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <strong className="text-gray-900">การเดินทางสะดวก:</strong> ตั้งอยู่บน ถ.สุขุมวิท ต.ท้ายบ้านใหม่ อ.เมือง
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-primary-500 rounded-full"></div>
                สถานที่ใกล้เคียง
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <Train size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">BTS สถานีเคหะ</h3>
                    <p className="text-sm text-gray-500">เพียง 1 กม.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Robinson ไลฟ์สไตล์</h3>
                    <p className="text-sm text-gray-500">เพียง 3 กม.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Map */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl text-white relative">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">สนใจติดต่อดูบ้าน</h3>
                <p className="text-gray-400 mb-6">คุณหมู ยินดีให้คำปรึกษาและพาชมบ้าน</p>

                <div className="space-y-4">
                  <a href="tel:0970141544" className="flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 transition-colors rounded-xl backdrop-blur-sm">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">เบอร์โทรศัพท์</div>
                      <div className="text-xl font-semibold">097-014-1544</div>
                    </div>
                  </a>

                  <a href="https://line.me/ti/p/f8OZa_-J6k" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-[#00B900]/20 hover:bg-[#00B900]/30 transition-colors rounded-xl backdrop-blur-sm">
                    <div className="w-10 h-10 bg-[#00B900] rounded-full flex items-center justify-center">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Line ID</div>
                      <div className="text-xl font-semibold">ติดต่อสอบถาม</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/13.561613067155516,+100.61617781980438"
              target="_blank"
              rel="noreferrer"
              className="block bg-white rounded-2xl p-2 shadow-md border border-gray-100 hover:shadow-lg transition-shadow group overflow-hidden"
            >
              <div className="h-40 bg-gray-100 rounded-xl overflow-hidden relative">
                <img
                  src="/image.webp"
                  alt="Map Location"
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback map placeholder since we don't have API key
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300"><rect width="600" height="300" fill="%23f3f4f6"/><path d="M300 120a30 30 0 1 0 0 60 30 30 0 0 0 0-60zm0 100c-25 0-50-20-50-50s50-80 50-80 50 50 50 80-25 50-50 50z" fill="%23ef4444" opacity="0.8"/></svg>';
                  }}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  เปิดใน Google Maps
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Gallery Section */}
        <section className="mb-24">
          <div className="flex flex-col mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">แกลลอรี่ภาพถ่าย</h2>
            <p className="text-gray-500 mb-6">บรรยากาศภายในและภายนอกบ้าน</p>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 pb-2">
              {(Object.entries(GALLERY_DATA) as [GalleryTab, typeof GALLERY_DATA[GalleryTab]][]).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setCurrentImageIndex(0); }}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all ${activeTab === key
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  {data.title}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'pano' ? (
            <div className="grid grid-cols-1 gap-6">
              {activeImages.map((src, index) => (
                <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="font-medium text-gray-700 mb-3">{activeCaption[index] || `พาโนราม่า ${index + 1}`}</div>
                  <PanoViewer src={src} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
              {activeImages.map((src, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 0.985 }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow bg-gray-200"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={src}
                    alt={`${GALLERY_DATA[activeTab].title} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white flex items-center gap-2">
                      <Maximize2 size={16} /> แตะเพื่อขยาย
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            <button
              className="absolute left-4 md:left-10 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              className="absolute right-4 md:right-10 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>

            <div className="w-full max-w-6xl max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={activeImages[currentImageIndex]}
                alt={`${GALLERY_DATA[activeTab].title} ${currentImageIndex + 1}`}
                className="w-full h-full object-contain max-h-[85vh] rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/80 font-medium text-lg">
                {GALLERY_DATA[activeTab].title} ({currentImageIndex + 1} / {activeImages.length})
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chathead for Line */}
      <a
        href="https://line.me/ti/p/f8OZa_-J6k"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 bg-[#00B900] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <MessageCircle size={28} />
        {/* Animated Tooltip */}
        <div className="absolute right-[115%] top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 font-semibold flex items-center gap-2">
          ติดต่อสอบถาม
          <div className="w-2 h-2 bg-white absolute -right-1 top-1/2 -translate-y-1/2 rotate-45"></div>
        </div>
        {/* Notification dot */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-[#00B900]"></span>
        </span>
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 ทรัพย์รุ่งเรืองซิตี้ 998/97 - สุขุมวิท ท้ายบ้านใหม่. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
