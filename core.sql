-- CREATE TABLE history_audit (
--     id SERIAL PRIMARY KEY,
--     tb_n varchar ,
--     tb_op varchar,
--     o_values jsonb ,
--     n_values jsonb,
--     u_session varchar,
--     action_date timestamp without time zone default CURRENT_TIMESTAMP not null
-- );
--
-- delete from test_table where id = 1
--
-- insert into test_table (table_name, name, second, person_cread) values ('opg', 'asd', 'dasd', 'goasd')
--
-- update test_table set table_name = 'dasd' where id = 7
--
-- CREATE OR REPLACE FUNCTION log_history_audit()
--     RETURNS TRIGGER AS
-- $$
-- DECLARE
--    old_values jsonb := '{}';
--    new_values jsonb := '{}';
--    col_name text;
--    old_val text;
--    new_val text;
-- BEGIN
--
--  FOR col_name IN SELECT column_name
--                        FROM information_schema.columns
--                        WHERE table_name = TG_TABLE_NAME
--                        AND table_schema = TG_TABLE_SCHEMA
--     LOOP
--         -- Получение значений старой и новой записи в виде текста
--         EXECUTE format('SELECT ($1).%I::text', col_name) INTO old_val USING OLD;
--         EXECUTE format('SELECT ($1).%I::text', col_name) INTO new_val USING NEW;
--
--         -- Сравнение значений в старой и новой записи
--         IF old_val IS DISTINCT FROM new_val THEN
--             old_values := jsonb_set(old_values, ARRAY[col_name], to_jsonb(old_val));
--             new_values := jsonb_set(new_values, ARRAY[col_name], to_jsonb(new_val));
--         END IF;
--     END LOOP;
--
--     -- Вставка данных в таблицу history_audit
--     INSERT INTO history_audit (tb_n, tb_op, o_values, n_values, u_session, action_date)
--     VALUES (TG_TABLE_NAME, TG_OP, old_values, new_values, user,  CURRENT_TIMESTAMP);
--
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;
--
--
--
-- CREATE TRIGGER tr_test
--     AFTER INSERT OR UPDATE or DELETE
--     ON test_table
--     FOR EACH ROW
-- EXECUTE FUNCTION log_history_audit();
--
--
--
--
-- explain analyze select * from accidents order by accidents.eva_street_id


create function author_name(last_name text, first_name text, middle_name text) returns text
language sql immutable
return last_name || ' ' ||
       left(first_name, 1) || '.' ||
       case when middle_name != '' -- подразумевает NOT NULL
           then ' ' || left(middle_name, 1) || '.'
           else ''
       end;

create function book_name(book_id integer, title text) returns text
    language sql
    stable
return (select title || '. ' || string_agg(
        author_name(a.last_name, a.first_name, a.middle_name), ', '
        ORDER BY ash.seq_num
    )
        FROM authors a
                 JOIN authorship ash ON a.author_id = ash.author_id
        WHERE ash.book_id = book_name.book_id);

create or replace  view  authors_v AS
    SELECT a.author_id,
       author_name(a.last_name, a.first_name, a.middle_name) AS display_name
FROM   authors a
ORDER BY display_name;

create function shorten(s text, max_len integer default 45, suffix text default  '...') returns text as $$
    declare
        suffix_len integer := length(suffix);
    begin
        return case when length(s) > max_len
            then left(s, max_len - suffix_len) || suffix
            else  s
        end;
    end
    $$ immutable language plpgsql;

create procedure authors_dedup()
language  sql
begin atomic
delete from authors
where author_id in (
    select  author_id
    from (
        select author_id, row_number() over (partition by first_name, last_name, middle_name) as rn
        order by  author_id
         ) t
    where t.rn > 1);
end;


create function add_author(last_name text, first_name text, middle_name text) returns integer
as $$
    declare
        author_id integer;
    begin
       insert into authors(last_name, first_name, middle_name) values (last_name, first_name, middle_name) returning authors.author_id into author_id;
       return author_id;
    end;
   $$ volatile language plpgsql;

CREATE OR REPLACE VIEW catalog_v AS
SELECT b.book_id,
       book_name(b.book_id, b.title) AS display_name
FROM   books b
ORDER BY display_name;


create function add_book_for_authors(title text, authors integer[]) returns integer
as $$
    declare
        book_id integer;
        id integer;
        seq_num integer := 1;
    begin
        insert into books(title) values(title) returning books.book_id into book_id;
        foreach id in array authors loop
            insert into authorship(book_id, author_id, seq_num) values (book_id, id, seq_num);
                seq_num := seq_num + 1;
        end loop;
        return book_id;
    end;
   $$ volatile language plpgsql;

call authors_dedup();

