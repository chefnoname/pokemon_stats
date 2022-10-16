import PokeCard from './components/PokeCard/PokeCard';
import bgImage from './assets/image.jpeg';

const App = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100vh',
      }}
    >
      <PokeCard />
    </div>
  );
};

export default App;
