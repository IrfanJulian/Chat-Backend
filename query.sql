CREATE TABLE chat(id SERIAL PRIMARY KEY, sender TEXT, reciever TEXT, message TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, photo TEXT DEFAULT '');
CREATE TABLE status(satusid SERIAL PRIMARY KEY, statusname TEXT, statusdescription TEXT);
CREATE TABLE friend(userid SERIAL PRIMARY KEY, friendid INTEGER);