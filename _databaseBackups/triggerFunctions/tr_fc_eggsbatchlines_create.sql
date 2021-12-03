-- FUNCTION: public.tr_fc_eggsbatchlines_create()

-- DROP FUNCTION public.tr_fc_eggsbatchlines_create();

CREATE FUNCTION public.tr_fc_eggsbatchlines_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	 
	NEW."quantityAvailable" = NEW."quantity";
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchlines_create()
    OWNER TO postgres;
