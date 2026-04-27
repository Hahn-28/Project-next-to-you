'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/Timer.module.css';

export default function Timer() {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const heartCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const heartCanvas = heartCanvasRef.current;
    if (!backgroundCanvas || !heartCanvas) return;

    const bgCtx = backgroundCanvas.getContext('2d');
    const ctx = heartCanvas.getContext('2d');
    if (!bgCtx || !ctx) return;

    // Configuración de parámetros
    const config = {
      heart: {
        particleCount: 800,
        scaleFactor: 0.35,
        scaleFactorDesktop: 0.25,
        particleSizeMin: 1.5,
        particleSizeRange: 2.5,
        trembleAmplitude: 3,
        orbitRadius: 3,
        orbitSpeedMin: 0.03,
        orbitSpeedRange: 0.05,
        densityMin: 1,
        densityRange: 20
      },
      text: {
        particleCount: 150,
        fontSizeMobile: 0.11,
        fontSizeDesktop: 0.08,
        particleSizeMin: 0.8,
        particleSizeRange: 1.2,
        trembleAmplitude: 2,
        orbitRadius: 2,
        orbitSpeedMin: 0.03,
        orbitSpeedRange: 0.05,
        pixelStepMobile: 1.2,
        pixelStepDesktop: 1.8,
        densityMin: 1,
        densityRange: 20
      },
      mouse: {
        radius: 200
      },
      background: {
        waveSpeed: 0.001,
        waveAmplitude: 0.4,
        secondaryWaveSpeed: 0.0008,
        secondaryWaveAmplitude: 0.3,
        redIntensity: 0.3
      }
    };

    // Ajustar el tamaño de los canvas
    function resizeCanvas() {
      if (!backgroundCanvas || !heartCanvas) return;
      backgroundCanvas.width = window.innerWidth;
      backgroundCanvas.height = window.innerHeight;
      heartCanvas.width = window.innerWidth;
      heartCanvas.height = window.innerHeight;
    }
    resizeCanvas();

    const particles: Particle[] = [];
    let isMobile = window.innerWidth <= 768;
    let scaleFactor = Math.min(heartCanvas.width, heartCanvas.height) / 1080;
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: config.mouse.radius * scaleFactor
    };

    // Event listeners
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    const handleResize = () => {
      resizeCanvas();
      isMobile = window.innerWidth <= 768;
      scaleFactor = Math.min(heartCanvas.width, heartCanvas.height) / 1080;
      mouse.radius = config.mouse.radius * scaleFactor;
      init();
    };
    window.addEventListener('resize', handleResize);

    // Fondo degradado en movimiento
    function drawBackground() {
      if (!bgCtx || !backgroundCanvas) return;
      bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
      const time = Date.now();
      const waveTime = time * config.background.waveSpeed;
      const secondaryWaveTime = time * config.background.secondaryWaveSpeed;

      for (let x = 0; x < backgroundCanvas.width; x += 10) {
        for (let y = 0; y < backgroundCanvas.height; y += 10) {
          const dx = (x - backgroundCanvas.width / 2) / backgroundCanvas.width;
          const dy = (y - backgroundCanvas.height / 2) / backgroundCanvas.height;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const wave = Math.sin(distance * 10 + waveTime) * config.background.waveAmplitude;
          const secondaryWave = Math.cos(distance * 8 + secondaryWaveTime) * config.background.secondaryWaveAmplitude;
          const red = Math.min(255 * config.background.redIntensity * (distance + wave + secondaryWave), 255);

          bgCtx.fillStyle = `rgba(${red}, 0, 0, ${1 - distance * 0.8})`;
          bgCtx.fillRect(x, y, 10, 10);
        }
      }
    }

    // Clase Partícula
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      isTextParticle: boolean;
      color: string;
      trembleOffset: number;
      trembleSpeed: number;
      trembleAmplitude: number;
      orbitOffset: number;
      orbitSpeed: number;
      orbitRadius: number;

      constructor(x: number, y: number, isTextParticle = false) {
        this.x = x;
        this.y = y;
        const cfg = isTextParticle ? config.text : config.heart;
        this.size = isTextParticle ?
          (Math.random() * cfg.particleSizeRange + cfg.particleSizeMin) * scaleFactor :
          (Math.random() * cfg.particleSizeRange + cfg.particleSizeMin) * scaleFactor;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * cfg.densityRange) + cfg.densityMin;
        this.isTextParticle = isTextParticle;

        this.color = isTextParticle ?
          `hsl(${Math.random() * 20 + 350}, 100%, 90%)` :
          `hsl(${Math.random() * 10 + 345}, 100%, 70%)`;

        this.trembleOffset = Math.random() * Math.PI * 2;
        this.trembleSpeed = Math.random() * 0.1 + 0.06;
        this.trembleAmplitude = cfg.trembleAmplitude * scaleFactor;

        this.orbitOffset = Math.random() * Math.PI * 2;
        this.orbitSpeed = Math.random() * cfg.orbitSpeedRange + cfg.orbitSpeedMin;
        this.orbitRadius = cfg.orbitRadius * scaleFactor;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        const time = Date.now() * 0.001;
        const trembleX = Math.sin(time * this.trembleSpeed + this.trembleOffset) * this.trembleAmplitude;
        const trembleY = Math.cos(time * this.trembleSpeed + this.trembleOffset * 1.5) * this.trembleAmplitude;

        const orbitX = Math.sin(time * this.orbitSpeed + this.orbitOffset) * this.orbitRadius;
        const orbitY = Math.cos(time * this.orbitSpeed + this.orbitOffset * 1.2) * this.orbitRadius;

        let dx = (mouse.x || 0) - this.x;
        let dy = (mouse.y || 0) - this.y;
        const distance = Math.hypot(dx, dy);
        let forceDirectionX = distance > 0 ? dx / distance : 0;
        let forceDirectionY = distance > 0 ? dy / distance : 0;

        const maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        if (force < 0) force = 0;

        const targetX = this.baseX + trembleX + orbitX;
        const targetY = this.baseY + trembleY + orbitY;
        const directionX = (targetX - this.x) / (this.isTextParticle ? 6 : 8);
        const directionY = (targetY - this.y) / (this.isTextParticle ? 6 : 8);

        if (distance < mouse.radius) {
          this.x -= forceDirectionX * force * this.density * 2;
          this.y -= forceDirectionY * force * this.density * 2;
        } else {
          this.x += directionX;
          this.y += directionY;
        }

        this.draw();
      }
    }

    // Crear partículas de texto
    function createTextParticles() {
      if (!heartCanvas || !ctx) return;
      const centerX = heartCanvas.width / 2;
      const centerY = heartCanvas.height / 2;
      const text = "Feliz Cumpleaños ❤️";
      const baseDimension = isMobile ? Math.max(heartCanvas.width, heartCanvas.height) : Math.min(heartCanvas.width, heartCanvas.height);
      const fontSize = baseDimension * (isMobile ? config.text.fontSizeMobile : config.text.fontSizeDesktop);

      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const textCanvas = document.createElement('canvas');
      const textCtx = textCanvas.getContext('2d');
      if (!textCtx) return;
      
      textCanvas.width = heartCanvas.width;
      textCanvas.height = heartCanvas.height;

      textCtx.font = ctx.font;
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';
      textCtx.fillStyle = 'white';
      
      textCtx.save();
      textCtx.translate(centerX, centerY);
      if (isMobile) {
        textCtx.rotate(Math.PI / 2);
      }
      textCtx.fillText(text, 0, 0);
      textCtx.restore();

      const textWidth = textCtx.measureText(text).width;
      const textHeight = fontSize * 1.2;
      
      let scanWidth = textWidth;
      let scanHeight = textHeight;
      if (isMobile) {
        scanWidth = textHeight;
        scanHeight = textWidth;
      }

      const startX = centerX - scanWidth / 2;
      const startY = centerY - scanHeight / 2;

      const pixelData = textCtx.getImageData(0, 0, heartCanvas.width, heartCanvas.height).data;
      const step = isMobile ? config.text.pixelStepMobile : config.text.pixelStepDesktop;

      for (let y = startY; y < startY + scanHeight; y += step) {
        for (let x = startX; x < startX + scanWidth; x += step) {
          const pixelIndex = (Math.floor(y) * heartCanvas.width + Math.floor(x)) * 4;
          if (pixelData[pixelIndex + 3] > 128) {
            particles.push(new Particle(x, y, true));
          }
        }
      }
    }

    // Inicializar partículas del corazón
    function init() {
      if (!heartCanvas) return;
      particles.length = 0;

      const centerX = heartCanvas.width / 2;
      const centerY = heartCanvas.height / 2;
      const baseDimension = isMobile ? Math.max(heartCanvas.width, heartCanvas.height) : Math.min(heartCanvas.width, heartCanvas.height);
      const scale = baseDimension * (isMobile ? config.heart.scaleFactor : config.heart.scaleFactorDesktop);

      for (let i = 0; i < config.heart.particleCount; i++) {
        const t = Math.random() * Math.PI * 2;
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        // Rotar 90 grados en móvil para que se vea horizontalmente
        if (isMobile) {
          const tempX = x;
          x = -y;
          y = tempX;
        }

        particles.push(new Particle(
          centerX + x * scale / 16,
          centerY + y * scale / 16,
          false
        ));
      }

      createTextParticles();
    }

    // Animación
    let animationFrameId: number;
    function animate() {
      if (!heartCanvas || !ctx) return;
      drawBackground();
      ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
      particles.forEach(particle => particle.update());
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.particleContainer}>
      <canvas ref={backgroundCanvasRef} className={styles.backgroundCanvas}></canvas>
      <canvas ref={heartCanvasRef} className={styles.heartCanvas}></canvas>
    </div>
  );
}
