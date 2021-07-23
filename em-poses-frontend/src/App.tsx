import PageLayout from './components/PageLayout';
import HomePage from './pages/HomePage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <PageLayout toolbarTitle="Song requests">
        <HomePage />
      </PageLayout>
    </div>
  );
}

export default App;
