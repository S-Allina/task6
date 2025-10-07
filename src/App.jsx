import Songs from './pages/Songs';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './i18n';
const App = () => {
  return (
    <Provider store={store}>
       <Songs/>
    </Provider>
  );
};

export default App;
