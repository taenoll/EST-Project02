import { gameReset } from "./index.js";

const users = [];

export async function handleSignup(e) {
  e.preventDefault();

  const id = document.querySelector('#signup-id').value.trim();
  const nickName = document.querySelector('#signup-nickname').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  users.find((user) => {
    return user.email === email;
  });


  if(!id || !password || !nickName || !email){
    return;
  };

  const user = { id, nickName, password, email };
  localStorage.setItem('user', JSON.stringify(user));

  //모달창 닫기
  const modal = e.target.closest('.auth-modal');

  modal.remove();
};

//로그인
export function handleLogin(e) {
  e.preventDefault();

  const userId = document.querySelector('#login-id').value;
  const userPw = document.querySelector('#login-password').value;

  if (!userId || !userPw) return;
  const savedUser = localStorage.getItem('user');
  
  if (!savedUser) return;
  const user = JSON.parse(savedUser);

  if(userId === user.id && userPw === user.password){
    localStorage.setItem('isLoggedIn', 'true');
    
    const modal = e.target.closest('.auth-modal');
    modal.remove();
    
    const authNav = document.querySelector('.title-auth-nav');

    const userInfo = document.querySelector('.title-user-info');
    const userName = document.querySelector('.title-user-name');
    alert('로그인 성공❤️');
    authNav.hidden = true;
    userInfo.hidden = false;
    userName.textContent = user.nickName;
  };
}

//로그아웃
export function handleLogout() {
  const authNav = document.querySelector('.title-auth-nav');
  const userInfo = document.querySelector('.title-user-info');
  const continueButton = document.querySelector('.continue-btn');

  localStorage.removeItem('isLoggedIn');

  gameReset();

  alert('로그아웃 되었습니다😊');
  authNav.hidden = false;
  userInfo.hidden = true;
  continueButton.disabled = true;
};