import { useEffect, useRef, useState, useCallback } from "react";

interface UseVoiceSearchOptions {
  onResult: (text: string) => void;
  lang?: string;
}

interface UseVoiceSearchReturn {
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export function useVoiceSearch({
  onResult,
  lang = "en-US", // برای فیلم‌ها زبان پیش‌فرض را انگلیسی قرار دادیم
}: UseVoiceSearchOptions): UseVoiceSearchReturn {
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);

  // بررسی پشتیبانی مرورگر به صورت ایمن در سطح سرور/کلاینت
  const isSupported = typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current = recognition;

    // ✅ تابع پاکسازی (Cleanup) در زمان Unmount شدن کامپوننت
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [lang, onResult, isSupported]); // حذف SpeechRecognition از دیپندرسی‌ها برای جلوگیری از رندرهای بی‌پایان

  // ✅ استفاده از useCallback برای ثبات رندر توابع ارسالی به خارج از هوک
  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    recognitionRef.current.stop();
  }, [isListening]);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
}
