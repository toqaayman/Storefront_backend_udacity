import client from '../database/db'
import bcrypt from 'bcrypt';
import User from '../types/user.type'
import config from '../database/config'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}
class UsersModel {
  index = async(): Promise<User[]> => {
    try {
      const connection = await client.connect();
      const sql = 'SELECT id, firstName, lastName FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Failed to get the users with the following error: ${error}`
      );
    }
  }

  select = async(id: number): Promise<User> => {
    try {
      const connection = await client.connect();
      const sql = 'SELECT id, firstName, lastName FROM users WHERE id=($1)'
      const result = await connection.query(sql, [id]);
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `the users could not be retrieved due to the following error: ${error}`
      )
    }
  }

  create = async(
    u: User
  ): Promise<User> => {
    try {
      const connection = await client.connect()
      const sql =
        'INSERT INTO users (firstName,lastName,password) VALUES($1, $2, $3) RETURNING id, firstName, lastName ';
        const result = await connection.query(sql, [
          u.firstName,
          u.lastName,
          hashPassword(u.password as string),
        ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `the users could not be added due to the following error: ${error}`
      )
    }
  }

  update = async(
    u: User
  ): Promise<User> => {
    try {
      const connection = await client.connect();
      const sql =
        'UPDATE users SET firstName=($2), lastName=($3), password=($4)  WHERE id=($1) RETURNING id, firstName, lastName';
        const result = await connection.query(sql, [
        u.id,
        u.firstName,
        u.lastName,
        hashPassword(u.password as string)
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `the users could not be updated due to the following error: ${error}`
      );
    }
  }

  delete = async(id: number): Promise<User> => {
    try {
      const connection = await client.connect();
      const sql =
        'DELETE FROM users WHERE id=($1) RETURNING id, firstName, lastName';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `the users could not be deleted due to the following error: ${error}`
      );
    }
  }
}

export default UsersModel