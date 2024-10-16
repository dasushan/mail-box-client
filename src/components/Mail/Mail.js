import classes from './Mail.module.css';
import { IoMdMore, IoMdArrowBack } from 'react-icons/io';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
} from 'react-icons/md';
import {  BiArchiveIn } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Mail = () => {
  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  const emailId = useSelector((state) => state.auth.emailId);
  const navigate = useNavigate();

  const deleteMailById = () => {
  const email = emailId? emailId.replace(/[@ .]/g, '') : '';
    fetch(`https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${email}.json`, {
      method: 'GET'
    }).then(async (response) => {
      const result = await response.json();
      let keY = null;
      for(const [key, value] of Object.entries(result.inbox)){
        if(value.document.id === selectedEmail.document.id){
          keY = key;
          
        }
      }
      fetch(`https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/inbox/${keY}.json`, {
        method: 'DELETE'
      }).then( async (response) => {
        const result = await response.json();
        console.log(result);
        navigate('/welcome')
      })
    })
  }
  return (
    <div className={`flex-grow-1 bg-white ${classes.customROUNDEDFULL} mx-4`}>
      <div className={`d-flex align-items-center justify-content-between px-3`}>
        <div
          className={`d-flex align-items-center gap-2 py-2 ${classes.customTEXTCOLOR700}`}
        >
          <div
            onClick={() => navigate('/welcome')}
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <IoMdArrowBack style={{ fontSize: '20px' }} />
          </div>
          <div
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <BiArchiveIn style={{ fontSize: '20px' }} />
          </div>
          <div
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <MdOutlineReport style={{ fontSize: '20px' }} />
          </div>
          <div
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <MdOutlineMarkEmailUnread style={{ fontSize: '20px' }} />
          </div>
          <div
            onClick={() => {
              deleteMailById();
            }}
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <MdDeleteOutline size={'20px'} />
          </div>
          <div
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <MdOutlineWatchLater style={{ fontSize: '20px' }} />
          </div>
          <div
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <MdOutlineAddTask style={{ fontSize: '20px' }} />
          </div>
          <div
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <MdOutlineDriveFileMove style={{ fontSize: '20px' }} />
          </div>
          <div
            className={`p-2 rounded-pill ${classes.customHOVERBG} ${classes.customHOVERPOINTER}`}
          >
            <IoMdMore style={{ fontSize: '20px' }} />
          </div>
          
        </div>
        <div className={`d-flex align-items-center gap-2`}>
        <button className={`rounded-pill ${classes.customHOVERBUTTONBG}`}>
            <MdKeyboardArrowLeft style={{fontSize: '24px'}} />
          </button>
          <button className={`rounded-pill ${classes.customHOVERBUTTONBG}`}>
            <MdKeyboardArrowRight style={{fontSize: '24px'}} />
          </button>
        </div>
      </div>
      <div style={{height:"90vh", overflowY: 'auto'}} className={`p-3`}>
        <div className={`d-flex justify-content-between align-items-center bg-white gap-1`}>
            <div className={`d-flex align-items-center gap-2`}>
                <h1 className={`fs-4 fw-medium`}>{selectedEmail?.document.subject}</h1>
                <span className={`px-2 ${classes.customBGGRAY200} ${classes.customBORDERRADIUS} ${classes.customFONTSIZE}`}>inbox</span>
            </div>
            <div className={`my-3 flex-grow-0 flex-shrink-0 ${classes.customFONTSIZE} ${classes.customTEXTGRAY400}`}>
                <p>
                    {new Date(selectedEmail?.document.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
        <div >
           <h1 className={`fs-6`}>{selectedEmail?.sender}</h1> 
           <span>to me</span>
        </div>
        <div className={`my-5`}>
            <p>{selectedEmail?.document.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Mail;
