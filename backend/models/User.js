const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  constructor(userId, username, password, role, fullName, birthday, gender) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.role = role;
    this.fullName = fullName;
    this.birthday = birthday;
    this.gender = gender;
  }

  static async create(user) {
    const query = `INSERT INTO Users (username, password, role, fullName, birthday, gender) 
                    VALUES ($1, $2, $3, $4, $5, $6) 
                    RETURNING "user_id", "username", "password", "role", "fullname", "birthday", "gender"`;
    const values = [user.username, user.password, user.role, user.fullName, user.birthday, user.gender];
    const result = await db.query(query, values);
    return new User(
      result.rows[0].user_id,
      result.rows[0].username,
      result.rows[0].password,
      result.rows[0].role,
      result.rows[0].fullName,
      result.rows[0].birthday,
      result.rows[0].gender
    );
  }

  static async getById(userId) {
    const query = 'SELECT u.user_id, u.username, u.role, u.fullName, u.birthday, u.gender FROM Users u WHERE user_id = $1';
    const values = [userId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return {
        user_id: result.rows[0].user_id,
        username: result.rows[0].username,
        role: result.rows[0].role,
        fullName: result.rows[0].fullname,
        birthday: result.rows[0].birthday,
        gender: result.rows[0].gender
      };
    }
    return null;
  }
  

  static async getByUsername(username) {
    const query = 'SELECT * FROM Users WHERE "username" = $1';
    const values = [username];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new User(
        result.rows[0].user_id,
        result.rows[0].username,
        result.rows[0].password,
        result.rows[0].role,
        result.rows[0].fullName,
        result.rows[0].birthday,
        result.rows[0].gender
      );
    }
    return null;
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async update(userId, user) {
    const query = `UPDATE Users SET "fullName" = $1, "birthday" = $2, "gender" = $3 WHERE "user_id" = $4
                    RETURNING "user_id", "username", "password", "role", "fullname", "birthday", "gender"`;
    const values = [user.fullName, user.birthday, user.gender, userId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new User(
        result.rows[0].user_id,
        result.rows[0].username,
        result.rows[0].password,
        result.rows[0].role,
        result.rows[0].fullName,
        result.rows[0].birthday,
        result.rows[0].gender
      );
    }
    return null;
  }

  static async delete(userId) {
    const query = 'DELETE FROM Users WHERE "user_id" = $1';
    const values = [userId];
    await db.query(query, values);
  }

  static async getAll() {
    const query = 'SELECT * FROM Users';
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = User;