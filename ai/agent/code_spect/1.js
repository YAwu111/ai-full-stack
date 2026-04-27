function getUserInfo() {
  let user = {
    name: 'ai',
    age: 18,
  };
  console.log(user);
  return user;
}

const me = getUserInfo();
me.age++;
getUserInfo()
console.log(me);