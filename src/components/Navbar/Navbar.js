import React from 'react';
import classes from './Navbar.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosSearch } from 'react-icons/io';
import { CiCircleQuestion } from 'react-icons/ci';
import { CiSettings } from 'react-icons/ci';
import { PiDotsNineBold } from 'react-icons/pi';
import Avatar from 'react-avatar';
function Navbar() {
  return (
    <div
      className={`d-flex justify-content-between align-items-center ${classes.customH16} mx-3 gap-2`}
    >
      <div className={`d-flex align-items-center ${classes.customGAP10}`}>
        <div className={`d-flex align-items-center gap-2`}>
          <div
            className={`p-3 rounded-circle cursor-pointer ${classes.customHOVER}`}
          >
            <RxHamburgerMenu style={{ fontSize: '20px' }} />
          </div>
          <img
            className={classes.customW8}
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
            alt="gmail-logo"
          />
          <h1 className={`fs-4 fw-semibold ${classes.customTEXTCOLOR500}`}>
            Gmail
          </h1>
        </div>
      </div>
      <div className={`d-md-block d-none ${classes.customMARGINRIGHT60} w-50`}>
        <div
          className={`d-flex align-items-center rounded-pill px-2 py-2 ${classes.customBG}`}
        >
          <IoIosSearch
            style={{ fontSize: '24px' }}
            className={`classes.customTEXTCOLOR700`}
          />
          <input
            type="text"
            placeholder="Search Mail"
            className={`rounded-pill w-100 bg-transparent ${classes.customOUTLINENONE} px-1`}
          />
        </div>
      </div>
      <div className={`d-md-block d-none`}>
        <div className={`d-flex align-items-center gap-2`}>
          <div
            className={`p-3 rounded-circle cursor-pointer ${classes.customBGGRAY100HOVER}`}
          >
            <CiCircleQuestion style={{fontSize: '20px'}} />
          </div>
          <div
            className={`p-3 rounded-circle cursor-pointer ${classes.customBGGRAY100HOVER}`}
          >
            <CiSettings style={{fontSize: '20px'}} />
          </div>
          <div
            className={`p-3 rounded-circle cursor-pointer ${classes.customBGGRAY100HOVER}`}
          >
            <PiDotsNineBold style={{fontSize: '20px'}} />
          </div>
          <div className="cursor-pointer">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWi4bk1s8Q2HPdq4fAPfLVKO6I4UrbUGW93w&s"
              size="40"
              round={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
