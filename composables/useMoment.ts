import moment from 'moment'

export function useMoment() {
    return moment
}

export function dateFromNow(date: string) {
    return moment(date).fromNow()
}
