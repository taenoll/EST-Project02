import { gameReset } from "./index.js";

// 회원가입
export async function handleSignup(e) {
  e.preventDefault();

  const id = document.querySelector('#signup-id').value.trim();
  const nickName = document.querySelector('#signup-nickname').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value;

  // 메시지를 표시할 요소
  const authMessage = e.target.querySelector('.auth-message');

  // 빈칸 검사
  if (!id || !password || !nickName || !email) {
    authMessage.textContent = '모든 항목을 입력해주세요.';
    return;
  }

  // 비밀번호 유효성 검사
  const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$]).{8,}$/;

  if (!pwReg.test(password)) {
    authMessage.textContent =
      '비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.';
    return;
  }

  //기존 회원 목록 가져오기
  const savedUsers = localStorage.getItem('users');
  const users = savedUsers ? JSON.parse(savedUsers) : [];

  //아이디 중복 검사
  const duplicateId = users.find((user) => {
    return user.id === id;
  });

  if (duplicateId) {
    authMessage.textContent = '이미 사용 중인 아이디입니다.';
    return;
  }

  //이메일 중복 검사
  const duplicateEmail = users.find((user) => {
    return user.email === email;
  });

  if (duplicateEmail) {
    authMessage.textContent = '이미 사용 중인 이메일입니다.';
    return;
  }

  //회원 정보 저장
  const user = { id, nickName, password, email };

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  //모달창 닫기
  const modal = e.target.closest('.auth-modal');
  modal.remove();
}


// 로그인
export function handleLogin(e) {
  e.preventDefault();

  const userId = document.querySelector('#login-id').value.trim();
  const userPw = document.querySelector('#login-password').value;

  // 메시지를 표시할 요소
  const authMessage = e.target.querySelector('.auth-message');

  //빈칸 검사
  if (!userId || !userPw) {
    authMessage.textContent = '아이디와 비밀번호를 입력해주세요.';
    return;
  }

  //회원 목록 가져오기
  const savedUsers = localStorage.getItem('users');
  const users = savedUsers ? JSON.parse(savedUsers) : [];

  //아이디와 비밀번호가 일치하는 회원 찾기
  const user = users.find((user) => {
    return user.id === userId && user.password === userPw;
  });

  if (user) {
    //로그인 상태 저장
    localStorage.setItem('isLoggedIn', 'true');

    // 현재 로그인한 회원 정보 저장
    localStorage.setItem('user', JSON.stringify(user));

    const modal = e.target.closest('.auth-modal');
    modal.remove();

    const authNav = document.querySelector('.title-auth-nav');
    const userInfo = document.querySelector('.title-user-info');
    const userName = document.querySelector('.title-user-name');

    alert('로그인 성공❤️');

    authNav.hidden = true;
    userInfo.hidden = false;
    userName.textContent = user.nickName;

  } else {
    authMessage.textContent =
      '아이디 또는 비밀번호가 일치하지 않습니다.';
  }
}


// 로그아웃
export function handleLogout() {
  const authNav = document.querySelector('.title-auth-nav');
  const userInfo = document.querySelector('.title-user-info');
  const continueButton = document.querySelector('.continue-btn');

  // 로그인 상태 삭제
  localStorage.removeItem('isLoggedIn');

  // 현재 로그인한 회원 정보 삭제
  localStorage.removeItem('user');

  // 게임 진행 상황 초기화
  gameReset();

  alert('로그아웃 되었습니다😊');

  authNav.hidden = false;
  userInfo.hidden = true;
  continueButton.disabled = true;
}