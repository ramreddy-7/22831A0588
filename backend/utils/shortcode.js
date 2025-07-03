const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateShortcode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += ALPHANUM.charAt(Math.floor(Math.random() * ALPHANUM.length));
  }
  return code;
}

function isValidShortcode(code) {
  return /^[A-Za-z0-9]{4,16}$/.test(code); // 4-16 chars, alphanumeric only
}

module.exports = { generateShortcode, isValidShortcode }; 