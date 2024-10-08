import classes from './Message.module.css';
import { MdCropSquare } from 'react-icons/md';
import { RiStarLine } from 'react-icons/ri';

const Message = (props) => {
  return (
    <div
      className={`d-flex align-items-start justify-content-between px-4 py-2 border-bottom ${classes.customBORDERGRAY200} fs-6 ${classes.customHOVERPOINTER} ${classes.customHOVERSHADOW}`}
    >
      <div className={`d-flex align-items-center gap-3`}>
        <div className={`flex-shrink-0 flex-grow-0 text-muted`}>
          <MdCropSquare style={{ height: '1.25rem', width: '1.25rem' }} />
        </div>
        <div className={`flex-shrink-0 flex-grow-0 text-muted`}>
          <RiStarLine style={{ height: '1.25rem', width: '1.25rem' }} />
        </div>
        <div
          className={`flex-1 ml-4 d-flex align-items-center justify-contet-center `}
          style={{ height: '2.5rem' }}
        >
          <p
            className={`d-inline-block w-100 text-truncate text-secondary my-auto`}
          >
            {props.email.document.message}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
