-- FUNCTION: public.tr_fc_eggsbatchlines_insert()

-- DROP FUNCTION public.tr_fc_eggsbatchlines_insert();

CREATE FUNCTION public.tr_fc_eggsbatchlines_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	 
	UPDATE "EggsBatches"
	   SET "quantity" = quantity + NEW."quantity",
	   	   "quantityAvailable" = quantityAvailable + NEW."quantity"
	 WHERE "EggsBatches"."id" = NEW."EggsBatchId";
	
	RETURN NEW;

END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchlines_insert()
    OWNER TO postgres;
