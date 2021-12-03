-- FUNCTION: public.tr_fc_explorations_update()

-- DROP FUNCTION public.tr_fc_explorations_update();

CREATE FUNCTION public.tr_fc_explorations_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	
BEGIN
	IF(OLD."id"<>NEW."id") THEN
		RAISE EXCEPTION 'Explorations.id cannot be changed';
	END IF;
	IF(OLD."createdAt"<>NEW."createdAt") THEN
		RAISE EXCEPTION 'Explorations.createdAt cannot be changed';
	END IF;
	IF(OLD."OrganizationId"<>NEW."OrganizationId") THEN
		RAISE EXCEPTION 'Explorations.OrganizationId cannot be changed';
	END IF;
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_explorations_update()
    OWNER TO postgres;