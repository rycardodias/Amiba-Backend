-- Table: public.Logs

-- DROP TABLE public."Logs";

CREATE TABLE IF NOT EXISTS public."Logs"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "table" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    operation character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "values" text COLLATE pg_catalog."default",
    date timestamp with time zone NOT NULL DEFAULT now(),
    "user" character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT "current_user"(),
    CONSTRAINT "Logs_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Logs"
    OWNER to postgres;
    
-- FUNCTION: public.tr_fc_logs()

-- DROP FUNCTION public.tr_fc_logs();

CREATE OR REPLACE FUNCTION public.tr_fc_logs()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO "Logs" ("table", "operation", "values")
		     VALUES (TG_RELNAME,TG_OP,'NEW:'||NEW::TEXT);
		RETURN NEW;
	ELSIF TG_OP = 'UPDATE' THEN
		INSERT INTO "Logs" ("table", "operation", "values")
		     VALUES (TG_RELNAME,TG_OP,'OLD:'||OLD::TEXT||CHR(13)||CHR(10)||'NEW:'||NEW::TEXT);
		RETURN NEW;
	ELSIF TG_OP = 'DELETE' THEN
		INSERT INTO "Logs" ("table", "operation", "values")
		     VALUES (TG_RELNAME,TG_OP,'OLD:'||OLD::TEXT||CHR(13)||CHR(10));

		RETURN OLD;
	END IF;

END;
$BODY$;

ALTER FUNCTION public.tr_fc_logs()
    OWNER TO postgres;

select 'CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "' || tablename ||
 '"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();'
 from pg_tables where schemaname = 'public';

 -- CUIDADO NAO DEIXAR LOG ENTRAR EM LOOP COM TRIGGER NOS LOGS

CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "OrderLines"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "Carts"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "Users"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "Organizations"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "Orders"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "EggsBatches"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "Products"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "EggsBatchProducts"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "OrderHistory"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "Explorations"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "Certifications"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "Animals"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();
CREATE TRIGGER tr_logs_general AFTER INSERT OR UPDATE OR DELETE ON "AnimalProducts"  FOR EACH ROW EXECUTE PROCEDURE tr_fc_logs();