
import {format, formatDistanceToNowStrict, parseJSON} from 'date-fns'

function useTime(initialTime, outStringPattern) {

    const date = parseJSON(initialTime || new Date(initialTime).toISOString())


    return {
        date: date,
        fromNow: (() => formatDistanceToNowStrict(date, {addSuffix: true}))(),
        string: format(date, outStringPattern || "dd/MM/yyyy")
    };
}

export default useTime;
