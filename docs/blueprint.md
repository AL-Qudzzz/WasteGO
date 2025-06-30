# **App Name**: WasteGo

## Core Features:

- Role-Based Authentication: User authentication and authorization based on role (user, mitra, kurir, admin) using Firebase Authentication Custom Claims.
- User Pickup Scheduling: User (Rumah Tangga) view to schedule waste pickups by providing address, waste type, weight estimation, and photo.
- Real-time Pickup Tracking: Real-time tracking of scheduled pickups for Users, with status updates (Scheduled, En Route, Completed).
- Courier Task Management: Courier view showing the list of pickup tasks, navigation to user location via Google Maps integration, and status update functionality.
- Admin Control Panel: Admin panel to manage users, pickup requests, assign couriers, and content (articles) with real-time monitoring.
- Firebase Storage integration: Function to manage images of waste to Firebase Storage. Links in database should reference stored image.
- Environmental Impact Summary: Generative AI tool to calculate and provide a brief message with the user's environmental impact based on their recycling activity. E.g. 'You have helped save X trees!'

## Style Guidelines:

- Primary color: Forest green (#386641) for eco-friendliness and sustainability.
- Background color: Light beige (#FAF5E9) for a clean and natural feel.
- Accent color: Burnt orange (#A75D5D) to highlight CTAs and important information.
- Body and headline font: 'Inter' (sans-serif) for a modern, clean, and easily readable interface.
- Use clear, modern icons representing different types of waste and actions.
- Clean and intuitive layout with clear calls-to-action, optimized for mobile and desktop use.
- Subtle animations on status changes and when providing user feedback to enhance engagement.