-- FUNCTION: public.tr_fc_certifications_create_update()

-- DROP FUNCTION public.tr_fc_certifications_create_update();

CREATE FUNCTION public.tr_fc_certifications_create_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	IF(NEW."initialDate">=NEW."finalDate") THEN
		RAISE EXCEPTION 'Certifications.createdAt cannot be changed';
	END IF;
	
	RETURN NEW;
END
$BODY$;

ALTER FUNCTION public.tr_fc_certifications_create_update()
    OWNER TO postgres;
