import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to VideoMeet</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Start a new meeting</h2>
          <Link 
            to="/dashboard" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Meeting
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Join a meeting</h2>
          <Link 
            to="/login" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Join
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
