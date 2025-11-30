import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='py-3 shadow bg-blue-200 sticky top-0 z-50'>
      <Container>
        <nav className='flex flex-wrap items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-2xl focus:outline-none'
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Navigation Links */}
          <ul className={`flex-col md:flex-row md:flex ml-auto gap-4 items-center w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'}`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='w-full md:w-auto text-center py-2 md:py-0'>
                  <button onClick={() => { navigate(item.slug); closeMenu(); }}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-full cursor-pointer w-full md:w-auto'>{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='w-full md:w-auto text-center py-2 md:py-0'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header