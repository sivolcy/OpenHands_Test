// Simple client-side logic for the login/register UI
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function show(id){
  $$(".panel").forEach(p=>p.classList.add('hidden'));
  $(id).classList.remove('hidden');
}

$('#loginTab').addEventListener('click', ()=>{
  $('#loginTab').classList.add('active');
  $('#registerTab').classList.remove('active');
  show('#loginPanel');
});
$('#registerTab').addEventListener('click', ()=>{
  $('#registerTab').classList.add('active');
  $('#loginTab').classList.remove('active');
  show('#registerPanel');
});

// toggle password visibility
$$('.togglePwd').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = document.getElementById(btn.dataset.target);
    if(target.type==='password'){ target.type='text'; btn.textContent='隐藏'; }
    else { target.type='password'; btn.textContent='显示'; }
  })
});

function showError(name,msg){
  const el = document.querySelector(`.error[data-for="${name}"]`);
  if(el) el.textContent = msg || '';
}

function showToast(msg,timeout=2500){
  const t = $('#toast');
  t.textContent = msg; t.classList.remove('hidden');
  setTimeout(()=>t.classList.add('hidden'), timeout);
}

// password strength
function scorePassword(pw){
  let score = 0;
  if(pw.length>=8) score++;
  if(/[A-Z]/.test(pw)) score++;
  if(/[0-9]/.test(pw)) score++;
  if(/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

$('#regPassword').addEventListener('input', e=>{
  const v = e.target.value;
  const s = scorePassword(v);
  $('#pwdStrength').value = s;
  const labels = ['很弱','弱','一般','强','非常强'];
  $('#pwdLabel').textContent = labels[s];
});

// forms
$('#loginForm').addEventListener('submit', e=>{
  e.preventDefault();
  showError('loginEmail',''); showError('loginPassword','');
  const email = $('#loginEmail').value.trim();
  const pwd = $('#loginPassword').value;
  if(!email) return showError('loginEmail','请输入邮箱或用户名');
  if(!pwd) return showError('loginPassword','请输入密码');
  // fake submit
  showToast('登录成功（模拟）');
  console.log('Login', {email,pwd});
});

$('#registerForm').addEventListener('submit', e=>{
  e.preventDefault();
  ['regName','regEmail','regPassword','regConfirm'].forEach(n=>showError(n,''));
  const name = $('#regName').value.trim();
  const email = $('#regEmail').value.trim();
  const pwd = $('#regPassword').value;
  const confirm = $('#regConfirm').value;
  const agree = $('#agree').checked;
  if(name.length<3) return showError('regName','用户名至少3个字符');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showError('regEmail','请输入有效邮箱');
  if(pwd.length<8) return showError('regPassword','密码至少8位');
  if(pwd!==confirm) return showError('regConfirm','两次输入的密码不一致');
  if(!agree) return showError('agree','请同意协议');
  showToast('注册成功（模拟）');
  console.log('Register', {name,email});
});

// forgot
$('#forgotBtn').addEventListener('click', ()=>{
  const email = prompt('请输入用于找回密码的邮箱');
  if(email) showToast('已发送重置邮件（模拟）');
});
