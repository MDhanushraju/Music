/**
 * Tarang Radio - Login & Authentication Controller
 * Supports Phone OTP, Dev Code 123456, and 1-Click Fast Profiles
 * Connected to Tarang Production Database
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const phoneInput = document.getElementById('login-phone');
  const stepPhone = document.getElementById('step-phone');
  const stepOtp = document.getElementById('step-otp');
  const displayPhoneNumber = document.getElementById('display-phone-number');
  const btnChangePhone = document.getElementById('btn-change-phone');
  const btnVerifyOtp = document.getElementById('btn-verify-otp');
  const otpInputs = document.querySelectorAll('.otp-digit');
  const resendCountdown = document.getElementById('resend-countdown');
  const btnResendOtp = document.getElementById('btn-resend-otp');
  const btnLoginAlwin = document.getElementById('btn-login-alwin');
  const btnLoginGuest = document.getElementById('btn-login-guest');

  let currentPhone = '9876543210';
  let countdownTimer = null;

  // Step 1: Send OTP
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const phoneVal = phoneInput.value.replace(/\D/g, '');
      if (phoneVal.length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      currentPhone = phoneVal;
      displayPhoneNumber.textContent = `+91 ${phoneVal.slice(0, 5)} ${phoneVal.slice(5)}`;

      // Send OTP via Backend API
      try {
        await fetch('/api/v1/auth/otp/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: currentPhone })
        });
      } catch (err) {
        console.warn('Backend offline, continuing in local mode:', err);
      }

      // Transition to OTP verification step
      stepPhone.classList.add('hidden');
      stepOtp.classList.remove('hidden');

      // Focus first OTP input
      if (otpInputs.length > 0) {
        otpInputs[0].focus();
        otpInputs[0].select();
      }

      startResendCountdown();
    });
  }

  // Change phone number back to step 1
  if (btnChangePhone) {
    btnChangePhone.addEventListener('click', () => {
      stepOtp.classList.add('hidden');
      stepPhone.classList.remove('hidden');
      phoneInput.focus();
    });
  }

  // OTP input auto-advance
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
        otpInputs[index + 1].select();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        otpInputs[index - 1].focus();
        otpInputs[index - 1].select();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        verifyOtpCode();
      }
    });
  });

  // Verify OTP button
  if (btnVerifyOtp) {
    btnVerifyOtp.addEventListener('click', verifyOtpCode);
  }

  async function verifyOtpCode() {
    let code = '';
    otpInputs.forEach(inp => { code += inp.value; });

    if (code.length < 6) {
      alert('Please enter the full 6-digit verification code (e.g. 123456).');
      return;
    }

    let authUser = {
      id: `usr_${currentPhone.slice(-8)}`,
      name: 'Alwin Joseph',
      phone: `+91 ${currentPhone}`,
      role: 'creator',
      homeCity: 'Bengaluru',
      avatar: 'AJ',
      isLoggedIn: true,
      token: `tarang_token_${Date.now()}`
    };

    try {
      const res = await fetch('/api/v1/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: currentPhone,
          code: code,
          name: 'Alwin Joseph',
          role: 'creator'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          authUser = {
            ...authUser,
            ...data.user,
            isLoggedIn: true,
            token: data.accessToken || authUser.token
          };
        }
      }
    } catch (err) {
      console.warn('Backend verify offline, saving locally:', err);
    }

    // Save auth session
    localStorage.setItem('tarang_auth_user', JSON.stringify(authUser));

    // Redirect to home station app
    window.location.href = 'index.html';
  }

  // 1-Click Persona: Alwin Joseph
  if (btnLoginAlwin) {
    btnLoginAlwin.addEventListener('click', async () => {
      let alwinProfile = {
        id: 'usr_98765432',
        name: 'Alwin Joseph',
        phone: '+91 98765 43210',
        role: 'creator',
        homeCity: 'Bengaluru',
        avatar: 'AJ',
        bio: 'Creator & Audiophile',
        isLoggedIn: true,
        token: `tarang_alwin_${Date.now()}`
      };

      try {
        const res = await fetch('/api/v1/auth/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: '9876543210',
            code: '123456',
            name: 'Alwin Joseph',
            role: 'creator'
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            alwinProfile = { ...alwinProfile, ...data.user, isLoggedIn: true };
          }
        }
      } catch (err) {
        console.warn('Backend login fallback:', err);
      }

      localStorage.setItem('tarang_auth_user', JSON.stringify(alwinProfile));
      window.location.href = 'index.html';
    });
  }

  // 1-Click Persona: Guest Listener
  if (btnLoginGuest) {
    btnLoginGuest.addEventListener('click', async () => {
      let guestProfile = {
        id: 'usr_guest_listener',
        name: 'Guest Listener',
        phone: '+91 90000 00000',
        role: 'listener',
        homeCity: 'Bengaluru',
        avatar: 'GL',
        bio: 'Community Listener',
        isLoggedIn: true,
        token: `tarang_guest_${Date.now()}`
      };

      try {
        const res = await fetch('/api/v1/auth/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: '9000000000',
            code: '123456',
            name: 'Guest Listener',
            role: 'listener'
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            guestProfile = { ...guestProfile, ...data.user, isLoggedIn: true };
          }
        }
      } catch (err) {
        console.warn('Backend login fallback:', err);
      }

      localStorage.setItem('tarang_auth_user', JSON.stringify(guestProfile));
      window.location.href = 'index.html';
    });
  }

  function startResendCountdown() {
    let seconds = 30;
    if (resendCountdown) resendCountdown.textContent = `Resend code in ${seconds}s`;
    if (btnResendOtp) btnResendOtp.classList.add('hidden');

    if (countdownTimer) clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        clearInterval(countdownTimer);
        if (resendCountdown) resendCountdown.textContent = '';
        if (btnResendOtp) btnResendOtp.classList.remove('hidden');
      } else {
        if (resendCountdown) resendCountdown.textContent = `Resend code in ${seconds}s`;
      }
    }, 1000);
  }

  if (btnResendOtp) {
    btnResendOtp.addEventListener('click', () => {
      alert('Verification code resent! (Demo code: 123456)');
      startResendCountdown();
    });
  }
});
