const User = require('./models/User');

async function getUser() {
  const userId = 'U00002';
  const user = await User.getById(userId);
  console.log('User Retrieved:', user);
}

getUser();



// async function createUser() {
//   const hashedPassword = await User.hashPassword('yourpassword');
//   const newUser = await User.create({
//     username: 'newuser@gmail.com',
//     password: hashedPassword,
//     role: 'Student',
//     fullName: 'John Doe',
//     birthday: '2001-01-01',
//     gender: 'Male'
//   });
//   console.log('User Created:', newUser);
// }

// createUser();

const bcrypt = require('bcrypt');

async function testHashPassword() {
  const password = 'yourpassword';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Original Password:', password);
  console.log('Hashed Password:', hashedPassword);
}

testHashPassword();


async function testUpdate(){
  const userId = 'U00002';
  const user = await User.getById(userId);
  // Update the user
  const updatedUser = await User.update(user.user_id, {
    fullName: 'New Name', // Change to fullName
    gender: 'Female'
  });
  console.log('User Updates:', updatedUser);
}
testUpdate()