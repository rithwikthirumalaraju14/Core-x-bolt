import React, { useState, useRef, useEffect } from "react";
import { Dumbbell, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import ChatWindow from "./chatbot/ChatWindow";

// Helper to fetch product names from global scope (populated by window)
function getProductList(): string[] {
  // @ts-ignore
  return window.__ADVANCED_PRODUCTS_LIST__ || [];
}

const getHistory = () => {
  try {
    const raw = localStorage.getItem("cx-bot-history");
    if (raw) return JSON.parse(raw);
  } catch { }
  return undefined;
};
const saveHistory = (messages: { role: string; content: string }[]) => {
  localStorage.setItem("cx-bot-history", JSON.stringify(messages));
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "system" | "user" | "assistant"; content: string }[]
  >(() => {
    const h = getHistory();
    return h && Array.isArray(h) && h[0]?.role === "system"
      ? h
      : [{
          role: "system",
          content:
            "You are a helpful and friendly assistant for Core X, a sports clothing brand. You are an expert on our products and can also answer general knowledge questions, especially about fitness and wellness. If the user asks about order tracking or returns/exchanges, politely explain that you can't access user-specific order data, but you can guide them. For order tracking, instruct them to sign in and visit their orders page, or contact support with their order number. For returns or exchanges, guide them to the returns portal or contact support for assistance. Never make up personal information. Available products: " +
            getProductList().join(", ") +
            ". If asked about stock level, say you do not have inventory data.",
        }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    // save chat except for empty or only system
    if (messages.length > 1) saveHistory(messages);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userInput = input.trim().toLowerCase();
    // Intercept order/return/track intents for helpful canned responses
    if (
      /(where.*order|track.*order|status.*order|my order status)/i.test(userInput)
    ) {
      setMessages((msgs) => [
        ...msgs,
        { role: "user", content: input.trim() },
        { role: "assistant", content: "I can't view personal order data, but you can track your order by signing in and visiting your orders page. If you need help, please contact our support team with your order number!" }
      ]);
      setInput("");
      return;
    }
    if (
      /(how.*return|start.*return|exchange.*item|replace.*item|return.*item)/i.test(userInput)
    ) {
      setMessages((msgs) => [
        ...msgs,
        { role: "user", content: input.trim() },
        { role: "assistant", content: "To return or exchange an item, please visit our returns portal or contact our support team. We'll provide step-by-step instructions to help!" }
      ]);
      setInput("");
      return;
    }

    const nextMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      ...messages,
      { role: "user", content: input.trim() },
    ];
    setMessages(nextMessages);
    setLoading(true);
    setInput("");
    try {
      const { data, error } = await supabase.functions.invoke("groq-chat", {
        body: {
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: "There was an error: " + (data.error || "Unknown error.") },
        ]);
        setLoading(false);
        return;
      }
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.message || "(No answer returned from Groq.)" },
      ]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: `Error: ${errorMessage}` },
      ]);
    }
    setLoading(false);
  };

  const handleSample = (q: string) => {
    setInput(q);
    inputRef.current?.focus();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <div className="relative group">
            {/* Animated background rings - smaller */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-corex-red via-corex-blue to-corex-green opacity-75 animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-corex-green via-corex-orange to-corex-purple opacity-50 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
            
            {/* Pulsing outer ring - smaller */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-corex-red/30 to-corex-blue/30 animate-pulse"></div>
            
            {/* Floating particles - fewer and smaller */}
            <div className="absolute -inset-3 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full animate-float opacity-60"
                  style={{
                    left: `${25 + i * 20}%`,
                    top: `${25 + (i % 2) * 50}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + i * 0.3}s`
                  }}
                />
              ))}
            </div>

            {/* Main button - reduced from w-16 h-16 to w-12 h-12 */}
            <Button
              className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-800 hover:from-corex-red hover:via-corex-blue hover:to-corex-green shadow-xl hover:shadow-corex-red/50 transition-all duration-500 transform hover:scale-110 active:scale-95 border-2 border-white/20 backdrop-blur-sm group-hover:border-white/40"
              onClick={() => setOpen(true)}
              aria-label="Open AI fitness assistant"
              size="icon"
            >
              {/* Inner glow effect */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon with morphing animation - reduced from w-8 h-8 to w-6 h-6 */}
              <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
                <MessageCircle className="w-6 h-6 text-white drop-shadow-lg group-hover:hidden transition-opacity duration-300" />
                <Sparkles className="w-6 h-6 text-white drop-shadow-lg hidden group-hover:block transition-opacity duration-300" />
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </Button>

            {/* Tooltip - adjusted positioning */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
              <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10 whitespace-nowrap">
                Ask me anything about Core X!
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
              </div>
            </div>

            {/* Status indicator - reduced from w-4 h-4 to w-3 h-3 */}
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse">
              <div className="absolute inset-0.5 bg-green-300 rounded-full animate-ping"></div>
            </div>
          </div>
        )}
      </div>
      {open && (
        <ChatWindow 
          onClose={() => setOpen(false)}
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          handleSample={handleSample}
          inputRef={inputRef}
        />
      )}
    </>
  );
};

export default Chatbot;