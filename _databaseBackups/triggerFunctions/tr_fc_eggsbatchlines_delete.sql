-- FUNCTION: public.tr_fc_eggsbatchlines_delete()

-- DROP FUNCTION public.tr_fc_eggsbatchlines_delete();

CREATE FUNCTION public.tr_fc_eggsbatchlines_delete()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantity integer;
BEGIN
	IF (OLD."quantity" <> OLD."quantityAvailable") THEN
		RAISE EXCEPTION 'quantity <> quantityAvailable';
	END IF;
	
	SELECT "EggsBatches"."quantity"
	  INTO v_quantity
	  FROM "EggsBatches"
	 WHERE "EggsBatches"."id" = OLD."EggsBatchId";
	 
	UPDATE "EggsBatches"
	   SET "quantity" = (v_quantity - OLD."quantity")
	 WHERE "EggsBatches"."id" = OLD."EggsBatchId";
	
	RETURN OLD;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchlines_delete()
    OWNER TO postgres;
