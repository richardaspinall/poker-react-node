import MySql from './MySql';

export default new MySql(process.env.DB_DATABASE || '');
