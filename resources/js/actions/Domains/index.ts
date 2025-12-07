import Booking from './Booking'
import Client from './Client'
import RecentBooking from './RecentBooking'
import Webhook from './Webhook'
const Domains = {
    Booking: Object.assign(Booking, Booking),
Client: Object.assign(Client, Client),
RecentBooking: Object.assign(RecentBooking, RecentBooking),
Webhook: Object.assign(Webhook, Webhook),
}

export default Domains