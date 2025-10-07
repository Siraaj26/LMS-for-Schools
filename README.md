# Pathfinder LMS - Learning Management System for Schools

🏆 **Second Prize Winner - Africa Connect Hackathon**

## Overview

Pathfinder LMS is a comprehensive Learning Management System designed to revolutionize education by enabling students, teachers, and parents to collaboratively track both curriculum and non-curriculum activities. Our platform creates a transparent, connected learning ecosystem where academic progress and extracurricular development are equally valued and monitored.

## 🎉 Hackathon Achievement

This project was awarded **Second Prize** at the Africa Connect Hackathon, recognizing its potential to transform educational engagement across African schools through innovative technology solutions.

## 🚀 Project Evolution

**Initial Development:** Built with vanilla JavaScript, HTML, and CSS  
**Current Version:** Migrated to React for improved scalability, maintainability, and user experience  
**Backend:** Powered by Supabase for real-time data synchronization and authentication

## 🎯 Mission & Goals

Our primary goal is to create a unified platform where:

- **Students** can track their academic progress, participate in extracurricular activities, and engage with AI-powered learning assistance
- **Teachers** can manage classes, create assignments, monitor student performance, and communicate effectively with parents
- **Parents** can stay informed about their children's holistic development, both academically and in non-curriculum activities

We believe that education extends beyond the classroom, and our platform reflects this philosophy by treating sports, arts, clubs, and community service with the same importance as traditional academic subjects.

## ✨ Key Features

### For Students
- 📚 **Academic Dashboard** - Track grades, assignments, and curriculum progress
- 🎨 **Extracurricular Activities** - Log and monitor participation in sports, clubs, arts, and community service
- 🏆 **Rewards System** - Earn points and recognition for achievements
- 🤖 **AskMe AI Assistant** - Get personalized help with homework and learning challenges
- 📅 **Calendar Integration** - View all academic and non-curriculum activities in one place
- 💬 **Messaging System** - Communicate with teachers and peers

### For Teachers
- 👥 **Class Management** - Organize students, create assignments, and track submissions
- 📊 **Performance Analytics** - Monitor individual and class-wide progress
- ✅ **Grading System** - Efficiently grade assignments and provide feedback
- 📝 **Curriculum Planning** - Plan lessons and align with educational standards
- 🎯 **Activity Coordination** - Manage both academic and extracurricular activities
- 📧 **Parent Communication** - Direct messaging with parents about student progress

### For Parents
- 👀 **Real-time Progress Tracking** - View student grades, attendance, and assignment completion
- 🎭 **Holistic Development View** - Monitor both academic and non-academic activities
- 📈 **Performance Reports** - Access comprehensive reports on student development
- 💌 **Teacher Communication** - Stay connected with teachers and school administration
- 📅 **Activity Calendar** - See upcoming events, assignments, and extracurricular activities
- 🔔 **Notifications** - Receive alerts about important updates and milestones

### Additional Features
- 🎓 **Soft Skills Tracking** - Monitor development of communication, leadership, and teamwork skills
- 💳 **Payment Integration** - Manage school fees and activity payments
- 📄 **Document Management** - Access report cards, certificates, and important documents
- 🔐 **Secure Authentication** - Role-based access control for students, teachers, parents, and admins

## 🛠️ Technology Stack

### Frontend
- **React** - Modern UI library for building interactive interfaces
- **React Router** - Client-side routing
- **CSS3** - Custom styling with modern design patterns

### Backend & Services
- **Supabase** - Backend-as-a-Service (PostgreSQL database, authentication, real-time subscriptions)
- **Express.js** - Node.js server for custom API endpoints
- **Google Gemini AI** - Powers the AskMe AI assistant

### Deployment
- **Vercel** - Frontend hosting and continuous deployment
- **Supabase Cloud** - Remote database and authentication services

## 📁 Project Structure

```
LMS-for-Schools/
├── pathfinder-react-app/       # React application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components (Student, Teacher, Parent dashboards)
│   │   ├── config/             # Supabase configuration
│   │   └── App.js              # Main application component
│   └── public/                 # Static assets
├── supabase/
│   └── migrations/             # Database schema migrations
├── payments/                   # Payment system integration
├── js/                         # Legacy JavaScript files
├── css/                        # Stylesheets
├── server.js                   # Express server for AI chatbot
└── package.json                # Node.js dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account (for remote database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/LMS-for-Schools.git
   cd LMS-for-Schools
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install React app dependencies**
   ```bash
   cd pathfinder-react-app
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   The project is configured to use a remote Supabase instance. Environment variables are already set in the code with fallback values.

5. **Start the development server**
   ```bash
   cd pathfinder-react-app
   npm start
   ```

6. **Start the AI chatbot server (optional)**
   ```bash
   # In a new terminal
   npm start
   ```

The React app will open at `http://localhost:3000`

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project to Vercel
3. Configure environment variables in Vercel:
   - `REACT_APP_SUPABASE_URL` - Your Supabase project URL
   - `REACT_APP_SUPABASE_ANON_KEY` - Your Supabase anon key
4. Deploy!

Vercel will automatically detect the React app and deploy it with the correct build settings.

## 🗄️ Database

The project uses Supabase (PostgreSQL) with the following main tables:
- `users` - Student, teacher, parent, and admin accounts
- `students` - Student-specific information
- `teachers` - Teacher profiles and subjects
- `parents` - Parent profiles linked to students
- `assignments` - Academic assignments and submissions
- `extracurricular_activities` - Non-curriculum activities
- `rewards` - Student achievements and points
- `payments` - School fees and payment tracking
- `messages` - Internal messaging system

## 🤝 Contributing

We welcome contributions to improve Pathfinder LMS! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced analytics and data visualization
- [ ] Integration with third-party learning platforms
- [ ] Multi-language support
- [ ] Offline mode capabilities
- [ ] Video conferencing integration
- [ ] Advanced AI tutoring features
- [ ] Gamification enhancements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team - Empiras Vanguard

Developed with ❤️ by the Empiras Vanguard team for the Africa Connect Hackathon.

## 🙏 Acknowledgments

- Africa Connect Hackathon organizers and judges
- All educators who provided feedback and insights
- The open-source community for amazing tools and libraries
- Students, teachers, and parents who tested our platform

## 📧 Contact

For questions, feedback, or collaboration opportunities, please reach out to our team.

---

**Making Education Accessible, Transparent, and Holistic - One Student at a Time** 🎓✨
