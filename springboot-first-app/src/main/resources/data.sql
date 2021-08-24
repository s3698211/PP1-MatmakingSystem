INSERT INTO roles(name) Select('ROLE_ADMIN') Where not exists(select * from roles where name = 'ROLE_ADMIN');
INSERT INTO roles(name) Select('ROLE_EMPLOYER') Where not exists(select * from roles where name = 'ROLE_EMPLOYER');
INSERT INTO roles(name) Select ('ROLE_JOB_SEEKER')  Where not exists(select * from roles where name = 'ROLE_JOB_SEEKER');
