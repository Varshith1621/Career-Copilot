# AI Career Copilot

AI Career Copilot is a next-generation career guidance platform designed specifically for Gen Z professionals. The application leverages AI to provide personalized career guidance, skill assessments, roadmaps, and mock interviews to help users navigate their career journey effectively.

![AI Career Copilot](./public/placeholder-logo.svg)

## Features

### 🧠 Smart Skill Analysis
- AI-powered evaluation of your current skills
- Identification of skill gaps in real-time
- Comprehensive skill mapping across technical, soft, and creative domains
- Industry benchmarking
- Personalized recommendations

### 🎯 Personalized Career Roadmaps
- Custom learning paths based on your goals
- Step-by-step guidance for career progression
- Timeline estimates for skill acquisition

### 💼 Job Market Intelligence
- Real-time industry trends and insights
- Salary expectations based on skill level
- Demand forecasting for various roles

### 🤖 AI Mock Interviews
- Practice with industry-specific interview simulations
- Receive feedback on your responses
- Improve your interview performance

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Atharvm05/Career-Copilot.git
   cd Career-Copilot
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── assessment/       # Skill assessment page
│   ├── interview/        # Mock interview page
│   ├── market/           # Job market intelligence page
│   ├── roadmap/          # Career roadmap page
│   └── page.tsx          # Home page
├── components/           # Reusable components
│   ├── ui/               # UI components
│   └── navigation.tsx    # Navigation component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)