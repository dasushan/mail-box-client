import {
  MdCropSquare,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import classes from './Sent.module.css';
import { FaCaretDown } from 'react-icons/fa6';
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import Messages from '../Messages/Messages';

const Sent = () => {
  return (
    <div className={`flex-grow-1 bg-white mx-4 ${classes.customBORDERRADIUS}`}>
      <div className={`d-flex align-items-center justify-content-between px-4`}>
        <div
          className={`d-flex align-items-center gap-2 py-2 ${classes.customTEXTCOLOR700}`}
        >
          <div className={`d-flex align-item-center gap-1`}>
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
            className={`border-0 ${classes.customHOVERBG} rounded-circle`}
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
        <Messages />
      </div>
    </div>
  );
};

export default Sent;
