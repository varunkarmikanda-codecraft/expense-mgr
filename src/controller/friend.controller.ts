import type { Friend } from "../models/friend.model.js";
import { FriendsRepository } from "../repository/friends.repository.js";

export class FriendController {
  checkEmailExists(email: string) {
    return false;
  }

  checkPhoneExists(phone: string) {
    return false;
  }

  addFriend(friend: Friend) {
    if(FriendsRepository.getInstance())
    console.log('Adding friend to database...');
  }
}