CREATE TABLE
    task (id SERIAL PRIMARY KEY, description TEXT NOT NULL);

INSERT INTO
    task (description)
VALUES
    ('Learn Node.js');

INSERT INTO
    task (description)
VALUES
    ('Build a Todo app');