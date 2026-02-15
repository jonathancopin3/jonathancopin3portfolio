export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    creationDate: string;
    thumbnailUrl: string;
    gallery: string[];
    category: string;
    videoUrl?: string | string[];
    heroUrl?: string;
    liveUrl?: string;
    thumbnailObjectPosition?: string;
    heroObjectPosition?: string;
    galleryLayout?: 'mixed' | 'landscape' | 'architecture' | string;
    mediaAspect?: 'square' | '9/16' | string;
    mediaOrder?: 'video-first' | string;
    moreVideos?: {
        title: string;
        videos: string[];
    };
}

export interface Content {
    name: string;
    profession: string;
    tagline: string;
    about: string;
    photoUrl: string;
    socials: {
        name: string;
        url: string;
        icon: React.ComponentType<unknown>;
    }[];
    skills: {
        name: string;
        level: number;
    }[];
    projects: Project[];
    experience: {
        role: string;
        company: string;
        period: string;
        description: string[];
        companyUrl?: string;
    }[];
    contact: {
        email: string;
        phone: string;
        emailJsServiceId: string;
        emailJsTemplateId: string;
        emailJsPublicKey: string;
    };
}
