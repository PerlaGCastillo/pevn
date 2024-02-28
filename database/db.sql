CREATE DATABASE pevn;

-- \c pevn

CREATE TABLE professor (
    id_p SERIAL PRIMARY KEY,
    p_nombre TEXT NOT NULL, 
    p_email TEXT NOT NULL UNIQUE, 
    p_password TEXT NOT NULL
);

CREATE TABLE student (
    id_s SERIAL PRIMARY KEY,
    s_nombre TEXT NOT NULL, 
    s_email TEXT NOT NULL UNIQUE, 
    s_password TEXT NOT NULL
);

CREATE TABLE course (
    id_c SERIAL PRIMARY KEY,
    id_p INTEGER REFERENCES professor(id_p), 
    c_name TEXT NOT NULL, 
    c_description TEXT NOT NULL
);


CREATE TABLE stucentvscourse(
    s_id INTEGER NOT NULL REFERENCES student(id_s),
    c_id INTEGER NOT NULL REFERENCES course(id_c)
);

CREATE TABLE assignment(
    id_a SERIAL PRIMARY KEY,
    c_ic INTEGER NOT NULL REFERENCES course(id_c),
    a_name TEXT NOT NULL, 
    a_description TEXT,
    a_file TEXT NOT NULL
);

create TABLE delivery(
    id_d SERIAL PRIMARY KEY,
    a_id INTEGER REFERENCES assignment(id_a),
    s_id INTEGER REFERENCES student(id_s),
    d_file TEXT NOT NULL,
    d_filename TEXT
);

-- \dt