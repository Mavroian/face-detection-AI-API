
BEGIN TRANSACTION;

INSERT INTO users ( name, email, entries, joined ) values('Miha', 'miha@gmail.com', 5, '2018-01-01');
INSERT INTO login ( hash, email) values ('$2a$10$YCxxLdUhMO15WINJI8F.Cu/i8Jo5RDjddq/VE618bBQDdvTuAi1GW', 'miha@gmail.com');
COMMIT;