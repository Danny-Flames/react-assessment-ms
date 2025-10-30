import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;