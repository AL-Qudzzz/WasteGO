# WasteGo

WasteGo is a comprehensive platform designed to streamline waste management and promote environmental responsibility. By connecting users with waste collection services, facilitating responsible disposal of various waste types, and providing tools for tracking environmental impact, WasteGo aims to create a cleaner and more sustainable future.

## Table of Contents
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributors](#contributors)

## Core Features

- **User-Friendly Interface:** An intuitive platform for scheduling waste pickups, managing waste types, and tracking progress.
- **Waste Type Management:** Support for various waste categories including household, medical, and furniture waste.
- **Pickup Scheduling and Management:** Easy scheduling of pickups with options for location and time, and tracking of pickup status.
- **Environmental Impact Tracking:** Tools and dashboards to visualize the positive environmental impact of using WasteGo.
- **Reward System:** Incentivizing responsible waste disposal through a points and rewards system.
- **Role-Based Access:** Distinct user roles (user, courier, admin, company) with tailored functionalities.
- **Real-Time Courier Tracking:** A map-based interface to track the courier's location during pickup.
- **AI-Powered Summaries:** Utilizes Generative AI to create personalized environmental impact summaries for users.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://reactjs.org/), [ShadCN UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Database:** [Firebase (Firestore, Authentication, Storage)](https://firebase.google.com/)
- **Maps:** [OpenStreetMap](https://www.openstreetmap.org/) with [React-Leaflet](https://react-leaflet.js.org/)
- **Mobile:** [Capacitor](https://capacitorjs.com/) for Android/iOS deployment

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/wastego.git
    cd wastego
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your Firebase and other necessary API keys. You can use `.env.example` as a template.
    ```env
    # Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

5.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a static export in the `out` directory.

6.  **Build for Android:**
    ```bash
    # Install Capacitor
    npm install @capacitor/core @capacitor/android
    
    # Initialize Capacitor
    npx cap init
    
    # Add Android platform
    npx cap add android
    
    # Build the web app
    npm run build
    
    # Sync the build with Android
    npx cap sync android
    
    # Open in Android Studio
    npx cap open android
    ```

## Project Structure

A brief overview of the key directories in this project:

```
/
├── src/
│   ├── app/                # Next.js App Router: pages and layouts
│   ├── components/         # Reusable UI components (ShadCN, custom)
│   ├── context/            # React context providers (e.g., AuthContext)
│   ├── lib/                # Helper functions, Firebase config, actions
│   ├── ai/                 # Genkit flows and AI-related logic
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
└── ...                     # Configuration files
```

## Contributors

- **UI/UX and Project Idea:** Syifa Najwa Azzahra
- **Fullstack Development and Tester Web:** Muhammad Faiqul Umam Dzunnuroeni
