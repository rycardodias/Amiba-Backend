-- FUNCTION: public.tr_fc_animals_insert()

-- DROP FUNCTION public.tr_fc_animals_insert();

CREATE FUNCTION public.tr_fc_animals_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	
BEGIN
	IF (NEW."weight" <1) THEN
		RAISE EXCEPTION 'weight cannot be lower than 1';
	END IF;
	
	RETURN NEW;

END;
$BODY$;

ALTER FUNCTION public.tr_fc_animals_insert()
    OWNER TO postgres;
