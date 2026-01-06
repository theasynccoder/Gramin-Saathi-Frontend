import { useState } from "react";
import { Send, Mic, Globe, MapPin } from "lucide-react";

export const Chatbot = () => {
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState("State");
  const [district, setDistrict] = useState("District");

  return (
    <section
      id="chatbot"
      className="w-full bg-[#faf9f6] px-4 sm:px-6 lg:px-8 pt-10 pb-24"
    >
      <div className="max-w-6xl mx-auto">

        {/* 🔹 TOP CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          
          {/* Language */}
          <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="outline-none bg-transparent text-sm font-medium"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Kannada</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="outline-none bg-transparent text-sm"
              >
                <option>State</option>
                <option>Karnataka</option>
                <option>Maharashtra</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white border rounded-xl px-4 py-2">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="outline-none bg-transparent text-sm"
              >
                <option>District</option>
                <option>Bengaluru</option>
                <option>Pune</option>
              </select>
            </div>
          </div>
        </div>

        {/* 🔹 MAIN CHAT AREA */}
        <div className="bg-white border rounded-2xl min-h-[360px] flex justify-center text-center px-6">
          <p className="text-lg sm:text-xl text-muted-foreground mt-5">
            Ask anything about schemes, agriculture, health, education…
          </p>
        </div>

        {/* 🔹 INPUT BAR */}
        <div className="mt-6 bg-white border rounded-2xl px-4 py-3 flex items-center gap-3">
          <input
            className="flex-1 outline-none text-sm placeholder:text-muted-foreground"
            placeholder="Type your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button
            className="bg-green-700 hover:bg-green-800 text-white rounded-full p-3 transition"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>

          <button
            className="bg-muted hover:bg-muted/70 rounded-full p-3 transition"
            aria-label="Voice"
          >
            <Mic className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

      </div>
    </section>
  );
};
