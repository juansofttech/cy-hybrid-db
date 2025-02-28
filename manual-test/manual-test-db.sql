
--  connecting to the PostgreSQL server,
psql -U adm -h 127.0.0.1 -d my-cy-database --no-password

-- grant the necessary permissions to the adm user:
GRANT ALL PRIVILEGES ON SCHEMA public TO adm;