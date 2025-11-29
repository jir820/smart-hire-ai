# Smart Hire AI - Intelligent Recruitment System

## Project Overview
Smart Hire AI is an advanced recruitment platform designed to streamline the hiring process for SMEs using Artificial Intelligence. The system connects companies with ideal candidates through automated CV analysis, adaptive conversational interviews, and data-driven compatibility scoring.

## Technology Stack
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **State Management**: React Query
- **Routing**: React Router DOM
- **Backend Integration**: Axios

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-hire-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   The application requires a backend connection. Ensure the `.env` file is configured correctly:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Key Features

### Candidate Portal
- **Vacancy Discovery**: Advanced filtering by city, role, and modality.
- **Smart Application**: Streamlined process with PDF CV upload.
- **AI Interview**: Interactive chatbot that conducts preliminary technical interviews based on the role.
- **Real-time Feedback**: Immediate status updates on applications.

### Company Portal
- **Vacancy Management**: Create and manage job postings with AI assistance.
- **Automated Screening**: AI-generated interview questions tailored to specific job requirements.
- **Dashboard**: Analytics on received applications and candidate compatibility scores.

## Project Structure
```
src/
├── components/     # Reusable UI components
├── config/         # App configuration (API, constants)
├── hooks/          # Custom React hooks
├── pages/          # Main application views
├── services/       # API integration services
└── lib/            # Utility functions
```

## API Integration
The frontend communicates with a FastAPI backend via the following key endpoints:

- **Authentication**: `/api/auth/*`
- **Companies**: `/api/empresa/*`
- **Candidates**: `/api/candidato/*`
- **Vacancies**: `/api/vacantes/*`

## License
All rights reserved. Smart Hire AI 2024.
