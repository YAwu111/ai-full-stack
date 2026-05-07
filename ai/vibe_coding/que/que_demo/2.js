const users = [
    {
      id: 1,
      username: 'shunwuyu'
    },
    {
      id: 2,
      username: '曾繁花'
    },
    {
      id: 3,
      username: '文康'
    },
  ]
  
  console.log(
    users.find(user => user.id === 2)
  )