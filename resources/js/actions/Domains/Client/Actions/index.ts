import StoreClient from './StoreClient'
import UpdateClient from './UpdateClient'
import DeleteClient from './DeleteClient'
const Actions = {
    StoreClient: Object.assign(StoreClient, StoreClient),
UpdateClient: Object.assign(UpdateClient, UpdateClient),
DeleteClient: Object.assign(DeleteClient, DeleteClient),
}

export default Actions