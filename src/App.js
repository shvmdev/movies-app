import './App.css';
import Movies from './components/Movies';
import { Banner} from './components/Home'

function App() {
  return (
    <div className="App">
      <Movies />
      <Banner/>
    </div>
  );
}

export default App;
