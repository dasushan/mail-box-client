import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSent, setEmails } from "../store/email-slice";

const useFetch = function() {
    const emailId = useSelector((state) => state.auth.emailId);
    const dispatch = useDispatch();

    // Define polling function
    const pollApi = async () => {
        try{
            const email = emailId? emailId.replace(/[@ .]/g, '') : '';
            const response = await fetch(`https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/${email}.json`, {
                method: 'GET'
            })
            const result = await response.json();
            if( result && result.inbox){
                const data = [];
                for(const [key, value] of Object.entries(result.inbox)){
                    data.push(value)
                }
                dispatch(setEmails(data))
            }
            if( result && result.sent){
                const data = [];
                for(const [key, value] of Object.entries(result.sent)){
                    data.push(value);
                }
                dispatch(setSent(data));
            }
        }catch(e){
            console.log(e.message)
        }
    }

    useEffect(() => {
        //Start polling when the component mounts
        const interval = setInterval(() => {
            pollApi();
            console.log(`pollApi ran`)
        }, 2000);    // Poll every two seconds

        // Cleanup the interval on unmount
        return () => clearInterval(interval);
    }, [])
}

export default useFetch;