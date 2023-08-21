
import {formatDistanceToNowStrict, parseJSON} from 'date-fns'

function useTime(initialTime, outStringPattern) {

    const date = parseJSON(initialTime || new Date(initialTime).toISOString())


    return {
        date: date,
        fromNow: (() => formatDistanceToNowStrict(date, {addSuffix: true}))(),
    };
}

export default useTime;