SELECT shorten(
    'Путешествия в некоторые удаленные страны мира в четырех частях: сочинение Лемюэля Гулливера, сначала хирурга, а затем капитана нескольких кораблей'
);

select add_author('asd', 'asd', 'asd')

DO $$
DECLARE
    a integer[] := ARRAY[
        ARRAY[ 10, 20, 30],
        ARRAY[100,200,300]
    ];
    x integer;
BEGIN
    FOREACH x IN ARRAY a LOOP
        RAISE NOTICE '%', x;
    END LOOP;
END
$$ LANGUAGE plpgsql;


CREATE TABLE pilots
(
pilot_name text,
schedule integer[]
);

INSERT INTO pilots
VALUES ( 'Ivan', '{ 1, 3, 5, 6, 7 }'::integer[] ),
( 'Petr', '{ 1, 2, 5, 7 }'::integer[] ),
( 'Pavel', '{ 2, 5 }'::integer[] ),
( 'Boris', '{ 3, 5, 6 }'::integer[] );


-- create function author_name(last_name text, first_name text, middle_name text) returns text
-- language sql immutable
-- return last_name || ' ' ||
--        left(first_name, 1) || '.' ||
--        case when middle_name != '' -- подразумевает NOT NULL
--            then ' ' || left(middle_name, 1) || '.'
--            else ''
--        end;
--
-- create function book_name(book_id integer, title text) returns text
--     language sql
--     stable
-- return (select title || '. ' || string_agg(
--         author_name(a.last_name, a.first_name, a.middle_name), ', '
--         ORDER BY ash.seq_num
--     )
--         FROM authors a
--                  JOIN authorship ash ON a.author_id = ash.author_id
--         WHERE ash.book_id = book_name.book_id);
--
-- create or replace  view  authors_v AS
--     SELECT a.author_id,
--        author_name(a.last_name, a.first_name, a.middle_name) AS display_name
-- FROM   authors a
-- ORDER BY display_name;
--
-- create function shorten(s text, max_len integer default 45, suffix text default  '...') returns text as $$
--     declare
--         suffix_len integer := length(suffix);
--     begin
--         return case when length(s) > max_len
--             then left(s, max_len - suffix_len) || suffix
--             else  s
--         end;
--     end
--     $$ immutable language plpgsql;
--
-- create procedure authors_dedup()
-- language  sql
-- begin atomic
-- delete from authors
-- where author_id in (
--     select  author_id
--     from (
--         select author_id, row_number() over (partition by first_name, last_name, middle_name) as rn
--         order by  author_id
--          ) t
--     where t.rn > 1);
-- end;
--
--
-- create function add_author(last_name text, first_name text, middle_name text) returns integer
-- as $$
--     declare
--         author_id integer;
--     begin
--        insert into authors(last_name, first_name, middle_name) values (last_name, first_name, middle_name) returning authors.author_id into author_id;
--        return author_id;
--     end;
--    $$ volatile language plpgsql;
--
-- CREATE OR REPLACE VIEW catalog_v AS
-- SELECT b.book_id,
--        book_name(b.book_id, b.title) AS display_name
-- FROM   books b
-- ORDER BY display_name;
--
--
-- create function add_book_for_authors(title text, authors integer[]) returns integer
-- as $$
--     declare
--         book_id integer;
--         id integer;
--         seq_num integer := 1;
--     begin
--         insert into books(title) values(title) returning books.book_id into book_id;
--         foreach id in array authors loop
--             insert into authorship(book_id, author_id, seq_num) values (book_id, id, seq_num);
--                 seq_num := seq_num + 1;
--         end loop;
--         return book_id;
--     end;
--    $$ volatile language plpgsql;
--
-- call authors_dedup();
--
-- SELECT shorten(
--     'Путешествия в некоторые удаленные страны мира в четырех частях: сочинение Лемюэля Гулливера, сначала хирурга, а затем капитана нескольких кораблей'
-- );
--
-- select add_author('asd', 'asd', 'asd')
--
-- DO $$
-- DECLARE
--     a integer[] := ARRAY[
--         ARRAY[ 10, 20, 30],
--         ARRAY[100,200,300]
--     ];
--     x integer;
-- BEGIN
--     FOREACH x IN ARRAY a LOOP
--         RAISE NOTICE '%', x;
--     END LOOP;
-- END
-- $$ LANGUAGE plpgsql;
--
--
-- CREATE TABLE pilots
-- (
-- pilot_name text,
-- schedule integer[]
-- );
--
-- INSERT INTO pilots
-- VALUES ( 'Ivan', '{ 1, 3, 5, 6, 7 }'::integer[] ),
-- ( 'Petr', '{ 1, 2, 5, 7 }'::integer[] ),
-- ( 'Pavel', '{ 2, 5 }'::integer[] ),
-- ( 'Boris', '{ 3, 5, 6 }'::integer[] );
--
-- select txid_current();
--
--
-- DO $$
-- BEGIN
--   FOR i IN 1..10 LOOP
--     EXECUTE 'SELECT avg(amount) FROM ticket_flights';
--   END LOOP;
-- END;
-- $$ LANGUAGE plpgsql;
--
--
-- DO $$
-- BEGIN
--   FOR i IN 1..10 LOOP
--     PERFORM avg(amount) FROMticket_flights;
--   END LOOP;
-- END;
-- $$ LANGUAGE plpgsql;
--
--
-- DO $$
-- BEGIN
--   FOR i IN 1..100000 LOOP
--     EXECUTE 'SELECT * FROM bookings WHERE book_ref = ''0824C5''';
--   END LOOP;
-- END;
-- $$ LANGUAGE plpgsql;
--
-- DO $$
-- BEGIN
--   FOR i IN 1..100000 LOOP
--     PERFORM * FROM bookings WHERE book_ref = '0824C5';
--   END LOOP;
-- END;
-- $$ LANGUAGE plpgsql;
--
--
-- explain select * from flights;
--
--
-- SELECT relpages, current_setting('seq_page_cost'),
--   relpages * current_setting('seq_page_cost')::real AS total
-- FROM pg_class WHERE relname='flights';
--
-- SELECT reltuples, current_setting('cpu_tuple_cost'),
--   reltuples * current_setting('cpu_tuple_cost')::real AS total
-- FROM pg_class WHERE relname='flights';
--
-- EXPLAIN SELECT count(*) FROM seats;
--
-- SELECT reltuples, current_setting('cpu_operator_cost'),
--   reltuples * current_setting('cpu_operator_cost')::real AS total
-- FROM pg_class WHERE relname='seats';
--
-- EXPLAIN SELECT count(*) FROM bookings;
--
--
-- EXPLAIN (analyze, costs off) SELECT count(*) FROM bookings;
--
-- SHOW max_parallel_workers_per_gather;
--
-- SET max_parallel_workers_per_gather = 5;
--
-- ALTER TABLE bookings SET (parallel_workers = 4);
--
-- EXPLAIN (analyze, costs off) SELECT count(*) FROM bookings;
--
-- ALTER TABLE bookings RESET (parallel_workers);
--
-- RESET max_parallel_workers_per_gather;
--
-- EXPLAIN select avg(amount) from ticket_flights;
--
-- -- explain with tf as MATERIALIZED (
-- --   SELECT * FROM ticket_flights)
-- --
-- -- select avg(amount) from tf
--
-- EXPLAIN WITH x AS MATERIALIZED (
--   SELECT avg(amount) FROM ticket_flights
-- )
-- SELECT * FROM x;
--
-- SET force_parallel_mode = on;
--
-- EXPLAIN SELECT * FROM bookings WHERE book_ref = 'CDE08B';
--
-- EXPLAIN SELECT * FROM bookings
-- WHERE book_ref = 'CDE08B' AND total_amount > 1000;
--
--
-- EXPLAIN SELECT sum(total_amount)
-- FROM bookings WHERE book_ref < '400000';
--
-- EXPLAIN (analyze, costs off, timing off, summary off)
-- SELECT book_ref FROM bookings WHERE book_ref <= '100000';
--
-- EXPLAIN (analyze, buffers, costs off, summary off)
-- SELECT ticket_no, book_ref FROM tickets WHERE ticket_no > '0005435990286';
--
--  CREATE UNIQUE INDEX ON tickets (ticket_no) INCLUDE (book_ref);
--
-- EXPLAIN (analyze, buffers, costs off, summary off)
-- SELECT ticket_no, book_ref FROM tickets WHERE ticket_no > '0005435990286';
--
-- explain select total_amount from bookings order by total_amount desc  limit 1;
--
-- CREATE INDEX ON bookings(total_amount);
--
-- select * from pg_indexes
-- where tablename = 'bookings';
--
--
-- create index dep_arr on flights(departure_airport, arrival_airport);
--
-- EXPLAIN SELECT * FROM flights ORDER BY departure_airport, arrival_airport;
--
--
-- CREATE INDEX ON bookings(book_date);
-- CREATE INDEX ON bookings(total_amount);
--
-- EXPLAIN SELECT * FROM bookings WHERE total_amount < 10000;
--
-- EXPLAIN (costs off)
--   SELECT * FROM bookings
--   WHERE total_amount < 10000 OR total_amount > 100000;
--
-- EXPLAIN (costs off)
--   SELECT * FROM bookings
--   WHERE total_amount < 10000
--      OR book_date = bookings.now() - INTERVAL '1 day';
--

