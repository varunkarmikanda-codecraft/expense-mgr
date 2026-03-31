import type { Friend } from "../models/friend.model.js";

export class FriendsRepository {

  private static instance: FriendsRepository;
  private friends: Friend[] = []

  static getInstance() {
    if(!FriendsRepository.instance) {
      FriendsRepository.instance = new FriendsRepository();
    }
    return FriendsRepository.instance;
  }

  private constructor () {}

  addFriend(friend: Friend) {
    this.friends.push(friend);
    console.log('Friend added to repository');
  }

  searchFriend(friend: Friend) {

  }

  findFriendByEmail(friend: Friend) {

  }

  findFriendByPhone(friend: Friend) {

  }

  searchFriends(friend: Friend) {

  }

}