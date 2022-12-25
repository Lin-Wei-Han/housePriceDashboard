import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../dist/image/Logo.png";
import { RiDashboardFill } from 'react-icons/ri';
import { MdOnlinePrediction } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);

  const handleClick = (index) => {
    console.log(index);
    setSelected(index)
  }

  const sidebarItem = React.useMemo(
    () => [
      {
        title: "Dashboard",
        icon: RiDashboardFill,
        url: "/",
      },
      {
        title: "House Price",
        icon: MdOnlinePrediction,
        url: "/housePrice",
      }
    ],
    []
  );

  return (
    <>
      <div className="bars" onClick={() => setExpaned(!expanded)}>
        {expanded ? <IoClose className="icon" /> : <FaBars className="icon" />}
      </div>
      <motion.div className={expanded ? 'sidebar active' : 'sidebar'}>
        {/* logo */}
        <div className="logo">
          <img className="img" src={Logo} alt="logo" />
          <h1 className="title">PROPERTY</h1>
        </div>
        <div className="line"></div>
        <div className="menu">
          {sidebarItem.map((item, index) => {
            return (
              <Link to={item.url} key={index} style={{ color: 'white' }} >
                <div
                  className={selected === index ? "menuItem active" : "menuItem"}
                  onClick={() => handleClick(index)}
                >
                  <item.icon className="icon" />
                  <p>{item.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;