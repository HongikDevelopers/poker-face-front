import { Link } from 'react-router-dom';
import { MediaSettings } from '../components/MediaSettings';

function Home() {
  return (
    <>
      <div>Home</div>
      <MediaSettings />
      <Link to={'sesef'}>Go To Not Found</Link>
    </>
  );
}

export default Home;
