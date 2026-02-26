/**
 * Auth API
 * Xu ly dang nhap va quen mat khau (tai khoan do admin cap).
 */

/**
 * Dang nhap
 * @param {string} username
 * @param {string} password
 */
async function login(username, password) {
  return apiFetch(ENDPOINTS.AUTH_LOGIN, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

/**
 * Gui yeu cau reset mat khau
 * @param {string} usernameOrEmail
 */
async function forgotPassword(usernameOrEmail) {
  return apiFetch(ENDPOINTS.AUTH_FORGOT_PASSWORD, {
    method: 'POST',
    body: JSON.stringify({ usernameOrEmail }),
  });
}
