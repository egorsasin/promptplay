import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-dark-800/90 backdrop-blur-sm shadow-dark border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">PromptPlay</h1>
          </div>
          <nav className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-emerald-600/20'
                    : 'text-emerald-200 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-emerald-600/20'
                    : 'text-emerald-200 hover:text-white'
                }`
              }
            >
              Projects
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
