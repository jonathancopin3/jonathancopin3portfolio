import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const SLIDES_DATA = [
    { title: "Premium Window Frame", description: "", media: "/Image all projet/Horman - Chassis/chassis_fenetre_sections_L_exploded_studio.png" },
    { title: "Nomad Apple Watch Strap", description: "", media: "/Image all projet/Nomad/Nomad_picture_upscale.png" },
    { title: "Premium Microphone", description: "", media: "/Image all projet/Mic/Mike_v2__03_argent.png" },
    { title: "Devialet Mania", description: "", media: "/Image all projet/Devialet/Rendu_Devialet_Mania_1.jpeg" },
    { title: "Truck Simulator", description: "", media: "/Image all projet/John Cokerill/Rendu_finale_uspcale_finale.png" },
    { title: "Technical Project : Component Modeling", description: "", media: "/Image all projet/Wilo/Wilo_boite_final.png" },
    { title: "VFX Animation", description: "", media: "/Image all projet/Retour vers le futur/Ai Ehance.png" }
];

export function Component() {
    const containerRef = useRef<HTMLDivElement>(null);

    const slides = SLIDES_DATA;

    useEffect(() => {
        // --- MAIN LOGIC ---
        const initApplication = async () => {
            const SLIDER_CONFIG: any = {
                settings: {
                    transitionDuration: 2.5, autoSlideSpeed: 2500, currentEffect: "glass", currentEffectPreset: "Default",
                    globalIntensity: 1.0, speedMultiplier: 1.0, distortionStrength: 1.0, colorEnhancement: 1.0,
                    glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0,
                    frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0,
                    rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0,
                    plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0,
                    timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4
                },
                effectPresets: {
                    glass: { Subtle: { glassRefractionStrength: 0.6, glassChromaticAberration: 0.5, glassBubbleClarity: 1.3, glassEdgeGlow: 0.7, glassLiquidFlow: 0.8 }, Default: { glassRefractionStrength: 1.0, glassChromaticAberration: 1.0, glassBubbleClarity: 1.0, glassEdgeGlow: 1.0, glassLiquidFlow: 1.0 }, Crystal: { glassRefractionStrength: 1.5, glassChromaticAberration: 1.8, glassBubbleClarity: 0.7, glassEdgeGlow: 1.4, glassLiquidFlow: 0.5 }, Liquid: { glassRefractionStrength: 0.8, glassChromaticAberration: 0.4, glassBubbleClarity: 1.2, glassEdgeGlow: 0.8, glassLiquidFlow: 1.8 } },
                    frost: { Light: { frostIntensity: 0.8, frostCrystalSize: 1.3, frostIceCoverage: 0.6, frostTemperature: 0.7, frostTexture: 0.8 }, Default: { frostIntensity: 1.5, frostCrystalSize: 1.0, frostIceCoverage: 1.0, frostTemperature: 1.0, frostTexture: 1.0 }, Heavy: { frostIntensity: 2.2, frostCrystalSize: 0.7, frostIceCoverage: 1.4, frostTemperature: 1.5, frostTexture: 1.3 }, Arctic: { frostIntensity: 2.8, frostCrystalSize: 0.5, frostIceCoverage: 1.8, frostTemperature: 2.0, frostTexture: 1.6 } },
                    ripple: { Gentle: { rippleFrequency: 15.0, rippleAmplitude: 0.05, rippleWaveSpeed: 0.7, rippleRippleCount: 0.8, rippleDecay: 1.2 }, Default: { rippleFrequency: 25.0, rippleAmplitude: 0.08, rippleWaveSpeed: 1.0, rippleRippleCount: 1.0, rippleDecay: 1.0 }, Strong: { rippleFrequency: 35.0, rippleAmplitude: 0.12, rippleWaveSpeed: 1.4, rippleRippleCount: 1.3, rippleDecay: 0.8 }, Tsunami: { rippleFrequency: 45.0, rippleAmplitude: 0.18, rippleWaveSpeed: 1.8, rippleRippleCount: 1.6, rippleDecay: 0.6 } },
                    plasma: { Calm: { plasmaIntensity: 0.8, plasmaSpeed: 0.5, plasmaEnergyIntensity: 0.2, plasmaContrastBoost: 0.1, plasmaTurbulence: 0.6 }, Default: { plasmaIntensity: 1.2, plasmaSpeed: 0.8, plasmaEnergyIntensity: 0.4, plasmaContrastBoost: 0.3, plasmaTurbulence: 1.0 }, Storm: { plasmaIntensity: 1.8, plasmaSpeed: 1.3, plasmaEnergyIntensity: 0.7, plasmaContrastBoost: 0.5, plasmaTurbulence: 1.5 }, Nuclear: { plasmaIntensity: 2.5, plasmaSpeed: 1.8, plasmaEnergyIntensity: 1.0, plasmaContrastBoost: 0.8, plasmaTurbulence: 2.0 } },
                    timeshift: { Subtle: { timeshiftDistortion: 0.5, timeshiftBlur: 0.6, timeshiftFlow: 0.5, timeshiftChromatic: 0.4, timeshiftTurbulence: 0.6 }, Default: { timeshiftDistortion: 1.6, timeshiftBlur: 1.5, timeshiftFlow: 1.4, timeshiftChromatic: 1.5, timeshiftTurbulence: 1.4 }, Intense: { timeshiftDistortion: 2.2, timeshiftBlur: 2.0, timeshiftFlow: 2.0, timeshiftChromatic: 2.2, timeshiftTurbulence: 2.0 }, Dreamlike: { timeshiftDistortion: 2.8, timeshiftBlur: 2.5, timeshiftFlow: 2.5, timeshiftChromatic: 2.6, timeshiftTurbulence: 2.5 } }
                }
            };

            // --- GLOBAL STATE ---
            let currentSlideIndex = 0;
            let isTransitioning = false;
            let shaderMaterial: THREE.ShaderMaterial, renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.OrthographicCamera;
            let slideTextures: THREE.Texture[] = [];
            let texturesLoaded = false;
            let autoSlideTimer: ReturnType<typeof setTimeout> | null = null;
            let progressAnimation: gsap.core.Tween | null = null;
            let sliderEnabled = false;

            const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
            const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

            // --- SHADERS ---
            const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
            const fragmentShader = `
            uniform sampler2D uTexture1, uTexture2;
            uniform float uProgress;
            uniform vec2 uResolution, uTexture1Size, uTexture2Size;
            uniform int uEffectType;
            uniform float uGlobalIntensity, uSpeedMultiplier, uDistortionStrength, uColorEnhancement;
            uniform float uGlassRefractionStrength, uGlassChromaticAberration, uGlassBubbleClarity, uGlassEdgeGlow, uGlassLiquidFlow;
            uniform float uFrostIntensity, uFrostCrystalSize, uFrostIceCoverage, uFrostTemperature, uFrostTexture;
            uniform float uRippleFrequency, uRippleAmplitude, uRippleWaveSpeed, uRippleRippleCount, uRippleDecay;
            uniform float uPlasmaIntensity, uPlasmaSpeed, uPlasmaEnergyIntensity, uPlasmaContrastBoost, uPlasmaTurbulence;
            uniform float uTimeshiftDistortion, uTimeshiftBlur, uTimeshiftFlow, uTimeshiftChromatic, uTimeshiftTurbulence;
            varying vec2 vUv;

            vec2 getCoverUV(vec2 uv, vec2 textureSize) {
                vec2 s = uResolution / textureSize;
                float scale = max(s.x, s.y);
                vec2 scaledSize = textureSize * scale;
                vec2 offset = (uResolution - scaledSize) * 0.5;
                return (uv * uResolution - offset) / scaledSize;
            }
            float noise(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
            
            vec4 glassEffect(vec2 uv, float progress) {
                float time = progress * 5.0 * uSpeedMultiplier;
                vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
                float maxR = length(uResolution) * 0.85; float br = progress * maxR;
                vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
                float d = length(p - c); float nd = d / max(br, 0.001);
                float param = smoothstep(br + 3.0, br - 3.0, d); // Inside circle
                vec4 img;
                if (param > 0.0) {
                     float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
                     vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
                     vec2 distUV = uv2 - dir * ro;
                     distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
                     float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
                     img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
                     if (uGlassEdgeGlow > 0.0) {
                        float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
                        img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
                     }
                } else { img = texture2D(uTexture2, uv2); }
                vec4 oldImg = texture2D(uTexture1, uv1);
                if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
                return mix(oldImg, img, param);
            }
            // Simplified stubs for other effects (to save space, logic is in glassEffect mainly for demo)
            vec4 frostEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 rippleEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 plasmaEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }
            vec4 timeshiftEffect(vec2 uv, float progress) { return mix(texture2D(uTexture1, getCoverUV(uv, uTexture1Size)), texture2D(uTexture2, getCoverUV(uv, uTexture2Size)), progress); }

            void main() {
                if (uEffectType == 0) gl_FragColor = glassEffect(vUv, uProgress);
                else if (uEffectType == 1) gl_FragColor = frostEffect(vUv, uProgress);
                else if (uEffectType == 2) gl_FragColor = rippleEffect(vUv, uProgress);
                else if (uEffectType == 3) gl_FragColor = plasmaEffect(vUv, uProgress);
                else gl_FragColor = timeshiftEffect(vUv, uProgress);
            }
        `;

            // --- CORE FUNCTIONS ---
            const getEffectIndex = (n: string) => ({ glass: 0, frost: 1, ripple: 2, plasma: 3, timeshift: 4 } as any)[n] || 0;

            const updateShaderUniforms = () => {
                if (!shaderMaterial) return;
                const s = SLIDER_CONFIG.settings, u = shaderMaterial.uniforms;
                for (const key in s) {
                    const uName = 'u' + key.charAt(0).toUpperCase() + key.slice(1);
                    if (u[uName]) u[uName].value = s[key];
                }
                u.uEffectType.value = getEffectIndex(s.currentEffect);
            };



            const updateContent = (_: number) => {
                // Content removed as per user request
            };


            const navigateToSlide = (targetIndex: number) => {
                if (isTransitioning || targetIndex === currentSlideIndex) return; // BLOCKING LOGIC
                stopAutoSlideTimer();
                quickResetProgress(currentSlideIndex);

                const currentTexture = slideTextures[currentSlideIndex];
                const targetTexture = slideTextures[targetIndex];
                if (!currentTexture || !targetTexture) return;

                isTransitioning = true;
                shaderMaterial.uniforms.uTexture1.value = currentTexture;
                shaderMaterial.uniforms.uTexture2.value = targetTexture;
                shaderMaterial.uniforms.uTexture1Size.value = currentTexture.userData.size;
                shaderMaterial.uniforms.uTexture2Size.value = targetTexture.userData.size;

                updateContent(targetIndex);

                currentSlideIndex = targetIndex;
                updateCounter(currentSlideIndex);
                updateNavigationState(currentSlideIndex);

                gsap.fromTo(shaderMaterial.uniforms.uProgress,
                    { value: 0 },
                    {
                        value: 1,
                        duration: TRANSITION_DURATION(),
                        ease: "power2.inOut",
                        onComplete: () => {
                            shaderMaterial.uniforms.uProgress.value = 0;
                            shaderMaterial.uniforms.uTexture1.value = targetTexture;
                            shaderMaterial.uniforms.uTexture1Size.value = targetTexture.userData.size;
                            isTransitioning = false;
                            safeStartTimer(100);
                        }
                    }
                );
            };

            const handleSlideChange = () => {
                if (isTransitioning || !texturesLoaded || !sliderEnabled) return;
                navigateToSlide((currentSlideIndex + 1) % slides.length);
            };

            const createSlidesNavigation = () => {
                const nav = document.getElementById("slidesNav"); if (!nav) return;
                nav.innerHTML = "";
                slides.forEach((slide, i) => {
                    const item = document.createElement("div");
                    item.className = `slide-nav-item${i === 0 ? " active" : ""}`;
                    item.dataset.slideIndex = String(i);
                    item.innerHTML = `<div class="slide-progress-line"><div class="slide-progress-fill"></div></div><div class="slide-nav-title">${slide.title}</div>`;

                    // Interaction disabled via CSS

                    nav.appendChild(item);
                });
            };

            const updateNavigationState = (idx: number) => document.querySelectorAll(".slide-nav-item").forEach((el, i) => el.classList.toggle("active", i === idx));

            const fadeSlideProgress = (idx: number) => { const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement; if (el) { el.style.opacity = '0'; setTimeout(() => el.style.width = "0%", 300); } };
            const quickResetProgress = (idx: number) => { const el = document.querySelectorAll(".slide-nav-item")[idx]?.querySelector(".slide-progress-fill") as HTMLElement; if (el) { el.style.transition = "width 0.2s ease-out"; el.style.width = "0%"; setTimeout(() => el.style.transition = "width 0.1s ease, opacity 0.3s ease", 200); } };
            const updateCounter = (idx: number) => {
                const sn = document.getElementById("slideNumber"); if (sn) sn.textContent = String(idx + 1).padStart(2, "0");
                const st = document.getElementById("slideTotal"); if (st) st.textContent = String(slides.length).padStart(2, "0");
            };

            const startAutoSlideTimer = () => {
                if (!texturesLoaded || !sliderEnabled) return;
                stopAutoSlideTimer();

                const el = document.querySelectorAll(".slide-nav-item")[currentSlideIndex]?.querySelector(".slide-progress-fill") as HTMLElement;
                if (!el) return;

                // Ensure visible and start from 0
                gsap.set(el, { width: "0%", opacity: 1 });

                progressAnimation = gsap.to(el, {
                    width: "100%",
                    duration: SLIDE_DURATION() / 1000,
                    ease: "none",
                    onComplete: () => {
                        fadeSlideProgress(currentSlideIndex);
                        if (!isTransitioning) handleSlideChange();
                    }
                });
            };
            const stopAutoSlideTimer = () => {
                if (progressAnimation) {
                    progressAnimation.kill();
                    progressAnimation = null;
                }
                if (autoSlideTimer) {
                    clearTimeout(autoSlideTimer);
                    autoSlideTimer = null;
                }
            };
            const safeStartTimer = (delay = 0) => {
                stopAutoSlideTimer();
                if (sliderEnabled && texturesLoaded) {
                    if (delay > 0) autoSlideTimer = setTimeout(startAutoSlideTimer, delay);
                    else startAutoSlideTimer();
                }
            };

            const loadImageTexture = (src: string) => new Promise<THREE.Texture>((resolve, reject) => {
                const l = new THREE.TextureLoader();
                l.load(src, (t: THREE.Texture) => { t.minFilter = t.magFilter = THREE.LinearFilter; t.userData = { size: new THREE.Vector2((t.image as HTMLImageElement).width, (t.image as HTMLImageElement).height) }; resolve(t); }, undefined, reject);
            });

            const initRenderer = async () => {
                const canvas = document.querySelector(".webgl-canvas") as HTMLCanvasElement; if (!canvas) return;
                scene = new THREE.Scene(); camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
                renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
                renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

                shaderMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTexture1: { value: null }, uTexture2: { value: null }, uProgress: { value: 0 },
                        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                        uTexture1Size: { value: new THREE.Vector2(1, 1) }, uTexture2Size: { value: new THREE.Vector2(1, 1) },
                        uEffectType: { value: 0 },
                        uGlobalIntensity: { value: 1.0 }, uSpeedMultiplier: { value: 1.0 }, uDistortionStrength: { value: 1.0 }, uColorEnhancement: { value: 1.0 },
                        uGlassRefractionStrength: { value: 1.0 }, uGlassChromaticAberration: { value: 1.0 }, uGlassBubbleClarity: { value: 1.0 }, uGlassEdgeGlow: { value: 1.0 }, uGlassLiquidFlow: { value: 1.0 },
                        // Init others defaults
                        uFrostIntensity: { value: 1.0 }, uFrostCrystalSize: { value: 1.0 }, uFrostIceCoverage: { value: 1.0 }, uFrostTemperature: { value: 1.0 }, uFrostTexture: { value: 1.0 },
                        uRippleFrequency: { value: 25.0 }, uRippleAmplitude: { value: 0.08 }, uRippleWaveSpeed: { value: 1.0 }, uRippleRippleCount: { value: 1.0 }, uRippleDecay: { value: 1.0 },
                        uPlasmaIntensity: { value: 1.2 }, uPlasmaSpeed: { value: 0.8 }, uPlasmaEnergyIntensity: { value: 0.4 }, uPlasmaContrastBoost: { value: 0.3 }, uPlasmaTurbulence: { value: 1.0 },
                        uTimeshiftDistortion: { value: 1.6 }, uTimeshiftBlur: { value: 1.5 }, uTimeshiftFlow: { value: 1.4 }, uTimeshiftChromatic: { value: 1.5 }, uTimeshiftTurbulence: { value: 1.4 }
                    },
                    vertexShader, fragmentShader
                });
                scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

                for (const s of slides) { try { slideTextures.push(await loadImageTexture(s.media)); } catch { console.warn("Failed texture"); } }
                if (slideTextures.length >= 2) {
                    shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
                    shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
                    shaderMaterial.uniforms.uTexture1Size.value = slideTextures[0].userData.size;
                    shaderMaterial.uniforms.uTexture2Size.value = slideTextures[1].userData.size;
                    texturesLoaded = true; sliderEnabled = true;
                    updateShaderUniforms(); // Apply config
                    document.querySelector(".slider-wrapper")?.classList.add("loaded"); // Fade in immediately
                    safeStartTimer(500);
                }

                const render = () => { requestAnimationFrame(render); renderer.render(scene, camera); };
                render();
            };

            createSlidesNavigation(); updateCounter(0);



            initRenderer();

            // Listeners
            document.addEventListener("visibilitychange", () => document.hidden ? stopAutoSlideTimer() : (!isTransitioning && safeStartTimer()));
            window.addEventListener("resize", () => { if (renderer) { renderer.setSize(window.innerWidth, window.innerHeight); shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight); } });

            // Touch / Swipe Logic
            let touchStartX = 0;
            let touchEndX = 0;

            const handleTouchStart = (e: TouchEvent) => {
                touchStartX = e.changedTouches[0].screenX;
            };

            const handleTouchEnd = (e: TouchEvent) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            };

            const handleSwipe = () => {
                if (isTransitioning || !sliderEnabled) return;
                const limit = 50; // Min diff to trigger swipe
                if (touchEndX < touchStartX - limit) {
                    // Swipe Left -> Next
                    navigateToSlide((currentSlideIndex + 1) % slides.length);
                } else if (touchEndX > touchStartX + limit) {
                    // Swipe Right -> Prev
                    let prevIndex = currentSlideIndex - 1;
                    if (prevIndex < 0) prevIndex = slides.length - 1;
                    navigateToSlide(prevIndex);
                }
            };

            const canvasEl = document.querySelector(".webgl-canvas");
            if (canvasEl) {
                // Touch
                canvasEl.addEventListener('touchstart', handleTouchStart as any, { passive: true });
                canvasEl.addEventListener('touchend', handleTouchEnd as any, { passive: true });

                // Mouse (Desktop)
                canvasEl.addEventListener('mousedown', (e: any) => {
                    touchStartX = e.clientX;
                });

                canvasEl.addEventListener('mouseup', (e: any) => {
                    touchEndX = e.clientX;
                    handleSwipe();
                });

                // Optional: Cancel drag if mouse leaves window or unexpected interaction
                canvasEl.addEventListener('mouseleave', () => {
                    // Reset if needed, or interaction just cancels
                });
            }
        };

        initApplication();

        return () => { };
    }, []);

    return (
        <>

            <main className="slider-wrapper" ref={containerRef}>
                <canvas className="webgl-canvas"></canvas>
                <span className="slide-number" id="slideNumber">01</span>
                <a href="#projects" className="slide-view-projects">View projects</a>



                <nav className="slides-navigation" id="slidesNav"></nav>
            </main>
        </>
    );
}
