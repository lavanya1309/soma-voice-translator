import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">VideoMeet</Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
