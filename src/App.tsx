import Carousel from './Carousel';
import UserOptionsPanel from './Components/UserOptions.tsx';
import { PictureProvider } from './Contexts/PictureContext.tsx';

function App() {
  return (
    <PictureProvider>
      <UserOptionsPanel></UserOptionsPanel>
      <Carousel></Carousel>
    </PictureProvider>
  );
}

export default App;
