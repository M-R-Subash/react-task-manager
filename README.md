```markdown
# 🚀 TaskFlow Dashboard

A modern, responsive task management application with beautiful analytics and smooth animations. Built with React and Tailwind CSS.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222?logo=github)

## ✨ Features

- 📊 **Interactive Analytics** - Pie chart visualization of task completion
- 🎨 **Dark Theme** - Modern glass-morphism UI design
- 📱 **Fully Responsive** - Works perfectly on all devices
- 💾 **Local Storage** - Data persists between sessions
- ⚡ **Real-time Updates** - Instant UI feedback
- 🗑️ **Safe Deletions** - SweetAlert2 confirmation dialogs
- 🎯 **Task Filtering** - View all, pending, or completed tasks
- ✏️ **Inline Editing** - Edit tasks without page refresh
- 🔄 **Smooth Animations** - Loading states and transitions

## 🖥️ Live Demo

🌐 **[View Live Site](https://m-r-subash.github.io/react-task-manager/)**

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Frontend Framework |
| ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | CSS Framework |
| ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) | Build Tool |
| ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-EE50A2?style=for-the-badge) | Alert Dialogs |
| ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=for-the-badge&logo=github) | Deployment |

## 📁 Project Structure

```
react-task-manager/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-R-Subash/react-task-manager.git
   cd react-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |

## 📸 Screenshots

### Dashboard View
![Dashboard](https://via.placeholder.com/800x400/1f2937/ffffff?text=TaskFlow+Dashboard+with+Analytics)

### Mobile View  
![Mobile](https://via.placeholder.com/400x700/1f2937/ffffff?text=Mobile+Responsive+Design)

## 🎯 Key Components

### Pie Chart Analytics
- Real-time completion percentage
- Visual progress tracking
- Color-coded segments (green = completed, orange = pending)

### Task Management
- Add new tasks with loading states
- Edit tasks inline
- Toggle completion status
- Filter by status (all/pending/completed)

### UI/UX Features
- Welcome animation on first load
- Success notifications
- Smooth hover effects
- Loading spinners for async operations

## 🔧 Configuration

### Vite Config
```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/react-task-manager/', // For GitHub Pages
})
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://M-R-Subash.github.io/react-task-manager"
}
```

## 🌐 Deployment

This project is automatically deployed to GitHub Pages:

1. **Manual Deployment**
   ```bash
   npm run deploy
   ```

2. **Automatic Deployment**
   - Pushes to the `main` branch trigger GitHub Actions
   - Built files are deployed to the `gh-pages` branch

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**M R Subash**
- GitHub: [@M-R-Subash](https://github.com/M-R-Subash)
- Project: [React Task Manager](https://github.com/M-R-Subash/react-task-manager)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [SweetAlert2](https://sweetalert2.github.io/) - Beautiful alerts
- [Vite](https://vitejs.dev/) - Build tool
- [GitHub Pages](https://pages.github.com/) - Hosting

---

<div align="center">

### ⭐ Don't forget to star this repository if you found it helpful!

</div>
```

This README includes:

- **Badges** for all technologies used
- **Live demo link** 
- **Clear project structure**
- **Step-by-step installation**
- **Visual screenshots** (placeholder links)
- **Technical configuration details**
- **Deployment instructions**
- **Professional formatting**

You can copy this directly into your `README.md` file in the project root!
