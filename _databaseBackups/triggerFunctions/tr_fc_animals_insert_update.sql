-- FUNCTION: public.tr_fc_animals_insert_update()

-- DROP FUNCTION public.tr_fc_animals_insert_update();

CREATE OR REPLACE FUNCTION  public.tr_fc_animals_insert_update()
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
	IF (NEW."slaughterDate" < NEW."birthDate") THEN
		RAISE EXCEPTION 'slaughterDate cannot be greater than birthDate1';
	END IF;
	RETURN NEW;

END;
$BODY$;

ALTER FUNCTION public.tr_fc_animals_insert_update()
    OWNER TO postgres;
