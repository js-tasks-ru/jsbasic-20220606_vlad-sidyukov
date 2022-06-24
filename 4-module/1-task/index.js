function makeFriendsList(friends) {
  const nameList = document.createElement('ul');

  friends.forEach(friend => {
    const nameItem = document.createElement('li');
    nameItem.textContent = `${friend.firstName} ${friend.lastName}`;
    nameList.append(nameItem);
  });

  return nameList;
}



