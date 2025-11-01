# Frontend Assessment - Dashboard Application

An assessment dashboard.

## Features

- **Real-time Dashboard** - Live balance tracking and transaction monitoring
- **Interactive Charts** - Smooth animated line charts with Recharts
- **Advanced Filtering** - Date range selection, transaction type and status filtering
- **Transaction Management** - View, filter, and export transactions
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **Modern UI/UX** - Clean interface with smooth animations and skeleton loaders
- **State Management** - Centralized state with Redux Toolkit
- **API Integration** - Full TypeScript API layer with Axios
- **Type Safety** - Complete TypeScript implementation

## Tech Stack

### Core
- **React**
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### State Management
- **Redux Toolkit** - State management
- **React Redux** - React bindings for Redux

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Data & API
- **Axios** - HTTP client for API requests
- **Recharts** - Chart library for data visualization
- **React DatePicker** - Date range selection

### Icons
- **React Icons** - Icon library (Ionicons)

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Danny-Flames/react-assessment-ms.git

# Navigate to project directory
cd mainstack-frontend-assessment

# Install dependencies
npm install

# Create environment file and add this variable 'VITE_API_BASE_URL'

# Update .env with your API URL
VITE_API_BASE_URL=*****

# Start development server
npm run dev

### Custom Hooks
```typescript
useApi(apiFunction, immediate) 
useAppDispatch() // Typed Redux dispatch
useAppSelector() // Typed Redux selector
```

## Author

Danny-Flames

