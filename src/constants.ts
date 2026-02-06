import { Linkedin, Instagram, Youtube } from 'lucide-react';
import { BehanceIcon } from './components/icons/BehanceIcon';
import { ArtStationIcon } from './components/icons/ArtStationIcon';

export const content = {
    name: "Copine Jonathan",
    profession: "CGI Artist",
    tagline: "Crafting digital realities that breathe.",
    about: "I am a junior CGI artist passionate about 3D and high-end product visualization. Highly self-taught and detail-oriented, I constantly challenge myself to improve and refine my work. I specialize in premium product renders, with a strong focus on lighting, materials, and visual quality. Curious and persistent, I actively explore new tools and workflows, including AI-driven technologies, which I see as an essential part of modern CGI production.",
    photoUrl: "/Portrait_2.png",
    socials: [
        { name: "Instagram", url: "https://www.instagram.com/jonathan_copin3/", icon: Instagram },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/jonathan-copine-aa4626351/", icon: Linkedin },
        { name: "Behance", url: "https://www.behance.net/jonathancopine1", icon: BehanceIcon },
        { name: "YouTube", url: "https://www.youtube.com/@JonathanCopine", icon: Youtube },
        { name: "ArtStation", url: "https://www.artstation.com/jonathan_copin3", icon: ArtStationIcon },
    ],
    skills: [
        { name: "AI", level: 80 },
        { name: "Blender", level: 70 },
        { name: "After Effects", level: 70 },
        { name: "3ds Max", level: 60 },
        { name: "Photoshop", level: 60 },
        { name: "Substance Painter", level: 50 },
        { name: "Unity", level: 50 },
        { name: "Houdini", level: 30 }
    ],
    projects: [
        {
            id: "premium-window-frame",
            title: "Premium window frame",
            description: "Creation of a realistic premium window frame visualization.",
            longDescription: `Creation of a realistic premium window frame visualization.

Software used:
- 3ds Max 2025
- NanoBanana Pro
- After Effects
- Figma`,
            tags: ["3ds Max", "NanoBanana Pro", "ArchViz"],
            creationDate: "January 2026",
            thumbnailUrl: "/projects/premium-window-frame/chassis_fenetre_sections_L_exploded_studio.png",
            gallery: [
                "/projects/premium-window-frame/chassis_fenetre_aluminium_coupe_angle_studio_dark_comp.png",
                "/projects/premium-window-frame/chassis_fenetre_aluminium_coupe_angle_studio_drak_comp.png",
                "/projects/premium-window-frame/chassis_fenetre_aluminium_coupe_angle_studio.png",
                "/projects/premium-window-frame/chassis_fenetre_aluminium_detail_coupe_verre_dark_comp_1.png",
                "/projects/premium-window-frame/chassis_fenetre_aluminium_detail_coupe_verre.png",
                "/projects/premium-window-frame/chassis_fenetre_comparatif_pvc_aluminium_angle_dark_comp.png",
                "/projects/premium-window-frame/chassis_fenetre_comparatif_pvc_aluminium_angle.png",
                "/projects/premium-window-frame/chassis_fenetre_sections_L_exploded_studio.png"
            ],
            category: "Design"
        },
        {
            id: "nomad-apple-watch",
            title: "Nomad Apple Watch Strap",
            description: "Creation of a realistic 3D animation of an Apple Watch strap.",
            longDescription: `Creation of a realistic 3D animation of an Apple Watch strap.

Software used:
- 3ds Max 2025
- V-Ray 7
- After Effects`,
            tags: ["3ds Max 2025", "V-Ray 7", "After Effects"],
            creationDate: "December 2025",
            thumbnailUrl: "/Image all projet/Nomad/Comp - carre (00338).png",
            // @ts-ignore
            videoUrl: "/Image all projet/Nomad/Comp - carre.mp4",
            gallery: [],
            category: "Design / Animation",
            mediaAspect: "square"
        },
        {
            id: "sand-simulation",
            title: "Sand Simulation",
            description: "Creation of a visual experiment showcasing a luxury logo sculpted procedurally in sand.",
            longDescription: `Creation of a visual experiment showcasing a luxury logo sculpted procedurally in sand.

Software used:
– Houdini
– Redshift
– After Effects`,
            tags: ["Houdini", "Redshift", "After Effects"],
            creationDate: "December 2025",
            thumbnailUrl: "/Image all projet/Particles_Houdini_Colandmacarthur/IMG_2801.jpeg",
            // @ts-ignore
            videoUrl: "/Image all projet/Particles_Houdini_Colandmacarthur/B3_A1_J_Copine_Particules_animation.mp4",
            gallery: [
                "/Image all projet/Particles_Houdini_Colandmacarthur/IMG_2801.jpeg",
                "/Image all projet/Particles_Houdini_Colandmacarthur/IMG_2802.jpeg",
                "/Image all projet/Particles_Houdini_Colandmacarthur/IMG_2803.jpeg",
                "/Image all projet/Particles_Houdini_Colandmacarthur/IMG_2804.jpeg"
            ],
            category: "Design",
            mediaAspect: "9/16"
        },
        {
            id: "wilo-component-modeling",
            title: "Technical Project: Component Modeling",
            description: "Detailed technical modeling and rendering of complex circulator pump components.",
            longDescription: `Creation of a realistic 3D packshot of a technical product :

Software used:

- 3ds Max 2025
- V-Ray 7
- Nano Banana Pro by Gemini 3`,
            tags: ["3ds Max 2025", "V-Ray 7", "Nano Banana Pro"],
            creationDate: "November 2025",
            thumbnailUrl: "/Image all projet/Wilo/Wilo_boite_final.png",
            gallery: [
                "/Image all projet/Wilo/Gemini_Generated_Image_tm9rbmtm9rbmtm9r.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_2b6om52b6om52b6o.png",
                "/Image all projet/Wilo/Element_2.RGB_color.0000.png",
                "/Image all projet/Wilo/Element_2.RGB_color.00001.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_2lqkws2lqkws2lqk.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_d03hved03hved03h.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_t82g6kt82g6kt82g.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_7tz7ek7tz7ek7tz7.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_igf50gigf50gigf5.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_u5md3hu5md3hu5md.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_5cs5ho5cs5ho5cs5.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_o6gp5io6gp5io6gp.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_dmi2hvdmi2hvdmi2.png",
                "/Image all projet/Wilo/Gemini_Generated_Image_lpyfx1lpyfx1lpyf.png",
                "/Image all projet/Wilo/1_1.png",
                "/Image all projet/Wilo/2_1.png",
                "/Image all projet/Wilo/3_1.png",
                "/Image all projet/Wilo/4_1.png"
            ],
            category: "Design"
        },
        {
            id: "devialet-mania",
            title: "Devialet Mania",
            description: "Creation of a realistic 3D packshot of a technical product.",
            longDescription: `Creation of a realistic 3D packshot of a technical product

Software used:

- 3ds Max 2026
- V-Ray 7`,
            tags: ["3ds Max 2026", "V-Ray 7"],
            creationDate: "September 2025",
            thumbnailUrl: "/Image all projet/Devialet/Rendu_Devialet_Mania_1.jpeg",
            gallery: [
                "/Image all projet/Devialet/Rendu_Devialet_Mania_1.jpeg",
                "/Image all projet/Devialet/Rendu_Devialet_Mania_2.jpeg",
                "/Image all projet/Devialet/Rendu_Devialet_Mania_3.jpeg",
                "/Image all projet/Devialet/Rendu_Devialet_Mania_4.jpeg"
            ],
            category: "Design"
        },
        {
            id: "premium-microphone",
            title: "Premium Microphone",
            description: "Creation of a realistic 3D packshot of a technical product.",
            longDescription: `Creation of a realistic 3D packshot of a technical product :

Software used:

- 3ds Max 2025
- V-Ray 7
- Post-production : After Effect

Comparison : Post-Production render vs Raw render`,
            tags: ["3ds Max 2025", "V-Ray 7", "After Effects"],
            creationDate: "September 2025",
            thumbnailUrl: "/Image all projet/Mic/Mike_v1__02 (0-00-01-11).png",
            gallery: [
                "/Image all projet/Mic/Mike_v1__02 (0-00-01-11).png",
                "/Image all projet/Mic/Mike_v2__03_argent.png",
                "/Image all projet/Mic/Mike_close_up_argent_1.png",
                "/Image all projet/Mic/Mike_close_up.png"
            ],
            category: "Design"
        },
        {
            id: "ikea-lockers",
            title: "IKEA Lockers",
            description: "Creation of a realistic 3D packshot of a technical product.",
            longDescription: `Creation of a realistic 3D packshot of a technical product :

Software used:

- 3ds Max 2026
- V-Ray 7`,
            tags: ["3ds Max 2026", "V-Ray 7"],
            creationDate: "July 2025",
            thumbnailUrl: "/Image all projet/IKEA/camera1.jpg",
            thumbnailObjectPosition: "40% center",
            // @ts-ignore
            heroUrl: "/Image all projet/IKEA/all.jpg",
            // @ts-ignore
            videoUrl: "/Image all projet/IKEA/IKEA FINAL2_1.mp4",
            galleryLayout: "mixed",
            gallery: [
                "/Image all projet/IKEA/lockers.jpg",
                "/Image all projet/IKEA/Flag.jpg",
                "/Image all projet/IKEA/camera1.jpg",
                "/Image all projet/IKEA/roulette1.jpg",
                "/Image all projet/IKEA/all.jpg",
                "/Image all projet/IKEA/lock1.jpg",
                "/Image all projet/IKEA/camionette.jpg",
                "/Image all projet/IKEA/roulette.jpg",
                "/Image all projet/IKEA/Flag1.jpg",
                "/Image all projet/IKEA/lock.jpg"
            ],
            category: "Design"
        },
        {
            id: "passage-between-worlds",
            title: "Passage between worlds",
            description: "Creation of Two Environments + Portal.",
            longDescription: `Creation of Two Environments + Portal
            
Software used:

- Unity (environment + lights, real-time)
- Bridge, Megascan (Import)
- Blender (Modeling)
- Substance Painter (Textures)`,
            tags: ["Unity", "Blender", "Substance Painter"],
            creationDate: "June 2025",
            thumbnailUrl: "/Image all projet/Visu_Champs/IMG_2169.png",
            // @ts-ignore
            videoUrl: "/Image all projet/Visu_Champs/Rendu_final_Q2_VISU_4.mp4",
            galleryLayout: "landscape",
            gallery: [
                "/Image all projet/Visu_Champs/IMG_2169.png"
            ],
            category: "Environment"
        },
        {
            id: "pixar-lamp",
            title: "Pixar Lamp",
            description: "Pixar Lamp Integration.",
            longDescription: `Pixar Lamp Integration

Software Used:

- After Effects (Motion Tracking, FX)
- Blender (Rigging, Animation, Rendering)`,
            tags: ["Blender", "After Effects"],
            creationDate: "June 2025",
            thumbnailUrl: "/Image all projet/Lamp PIX/Lampe_image.png",
            // @ts-ignore
            videoUrl: "/Image all projet/Lamp PIX/Lampe_final_TFA.mp4",
            galleryLayout: "landscape",
            gallery: [
                "/Image all projet/Lamp PIX/Lampe_image.png"
            ],
            category: "Animation / VFX"
        },
        {
            id: "the-big-robots",
            title: "The big robots",
            description: "Giant Robot Integration.",
            longDescription: `Giant Robot Integration

Software used:

- After Effects (Motion Tracking, FX)
- Blender (Rigging, Animation, Rendering)
- Reapper (SFX, Sound Design)`,
            tags: ["Blender", "After Effects", "Reaper"],
            creationDate: "June 2025",
            thumbnailUrl: "/Image all projet/Mecha_VFX/B2A2_Copine_J_Mecha.jpg",
            thumbnailObjectPosition: "center top",
            heroObjectPosition: "center top",
            // @ts-ignore
            videoUrl: [
                "/Image all projet/Mecha_VFX/robot_TFA.mp4",
                "/Image all projet/Mecha_VFX/B2A2_Copine_J_Breakdown.mp4"
            ],
            moreVideos: {
                title: "Rig / Modeling",
                videos: [
                    "/Image all projet/Mecha_VFX/B2A2_Copine_J_Rig.mp4",
                    "/Image all projet/Mecha_VFX/B2A2_Copine_J_Turn_bis.mp4",
                    "/Image all projet/Mecha_VFX/B2A2_Copine_J_Turn.mp4"
                ]
            },
            gallery: [
                "/Image all projet/Mecha_VFX/B2A2_Copine_J_Mecha.jpg"
            ],
            category: "Animation / VFX"
        },
        {
            id: "architecture",
            title: "Architecture",
            description: "3D rendering of Ballarat Community Health Primary Facility.",
            longDescription: `3D rendering of Ballarat Community Health Primary Facility

Software used:

- Blender (Modeling)
- Substance Painter (Textures)`,
            tags: ["Blender", "Substance Painter"],
            creationDate: "December 2024",
            thumbnailUrl: "/Image all projet/Archi/rendu_archi_final1.jpg",
            galleryLayout: "architecture",
            gallery: [
                "/Image all projet/Archi/B2-A2_Copine_J_Archi_2024.jpg",
                "/Image all projet/Archi/B2-A2_Copine_J_Archi_Clay_Wire_2024.jpg",
                "/Image all projet/Archi/B2-A2_Copine_J_Archi_Comparatif_2024.jpg"
            ],
            category: "ArchViz"
        },
        {
            id: "vfx-animation",
            title: "VFX Animation",
            description: "3D VFX Animation. Animation of a car in the Back to the Future theme.",
            longDescription: `3D VFX Animation. Animation of a car in the Back to the Future theme.

Software used:

- Blender (Modeling + Car Animation)
- After Effect (Composition)`,
            tags: ["Blender", "After Effects"],
            creationDate: "December 2024",
            thumbnailUrl: "/Image all projet/Retour vers le futur/Ai Ehance.png",
            // @ts-ignore
            videoUrl: [
                "/Image all projet/Retour vers le futur/rendu_final_final_vfx.mp4",
                "/Image all projet/Retour vers le futur/break_down_final_VFX.mp4"
            ],
            gallery: [
                "/Image all projet/Retour vers le futur/Ai Ehance.png"
            ],
            category: "Animation / VFX"
        },
        {
            id: "environment-cabane",
            title: "Environment",
            description: "Creation of a 3D environment.",
            longDescription: `Creation of a 3D environment

Software used:

- Unity (environment + lights)
- Bridge, Megascan (Import)`,
            tags: ["Unity", "Megascan"],
            creationDate: "December 2024",
            thumbnailUrl: "/Image all projet/Enviro_Cabane/B2A2_Copine_J_Envi.jpg",
            galleryLayout: "landscape",
            gallery: [
                "/Image all projet/Enviro_Cabane/B2A2_Copine_J_Envi.jpg"
            ],
            category: "Environment"
        }
    ],
    experience: [
        {
            role: "INTERNSHIP",
            company: "Miysis – Juprelle, Belgium",
            period: "November 2025 – February 2026",
            description: [
                "Design Department"
            ],
            companyUrl: "https://www.miysis.be/fr/"
        },
        {
            role: "BACHELOR’S DEGREE",
            company: "Haute École Albert Jacquard – Computer Graphics Campus",
            period: "2023 – Present",
            description: [
                "Specialization: Visual Effects (VFX)"
            ]
        },
        {
            role: "STUDENT EMPLOYMENT",
            company: "Gamma, Carrefour & Delhaize (Bastogne & Pommerloch)",
            period: "2019 – 2025",
            description: [
                "Cashier",
                "Shelf Stocker / Shelf Replenishment Assistant"
            ]
        },
        {
            role: "SECONDARY EDUCATION",
            company: "Notre-Dame Seminary of Bastogne",
            period: "2017 – 2023",
            description: [
                "Focus: Economics, English (First Language), and Technology"
            ]
        }
    ],
    contact: {
        email: "jonathan.copin3@gmail.com",
        phone: "+3247403103",
        emailJsServiceId: "YOUR_SERVICE_ID", // Placeholder
        emailJsTemplateId: "YOUR_TEMPLATE_ID", // Placeholder
        emailJsPublicKey: "YOUR_PUBLIC_KEY" // Placeholder
    }
}
