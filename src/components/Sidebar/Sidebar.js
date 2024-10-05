import React from 'react';
import classes from './Sidebar.module.css';
import { IoMdStar } from 'react-icons/io';
import { LuPencil } from 'react-icons/lu';
import {
  MdOutlineDrafts,
  MdOutlineKeyboardArrowDown,
  MdOutlineWatchLater,
} from 'react-icons/md';
import { TbSend2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
const sidebarItems = [
  {
    icon: <LuPencil style={{ fontSize: '24px' }} />,
    text: 'Inbox',
  },
  {
    icon: <IoMdStar style={{ fontSize: '24px' }} />,
    text: 'Starred',
  },
  {
    icon: <MdOutlineWatchLater style={{ fontSize: '24px' }} />,
    text: 'Snoozed',
  },
  {
    icon: <TbSend2 style={{ fontSize: '24px' }} />,
    text: 'Sent',
  },
  {
    icon: <MdOutlineDrafts style={{ fontSize: '24px' }} />,
    text: 'Draft',
  },
  {
    icon: <MdOutlineKeyboardArrowDown style={{ fontSize: '24px' }} />,
    text: 'More',
  },
];
const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className={`${classes.customW15}`}>
      <div className={`p-3`}>
        <button
        onClick={() => navigate('/welcome/email')}
          className={`d-flex align-items-center gap-2 p-3 ${classes.customBORDERRADIUS} ${classes.customBG} ${classes.customHOVER}`}
        >
          <LuPencil style={{ fontSize: '24px' }} />
          Compose
        </button>
      </div>
      <div className={`${classes.customTEXTCOLOR500}`}>
        {sidebarItems.map((item) => {
          return (
            <div className={`d-flex align-items-center gap-3  py-1  ${classes.customBORDERRADIUSRIGHT} ${classes.customHOVERPOINTER}  ${classes.customHOVERBG} my-2 mx-4`}>
              {item.icon}
              {item.text}
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default Sidebar;
