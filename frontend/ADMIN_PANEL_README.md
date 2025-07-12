# Skill-Swapper Admin Panel

A modern, responsive admin panel for the Skill-Swapper platform built with React, Tailwind CSS, and featuring glassmorphism design elements.

## 🚀 Features

### 🔐 Authentication
- **Secure Login System**: Email/password authentication with loading states
- **Role-based Access**: Admin-only access to the admin panel
- **Demo Credentials**: Quick login options for testing
  - Admin: `admin@skillswapper.com` / `admin123`
  - User: `user@example.com` / `password123`

### 📊 Dashboard
- **Real-time Statistics**: Total users, active skills, completed swaps, growth rate
- **Glassmorphism Design**: Modern UI with backdrop blur and transparency effects
- **Responsive Cards**: Statistics displayed in beautiful gradient cards
- **Welcome Section**: Personalized greeting with platform overview

### 👥 User Management
- **User Table**: Comprehensive list of all registered users
- **Search & Filter**: Find users by name/email, filter by role (User/Admin) or status (Active/Banned)
- **User Actions**:
  - Ban/Unban users with instant feedback
  - Delete user accounts with confirmation modal
  - View user details and activity
- **User Information**: Name, email, role, status, skills count, swaps count, last active date
- **Avatar Generation**: Automatic avatar generation from user initials

### 🛡️ Skill Moderation
- **Flagged Skills Review**: Table of skills flagged for inappropriate content
- **Priority System**: Color-coded priority levels based on report count
- **Moderation Actions**:
  - Approve skills to make them live
  - Reject inappropriate skills
  - View detailed skill information in modal
- **Search Functionality**: Find flagged skills by title, description, or submitter
- **Flag Reasons**: Categorized reasons (Inappropriate content, Spam, Copyright violation, etc.)

### 📈 Analytics & Reports
- **Interactive Charts**: Line charts, bar charts, and pie charts using Recharts
- **Key Metrics**:
  - User growth over time
  - Most popular skills
  - Swap activity trends
  - Active vs inactive users
- **Date Range Filtering**: Analyze data for specific time periods
- **Export Options**: Download data as CSV or JSON (coming soon)

### 📋 Swap Logs
- **Complete Transaction History**: All skill swap activities
- **Detailed Information**: Requester, receiver, skills offered/requested, status, timestamp
- **Advanced Filtering**: Filter by status, date range, or search by user
- **Pagination**: Efficient browsing of large datasets
- **Export Functionality**: Download logs for external analysis

### 📢 Notification Center
- **Global Notifications**: Send messages to all users or specific groups
- **Audience Targeting**:
  - All Users (2,847)
  - Active Users (1,892)
  - New Users (156)
  - Inactive Users (955)
- **Notification Types**: Info, Success, Warning, Error with appropriate styling
- **Scheduling Options**:
  - Send immediately
  - Schedule for later with date/time picker
- **Preview Feature**: See how notifications will appear to users
- **Recent Notifications**: History of sent notifications with status tracking

## 🎨 Design Features

### Modern UI Elements
- **Glassmorphism**: Backdrop blur effects with semi-transparent backgrounds
- **Soft Neumorphism**: Subtle shadows and rounded corners
- **Pastel Gradients**: Beautiful color transitions throughout the interface
- **Clean Typography**: Readable fonts with proper hierarchy
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Interactive Components
- **Loading States**: Smooth loading animations and skeleton screens
- **Toast Notifications**: Real-time feedback for user actions
- **Modal Dialogs**: Confirmation dialogs for destructive actions
- **Hover Effects**: Smooth transitions and interactive elements
- **Status Badges**: Color-coded badges for different states

### Navigation
- **Sidebar Navigation**: Collapsible sidebar with icons and labels
- **Mobile-Friendly**: Hamburger menu for mobile devices
- **Active States**: Visual indication of current page
- **Breadcrumbs**: Easy navigation understanding

## 🛠️ Technical Stack

- **React 19**: Latest React with hooks and modern patterns
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **React Router**: Client-side routing
- **React Hot Toast**: Elegant toast notifications
- **Recharts**: Responsive chart library
- **Date-fns**: Modern date utility library
- **Vite**: Fast build tool and development server

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   - Open `http://localhost:5174` in your browser
   - Use demo credentials to login
   - Navigate to `/admin` for the admin panel

## 📱 Responsive Design

The admin panel is fully responsive and adapts to different screen sizes:

- **Desktop (1024px+)**: Full sidebar with all features visible
- **Tablet (768px-1023px)**: Collapsible sidebar with optimized layout
- **Mobile (< 768px)**: Hamburger menu with touch-friendly interface

### Mobile Optimizations
- Tables scroll horizontally on small screens
- Action buttons use icons with tooltips
- Sidebar collapses into hamburger menu
- Touch-friendly button sizes
- Optimized form layouts

## 🔧 Customization

The admin panel is highly customizable:

- **Colors**: Modify Tailwind config for brand colors
- **Components**: All components are modular and reusable
- **Layout**: Easy to adjust spacing and sizing
- **Features**: Add new admin features by creating new components

## 🔒 Security Features

- **Role-based Access Control**: Only admins can access the panel
- **Protected Routes**: Automatic redirection for unauthorized users
- **Confirmation Dialogs**: Prevent accidental destructive actions
- **Input Validation**: Form validation for all user inputs

## 📊 Performance

- **Lazy Loading**: Components load only when needed
- **Optimized Rendering**: Efficient React patterns
- **Fast Development**: Hot module replacement with Vite
- **Small Bundle Size**: Tree-shaking and code splitting

## 🎯 Future Enhancements

- **Real API Integration**: Connect to backend services
- **Advanced Analytics**: More detailed reporting features
- **Bulk Actions**: Select multiple items for batch operations
- **Advanced Filtering**: More sophisticated filter options
- **Export Features**: CSV/JSON export for all data tables
- **Real-time Updates**: WebSocket integration for live data
- **Dark Mode**: Toggle between light and dark themes
- **Accessibility**: Enhanced ARIA labels and keyboard navigation

## 📝 Contributing

To contribute to the admin panel:

1. Follow the existing code style and patterns
2. Use TypeScript for new components (optional)
3. Add proper error handling
4. Include responsive design considerations
5. Test on multiple screen sizes
6. Document new features

## 🐛 Known Issues

- Mock data is used throughout (needs API integration)
- Some features are placeholder implementations
- Export functionality needs backend support
- Real-time updates require WebSocket implementation

## 📞 Support

For questions or issues with the admin panel, please refer to the main project documentation or create an issue in the repository.
