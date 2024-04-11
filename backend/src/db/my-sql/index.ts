import { MySql } from './MySql';

const MySqLInstance = new MySql(process.env.DB_DATABASE || '');
export { MySqLInstance };
