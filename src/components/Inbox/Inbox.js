import React from 'react';
import classes from './Inbox.module.css';
import { useState } from 'react';
import { FaCaretDown, FaUserFriends } from 'react-icons/fa';
import { GoTag } from 'react-icons/go';
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import Messages from '../Messages/Messages';
const mailType = [
  {
    icon: <MdInbox style={{ fontSize: '20px' }} />,
    text: 'Primary',
    key: 0,
  },
  {
    icon: <GoTag style={{ fontSize: '20px' }} />,
    text: 'Promotions',
    key: 1,
  },
  {
    icon: <FaUserFriends fontSize={{ fontSize: '20px' }} />,
    text: 'Social',
    key: 2,
  },
];

function Inbox() {
  const [mailTypeSelected, setMailTypeSelected] = useState(0);
  return (
    <div className={`flex-grow-1 bg-white mx-4 ${classes.customBORDERRADIUS}`}>
      <div className={`d-flex align-items-center justify-content-between px-4`}>
        <div
          className={`d-flex align-items-center gap-2 py-2 ${classes.customTEXTCOLOR700}`}
        >
          <div className="d-flex align-items-center gap-1">
            <MdCropSquare style={{ fontSize: '20px' }} />
            <FaCaretDown style={{ fontSize: '20px' }} />
          </div>
          <div
            className={`p-2 rounded-circle ${classes.customHOVERPOINTER} ${classes.customHOVERBG}`}
          >
            <IoMdRefresh style={{ fontSize: '20px' }} />
          </div>
          <div
            className={`p-2 rounded-circle ${classes.customHOVERPOINTER} ${classes.customHOVERBG}`}
          >
            <IoMdMore style={{ fontSize: '20px' }} />
          </div>
        </div>
        <div className={`d-flex align-items-center gap-2`}>
          <p className={`my-auto`}>1-50 of 1000</p>
          <button
            className={` border-0 ${classes.customHOVERBG} rounded-circle`}
          >
            <MdKeyboardArrowLeft style={{ fontSize: '24px' }} />
          </button>
          <button
            className={` border-0 ${classes.customHOVERBG} rounded-circle`}
          >
            <MdKeyboardArrowRight style={{ fontSize: '24px' }} />
          </button>
        </div>
      </div>
      <div style={{ height: '90vh', overflowY: 'auto' }}>
        <div className={`d-flex align-items-center gap-1`}>
          {mailType.map((item, index) => {
            return (
              <button
                key={item.key}
                className={`${
                  mailTypeSelected === index
                    ? `${classes.customBORDERBLUE}`
                    : `${classes.customBORDERNONE}`
                } d-flex align-items-center gap-4 p-3  ${
                  classes.customHOVERBG
                }`}
                style={{ width: '13rem' }}
                onClick={() => setMailTypeSelected(index)}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>
        <Messages />
      </div>
    </div>
  );
}

export default Inbox;
