-- FUNCTION: public.tr_fc_orderlines_delete()

-- DROP FUNCTION public.tr_fc_orderlines_delete();

CREATE FUNCTION public.tr_fc_orderlines_delete()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	IF(OLD."AnimalProductId" IS NOT NULL) THEN
		UPDATE "AnimalProducts" 
		   SET "quantityAvailable" = "quantityAvailable" + OLD."quantity"
		 WHERE "id" = OLD."AnimalProductId";
	ELSIF(OLD."EggsBatchProductId" IS NOT NULL) THEN
		UPDATE "EggsBatchProducts" 
		   SET "quantityAvailable" = "quantityAvailable" + OLD."quantity"
		 WHERE "id" = OLD."EggsBatchProductId";
	END IF;
	
	UPDATE "Orders"
	   SET "total" = "total" - OLD."total",
	   	   "totalVAT" =  "totalVAT" - OLD."totalVAT"
	 WHERE "Orders"."id" = OLD."OrderId";

	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_orderlines_delete()
    OWNER TO postgres;
