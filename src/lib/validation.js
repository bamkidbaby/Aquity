export const passwordRules = [
  "At least 8 characters",
  "One uppercase letter",
  "One lowercase letter",
  "One number",
];

export function validatePassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateName(name) {
  return name.trim().length >= 2;
}

export function validateMessage(message) {
  const length = message.trim().length;
  return length >= 20 && length <= 2000;
}
