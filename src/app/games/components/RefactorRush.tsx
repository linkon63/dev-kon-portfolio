"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Code2, Award, CheckCircle2, ChevronRight, Terminal } from "lucide-react";

// Web Audio synthesis for keyboard clicks and positive feedback chimes
class SynthEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
    }
  }

  play(type: "click" | "error" | "success" | "chime") {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    switch (type) {
      case "click": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Click sound uses sine with rapid decay
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.025);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.start(now);
        osc.stop(now + 0.025);
        break;
      }
      case "error": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // Low buzz for errors
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.15);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
      case "success": {
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);

          gain.gain.setValueAtTime(0.06, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.12);

          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.12);
        });
        break;
      }
      case "chime": {
        const notes = [587.33, 880.00]; // D5, A5
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);

          gain.gain.setValueAtTime(0.05, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.18);

          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.18);
        });
        break;
      }
    }
  }
}

const synth = new SynthEngine();

// Code Snippets for gameplay
interface Snippet {
  id: number;
  title: string;
  language: string;
  instructions: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: 1,
    title: "Next.js Server Action",
    language: "typescript",
    instructions: "Write a server action with validation and DB insertion.",
    code: `"use server";\n\nexport async function createUser(data: any) {\n  const user = await prisma.user.create({\n    data: { email: data.email, role: "USER" }\n  });\n  revalidatePath("/users");\n  return { success: true, user };\n}`,
  },
  {
    id: 2,
    title: "React Custom Debounce Hook",
    language: "typescript",
    instructions: "Write a standard useEffect debounce hook helper.",
    code: `export function useDebounce<T>(value: T, delay: number = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const handler = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debounced;\n}`,
  },
  {
    id: 3,
    title: "Promise Optimization",
    language: "javascript",
    instructions: "Refactor async requests using concurrent Promise.all arrays.",
    code: `async function fetchDashboard() {\n  const [user, stats, logs] = await Promise.all([\n    fetchUser(),\n    fetchStats(),\n    fetchSystemLogs()\n  ]);\n  return { user, stats, logs };\n}`,
  },
];

