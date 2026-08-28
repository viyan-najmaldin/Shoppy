import React from 'react'
import { NavLink } from 'react-router-dom'
import { TfiMenuAlt } from "react-icons/tfi";

const MenuLinks = () => {

  const links = [
    { name: "All Categories", path: "/products/All", icon: true },
    { name: "Electronics", path: "/products/Electronics" },
    { name: "Fashion", path: "/products/Fashion" },
    { name: "Home & Living", path: "/products/Home & Living" },
    { name: "Sports", path: "/products/Sports" },
    { name: "About", path: "/" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <div className="flex flex-wrap bg-white sm:bg-transparent text-black sm:text-white flex-col p-3 sm:p-0 sm:flex-row gap-2 mt-2">

      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `px-3 py-1 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-slate-200/30"
                : "hover:text-blue-300"
            }`
          }
        >
          {link.icon && <TfiMenuAlt className=" hidden sm:inline mr-1" />}
          {link.name}
        </NavLink>
      ))}

    </div>
  )
}

export default MenuLinks