
const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY3NjA1NzI0MiwiZXhwIjoxNjc2MDc1MjQyfQ.5iIn1dPd24AMviyp0hRX3FWvN_O4ANNfDZwIF3uw00w"

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
