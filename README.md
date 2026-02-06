# Copine Jonathan - CGI Artist Portfolio

A premium, high-performance portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Key Features

*   **Responsive & Mobile-First**: Optimized for all devices.
*   **Dark/Light Mode**: Persisted theme preference with system detection.
*   **Smooth Animations**: Powered by Framer Motion.
*   **Easy Customization**: All content managed in `src/constants.ts`.
*   **Contact Form**: Integrated with EmailJS.
*   **SEO Optimized**: Semantic HTML and metadata.

## 🛠️ Tech Stack

*   **Core**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS, PostCSS
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Form Handling**: EmailJS

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📝 Customization

1.  Open `src/constants.ts`.
2.  Update the `content` object with your details (Name, Bio, Projects, etc.).
3.  Replace the `photoUrl` and project `thumbnailUrl`s with your own images.

## 📧 EmailJS Setup

1.  Create an account at [EmailJS](https://www.emailjs.com/).
2.  Create a **Service** and a **Template**.
3.  Update the `contact` object in `src/constants.ts` with your keys:
    ```typescript
    contact: {
      email: "your@email.com",
      emailJsServiceId: "YOUR_SERVICE_ID",
      emailJsTemplateId: "YOUR_TEMPLATE_ID",
      emailJsPublicKey: "YOUR_PUBLIC_KEY"
    }
    ```

## 📦 Deployment

### Vercel (Recommended)

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in the project root.
3.  Follow the prompts.

### Netlify

1.  Drag and drop the `dist` folder (created after `npm run build`) to Netlify Drop.

---

Designed with ❤️ for CGI Artists.
