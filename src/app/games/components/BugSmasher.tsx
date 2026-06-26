"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Shield, Award, Zap, Gamepad2 } from "lucide-react";

// Native Web Audio Synthesizer
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
    }
  }

  play(type: "shoot" | "explosion" | "powerup" | "gameover" | "success") {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    switch (type) {
      case "shoot": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }
      case "explosion": {
        // Fast sound sweep for crash/burst
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }
      case "powerup": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(500, now + 0.08);
        osc.frequency.linearRampToValueAtTime(900, now + 0.2);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
      case "gameover": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.3);
        osc.frequency.linearRampToValueAtTime(55, now + 0.7);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.start(now);
        osc.stop(now + 0.7);
        break;
      }
      case "success": {
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, i) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.06);

          gain.gain.setValueAtTime(0.06, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.1);

          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.1);
        });
        break;
      }
    }
  }
}

const sfx = new SoundEngine();

// Types for Game Entities
interface Bug {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  speed: number;
  color: string;
  points: number;
  hp: number;
}

interface Shot {
  x: number;
  y: number;
  speed: number;
  label: string;
  color: string;
  angle?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  size: number;
}

interface PowerUp {
  x: number;
  y: number;
  type: "multishot" | "clear" | "shield";
  speed: number;
  width: number;
  height: number;
}

