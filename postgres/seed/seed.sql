
BEGIN TRANSACTION;

INSERT INTO users ( name, email, entries, joined, age, pet ) values ('Miha', 'miha@gmail.com', 4, '2018-01-01', 34, 'Cat');
INSERT INTO login ( hash, email) values ('$2a$10$YCxxLdUhMO15WINJI8F.Cu/i8Jo5RDjddq/VE618bBQDdvTuAi1GW', 'miha@gmail.com');
COMMIT;