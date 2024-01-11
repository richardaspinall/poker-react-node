CREATE TABLE user
(
  id INT unsigned NOT NULL AUTO_INCREMENT,     
  username VARCHAR(20) NOT NULL UNIQUE,                         
  password CHAR(60) NOT NULL,                       
  PRIMARY KEY (id)                             
);

CREATE TABLE pokertable
( 
  id INT unsigned NOT NULL AUTO_INCREMENT,  
  name VARCHAR(20) NOT NULL UNIQUE, 
  data JSON,                          
  PRIMARY KEY (id) 
);