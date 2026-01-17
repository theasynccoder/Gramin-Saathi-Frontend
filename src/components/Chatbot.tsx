import { useState, useEffect, useRef } from "react";
import { Send, Mic, Globe, MapPin, Plus, Search, MessageSquare, ChevronDown, Paperclip } from "lucide-react";

export const Chatbot = () => {
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState("State");
  const [district, setDistrict] = useState("District");
  const [activeChatId, setActiveChatId] = useState(null);
  const [isNewChat, setIsNewChat] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    language: false,
    state: false,
    district: false
  });

  const containerRef = useRef(null);
  const dropdownRefs = {
    language: useRef(null),
    state: useRef(null),
    district: useRef(null)
  };

  // Languages list
  const languages = [
    "English",
    "Hindi",
    "Kannada",
    "Tamil",
    "Telugu",
    "Malayalam",
    "Marathi"
  ];

  // States and districts data
  const statesData = {
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
    "Maharashtra": ["Pune", "Mumbai", "Nagpur", "Nashik"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"]
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs).forEach(key => {
        if (dropdownRefs[key].current && !dropdownRefs[key].current.contains(event.target)) {
          setIsDropdownOpen(prev => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch chat history from backend (mock)
  useEffect(() => {
    const fetchChatHistory = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        setTimeout(() => {
          setChatHistory([
            { id: 1, title: "Rural Scheme Application Help", timestamp: "2024-01-15" },
            { id: 2, title: "Crop Disease Identification", timestamp: "2024-01-14" },
            { id: 3, title: "Health Center Locator", timestamp: "2024-01-13" },
            { id: 4, title: "Education Scholarship Info", timestamp: "2024-01-12" },
            { id: 5, title: "Soil Testing Procedures", timestamp: "2024-01-11" },
          ]);
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  // Handle new chat click
  const handleNewChat = () => {
    setActiveChatId(null);
    setIsNewChat(true);
    setInputValue("");
    
    // Reset UI state
    console.log("New chat started - resetting UI to landing state");
  };

  // Handle chat history item click
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setIsNewChat(false);
    // In real implementation, fetch chat messages for this ID
    console.log(`Loading chat ${chatId} from history`);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // If no active chat, treat as new chat
    if (!activeChatId && isNewChat) {
      // First message in a new chat
      console.log("Sending first message in new chat:", inputValue);
    } else {
      // Message in existing chat
      console.log("Sending message to chat", activeChatId, ":", inputValue);
    }
    
    setInputValue("");
  };

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleStateChange = (newState) => {
    setState(newState);
    setDistrict("District");
    setIsDropdownOpen(prev => ({ ...prev, state: false }));
  };

  const handleDistrictChange = (newDistrict) => {
    setDistrict(newDistrict);
    setIsDropdownOpen(prev => ({ ...prev, district: false }));
  };

  // Handle file attachment
  const handleFileAttach = () => {
    console.log("File attachment clicked - frontend only");
    // Frontend only - no backend implementation
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Main container with consistent height */}
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-8rem)]">
          
          {/* 🔹 LEFT SIDEBAR - Fixed Height Container */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border h-full flex flex-col">
              
              {/* Sidebar Header */}
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Gramin Saathi</h2>
              </div>

              {/* New Chat Button */}
              <button
                onClick={handleNewChat}
                className="flex items-center gap-4 p-5 border-b hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Plus className="w-6 h-6 text-green-700" />
                </div>
                <div className="text-left">
                  <span className="font-semibold text-gray-800 text-lg">New chat</span>
                  <p className="text-sm text-gray-500 mt-1">Start a new conversation</p>
                </div>
              </button>

              {/* Search */}
              <div className="p-5 border-b">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Chat History Section - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Chat history</h3>
                  
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-5 bg-gray-200 rounded w-4/5 mb-2"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatHistory.map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => handleSelectChat(chat.id)}
                          className={`w-full text-left p-4 rounded-xl transition-all ${activeChatId === chat.id ? 'bg-green-50 border-2 border-green-200' : 'hover:bg-gray-50 border border-transparent'}`}
                        >
                          <div className="font-semibold text-gray-800 text-sm">
                            {chat.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {chat.timestamp}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 🔹 MAIN CHAT AREA - Same Height Container */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg border h-full flex flex-col">
              
              {/* 🔹 HEADER - Fixed Height */}
              <div className="border-b p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Title */}
                  <div className="mb-4 lg:mb-0">
                    <h1 className="text-2xl font-bold text-gray-900">Gramin Saathi</h1>
                    <p className="text-gray-600 mt-1">
                      Empowering rural communities through intelligent features
                    </p>
                  </div>

                  {/* 🔹 DROPDOWNS - Inline & Responsive */}
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    {/* Language Dropdown */}
                    <div className="relative" ref={dropdownRefs.language}>
                      <button
                        onClick={() => toggleDropdown('language')}
                        className="flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors w-full sm:w-40 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{language}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen.language ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isDropdownOpen.language && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                          {languages.map((lang) => (
                            <button
                              key={lang}
                              onClick={() => {
                                setLanguage(lang);
                                setIsDropdownOpen(prev => ({ ...prev, language: false }));
                              }}
                              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${language === lang ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
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
                        onClick={() => toggleDropdown('state')}
                        className="flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors w-full sm:w-40 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{state}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen.state ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isDropdownOpen.state && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                          <button
                            onClick={() => handleStateChange("State")}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${state === "State" ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
                          >
                            State
                          </button>
                          {Object.keys(statesData).map((stateName) => (
                            <button
                              key={stateName}
                              onClick={() => handleStateChange(stateName)}
                              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${state === stateName ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
                            >
                              {stateName}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ✅ FIXED: District Dropdown with proper disabled attribute */}
                    <div className="relative" ref={dropdownRefs.district}>
                      <button
                        disabled={state === "State"}
                        onClick={() => toggleDropdown('district')}
                        className={`flex items-center justify-between gap-2 border rounded-xl px-4 py-3 w-full sm:w-40 shadow-sm transition-colors
                        ${
                          state === "State"
                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                        title={state === "State" ? "Please select a state first" : "Select district"}
                      >
                        <span className="text-sm font-medium">{district}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen.district ? 'rotate-180' : ''} ${state === "State" ? 'text-gray-400' : 'text-gray-500'}`} />
                      </button>
                      
                      {/* ✅ Safety check: Only show dropdown when state is selected */}
                      {isDropdownOpen.district && state !== "State" && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                          <button
                            onClick={() => handleDistrictChange("District")}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${district === "District" ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
                          >
                            District
                          </button>
                          {statesData[state]?.map((districtName) => (
                            <button
                              key={districtName}
                              onClick={() => handleDistrictChange(districtName)}
                              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${district === districtName ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'}`}
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
                {/* Show landing page when no chat is active (isNewChat = true) */}
                {isNewChat || !activeChatId ? (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    <div className="text-center max-w-3xl">
                      {/* Welcome Icon */}
                      <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                          <MessageSquare className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        What can I help with?
                      </h2>
                      
                      <p className="text-xl text-gray-600 mb-10">
                        Ask anything about schemes, agriculture, health, education...
                      </p>

                      {/* Quick Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        {["Crop advisory", "Health schemes", "Education loans", "Weather update"].map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => setInputValue(`Tell me about ${action.toLowerCase()}...`)}
                            className="px-6 py-4 bg-white border border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-lg font-semibold text-gray-800 shadow-sm hover:shadow"
                          >
                            {action}
                          </button>
                        ))}
                      </div>

                      {/* Voice Feature Note */}
                      <div className="inline-flex items-center gap-3 px-5 py-3 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-200">
                        <Mic className="w-4 h-4" />
                        Voice feature enabled for all 7 languages
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Chat Messages Area */
                  <div className="h-full flex flex-col">
                    <div className="flex-1">
                      {/* Chat messages would go here */}
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <MessageSquare className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg mb-2">
                          Select a chat from history or start a new conversation
                        </p>
                        <p className="text-gray-400 text-sm">
                          Your messages will appear here
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 🔹 INPUT AREA - Fixed at bottom */}
              <div className="border-t p-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                  <div className="relative">
                    <input
                      className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 pr-40 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base shadow-sm"
                      placeholder="Type your question..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    
                    {/* Action Buttons - Aligned properly */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                      {/* File Attachment */}
                      <button
                        onClick={handleFileAttach}
                        className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Attach file"
                        title="Attach file"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      
                      {/* Voice Input */}
                      <button
                        onClick={() => console.log("Voice input clicked")}
                        className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        aria-label="Voice input"
                        title="Voice input"
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      
                      {/* Send */}
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
                        aria-label="Send message"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div className="flex flex-wrap justify-between items-center mt-6 pt-6 border-t border-gray-200 text-sm">
                    <div className="flex gap-6 mb-2 sm:mb-0">
                      <a href="#" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Features</a>
                      <a href="#" className="text-gray-600 hover:text-green-700 transition-colors font-medium">Documentation</a>
                    </div>
                    <a 
                      href="mailto:support@graminsaathi.in" 
                      className="text-gray-500 hover:text-green-700 transition-colors"
                    >
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