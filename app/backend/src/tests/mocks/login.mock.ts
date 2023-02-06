
const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY3NTY4NzY5MywiZXhwIjoxNjc1NzA1NjkzfQ.ESVY5-nJYgIkAU7SbB1uSMJQdBDSSRRCa1rBdvPdk8g"

const UserTestInvalid = {
  username: 'invalid',
  role: 'admin',
  email: 'invalid@gmail.com',
  password: 'passwordInvalid123'
}

const UserTestValid = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export {
  tokenTest,
  UserTestInvalid,
  UserTestValid,
};
