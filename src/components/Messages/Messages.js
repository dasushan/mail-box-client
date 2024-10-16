import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmails } from '../../store/email-slice';
import { setSent } from '../../store/email-slice';
import Message from '../Message/Message';
import { useLocation } from 'react-router-dom';
const Messages = () => {
  const location = useLocation();

  const emailId = useSelector((state) => state.auth.emailId);
  const emails = useSelector((state) => state.emails.emails);
  const sent = useSelector((state) => state.emails.sent);
  const dispatch = useDispatch();

  useEffect(() => {
    const email = emailId ? emailId.replace(/[@ .]/g, '') : '';
    fetch(
      `https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${email}.json`,
      {
        method: 'GET',
      }
    ).then((response) => {
      if (response.ok) {
        return response.json().then((res) => {
          // console.log(res.inbox)
          console.log(location.pathname);
          if (location.pathname === '/welcome') {
            if (res && res.inbox) {
              const data = [];
              for (const [key, value] of Object.entries(res.inbox)) {
                data.push(value);
              }
              console.log(data);
              dispatch(setEmails(data));
            }
          }
          if(location.pathname === '/welcome/sent') {
            if (res && res.sent) {
              const data = [];
              for (const [key, value] of Object.entries(res.sent)) {
                data.push(value);
              }
              console.log(data);
              dispatch(setSent(data));
            }
          }
        });
      } else {
      }
    });
  }, []);
  return (
    
    <div>{location.pathname==='/welcome'? emails && emails?.map((email) => <Message email={email} />): sent && sent?.map((email) => <Message email={email}/>)}</div>
  
  );
};

export default Messages;
