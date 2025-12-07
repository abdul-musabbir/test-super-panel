import StoreBookingEvent from './StoreBookingEvent'
import UpdateBookingEvent from './UpdateBookingEvent'
import DeleteBookingEvent from './DeleteBookingEvent'
const Actions = {
    StoreBookingEvent: Object.assign(StoreBookingEvent, StoreBookingEvent),
UpdateBookingEvent: Object.assign(UpdateBookingEvent, UpdateBookingEvent),
DeleteBookingEvent: Object.assign(DeleteBookingEvent, DeleteBookingEvent),
}

export default Actions