export default function BugSmasher() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // React state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [soundOn, setSoundOn] = useState(true);
  const [powerUpActive, setPowerUpActive] = useState<string | null>(null);

  // References for the loop
  const gameStateRef = useRef({
    playerX: 0,
    playerY: 0,
    playerWidth: 90,
    playerHeight: 28,
    bugs: [] as Bug[],
    shots: [] as Shot[],
    particles: [] as Particle[],
    powerups: [] as PowerUp[],
    keys: {} as Record<string, boolean>,
    lastShotTime: 0,
    lastBugSpawn: 0,
    lastPowerupSpawn: 0,
    powerupTimer: 0,
    powerupType: null as string | null,
    spawnInterval: 1800,
    speedMultiplier: 1,
  });

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("dk_smasher_high");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Update sound engine settings
  useEffect(() => {
    sfx.enabled = soundOn;
  }, [soundOn]);

  // Init player position and attach keyboard handlers
  useEffect(() => {
    const state = gameStateRef.current;
    
    // Default player position
    if (canvasRef.current) {
      state.playerX = canvasRef.current.width / 2;
      state.playerY = canvasRef.current.height - 45;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      state.keys[e.code] = true;
      // Prevent scrolling
      if (["Space", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      state.keys[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Responsive Canvas Sizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = Math.min(rect.width, 800);
        canvasRef.current.height = 500;
        
        // Reset player bounds
        const state = gameStateRef.current;
        if (state.playerX > canvasRef.current.width) {
          state.playerX = canvasRef.current.width / 2;
        }
        state.playerY = canvasRef.current.height - 45;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse & Touch Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying || isGameOver || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const state = gameStateRef.current;
    state.playerX = Math.max(state.playerWidth / 2, Math.min(canvasRef.current.width - state.playerWidth / 2, x));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPlaying || isGameOver || !canvasRef.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const state = gameStateRef.current;
    state.playerX = Math.max(state.playerWidth / 2, Math.min(canvasRef.current.width - state.playerWidth / 2, x));
  };

  // Main Loop
  useEffect(() => {
    let animId: number;
    const state = gameStateRef.current;

    const spawnParticles = (x: number, y: number, color: string, count = 12) => {
      for (let i = 0; i < count; i++) {
        state.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          color,
          life: 1,
          size: Math.random() * 3.5 + 1.5,
        });
      }
    };

    const triggerGameover = () => {
      setIsPlaying(false);
      setIsGameOver(true);
      sfx.play("gameover");
      setHighScore((prev) => {
        const curScore = state.bugs.length > 0 ? score : score; // reactive binding fallback
        if (score > prev) {
          localStorage.setItem("dk_smasher_high", score.toString());
          return score;
        }
        return prev;
      });
    };

    const loop = (time: number) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw Background
      ctx.fillStyle = "#0c0c0b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyber Matrix Grid Accent (Cream/Grey in backdrop)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Check key movements
      if (state.keys["ArrowLeft"]) {
        state.playerX = Math.max(state.playerWidth / 2, state.playerX - 7);
      }
      if (state.keys["ArrowRight"]) {
        state.playerX = Math.min(canvas.width - state.playerWidth / 2, state.playerX + 7);
      }

      // Power-up Timer updates
      if (state.powerupType) {
        state.powerupTimer -= 16.7; // ~1 frame at 60fps
        if (state.powerupTimer <= 0) {
          state.powerupType = null;
          setPowerUpActive(null);
        }
      }

      // Auto-Shooting (every 220ms when active)
      if (isPlaying && !isGameOver) {
        const fireCooldown = state.powerupType === "multishot" ? 170 : 250;
        if (time - state.lastShotTime > fireCooldown) {
          state.lastShotTime = time;
          sfx.play("shoot");

          const shotLabel = ["try_catch()", "npm_run_lint", "eslint_fix", "refactor()"][
            Math.floor(Math.random() * 4)
          ];
          const shotColor = state.powerupType === "multishot" ? "#00ffcc" : "#10b981";

          if (state.powerupType === "multishot") {
            // Triple stream shot
            state.shots.push({ x: state.playerX, y: state.playerY - 15, speed: 7.5, label: shotLabel, color: shotColor, angle: 0 });
            state.shots.push({ x: state.playerX - 20, y: state.playerY - 10, speed: 7.5, label: shotLabel, color: shotColor, angle: -0.2 });
            state.shots.push({ x: state.playerX + 20, y: state.playerY - 10, speed: 7.5, label: shotLabel, color: shotColor, angle: 0.2 });
          } else {
            // Single shot
            state.shots.push({ x: state.playerX, y: state.playerY - 15, speed: 7.5, label: shotLabel, color: shotColor });
          }
        }
      }

      // Spawning Bugs
      const bugSpawnCooldown = Math.max(700, state.spawnInterval - Math.floor(score / 80) * 150);
      if (isPlaying && !isGameOver && time - state.lastBugSpawn > bugSpawnCooldown) {
        state.lastBugSpawn = time;

        const bugTypes = [
          { label: "SyntaxError", color: "#ef4444", hp: 1, points: 10, speed: 1.6 },
          { label: "NullPointer", color: "#f97316", hp: 2, points: 25, speed: 1.3 },
          { label: "404 Not Found", color: "#eab308", hp: 1, points: 15, speed: 2.1 },
          { label: "Merge Conflict", color: "#d946ef", hp: 3, points: 40, speed: 1.0 },
        ];
        
        const config = bugTypes[Math.floor(Math.random() * bugTypes.length)];
        const bugWidth = 110;
        const xPos = Math.random() * (canvas.width - bugWidth) + bugWidth / 2;

        state.bugs.push({
          id: Math.random(),
          x: xPos,
          y: -20,
          width: bugWidth,
          height: 24,
          label: config.label,
          speed: config.speed * state.speedMultiplier,
          color: config.color,
          points: config.points,
          hp: config.hp,
        });
      }

      // Spawning PowerUps
      if (isPlaying && !isGameOver && time - state.lastPowerupSpawn > 12000) {
        state.lastPowerupSpawn = time;
        const types: ("multishot" | "clear" | "shield")[] = ["multishot", "clear", "shield"];
        const type = types[Math.floor(Math.random() * types.length)];
        state.powerups.push({
          x: Math.random() * (canvas.width - 60) + 30,
          y: -20,
          type,
          speed: 1.8,
          width: 32,
          height: 32,
        });
      }

      // Render & Update Player Ship
      if (!isGameOver) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = state.powerupType === "shield" ? "#3b82f6" : "#ffffff";

        // Shield aura
        if (state.powerupType === "shield") {
          ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(state.playerX, state.playerY + 5, 55, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw Player Box as a retro console terminal block
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(
          state.playerX - state.playerWidth / 2,
          state.playerY - state.playerHeight / 2,
          state.playerWidth,
          state.playerHeight,
          6
        );
        ctx.fill();

        // compiler text inside player ship
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#0c0c0b";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("<Compiler />", state.playerX, state.playerY);
      }

      // Update & Draw Shots
      ctx.shadowBlur = 4;
      state.shots = state.shots.filter((shot) => {
        if (shot.angle) {
          shot.x += Math.sin(shot.angle) * shot.speed;
          shot.y -= Math.cos(shot.angle) * shot.speed;
        } else {
          shot.y -= shot.speed;
        }

        ctx.shadowColor = shot.color;
        ctx.fillStyle = shot.color;
        ctx.font = "bold 10px monospace";
        ctx.fillText(shot.label, shot.x, shot.y);

        // Keep inside canvas bounds
        return shot.y > -20 && shot.x > 0 && shot.x < canvas.width;
      });
      ctx.shadowBlur = 0;

      // Update & Draw Powerups
      state.powerups = state.powerups.filter((pw) => {
        pw.y += pw.speed;
        
        ctx.shadowBlur = 8;
        let color = "#3b82f6";
        let label = "🛡️";
        if (pw.type === "multishot") {
          color = "#00ffcc";
          label = "⚡";
        } else if (pw.type === "clear") {
          color = "#ec4899";
          label = "🧹";
        }

        ctx.shadowColor = color;
        ctx.fillStyle = "rgba(12, 12, 11, 0.9)";
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        ctx.arc(pw.x, pw.y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Arial";
        ctx.fillText(label, pw.x, pw.y);

        // Check player collision
        const dist = Math.hypot(pw.x - state.playerX, pw.y - state.playerY);
        if (dist < 42) {
          sfx.play("powerup");
          state.powerupType = pw.type;
          state.powerupTimer = pw.type === "clear" ? 100 : 7000; // GC is instant, others 7s
          setPowerUpActive(pw.type);
          spawnParticles(pw.x, pw.y, color, 18);

          if (pw.type === "clear") {
            // Garbage Collector triggers screen clear
            state.bugs.forEach((b) => {
              spawnParticles(b.x, b.y, b.color, 8);
              setScore((s) => s + b.points);
            });
            state.bugs = [];
            state.powerupType = null;
            setPowerUpActive(null);
          }
          return false;
        }

        return pw.y < canvas.height + 20;
      });

      // Update & Draw Bugs
      state.bugs = state.bugs.filter((bug) => {
        bug.y += bug.speed;

        // Render Bug capsule
        ctx.shadowBlur = 6;
        ctx.shadowColor = bug.color;
        ctx.fillStyle = bug.color + "1a"; // 10% opacity
        ctx.strokeStyle = bug.color;
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.roundRect(
          bug.x - bug.width / 2,
          bug.y - bug.height / 2,
          bug.width,
          bug.height,
          4
        );
        ctx.fill();
        ctx.stroke();

        // Render Bug Text label
        ctx.shadowBlur = 0;
        ctx.fillStyle = bug.color;
        ctx.font = "bold 11px monospace";
        ctx.fillText(bug.label, bug.x, bug.y);

        // Draw Health points dots below the bug if HP > 1
        if (bug.hp > 1) {
          ctx.fillStyle = bug.color;
          const dotSize = 3;
          const spacing = 6;
          const startX = bug.x - ((bug.hp - 1) * spacing) / 2;
          for (let h = 0; h < bug.hp; h++) {
            ctx.beginPath();
            ctx.arc(startX + h * spacing, bug.y + bug.height / 2 + 5, dotSize / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Collision Check with Shots
        let hit = false;
        state.shots = state.shots.filter((shot) => {
          if (
            shot.x > bug.x - bug.width / 2 &&
            shot.x < bug.x + bug.width / 2 &&
            shot.y > bug.y - bug.height / 2 &&
            shot.y < bug.y + bug.height / 2
          ) {
            // Hit!
            hit = true;
            bug.hp -= 1;
            spawnParticles(shot.x, shot.y, bug.color, 4);

            if (bug.hp <= 0) {
              sfx.play("explosion");
              spawnParticles(bug.x, bug.y, bug.color, 14);
              setScore((s) => s + bug.points);
            }
            return false; // Remove shot
          }
          return true;
        });

        // Bug dead?
        if (bug.hp <= 0) return false;

        // Check collision with Player
        const shipDist = Math.hypot(bug.x - state.playerX, bug.y - state.playerY);
        if (shipDist < 45) {
          spawnParticles(bug.x, bug.y, bug.color, 18);
          sfx.play("explosion");

          if (state.powerupType === "shield") {
            // Shield absorbs damage
            state.powerupType = null;
            setPowerUpActive(null);
            return false;
          } else {
            // Take damage
            setLives((l) => {
              const nextL = l - 1;
              if (nextL <= 0) {
                triggerGameover();
              }
              return nextL;
            });
            return false;
          }
        }

        // Bug escape at the bottom border
        if (bug.y > canvas.height + bug.height) {
          if (state.powerupType !== "shield") {
            setLives((l) => {
              const nextL = l - 1;
              if (nextL <= 0) {
                triggerGameover();
              }
              return nextL;
            });
          }
          return false;
        }

        return true;
      });

      // Update & Draw Particles
      state.particles = state.particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.035; // fade out

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        return p.life > 0;
      });

      // Increase speed slightly over time
      state.speedMultiplier = 1 + Math.floor(score / 150) * 0.15;

      if (isPlaying && !isGameOver) {
        animId = requestAnimationFrame(loop);
      }
    };

    if (isPlaying && !isGameOver) {
      animId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isGameOver, score]);

  const startGame = () => {
    // Reset state values
    const state = gameStateRef.current;
    state.bugs = [];
    state.shots = [];
    state.particles = [];
    state.powerups = [];
    state.powerupType = null;
    state.powerupTimer = 0;
    state.spawnInterval = 1800;
    state.speedMultiplier = 1;

    setScore(0);
    setLives(3);
    setIsGameOver(false);
    setPowerUpActive(null);
    setIsPlaying(true);
    
    sfx.play("success");
  };

  const togglePause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center gap-6" ref={containerRef}>
      {/* Panel Headers */}
      <div className="flex flex-wrap w-full max-w-4xl justify-between items-center bg-[var(--ink)]/5 border border-[var(--ink)]/15 px-6 py-4 rounded-2xl gap-4">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--ink)]/40 font-bold uppercase tracking-wider">Score</span>
            <span className="text-2xl font-extrabold tabular-nums tracking-tighter">{score}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--ink)]/40 font-bold uppercase tracking-wider">High Score</span>
            <span className="text-2xl font-extrabold tabular-nums tracking-tighter flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400">
              <Award size={18} /> {highScore}
            </span>
          </div>
        </div>

        {/* Lives indicators */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-[var(--ink)]/40 font-bold uppercase tracking-wider mb-1">Compiler Integrity</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((heart) => (
                <div
                  key={heart}
                  className={`w-6 h-3.5 rounded-full transition-all duration-300 ${
                    lives >= heart
                      ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      : "bg-[var(--ink)]/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
          <button
            onClick={togglePause}
            disabled={isGameOver || score === 0}
            className="p-2.5 rounded-xl border border-[var(--ink)]/10 hover:bg-[var(--ink)]/5 disabled:opacity-35 transition-colors cursor-pointer"
            title={isPlaying ? "Pause" : "Resume"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--ink)] text-[var(--cream)] hover:opacity-90 font-bold text-xs uppercase tracking-wider transition-opacity cursor-pointer shadow-md"
          >
            <RotateCcw size={14} />
            {isGameOver || score === 0 ? "Start Compilation" : "Re-compile"}
          </button>

          <button
            onClick={() => setSoundOn((s) => !s)}
            className="p-2.5 rounded-xl border border-[var(--ink)]/10 hover:bg-[var(--ink)]/5 transition-colors cursor-pointer"
            title="Toggle Sound"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative border border-[var(--ink)]/15 rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl bg-[#0c0c0b] aspect-[8/5]">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="block w-full h-full cursor-none"
        />

        {/* Start Overlay Screen */}
        {!isPlaying && !isGameOver && score === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 text-white p-6 text-center select-none animate-fade-in">
            <Gamepad2 size={48} className="mb-4 text-emerald-400 animate-bounce" />
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-2">BUG SMASHER</h3>
            <p className="text-xs text-white/50 max-w-md mb-6 leading-relaxed">
              Bugs are descending into the environment! Use your mouse/finger or Arrow Keys to drag your compiler. It shoots compilation patches automatically. Smashed bugs boost the compilation scoreboard.
            </p>
            
            {/* Powerups Legend */}
            <div className="flex gap-4 justify-center mb-6 text-[10px] uppercase font-bold tracking-widest text-white/40">
              <span className="flex items-center gap-1.5"><Zap size={12} className="text-[#00ffcc]" /> ⚡ Multishot</span>
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-[#3b82f6]" /> 🛡️ Shield</span>
              <span className="flex items-center gap-1.5">🧹 Clear Screen</span>
            </div>

            <button
              onClick={startGame}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              Start Debug Session
            </button>
          </div>
        )}

        {/* Pause Overlay Screen */}
        {!isPlaying && !isGameOver && score > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-6 text-center select-none">
            <Pause size={42} className="mb-3 text-yellow-400 animate-pulse" />
            <h3 className="text-xl font-extrabold tracking-tighter mb-4">COMPILATION PAUSED</h3>
            <button
              onClick={togglePause}
              className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest transition-transform hover:scale-105 cursor-pointer"
            >
              Resume Debugging
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-6 text-center select-none animate-fade-in">
            <h3 className="text-3xl md:text-5xl font-black text-rose-500 tracking-tighter mb-1">
              BUILD FAILED ❌
            </h3>
            <p className="text-sm font-semibold tracking-widest text-white/40 uppercase mb-6">
              Critical exceptions crashed the compiler
            </p>
            
            <div className="flex gap-8 mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Final Score</span>
                <span className="text-3xl font-black tracking-tighter">{score}</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-8">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">High Score</span>
                <span className="text-3xl font-black tracking-tighter text-yellow-400">{highScore}</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-400 text-black font-extrabold text-sm uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(244,63,94,0.4)] cursor-pointer"
            >
              Re-compile Code
            </button>
          </div>
        )}

        {/* Active Power-up alert */}
        {powerUpActive && (
          <div className="absolute bottom-4 left-4 bg-[var(--ink)] text-[var(--cream)] border border-[var(--cream)]/10 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg select-none animate-pulse">
            <Zap size={12} className={powerUpActive === "multishot" ? "text-emerald-400" : "text-blue-400"} />
            Powerup Active: {powerUpActive}
          </div>
        )}
      </div>
    </div>
  );
}
