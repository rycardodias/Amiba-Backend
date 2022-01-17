-- FUNCTION: public.tr_fc_carts_insert()

-- DROP FUNCTION public.tr_fc_carts_insert();

CREATE OR REPLACE FUNCTION  public.tr_fc_carts_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantityAvailable_AnimalProducts integer;
	v_quantityAvailable_EggsBatchProducts integer;
	v_quantity_cart integer;
	v_unit varchar(50);
BEGIN
	IF (NEW."AnimalProductId" IS NOT NULL AND NEW."EggsBatchProductId" IS NOT NULL) THEN
		RAISE EXCEPTION 'Record cannot have AnimalProductId and EggsBatchProductId fields';
	END IF;
	
	-- ver se já existe outra linha com o mesmo artigo
	SELECT quantity
	  INTO v_quantity_cart
	  FROM public."Carts"
	 WHERE "Carts"."UserId" = NEW."UserId"
	   AND ("Carts"."AnimalProductId" = NEW."AnimalProductId"
		 	OR "Carts"."EggsBatchProductId" = NEW."EggsBatchProductId");
	
	IF(v_quantity_cart > 0) THEN	
		UPDATE public."Carts" SET "quantity" = "quantity" + NEW."quantity" 
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
