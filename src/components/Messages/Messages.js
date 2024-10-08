import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmails } from '../../store/email-slice';
import Message from '../Message/Message';
const Messages = () => {
  const emailId = useSelector((state) => state.auth.emailId);
  const emails = useSelector((state) => state.emails.emails);
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
          console.log(res.inbox);
          const data = [];
          for (const [key, value] of Object.entries(res.inbox)) {
            data.push(value);
          }
          console.log(data);
          dispatch(setEmails(data));
        });
      } else {
      }
    });
  }, []);
  return(
    <div>
      {emails && emails?.map((email) => <Message email={email}/>)}
    </div>
  )
};

export default Messages;
