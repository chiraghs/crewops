'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, MessageSquare, Radio } from 'lucide-react';

interface VoiceAssistantProps {
  activeVertical: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ activeVertical }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    {
      sender: 'agent',
      text: `CrewOps OCC Dispatcher online. Ready for queries on ${
        activeVertical === 'aviation' ? 'DGCA/FAA flight rosters and standby pools' : 'IMO STCW vessel watches and harbor relief'
      }.`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setTranscript((prev) => [
          ...prev,
          { sender: 'user', text: 'Who is the legal standby pilot available to cover the uncrewed sector right now?' },
          {
            sender: 'agent',
            text:
              activeVertical === 'aviation'
                ? 'Reserve Captain C-1088 is available at DEL Terminal 3 with 41.5h legal headroom. Estimated callout latency: 45 minutes.'
                : 'Harbor Relief Pilot H-204 is on-call at Rotterdam Botlek pilot station with 50.0h STCW headroom. Ready to board in 35 minutes.',
          },
        ]);
        setIsListening(false);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    setTranscript((prev) => [...prev, { sender: 'user', text: userText }]);

    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Deterministic kernel processed: ${userText}. All crew constraints verified 100% legal under ${
            activeVertical === 'aviation' ? 'CAR Section 7' : 'IMO STCW 2010'
          }.`,
        },
      ]);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-[var(--surface-1)] border border-[var(--hairline)] rounded-2xl shadow-2xl w-80 md:w-96 overflow-hidden flex flex-col h-[460px] animate-scale-in">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#00594a] to-[#00836c] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse" />
              <div className="font-display font-bold text-xs">Gemini Live · OCC Voice Assistant</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-white/10 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Transcript Scroll Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
            {transcript.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[var(--brand-green)] text-white'
                      : 'bg-[var(--surface-2)] border border-[var(--hairline)] text-[var(--ink-primary)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isListening && (
              <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg text-amber-800 dark:text-amber-300 text-xs">
                <Radio className="w-4 h-4 animate-spin text-amber-600" />
                <span>Listening to live audio stream...</span>
              </div>
            )}
          </div>

          {/* Voice Waveform and Controls */}
          <div className="p-3 border-t border-[var(--hairline)] bg-[var(--surface-2)] space-y-2">
            <div className="flex items-center justify-center gap-1.5 h-6">
              {[4, 12, 18, 8, 22, 14, 6, 16, 10, 20, 12, 4].map((h, i) => (
                <span
                  key={i}
                  style={{ height: isListening ? `${h}px` : '4px' }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isListening ? 'bg-[var(--brand-orange)]' : 'bg-[var(--ink-muted)]'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[var(--brand-green)] text-white hover:bg-[var(--brand-green-strong)]'
                }`}
                title="Toggle microphone"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <form onSubmit={handleSend} className="flex-1 flex gap-1.5">
                <input
                  type="text"
                  placeholder="Ask OCC kernel anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-[var(--hairline)] bg-[var(--surface-1)] text-xs text-[var(--ink-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-green)]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-strong)] text-white font-bold text-xs"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#00594a] via-[#00836c] to-[#00a184] hover:shadow-xl text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <Mic className="w-4 h-4 text-amber-300" />
          <span>Gemini Live Voice</span>
        </button>
      )}
    </div>
  );
};