export default function RefactorRush() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [soundOn, setSoundOn] = useState(true);

  // CI/CD Mock Pipeline state
  const [isCompiling, setIsCompiling] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState<string[]>([]);
  const [isBuildComplete, setIsBuildComplete] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const currentSnippet = SNIPPETS[snippetIndex];

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("dk_rush_high");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Update sound engine
  useEffect(() => {
    synth.enabled = soundOn;
  }, [soundOn]);

  // Handle gameplay timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  // Focus input automatically
  useEffect(() => {
    if (isPlaying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlaying, snippetIndex]);

  const startGame = () => {
    setInputValue("");
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(60);
    setIsBuildComplete(false);
    setPipelineSteps([]);
    setIsCompiling(false);
    setIsPlaying(true);
    startTimeRef.current = Date.now();
    synth.play("chime");
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    synth.play("error");
  };

  const nextSnippet = () => {
    setIsBuildComplete(false);
    setPipelineSteps([]);
    setIsCompiling(false);
    setInputValue("");
    setSnippetIndex((prev) => (prev + 1) % SNIPPETS.length);
    startTimeRef.current = Date.now();
  };

  const runMockPipeline = () => {
    setIsCompiling(true);
    synth.play("chime");

    const steps = [
      "Running 'eslint --fix'...",
      "Lint check successful ✅",
      "Running 'tsc --noEmit'...",
      "Typescript checks successful ✅",
      "Running 'vitest --run'...",
      "All unit tests passed! (3/3) ✅",
      "Compiling Next.js bundle...",
      "Deployment complete! 🚀"
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setPipelineSteps((prev) => [...prev, step]);
        synth.play("click");
        if (idx === steps.length - 1) {
          setIsBuildComplete(true);
          synth.play("success");
          
          // Calculate score and update high score
          const timeElapsed = (Date.now() - startTimeRef.current) / 1000;
          const charsTyped = inputValue.length;
          const wpmVal = Math.round((charsTyped / 5) / (timeElapsed / 60));

          setHighScore((prev) => {
            if (wpmVal > prev) {
              localStorage.setItem("dk_rush_high", wpmVal.toString());
              return wpmVal;
            }
            return prev;
          });
        }
      }, (idx + 1) * 350);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isPlaying || isCompiling) return;

    const val = e.target.value;
    const targetCode = currentSnippet.code;
    
    // Type sound
    if (val.length > inputValue.length) {
      // Check if newly typed character matches target
      const lastTypedIndex = val.length - 1;
      if (val[lastTypedIndex] === targetCode[lastTypedIndex]) {
        synth.play("click");
      } else {
        synth.play("error");
      }
    }

    setInputValue(val);

    // Calculate accuracy
    let correctCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetCode[i]) correctCount++;
    }
    const currentAcc = val.length > 0 ? Math.round((correctCount / val.length) * 100) : 100;
    setAccuracy(currentAcc);

    // Calculate dynamic WPM
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000; // in seconds
    if (timeElapsed > 0.5) {
      const words = val.length / 5;
      const currentWpm = Math.round(words / (timeElapsed / 60));
      setWpm(currentWpm);
    }

    // Check completion
    if (val === targetCode) {
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      runMockPipeline();
    }
  };

  // Pre-generate overlay characters
  const renderCodeOverlay = () => {
    const targetCode = currentSnippet.code;
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < targetCode.length; i++) {
      const targetChar = targetCode[i];
      const typedChar = inputValue[i];

      let charClass = "text-neutral-500"; // default not typed yet
      if (typedChar !== undefined) {
        charClass = typedChar === targetChar ? "text-emerald-400 bg-emerald-500/10 font-bold" : "text-rose-400 bg-rose-500/20 font-bold underline";
      }

      // Special visual for tabs/newlines
      if (targetChar === "\n") {
        elements.push(
          <span key={i} className={`${charClass} font-sans opacity-40 select-none`}>
            ↵{"\n"}
          </span>
        );
      } else if (targetChar === " " && targetCode[i - 1] === " ") {
        elements.push(
          <span key={i} className={`${charClass} opacity-30 select-none`}>
            ·
          </span>
        );
      } else {
        elements.push(
          <span key={i} className={charClass}>
            {targetChar}
          </span>
        );
      }
    }

    return elements;
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      {/* Top dashboard stats */}
      <div className="flex flex-wrap w-full justify-between items-center bg-[var(--ink)]/5 border border-[var(--ink)]/15 px-6 py-4 rounded-2xl gap-4">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--ink)]/40 font-bold uppercase tracking-wider">Speed</span>
            <span className="text-2xl font-extrabold tabular-nums tracking-tighter">{wpm} <span className="text-sm font-medium">WPM</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--ink)]/40 font-bold uppercase tracking-wider">Accuracy</span>
            <span className="text-2xl font-extrabold tabular-nums tracking-tighter">{accuracy}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--ink)]/40 font-bold uppercase tracking-wider">Best Record</span>
            <span className="text-2xl font-extrabold tabular-nums tracking-tighter text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5">
              <Award size={18} /> {highScore} <span className="text-sm font-medium">WPM</span>
            </span>
          </div>
        </div>

        {/* Timer/Progress ring */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[var(--ink)]/40 font-bold uppercase tracking-wider mb-1">Time Left</span>
            <span className={`text-2xl font-extrabold tabular-nums tracking-tighter ${timeLeft < 10 ? "text-rose-500 animate-pulse" : ""}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
          {!isPlaying && !isCompiling ? (
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--ink)] text-[var(--cream)] hover:opacity-90 font-bold text-xs uppercase tracking-wider transition-opacity cursor-pointer shadow-md"
            >
              <Play size={14} /> Start Challenge
            </button>
          ) : (
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--ink)]/15 hover:bg-[var(--ink)]/5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RotateCcw size={14} /> Restart
            </button>
          )}

          <button
            onClick={() => setSoundOn((s) => !s)}
            className="p-2.5 rounded-xl border border-[var(--ink)]/10 hover:bg-[var(--ink)]/5 transition-colors cursor-pointer"
            title="Toggle Sound"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Editor Screen & Pipeline Console Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
        {/* Editor (IDE) Grid Column 1 & 2 */}
        <div className="lg:col-span-2 border border-[var(--ink)]/15 rounded-3xl overflow-hidden shadow-2xl bg-[#0c0c0b] text-neutral-300">
          {/* Editor Header Bar */}
          <div className="flex justify-between items-center bg-[#141413] px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 ml-3 flex items-center gap-1.5">
                <Code2 size={12} className="text-sky-400" /> refactor_helper.{currentSnippet.language === "typescript" ? "ts" : "js"}
              </span>
            </div>
            <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
              Level {snippetIndex + 1}: {currentSnippet.title}
            </span>
          </div>

          {/* Code Window Container */}
          <div className="relative p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto min-h-[220px]">
            {/* Background target code character overlay */}
            <pre className="whitespace-pre-wrap break-all select-none">
              {renderCodeOverlay()}
            </pre>

            {/* Invisible Textarea captured on user focus */}
            {isPlaying && !isCompiling && (
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none outline-none overflow-hidden p-6 font-mono"
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
              />
            )}

            {/* Inactive overlay instructions */}
            {!isPlaying && !isCompiling && !isBuildComplete && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0c0b]/90 text-center p-6">
                <Terminal size={32} className="text-sky-400 mb-2" />
                <h4 className="font-extrabold tracking-tighter text-white mb-1 uppercase text-sm">Refactor Rush Workspace</h4>
                <p className="text-[11px] text-neutral-400 max-w-xs mb-4">
                  {currentSnippet.instructions} Type the characters precisely to trigger compiler checkups.
                </p>
                <button
                  onClick={startGame}
                  className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-extrabold text-xs uppercase tracking-widest transition-transform hover:scale-105"
                >
                  Mount & Focus Editor
                </button>
              </div>
            )}

            {/* Success Build message */}
            {isBuildComplete && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0c0b]/95 text-center p-6">
                <CheckCircle2 size={42} className="text-emerald-400 mb-2 animate-bounce" />
                <h4 className="font-extrabold tracking-tighter text-emerald-400 mb-1 uppercase text-sm">Compilation Successful!</h4>
                <p className="text-[11px] text-neutral-400 max-w-xs mb-6">
                  Code compiled successfully. Net check yields {wpm} WPM and {accuracy}% accuracy!
                </p>
                <button
                  onClick={nextSnippet}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-full bg-white hover:bg-white/90 text-black font-extrabold text-xs uppercase tracking-widest transition-transform hover:scale-105"
                >
                  Next Challenge <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mock CI/CD Console Grid Column 3 */}
        <div className="border border-[var(--ink)]/15 rounded-3xl shadow-2xl bg-[#0c0c0b] text-neutral-300 self-stretch min-h-[300px] flex flex-col">
          <div className="bg-[#141413] px-4 py-3 border-b border-white/5 flex items-center gap-2 rounded-t-3xl">
            <Terminal size={14} className="text-neutral-500" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">CI/CD Deployment Output</span>
          </div>

          <div className="p-4 font-mono text-[10px] md:text-xs leading-relaxed flex-1 bg-black/60 overflow-y-auto min-h-[220px] flex flex-col gap-1">
            {pipelineSteps.length === 0 && !isCompiling && (
              <p className="text-neutral-600 italic">Terminal idle. Complete the code refactoring challenge to build deployment bundles.</p>
            )}

            {pipelineSteps.map((step, idx) => {
              let textClass = "text-neutral-300";
              if (step.includes("✅")) textClass = "text-emerald-400";
              if (step.includes("🚀")) textClass = "text-sky-400 font-bold";

              return (
                <div key={idx} className={`${textClass} transition-opacity duration-300 animate-fade-in`}>
                  $ {step}
                </div>
              );
            })}

            {isCompiling && !isBuildComplete && (
              <div className="flex gap-1.5 items-center text-sky-400 mt-2">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-0" />
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-300" />
                <span className="text-[10px] uppercase font-bold tracking-wider ml-1">Building...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
