import classes from './Message.module.css';
import { MdCropSquare } from 'react-icons/md';
import { RiStarLine } from 'react-icons/ri';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { setSelectedEmail } from '../../store/email-slice';



const Message = (props) => {
  const navigate = useNavigate();
  const emailId = useSelector((state) => state.auth.emailId);
  const dispatch = useDispatch();

  const openMail = () => {
    console.log(props.email);
    dispatch(setSelectedEmail(props.email));
    const selectedEmail = props.email;
    console.log(selectedEmail);
    const email = emailId ? emailId.replace(/[@ .]/g, '') : '';
    fetch(
      `https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${email}.json`,
      {
        method: 'GET',
      }
    ).then(async (response) => {
      const result = await response.json();
      // dispatch(setSelectedEmail(props.email));
      console.log(result.inbox);
      console.log(selectedEmail);
      let keY = null;
      for (const [key, value] of Object.entries(result.inbox)) {
        if (value.document.id === selectedEmail.document.id) {
          keY = key;
        }
      }
      const oldEmail = result.inbox[keY];
      console.log(oldEmail);
      const updatedEmail = {
        document: oldEmail.document,
        read: true,
        sender: oldEmail.sender,
      };
      console.log(updatedEmail);
      fetch(
        `https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/inbox/${keY}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEmail),
        }
      );
      navigate(`/welcome/mail/${props.email.document.id}`);
    });
    // navigate(`/welcome/mail/${props.email.document.id}`);
  };
  return (
    <div
      onClick={openMail}
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
          className={`flex-shrink-0 flex-grow-0 text-muted d-flex align-items-center justify-content-center `}
          style={{ height: '1rem' }}
        >
          <div
            style={{ height: '0.5rem', width: '0.5rem' }}
            className={`bg-info rounded-pill my-auto ${
              props.email.read ? 'd-none' : 'd-inline-block'
            }`}
          ></div>
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
