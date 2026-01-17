import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Globe, MapPin, Plus, Search, MessageSquare, ChevronDown, Paperclip, ChevronLeft, ChevronRight, X, Home } from "lucide-react";

// ============= MOCK DATA =============
const categoriesData = {
  en: {
    "crop-advisory": {
      title: "Crop Advisory",
      icon: "🌾",
      pages: [
        { heading: "Seasonal Crop Planning", content: "Plan your crops according to the monsoon patterns. Kharif crops like rice, maize, and cotton are best planted during June-July. Rabi crops like wheat and mustard should be planted in October-November.", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop" },
        { heading: "Soil Health Management", content: "Test your soil every season. Maintain organic matter by adding compost. Rotate crops to prevent nutrient depletion and pest buildup.", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop" },
        { heading: "Pest Control Methods", content: "Use integrated pest management. Neem-based solutions are effective and eco-friendly. Report unusual pest activities to the local agricultural officer.", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop" },
        { heading: "Water Conservation", content: "Drip irrigation saves up to 60% water. Mulching helps retain soil moisture. Harvest rainwater during monsoon for dry seasons.", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop" }
      ]
    },
    "health-schemes": {
      title: "Health Schemes",
      icon: "🏥",
      pages: [
        { heading: "Ayushman Bharat", content: "Get up to ₹5 lakh health coverage per family per year. Covers hospitalization, pre and post care. Available at empaneled hospitals across India.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop" },
        { heading: "Jan Aushadhi Kendras", content: "Buy medicines at 50-90% less cost. Over 9000 stores across India. Quality medicines at affordable prices.", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop" },
        { heading: "Maternal Health Support", content: "Janani Suraksha Yojana provides cash assistance for institutional delivery. Free check-ups and nutrition support during pregnancy.", image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format&fit=crop" },
        { heading: "Village Health Centers", content: "Primary Health Centers provide basic healthcare. Free consultations and essential medicines. Immunization and family planning services available.", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop" }
      ]
    },
    "education": {
      title: "Education",
      icon: "📚",
      pages: [
        { heading: "Scholarship Programs", content: "Central and state scholarships for students from rural areas. Pre-matric and post-matric scholarships available. Apply through National Scholarship Portal.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop" },
        { heading: "Skill Development", content: "Free vocational training under PM Kaushal Vikas Yojana. Learn skills like tailoring, electrician work, computer basics. Get certified and find employment.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop" },
        { heading: "Digital Literacy", content: "PMGDISHA teaches digital skills to rural citizens. Learn to use smartphones, internet, and digital payments. Training available at Common Service Centers.", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop" },
        { heading: "Girl Child Education", content: "Beti Bachao Beti Padhao promotes girl education. Free education up to graduation in many states. Hostels and transportation facilities available.", image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&auto=format&fit=crop" }
      ]
    },
    "weather": {
      title: "Weather Updates",
      icon: "🌤️",
      pages: [
        { heading: "Monsoon Forecast", content: "IMD provides accurate monsoon predictions. Subscribe to Kisan SMS portal for weather alerts. Plan sowing based on rainfall predictions.", image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop" },
        { heading: "Extreme Weather Alerts", content: "Get early warnings for cyclones, floods, and droughts. Protect crops and livestock during extreme weather. Government compensation available for crop damage.", image: "https://images.unsplash.com/photo-1618690567713-89b0e7e52b1b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { heading: "Climate Smart Agriculture", content: "Adapt farming practices to changing climate. Drought-resistant crop varieties available. Water harvesting and conservation techniques.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop" },
        { heading: "Seasonal Calendar", content: "Follow agricultural calendar for best results. Festival dates and auspicious times for farming activities. Market timing for best crop prices.", image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&auto=format&fit=crop" }
      ]
    }
  },
  hi: {
    "crop-advisory": {
      title: "फसल सलाह",
      icon: "🌾",
      pages: [
        { heading: "मौसमी फसल योजना", content: "मानसून के अनुसार अपनी फसलों की योजना बनाएं। धान, मक्का और कपास जैसी खरीफ फसलें जून-जुलाई में बोएं। गेहूं और सरसों जैसी रबी फसलें अक्टूबर-नवंबर में लगाएं।", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop" },
        { heading: "मृदा स्वास्थ्य प्रबंधन", content: "हर मौसम में मिट्टी की जांच करें। खाद डालकर जैविक पदार्थ बनाए रखें। फसल चक्र अपनाएं।", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop" },
        { heading: "कीट नियंत्रण", content: "समेकित कीट प्रबंधन का उपयोग करें। नीम आधारित समाधान प्रभावी और पर्यावरण के अनुकूल हैं।", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop" },
        { heading: "जल संरक्षण", content: "ड्रिप सिंचाई से 60% पानी बचता है। मल्चिंग से मिट्टी की नमी बनी रहती है।", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop" }
      ]
    },
    "health-schemes": {
      title: "स्वास्थ्य योजनाएं",
      icon: "🏥",
      pages: [
        { heading: "आयुष्मान भारत", content: "प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य कवरेज प्राप्त करें। अस्पताल में भर्ती, पूर्व और पश्चात देखभाल शामिल।", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop" },
        { heading: "जन औषधि केंद्र", content: "50-90% कम कीमत पर दवाइयां खरीदें। भारत भर में 9000 से अधिक स्टोर।", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop" },
        { heading: "मातृ स्वास्थ्य सहायता", content: "जननी सुरक्षा योजना संस्थागत प्रसव के लिए नकद सहायता प्रदान करती है।", image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format&fit=crop" },
        { heading: "ग्राम स्वास्थ्य केंद्र", content: "प्राथमिक स्वास्थ्य केंद्र बुनियादी स्वास्थ्य सेवा प्रदान करते हैं। मुफ्त परामर्श और आवश्यक दवाइयां।", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop" }
      ]
    },
    "education": {
      title: "शिक्षा",
      icon: "📚",
      pages: [
        { heading: "छात्रवृत्ति कार्यक्रम", content: "ग्रामीण क्षेत्रों के छात्रों के लिए केंद्रीय और राज्य छात्रवृत्तियां। राष्ट्रीय छात्रवृत्ति पोर्टल के माध्यम से आवेदन करें।", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop" },
        { heading: "कौशल विकास", content: "पीएम कौशल विकास योजना के तहत मुफ्त व्यावसायिक प्रशिक्षण। सिलाई, इलेक्ट्रीशियन, कंप्यूटर जैसे कौशल सीखें।", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop" },
        { heading: "डिजिटल साक्षरता", content: "PMGDISHA ग्रामीण नागरिकों को डिजिटल कौशल सिखाता है। स्मार्टफोन, इंटरनेट और डिजिटल भुगतान का उपयोग सीखें।", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop" },
        { heading: "बालिका शिक्षा", content: "बेटी बचाओ बेटी पढ़ाओ बालिका शिक्षा को बढ़ावा देता है। कई राज्यों में स्नातक तक मुफ्त शिक्षा।", image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&auto=format&fit=crop" }
      ]
    },
    "weather": {
      title: "मौसम अपडेट",
      icon: "🌤️",
      pages: [
        { heading: "मानसून पूर्वानुमान", content: "IMD सटीक मानसून भविष्यवाणी प्रदान करता है। मौसम अलर्ट के लिए किसान SMS पोर्टल की सदस्यता लें।", image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&auto=format&fit=crop" },
        { heading: "चरम मौसम चेतावनी", content: "चक्रवात, बाढ़ और सूखे की प्रारंभिक चेतावनी प्राप्त करें। चरम मौसम में फसलों और पशुओं की रक्षा करें।", image: "https://images.unsplash.com/photo-1527482937786-6f89e2c74629?w=800&auto=format&fit=crop" },
        { heading: "जलवायु स्मार्ट कृषि", content: "बदलती जलवायु के अनुसार खेती के तरीके अपनाएं। सूखा प्रतिरोधी फसल किस्में उपलब्ध।", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop" },
        { heading: "मौसमी कैलेंडर", content: "सर्वोत्तम परिणामों के लिए कृषि कैलेंडर का पालन करें। त्योहार की तारीखें और खेती के लिए शुभ समय।", image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&auto=format&fit=crop" }
      ]
    }
  }
};


const languages = ["English", "हिंदी", "ಕನ್ನಡ", "தமிழ்", "తెలుగు", "മലയാളം", "मराठी"];
const languageCodes: Record<string, string> = {
  "English": "en",
  "हिंदी": "hi",
  "ಕನ್ನಡ": "en",
  "தமிழ்": "en",
  "తెలుగు": "en",
  "മലയാളം": "en",
  "मराठी": "en"
};

const statesData: Record<string, string[]> = {
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  "Maharashtra": ["Pune", "Mumbai", "Nagpur", "Nashik"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"]
};

// ============= DUAL EYEBALL COMPONENT =============
const DualEyeball = ({ hoveredCategory, isTyping }: { hoveredCategory: string | null; isTyping: boolean }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [breatheScale, setBreatheScale] = useState(1);

  // Blink animation every 6-8 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isTyping) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 6000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, [isTyping]);

  // Subtle breathing animation
  useEffect(() => {
    const breatheInterval = setInterval(() => {
      setBreatheScale(prev => prev === 1 ? 1.02 : 1);
    }, 2000);
    return () => clearInterval(breatheInterval);
  }, []);

  // Calculate pupil position based on hovered category
  const getPupilOffset = () => {
    if (isTyping) return { x: 0, y: 0 };
    switch (hoveredCategory) {
      case "crop-advisory": return { x: -4, y: -2 };
      case "health-schemes": return { x: 4, y: -2 };
      case "education": return { x: -4, y: 2 };
      case "weather": return { x: 4, y: 2 };
      default: return { x: 0, y: 0 };
    }
  };

  const pupilOffset = getPupilOffset();

  return (
    <motion.div 
      className="flex items-center justify-center gap-6 mb-6"
      animate={{ scale: breatheScale }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {/* Left Eye */}
      <motion.div 
        className="relative w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full border-4 border-amber-800/30 shadow-lg overflow-hidden"
        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div 
          className="absolute w-7 h-7 bg-gradient-to-br from-amber-900 to-amber-800 rounded-full"
          style={{ top: "50%", left: "50%", marginTop: -14, marginLeft: -14 }}
          animate={{ x: pupilOffset.x, y: pupilOffset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="absolute w-2 h-2 bg-white rounded-full top-1 left-1 opacity-80" />
        </motion.div>
      </motion.div>

      {/* Right Eye */}
      <motion.div 
        className="relative w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full border-4 border-amber-800/30 shadow-lg overflow-hidden"
        animate={{ scaleY: isBlinking ? 0.1 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div 
          className="absolute w-7 h-7 bg-gradient-to-br from-amber-900 to-amber-800 rounded-full"
          style={{ top: "50%", left: "50%", marginTop: -14, marginLeft: -14 }}
          animate={{ x: pupilOffset.x, y: pupilOffset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="absolute w-2 h-2 bg-white rounded-full top-1 left-1 opacity-80" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ============= GOOEY BUTTON COMPONENT =============
const GooeyButton = ({ 
  children, 
  icon, 
  onClick, 
  onHover 
}: { 
  children: React.ReactNode; 
  icon: string; 
  onClick: () => void; 
  onHover: (isHovered: boolean) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className="relative px-8 py-5 bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl font-semibold text-lg shadow-lg overflow-hidden"
      onMouseEnter={() => { setIsHovered(true); onHover(true); }}
      onMouseLeave={() => { setIsHovered(false); onHover(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      animate={{
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
        borderRadius: isHovered ? "24px" : "16px",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gooey effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Gooey blob effects */}
      <motion.div
        className="absolute -top-2 -left-2 w-8 h-8 bg-green-400/40 rounded-full blur-md"
        animate={{
          scale: isHovered ? 1.5 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-400/40 rounded-full blur-md"
        animate={{
          scale: isHovered ? 1.5 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />

      <span className="relative z-10 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        {children}
      </span>
    </motion.button>
  );
};

// ============= BOOK COMPONENT =============
// const BookSection = ({ 
//   category, 
//   data, 
//   onClose,
//   initialLanguage = "English"
// }: { 
//   category: string; 
//   data: typeof categoriesData.en[keyof typeof categoriesData.en]; 
//   onClose: () => void;
//   initialLanguage?: string;
// }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isFlipping, setIsFlipping] = useState(false);
//   const [flipDirection, setFlipDirection] = useState<"left" | "right">("right");
//   const [selectedBookLanguage, setSelectedBookLanguage] = useState(initialLanguage);

//   // Get the correct language code
//   const langCode = languageCodes[selectedBookLanguage] || "en";
//   // Get the book data for the selected language
//   const bookData = categoriesData[langCode]?.[category] || data;

//   const nextPage = () => {
//     if (currentPage < bookData.pages.length - 1 && !isFlipping) {
//       setFlipDirection("right");
//       setIsFlipping(true);
//       setTimeout(() => {
//         setCurrentPage(prev => prev + 1);
//         setIsFlipping(false);
//       }, 400);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 0 && !isFlipping) {
//       setFlipDirection("left");
//       setIsFlipping(true);
//       setTimeout(() => {
//         setCurrentPage(prev => prev - 1);
//         setIsFlipping(false);
//       }, 400);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9, y: 50 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9, y: 50 }}
//       transition={{ type: "spring", stiffness: 200, damping: 20 }}
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
//     >
//       {/* Book Container */}
//       <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-900/20">
//         {/* Book spine decoration */}
//         <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-800/30 via-amber-900/40 to-amber-800/30 transform -translate-x-1/2 z-10" />
        
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-md"
//         >
//           <X className="w-5 h-5 text-gray-700" />
//         </button>

//         {/* Book Title Header */}
//         <div className="flex items-center justify-between py-6 border-b border-amber-200 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 px-8">
//           <div className="flex items-center gap-2">
//             <span className="text-4xl mb-2 block">{bookData.icon}</span>
//             <h2 className="text-2xl font-bold text-amber-900">{bookData.title}</h2>
//           </div>
//           <select
//             className="ml-4 px-3 py-2 rounded-lg border border-amber-300 bg-white text-amber-900 font-medium shadow-sm focus:outline-none"
//             value={selectedBookLanguage}
//             onChange={e => {
//               setSelectedBookLanguage(e.target.value);
//               setCurrentPage(0);
//             }}
//           >
//             {Object.entries(categoriesData)
//               .filter(([code, val]) => val[category])
//               .map(([code, val]) => {
//                 const langName = Object.keys(languageCodes).find(key => languageCodes[key] === code) || code;
//                 return <option key={code} value={langName}>{langName}</option>;
//               })}
//           </select>
//         </div>

//         {/* Book Pages Container - Both pages always show content, no fade */}
//         <div className="flex min-h-[500px]">
//           {/* Left Page - Current page */}
//           <div className="flex-1 p-8 bg-gradient-to-br from-amber-50 to-white border-r border-amber-200 flex flex-col">
//             <img
//               src={bookData.pages[currentPage].image}
//               alt={bookData.pages[currentPage].heading}
//               className="w-full max-w-[340px] h-48 object-cover rounded-xl shadow-md mb-6 mx-auto"
//             />
//             <h3 className="text-xl font-bold text-amber-900 mb-2 text-left">
//               {bookData.pages[currentPage].heading}
//             </h3>
//             <p className="text-gray-700 text-left max-w-[340px] mx-auto">
//               {bookData.pages[currentPage].content}
//             </p>
//           </div>
          
//           {/* Right Page - Next page if available, else end message */}
//           <div className="flex-1 p-8 bg-gradient-to-bl from-amber-50 to-white flex flex-col">
//             {currentPage < bookData.pages.length - 1 ? (
//               <>
//                 <img
//                   src={bookData.pages[currentPage + 1].image}
//                   alt={bookData.pages[currentPage + 1].heading}
//                   className="w-full max-w-[340px] h-48 object-cover rounded-xl shadow-md mb-6 mx-auto"
//                 />
//                 <h3 className="text-xl font-bold text-amber-900 mb-2 text-left">
//                   {bookData.pages[currentPage + 1].heading}
//                 </h3>
//                 <p className="text-gray-700 text-left max-w-[340px] mx-auto">
//                   {bookData.pages[currentPage + 1].content}
//                 </p>
//               </>
//             ) : (
//               <div className="h-full flex items-center justify-center">
//                 <div className="text-center">
//                   <span className="text-6xl mb-4 block">📖</span>
//                   <p className="text-amber-900 font-semibold text-lg">End of Chapter</p>
//                   <p className="text-gray-600 mt-2">You've read all the pages!</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Page Navigation */}
//         <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-t border-amber-200">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 0}
//             className="flex items-center gap-2 px-6 py-3 bg-amber-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-900 transition-colors shadow-md"
//           >
//             <ChevronLeft className="w-5 h-5" />
//             Previous
//           </button>

//           {/* Page indicators */}
//           <div className="flex items-center gap-2">
//             {bookData.pages.map((_, idx) => (
//               <motion.div
//                 key={idx}
//                 className={`w-3 h-3 rounded-full transition-colors ${
//                   idx === currentPage ? "bg-amber-800" : "bg-amber-300"
//                 }`}
//                 animate={{ scale: idx === currentPage ? 1.2 : 1 }}
//               />
//             ))}
//           </div>

//           <button
//             onClick={nextPage}
//             disabled={currentPage === bookData.pages.length - 1}
//             className="flex items-center gap-2 px-6 py-3 bg-amber-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-900 transition-colors shadow-md"
//           >
//             Next
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// ============= BOOK COMPONENT =============
const BookSection = ({ 
  category, 
  data, 
  onClose,
  initialLanguage = "English"
}: { 
  category: string; 
  data: typeof categoriesData.en[keyof typeof categoriesData.en]; 
  onClose: () => void;
  initialLanguage?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"right" | "left">("right");
  const [selectedBookLanguage, setSelectedBookLanguage] = useState(initialLanguage);

  // Get the correct language code
  const langCode = languageCodes[selectedBookLanguage] || "en";
  // Get the book data for the selected language
  const bookData = categoriesData[langCode]?.[category] || data;

  const nextPage = () => {
    if (currentPage < bookData.pages.length - 1 && !isFlipping) {
      setFlipDirection("right");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 600); // Match animation duration
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("left");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 600); // Match animation duration
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        // Close when clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Book Container - Larger for better spacing */}
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-900/20 w-[90%] max-w-6xl">
        {/* Book spine decoration */}
        <div className="absolute left-1/2 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-800/30 via-amber-900/40 to-amber-800/30 transform -translate-x-1/2 z-10" />
        
        {/* Header with Language Selector */}
        <div className="flex items-center justify-between py-6 border-b border-amber-200 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 px-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{bookData.icon}</span>
            <h2 className="text-2xl font-bold text-amber-900">{bookData.title}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector - Moved to header */}
            <div className="relative">
              <select
                className="px-4 py-2 rounded-lg border border-amber-300 bg-white text-amber-900 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={selectedBookLanguage}
                onChange={e => {
                  setSelectedBookLanguage(e.target.value);
                  setCurrentPage(0);
                }}
              >
                {Object.entries(categoriesData)
                  .filter(([code, val]) => val[category])
                  .map(([code, val]) => {
                    const langName = Object.keys(languageCodes).find(key => languageCodes[key] === code) || code;
                    return <option key={code} value={langName}>{langName}</option>;
                  })}
              </select>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-md border border-amber-200"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Book Pages Container with Page Flip Animation */}
        <div className="flex min-h-[550px] relative overflow-hidden">
          {/* Page Flip Animation Overlay */}
          {isFlipping && (
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Left page turning to right */}
              {flipDirection === "right" && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-amber-50 to-white origin-right"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeIn"
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    boxShadow: "-10px 0 20px rgba(0,0,0,0.1)",
                    borderRight: "1px solid #fbbf24"
                  }}
                >
                  {/* Content on the back of the flipping page */}
                  <div className="absolute inset-0 bg-gradient-to-l from-amber-50 to-white transform rotateY(180deg)" />
                </motion.div>
              )}
              
              {/* Right page turning to left */}
              {flipDirection === "left" && (
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-amber-50 to-white origin-left"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeIn"
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    boxShadow: "10px 0 20px rgba(0,0,0,0.1)",
                    borderLeft: "1px solid #fbbf24"
                  }}
                >
                  {/* Content on the back of the flipping page */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-white transform rotateY(-180deg)" />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Left Page - Current page */}
          <motion.div
            key={`left-${currentPage}-${selectedBookLanguage}`}
            initial={flipDirection === "right" ? { x: -20, opacity: 0 } : { x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex-1 p-10 bg-gradient-to-br from-amber-50 to-white border-r border-amber-200 flex flex-col items-center justify-center"
          >
            <div className="max-w-md mx-auto">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                src={bookData.pages[currentPage].image}
                alt={bookData.pages[currentPage].heading}
                className="w-full h-56 object-cover rounded-2xl shadow-lg mb-8"
              />
              <motion.h3 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-2xl font-bold text-amber-900 mb-4 text-center"
              >
                {bookData.pages[currentPage].heading}
              </motion.h3>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-gray-700 text-lg leading-relaxed text-center"
              >
                {bookData.pages[currentPage].content}
              </motion.p>
            </div>
          </motion.div>

          {/* Right Page - Next page or end message */}
          <motion.div
            key={`right-${currentPage}-${selectedBookLanguage}`}
            initial={flipDirection === "left" ? { x: 20, opacity: 0 } : { x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex-1 p-10 bg-gradient-to-bl from-amber-50 to-white flex flex-col items-center justify-center"
          >
            {currentPage < bookData.pages.length - 1 ? (
              <div className="max-w-md mx-auto">
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  src={bookData.pages[currentPage + 1].image}
                  alt={bookData.pages[currentPage + 1].heading}
                  className="w-full h-56 object-cover rounded-2xl shadow-lg mb-8"
                />
                <motion.h3 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="text-2xl font-bold text-amber-900 mb-4 text-center"
                >
                  {bookData.pages[currentPage + 1].heading}
                </motion.h3>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="text-gray-700 text-lg leading-relaxed text-center"
                >
                  {bookData.pages[currentPage + 1].content}
                </motion.p>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ 
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2 
                    }}
                  >
                    <span className="text-7xl mb-6 block">📖</span>
                  </motion.div>
                  <p className="text-amber-900 font-semibold text-xl mb-2">End of Chapter</p>
                  <p className="text-gray-600 text-lg">You've read all the pages!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(0)}
                    className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors font-medium"
                  >
                    Read Again
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-between p-8 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-t border-amber-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevPage}
            disabled={currentPage === 0 || isFlipping}
            className="flex items-center gap-3 px-8 py-4 bg-amber-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-900 transition-colors shadow-lg font-medium"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-lg">Previous</span>
          </motion.button>

          {/* Page indicators */}
          <div className="flex items-center gap-3">
            {bookData.pages.map((_, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  if (!isFlipping && idx !== currentPage) {
                    setFlipDirection(idx > currentPage ? "right" : "left");
                    setIsFlipping(true);
                    setTimeout(() => {
                      setCurrentPage(idx);
                      setIsFlipping(false);
                    }, 600);
                  }
                }}
                className={`w-4 h-4 rounded-full transition-colors cursor-pointer ${
                  idx === currentPage ? "bg-amber-800" : "bg-amber-300 hover:bg-amber-400"
                }`}
                animate={{ scale: idx === currentPage ? 1.3 : 1 }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextPage}
            disabled={currentPage === bookData.pages.length - 1 || isFlipping}
            className="flex items-center gap-3 px-8 py-4 bg-amber-800 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-900 transition-colors shadow-lg font-medium"
          >
            <span className="text-lg">Next</span>
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ============= MAIN CHATBOT COMPONENT =============
 const Chatbot = () => {
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState("State");
  const [district, setDistrict] = useState("District");
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [isNewChat, setIsNewChat] = useState(true);
  const [chatHistory, setChatHistory] = useState<Array<{ id: number; title: string; timestamp: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    language: false,
    state: false,
    district: false
  });

  const bookSectionRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = {
    language: useRef<HTMLDivElement>(null),
    state: useRef<HTMLDivElement>(null),
    district: useRef<HTMLDivElement>(null)
  };

  const langCode = languageCodes[language] || "en";
  const currentData = categoriesData[langCode as keyof typeof categoriesData] || categoriesData.en;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs).forEach(key => {
        const ref = dropdownRefs[key as keyof typeof dropdownRefs];
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsDropdownOpen(prev => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch chat history
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setChatHistory([
        { id: 1, title: "Rural Scheme Application Help", timestamp: "2024-01-15" },
        { id: 2, title: "Crop Disease Identification", timestamp: "2024-01-14" },
        { id: 3, title: "Health Center Locator", timestamp: "2024-01-13" },
      ]);
      setIsLoading(false);
    }, 300);
  }, []);

  // Scroll to book section when category is selected
  useEffect(() => {
    if (selectedCategory && bookSectionRef.current) {
      setTimeout(() => {
        bookSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selectedCategory]);

  const handleNewChat = () => {
    setActiveChatId(null);
    setIsNewChat(true);
    setInputValue("");
    setSelectedCategory(null);
  };

  const handleSelectChat = (chatId: number) => {
    setActiveChatId(chatId);
    setIsNewChat(false);
    setSelectedCategory(null);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    console.log("Sending:", inputValue);
    setInputValue("");
  };

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
  };

  const toggleDropdown = (dropdown: string) => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown as keyof typeof prev]
    }));
  };

  const handleStateChange = (newState: string) => {
    setState(newState);
    setDistrict("District");
    setIsDropdownOpen(prev => ({ ...prev, state: false }));
  };

  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
    setIsDropdownOpen(prev => ({ ...prev, district: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-8rem)]">
          
          {/* LEFT SIDEBAR */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 h-full flex flex-col">
              <div className="p-6 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-amber-900">Gramin Saathi</h2>
                </div>
              </div>

              <button
                onClick={handleNewChat}
                className="flex items-center gap-4 p-5 border-b border-amber-100 hover:bg-amber-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Plus className="w-6 h-6 text-green-700" />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-gray-800 text-lg">New chat</span>
                  <p className="text-sm text-gray-500 mt-1">Start a new conversation</p>
                </div>
              </button>

              <div className="p-5 border-b border-amber-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    className="w-full pl-12 pr-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Chat history</h3>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-5 bg-amber-100 rounded w-4/5 mb-2" />
                        <div className="h-3 bg-amber-50 rounded w-1/3" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatHistory.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => handleSelectChat(chat.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          activeChatId === chat.id 
                            ? "bg-green-50 border-2 border-green-200" 
                            : "hover:bg-amber-50 border border-transparent"
                        }`}
                      >
                        <div className="font-semibold text-gray-800 text-sm">{chat.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{chat.timestamp}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 🔹 MAIN CHAT AREA - Same Height Container */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg border h-full flex flex-col">
              
              {/* 🔹 HEADER - Fixed Height */}
              <div className="border-b border-amber-100 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-2xl font-bold text-amber-900">Gramin Saathi</h1>
                    <p className="text-gray-600 mt-1">Empowering rural communities through knowledge</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Language Dropdown */}
                    <div className="relative" ref={dropdownRefs.language}>
                      <button
                        onClick={() => toggleDropdown("language")}
                        className="flex items-center justify-between gap-2 bg-white border border-amber-200 rounded-xl px-4 py-3 hover:bg-amber-50 transition-colors w-full sm:w-40 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-amber-700" />
                          <span className="text-sm font-medium text-gray-700">{language}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen.language ? "rotate-180" : ""}`} />
                      </button>
                      {isDropdownOpen.language && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-amber-200 rounded-xl shadow-lg z-50">
                          {languages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => { setLanguage(lang); setIsDropdownOpen(prev => ({ ...prev, language: false })); }}
                              className={`w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${language === lang ? "bg-green-50 text-green-700 font-medium" : "text-gray-700"}`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* State Dropdown */}
                    <div className="relative" ref={dropdownRefs.state}>
                      <button
                        onClick={() => toggleDropdown("state")}
                        className="flex items-center justify-between gap-2 bg-white border border-amber-200 rounded-xl px-4 py-3 hover:bg-amber-50 transition-colors w-full sm:w-40 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-700" />
                          <span className="text-sm font-medium text-gray-700">{state}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen.state ? "rotate-180" : ""}`} />
                      </button>
                      {isDropdownOpen.state && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-amber-200 rounded-xl shadow-lg z-50">
                          <button
                            onClick={() => handleStateChange("State")}
                            className={`w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors ${state === "State" ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
                          >
                            State
                          </button>
                          {Object.keys(statesData).map((stateName) => (
                            <button
                              key={stateName}
                              onClick={() => handleStateChange(stateName)}
                              className={`w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors ${state === stateName ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
                            >
                              {stateName}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* District Dropdown */}
                    <div className="relative" ref={dropdownRefs.district}>
                      <button
                        disabled={state === "State"}
                        onClick={() => toggleDropdown("district")}
                        className={`flex items-center justify-between gap-2 border rounded-xl px-4 py-3 w-full sm:w-40 shadow-sm transition-colors ${
                          state === "State"
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border-amber-200 hover:bg-amber-50 text-gray-700"
                        }`}
                      >
                        <span className="text-sm font-medium">{district}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen.district ? "rotate-180" : ""}`} />
                      </button>
                      {isDropdownOpen.district && state !== "State" && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-amber-200 rounded-xl shadow-lg z-50">
                          {statesData[state]?.map((districtName) => (
                            <button
                              key={districtName}
                              onClick={() => handleDistrictChange(districtName)}
                              className={`w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${district === districtName ? "bg-green-50 text-green-700 font-medium" : "text-gray-700"}`}
                            >
                              {districtName}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 🔹 CONTENT AREA - Flexible Height */}
              <div className="flex-1 overflow-y-auto p-6">
                {isNewChat || !activeChatId ? (
                  <div className="flex flex-col items-center justify-center p-4">
                    {/* Dual Eyeball Animation */}
                    <DualEyeball hoveredCategory={hoveredCategory} isTyping={inputValue.length > 0} />
                    <h2 className="text-2xl font-bold text-amber-900 mb-2 text-center">
                      What would you like to know?
                    </h2>
                    <p className="text-gray-600 mb-8 text-center">
                      Select a category to explore information
                    </p>
                    {/* Category Buttons with Gooey Effect */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
                      {Object.entries(currentData).map(([key, value]) => (
                        <GooeyButton
                          key={key}
                          icon={value.icon}
                          onClick={() => handleCategoryClick(key)}
                          onHover={(isHovered) => setHoveredCategory(isHovered ? key : null)}
                        >
                          {value.title}
                        </GooeyButton>
                      ))}
                    </div>
                    {/* Voice Feature Note */}
                    <div className="inline-flex items-center gap-3 px-5 py-3 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-200">
                      <Mic className="w-4 h-4" />
                      Voice feature enabled for all 7 languages
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                      <MessageSquare className="w-8 h-8 text-amber-600" />
                    </div>
                    <p className="text-gray-500 text-lg">Select a chat or start a new conversation</p>
                  </div>
                )}
              </div>

              {/* Book Section Modal Overlay - Rendered outside scrollable area */}
              <AnimatePresence>
                {selectedCategory && currentData[selectedCategory as keyof typeof currentData] && (
                  <BookSection
                    category={selectedCategory}
                    data={currentData[selectedCategory as keyof typeof currentData]}
                    onClose={() => setSelectedCategory(null)}
                    initialLanguage={language}
                  />
                )}
              </AnimatePresence>

              {/* INPUT AREA - Fixed at bottom */}
              <div className="border-t border-amber-100 p-6 bg-amber-50/50">
                <div className="max-w-4xl mx-auto">
                  <div className="relative">
                    <input
                      className="w-full bg-white border border-amber-200 rounded-xl px-5 py-4 pr-40 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                      placeholder="Type your question..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                      <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-amber-100 rounded-lg transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Mic className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-6 pt-6 border-t border-amber-200 text-sm">
                    <div className="flex gap-6 mb-2 sm:mb-0">
                      <a href="#" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Features</a>
                      <a href="#" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Documentation</a>
                    </div>
                    <a href="mailto:support@graminsaathi.in" className="text-gray-500 hover:text-green-700 transition-colors">
                      support@graminsaathi.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Chatbot;
