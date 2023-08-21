
import {formatDistanceToNowStrict, parseJSON} from 'date-fns'

function useTime(initialTime, outStringPattern) {
    const defaultPattern = "dd/MM/yyyy HH:mm:ss";



    const date = parseJSON(initialTime)


    return {
        date: date,
        fromNow: (() => formatDistanceToNowStrict(date, {addSuffix: true}))(),
    };
}

export default useTime;
