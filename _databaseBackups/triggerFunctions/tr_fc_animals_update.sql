-- FUNCTION: public.tr_fc_animals_update()

-- DROP FUNCTION public.tr_fc_animals_update();

CREATE FUNCTION public.tr_fc_animals_update()
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

ALTER FUNCTION public.tr_fc_animals_update()
    OWNER TO postgres;