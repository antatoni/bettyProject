# Picture Carousel

A responsive, interactive image carousel built with React, TypeScript, and Tailwind CSS. This mini project displays random images from Picsum Photos in a smooth, navigable carousel interface.

## ✨ Features

- **Responsive Design**: Automatically adjusts the number of visible images based on screen size (1-5 images)
- **Mouse Wheel Navigation**: Scroll through images using your mouse wheel
- **Progress Indicator**: Visual progress bar with a moving red dot showing current position
- **Lazy Loading**: Images load only when needed with placeholder icons for better performance
- **Smooth Animations**: CSS transitions for seamless image transitions
- **Customizable Dimensions**: Set the number of images, width, and height through a user-friendly interface

## 🛠️ Built With

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Picsum Photos** - Random image service

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd bettyProject
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Use

1. **Set Image Parameters**: Use the input fields at the top to specify:

   - Number of pictures (how many images to load)
   - Width of pictures (in pixels, max 5000 limited by picsum)
   - Height of pictures (in pixels, max 5000 limited by picsum)

2. **Navigate the Carousel**:

   - Use your mouse wheel to scroll through images
   - Images will automatically loop when reaching the end

3. **Responsive Viewing**: The carousel automatically adjusts based on your screen size:
   - Mobile (< 640px): 1 image
   - Small tablet (640-768px): 2 images
   - Tablet (768-1024px): 3 images
   - Desktop (1024-1280px): 4 images
   - Large desktop (> 1280px): 5 images

## 📁 Project Structure

```
src/
├── Components/
│   ├── Card.tsx          # Individual image card component
│   └── UserOptions.tsx   # Input panel for image settings
├── Contexts/
│   └── PictureContext.tsx # React context for state management
├── Carousel.tsx          # Main carousel component
├── getPictures.ts        # Image URL generation utility
├── App.tsx              # Main app component
└── main.tsx             # App entry point
```

## 🎯 Key Features Explained

### Lazy Loading

Images outside the visible range show placeholder icons with image numbers, improving initial load performance.

### Smooth Navigation

Throttled mouse wheel events prevent spamming and ensure smooth transitions between images.

### Progress Tracking

A visual indicator shows current position within the image set, including exact image range display.
