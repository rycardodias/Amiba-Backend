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
