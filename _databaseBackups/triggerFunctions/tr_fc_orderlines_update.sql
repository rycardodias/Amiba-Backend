-- FUNCTION: public.tr_fc_orderlines_update()

-- DROP FUNCTION public.tr_fc_orderlines_update();

CREATE OR REPLACE FUNCTION public.tr_fc_orderlines_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantityAvailable_animalProducts integer;
	v_quantityAvailable_EggsBatchProducts integer;
	v_unit varchar(30);
BEGIN
	IF (NEW."AnimalProductId" IS NOT NULL AND NEW."EggsBatchProductId" IS NOT NULL) THEN
		RAISE EXCEPTION 'Record cannot have AnimalProductId and EggsBatchProductId fields';
	END IF;
		
	
	UPDATE "Orders"  SET "total" = "total" + (NEW."total" - OLD."total"),
	   	   "totalVAT" =  "totalVAT" + (NEW."totalVAT" - OLD."totalVAT"),
		   "updatedAt" = now()
	 WHERE "Orders"."id" = NEW."OrderId";

	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_orderlines_update()
    OWNER TO postgres;
