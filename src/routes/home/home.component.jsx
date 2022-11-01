import Directory from '../../components/directory/directory.component'
import Footer from "../../components/footer/footer.component";
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Directory/>
      <Outlet />
      <Footer/>
    </>
  );
}

export default Home;