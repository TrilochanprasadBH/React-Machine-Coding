import React from "react";

const Navbar = () => {
  const navItems = [
    { label: "Home", link: "/", id: 1 },
    { label: "About", link: "/about", id: 2 },
    { label: "Services", link: "/services", id: 3 },
    { label: "Contact", link: "/contact", id: 4 },
  ];

  return (
    <div className="navbar-root">
      <div className="Logo">FinTp</div>
      <div className="links">
        {navItems.map((item, id) => (
          <a className="link-items" key={id} href={item.link}>
            {item.label}
          </a>
        ))}
        <button className="btn">Start Free Trail</button>
      </div>
    </div>
  );
};

export default Navbar;
