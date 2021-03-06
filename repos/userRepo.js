var md5 = require('crypto-js/md5');
var kn = require('../fn/db');

exports.list = () => kn('users').select('uid', 'username', 'first_name', 'last_name', 'email', 'phone', 'role');

exports.single = uid => kn('users')
  .select('uid', 'username', 'first_name', 'last_name', 'email', 'phone', 'role')
  .where('uid', uid)
  .first();

exports.getUserByUsername = username => kn('users')
  .select('uid', 'username', 'first_name', 'last_name', 'email', 'phone', 'role')
  .where('username', username)
  .first();

exports.getUserByEmail = email => kn('users')
  .select('uid', 'username', 'first_name', 'last_name', 'email', 'phone', 'role')
  .where('email', email)
  .first();

exports.add = input => {
  input.role = 3;
  input.password = md5(input.password).toString();
  return kn('users').insert(input).returning('uid')
};

exports.delete = uid => kn('users')
  .where('uid', uid)
  .del();

exports.update = (uid, input) => kn('users')
  .where('uid', uid)
  .update(input);

exports.login = (input) => {
  var md5_pwd = md5(input.password).toString();
  return kn('users').select('uid', 'username', 'first_name', 'last_name', 'email', 'phone', 'role').where({
    'username': input.username,
    'password': md5_pwd
  }).first()
};





