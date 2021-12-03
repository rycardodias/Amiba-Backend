-- FUNCTION: public.tr_fc_carts_insert()

-- DROP FUNCTION public.tr_fc_carts_insert();

CREATE FUNCTION public.tr_fc_carts_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_newQuantityAvailable integer default 0;
	v_quantity integer default 0;
	v_existing_quantity integer default 0;
BEGIN
	IF (NEW."AnimalProductId" IS NOT NULL AND NEW."EggsBatchProductId" IS NOT NULL) THEN
		RAISE EXCEPTION 'Record cannot have AnimalProductId and EggsBatchProductId fields';
	END IF;
	
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	
	SELECT quantity
	  INTO v_existing_quantity
	  FROM public."Carts"
	 WHERE "Carts"."UserId" = NEW."UserId"
	   AND ("Carts"."AnimalProductId" = NEW."AnimalProductId"
		 	OR "Carts"."EggsBatchProductId" = NEW."EggsBatchProductId");
	
	IF(v_existing_quantity IS NOT NULL) THEN	
		UPDATE public."Carts"
		   SET  "quantity" = (v_existing_quantity + NEW."quantity")
		 WHERE "Carts"."UserId" = NEW."UserId"
		   AND ("Carts"."AnimalProductId" = NEW."AnimalProductId"
			   OR "Carts"."EggsBatchProductId" = NEW."EggsBatchProductId");
		RETURN OLD;
	END IF;
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_carts_insert()
    OWNER TO postgres;