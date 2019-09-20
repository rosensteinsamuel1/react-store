import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service'

let ns = new NotificationService(); // singleton 

let instance = null;
var wishList = [];

// DataService is a singleton so that there is only instance of the variable in memory
class DataService {
    
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    
    itemOnWishList = item => {
        for (var x=0; x<wishList.length; x++) {
            if (wishList[x]._id === item._id) {
                return true;
            }
        }
    }


    addWishListItem = item => {
        wishList.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
    }

    removeWishListItem = item => {
        for (var i = 0; i < wishList.length; i++) {
            if (wishList[i]._id === item._id) {
                wishList.splice(i, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
                break;
            }
        }
    }
}

export default DataService;
