import './App.scss';
import Todolist from './Components/Todolist/Todolist';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Todolist />
    </div>
  );
}

export default App;
