/**
 * @function 根据ID获取用户信息
 * @param {*} id 
 * @param {*} users 
 */
async function getUserById(id,users){
    return users.find(user => user.id === id);
};

// 根据邮箱查找用户
async function getUserByEmail(email,users){
    return users.find(user => user.email === email);
};