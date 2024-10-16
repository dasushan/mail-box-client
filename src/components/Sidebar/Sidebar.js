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

import { useSelector } from 'react-redux';

const sidebarItems = [
  
  {
    icon: <IoMdStar style={{ fontSize: '24px' }} />,
    text: 'Starred',
  },
  {
    icon: <MdOutlineWatchLater style={{ fontSize: '24px' }} />,
    text: 'Snoozed',
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
  const emails = useSelector((state) => state.emails.emails);
  let count = 0;
  emails.forEach((email) => {
    if(email.read === false){
      count++;
    }
  })
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
        <div
          className={`d-flex align-items-center gap-3  py-1  ${classes.customBORDERRADIUSRIGHT} ${classes.customHOVERPOINTER}  ${classes.customHOVERBG} my-2 mx-4`}
        >
          <LuPencil style={{ fontSize: '24px' }} />
          Inbox
          <span className={`bg-info px-1 rounded-pill text-dark`}>{count}</span>
        </div>
      </div>
      <div onClick={() => navigate('/welcome/sent')} className={`${classes.customTEXTCOLOR500}`}>
        <div
          className={`d-flex align-items-center gap-3  py-1  ${classes.customBORDERRADIUSRIGHT} ${classes.customHOVERPOINTER}  ${classes.customHOVERBG} my-2 mx-4`}
        >
          <TbSend2 style={{ fontSize: '24px' }} />
          Sent
          
        </div>
      </div>
      <div className={`${classes.customTEXTCOLOR500}`}>
        {sidebarItems.map((item) => {
          return (
            <div
              className={`d-flex align-items-center gap-3  py-1  ${classes.customBORDERRADIUSRIGHT} ${classes.customHOVERPOINTER}  ${classes.customHOVERBG} my-2 mx-4`}
            >
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
