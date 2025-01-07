import React, { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const ChatClient = ({ isExpanded, setIsExpanded }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const welcomeMessageShownRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when chat is opened
  useEffect(() => {
    if (isExpanded && !welcomeMessageShownRef.current) {
      setMessages([
        {
          text: "Hello, I am your AI assistant to help you with your social media analytics",
          type: "response",
        },
      ]);
      welcomeMessageShownRef.current = true;
    }
  }, [isExpanded]);


 const sendMessage = useCallback(async () => {
  if (!inputMessage.trim() || isLoading) return;

  try {
    setIsLoading(true);
    setError(null);
    setMessages((prev) => [...prev, { text: inputMessage, type: "user" }]);

     const response = await axios(`${import.meta.env.VITE_PROXY}/chat1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input_value: inputMessage}),
    });

    console.log(response);

    if (response.status!==200) throw new Error("Failed to send message");

    const message = response.data;
    
    setMessages((prev) => [...prev, { text: message, type: "bot" }]);
    setInputMessage("");
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || "An error occurred";
    setError(errorMessage);
    console.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
}, [inputMessage, isLoading]);


  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 ">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          size="lg"
          className="rounded-full w-14 h-14  bg-primary-600 shadow-lg hover:shadow-xl transition-all duration-300">
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      ) : (
        <div className="relative">
          <Card className="w-[380px] shadow-2xl bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary-600 text-white rounded-t-lg">
              <CardTitle className="text-lg font-semibold">
                Analytics Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0 hover:bg-green-500">
                <span className="text-xl text-white">×</span>
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[450px] flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                        }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground p-2 bg-gray-50 rounded-lg">
                      <Loader2 className="animate-spin h-4 w-4" />
                      <span className="text-sm">Processing...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {error && (
                  <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                    {error}
                  </div>
                )}

                <div className="flex gap-2 bg-gray-50 p-2 rounded-lg">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask about your analytics..."
                    className="flex-1 bg-white"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    size="icon"
                    className="bg-primary-600 hover:bg-primary-700 transition-colors">
                    <Send className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatClient;
