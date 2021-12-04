-- FUNCTION: public.tr_fc_eggsbatchlines_update()

-- DROP FUNCTION public.tr_fc_eggsbatchlines_update();

CREATE FUNCTION public.tr_fc_eggsbatchlines_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantityDiference integer;
	v_quantity integer;
BEGIN
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	
	v_quantityDiference = NEW."quantity" - OLD."quantity";
	 
	NEW."quantityAvailable" = OLD."quantityAvailable" + v_quantityDiference;
	
	SELECT "EggsBatches"."quantity"
	  INTO v_quantity
	  FROM "EggsBatches"
	 WHERE "EggsBatches"."id" = NEW."EggsBatchId";
	 
	UPDATE "EggsBatches"
	   SET "quantity" = (v_quantity + v_quantityDiference)
	 WHERE "EggsBatches"."id" = NEW."EggsBatchId";
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchlines_update()
    OWNER TO postgres;
