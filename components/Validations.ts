export const emailValidation = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
];

export const passwordValidation = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
  (v: string) => /[A-Z]/.test(v) || 'Password must contain an uppercase letter',
  (v: string) => /[a-z]/.test(v) || 'Password must contain a lowercase letter',
  (v: string) => /[0-9]/.test(v) || 'Password must contain a number',
  (v: string) => /[^A-Za-z0-9]/.test(v) || 'Password must contain a special character'
];

export const nameValidation = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length >= 2 || 'Name must be at least 2 characters',
  (v: string) => /^[a-zA-Z\s]*$/.test(v) || 'Name can only contain letters and spaces'
];

export const phoneValidation = [
  (v: string) => !!v || 'Phone number is required',
  (v: string) => /^\d{10}$/.test(v) || 'Phone number must be 10 digits'
];

export const urlValidation = [
  (v: string) => !!v || 'URL is required',
  (v: string) => /^(http|https):\/\/[^ "]+$/.test(v) || 'Must be a valid URL'
];

export const dateValidation = [
  (v: string) => !!v || 'Date is required',
  (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Date must be in YYYY-MM-DD format'
];