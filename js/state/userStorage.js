const users = [];

export async function handleSignup(e) {
  e.preventDefault();

  /* const authMessage = document.querySelector('.auth-message')

  function showMessage (message){
    authMessage.textContent = message;
  } */

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

  
}