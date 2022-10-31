import React, { useState } from "react";
import "../dist/css/sidebar.scss";
import Logo from "../dist/image/Logo.png";
import { RiDashboardFill } from 'react-icons/ri';
import { MdOnlinePrediction } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);

  const sidebarItem = React.useMemo(
    () => [
      {
        title: "Dashboard",
        icon: RiDashboardFill,
      },
      {
        title: "六都房價預測",
        icon: MdOnlinePrediction,
      },
      {
        title: "關於我們",
        icon: BsFillPeopleFill,
      }
    ],
    []
  );

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-100%'
    }
  }

  return (
    <>
      <div className="bars" onClick={() => setExpaned(!expanded)}>
        {expanded ? <IoClose className="icon" /> : <FaBars className="icon" />}
      </div>
      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <h1>PROPERTY</h1>
        </div>
        <div className="line"></div>
        <div className="menu">
          {sidebarItem.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)}
              >
                <item.icon className="icon" />
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;