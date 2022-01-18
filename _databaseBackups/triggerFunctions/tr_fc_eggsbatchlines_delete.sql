-- FUNCTION: public.tr_fc_eggsbatchlines_delete()

-- DROP FUNCTION public.tr_fc_eggsbatchlines_delete();

CREATE OR REPLACE FUNCTION  public.tr_fc_eggsbatchlines_delete()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN	 
	UPDATE "EggsBatches" SET "quantity" = "quantity" - OLD."quantity",
	   	   "quantityAvailable" = "quantityAvailable" - OLD."quantity"
	 WHERE "EggsBatches"."id" = OLD."EggsBatchId";
	
	RETURN OLD;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchlines_delete()
    OWNER TO postgres;
