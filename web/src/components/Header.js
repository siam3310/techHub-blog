import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import clsx from 'clsx';
import { MdClose, MdMenu, MdSearch } from 'react-icons/md';
import HeaderStyles from '../styles/HeaderStyles';
import Logo from './Logo';
import ActionButton from './buttons/ActionButton';
import { menu } from '../constants/menu';
import { SearchModalContext } from '../contexts/searchModalContext';

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(true);
  const { openSearchModal } = useContext(SearchModalContext);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    const handleScroll = () => {
      setScrollPos(window.scrollY < 100);
    };

    checkWidth();
    handleScroll();
    window.addEventListener('resize', checkWidth);
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isNavOpen]);

  const handleSearchModalOpen = () => {
    openSearchModal();
  };

  const handleNavItemClick = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <HeaderStyles className={clsx(scrollPos <= 0 && 'scrolled')}>
      <div className="container">
        <div className="header__container">
          <div className="logo">
            <Logo />
          </div>
          <div
            className={clsx(
              'nav__wrapper',
              isMobile && 'mobileNav',
              isNavOpen && 'open'
            )}
          >
            {isMobile && (
              <>
                <div className="mobileIcon">
                  <div className="searchIcon">
                    <div
                      className="searchIcon__wrapper"
                      onClick={handleSearchModalOpen}
                      onKeyDown={handleSearchModalOpen}
                      tabIndex={0}
                      role="button"
                    >
                      <MdSearch />
                    </div>
                  </div>
                  <ActionButton
                    className="mobileMenuBtn"
                    onKeyDown={() => setIsNavOpen(true)}
                    onClick={() => setIsNavOpen(true)}
                  >
                    <MdMenu />
                  </ActionButton>
                </div>
                {isNavOpen && (
                  <div
                    aria-label="Close Menu"
                    role="button"
                    tabIndex={0}
                    className="mobileNavBg"
                    onKeyDown={() => setIsNavOpen(false)}
                    onClick={() => setIsNavOpen(false)}
                  />
                )}
              </>
            )}
            <nav>
              {isMobile && (
                <ActionButton
                  className="mobileMenuCloseBtn"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  onKeyDown={() => setIsNavOpen}
                >
                  <MdClose />
                </ActionButton>
              )}
              <ul>
                {menu.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} onClick={handleNavItemClick}>
                      {item.title}
                    </Link>
                  </li>
                ))}
                {!isMobile && (
                  <li className="searchIcon">
                    <div
                      className="searchIcon__wrapper"
                      onClick={handleSearchModalOpen}
                      onKeyDown={handleSearchModalOpen}
                      tabIndex={0}
                      role="button"
                    >
                      <MdSearch />
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
}

export default Header;