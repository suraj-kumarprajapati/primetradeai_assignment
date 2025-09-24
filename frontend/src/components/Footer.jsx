import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 fixed bottom-0 w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-6">
          
          {/* Logo and Company Name */}
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <img
                alt="Task Manager"
                src="logo512.png"
                className="h-8 w-auto"
              />
              <span className="text-white font-medium">Task Manager</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-gray-300 text-sm">
            <p>© {currentYear} Task Manager. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer