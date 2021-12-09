-- FUNCTION: public.tr_fc_eggsbatchlines_update()

-- DROP FUNCTION public.tr_fc_eggsbatchlines_update();

CREATE OR REPLACE FUNCTION public.tr_fc_eggsbatchlines_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantityAvailable integer;
BEGIN
	IF (NEW."quantity" < 1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	
	SELECT "quantityAvailable"
	  INTO v_quantityAvailable
	  FROM "EggsBatches"
	 WHERE "EggsBatches"."id" = OLD."EggsBatchId";

	IF (v_quantityAvailable + (NEW."quantity" - OLD."quantity") < 0) THEN
		RAISE EXCEPTION 'quantity to remove is greater than quantityAvailable';
	END IF;
	 
	 UPDATE "EggsBatches" SET "quantity" = "quantity" + (NEW."quantity" - OLD."quantity"),
			"quantityAvailable" = "quantityAvailable" + (NEW."quantity" - OLD."quantity"),
			"updatedAt" = now()
	  WHERE "EggsBatches"."id" = NEW."EggsBatchId";
		
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchlines_update()
    OWNER TO postgres;
