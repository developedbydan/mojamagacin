import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center  bg-primary w-full">
      <h1 className="text-4xl text-white mb-4">
        404 - Stranica nije pronađena
      </h1>
      <Link to="/" className="text-blue-500">
        Vrati se na početnu stranu
      </Link>
    </div>
  );
};

export default NotFound;
