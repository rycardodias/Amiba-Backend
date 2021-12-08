DECLARE
	v_quantity_EggsBatch integer;
	v_quantity_EggsBatchProducts integer;
	v_unit varchar(50);
BEGIN
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'quantity must be greater than 0';
	END IF;
	
	IF((NEW."quantity"<>OLD."quantity") AND (NEW."quantityAvailable"<>OLD."quantityAvailable")) THEN
		RAISE EXCEPTION 'Cannot change bought quantities at same time';
	END IF;
	
	SELECT "unit"
	  INTO v_unit
	  FROM "Products"
	 WHERE "id" = NEW."ProductId";
	 
	IF(v_unit = 'DOZEN' AND (NEW."quantity"%12)<>0) THEN
		RAISE EXCEPTION 'Quantity must be divided by 12';
	END IF;
	
	IF(v_unit = 'HALFDOZEN' AND (NEW."quantity"%6)<>0) THEN
		RAISE EXCEPTION 'Quantity must be divided by 6';
	END IF;
	
	IF(NEW."quantityAvailable"<>OLD."quantityAvailable") THEN
		IF (NEW."quantityAvailable" > NEW."quantity") THEN
			RAISE EXCEPTION 'quantityAvailable cannot be greater than quantity';
		END IF;
		IF (NEW."quantityAvailable" < 0) THEN
			RAISE EXCEPTION 'quantityAvailable cannot be lower than 0';
		END IF;
		
		IF(v_unit = 'DOZEN' AND (NEW."quantityAvailable"%12)<>0) THEN
			RAISE EXCEPTION 'Quantity must be divided by 12';
		END IF;
		IF(v_unit = 'HALFDOZEN' AND (NEW."quantityAvailable"%6)<>0) THEN
			RAISE EXCEPTION 'Quantity must be divided by 6';
		END IF;
		
		UPDATE "EggsBatches"
		   SET "quantityAvailable" = "quantityAvailable" + (NEW."quantityAvailable" - OLD."quantityAvailable")
		 WHERE "id" = NEW."EggsBatchId";
		 
		RETURN NEW;
	END IF;
	
	-- aumenta quantidade
	IF((NEW."quantity" - OLD."quantity")>0) THEN
		SELECT COALESCE(SUM("quantity"),0)
	  	  INTO v_quantity_EggsBatch
	  	  FROM public."EggsBatches"
	 	 WHERE "id" = NEW."EggsBatchId";
	 
		SELECT COALESCE(SUM("quantity"),0)
	 	  INTO v_quantity_EggsBatchProducts
	  	  FROM public."EggsBatchProducts"
		 WHERE "EggsBatchId" = NEW."EggsBatchId";
	 
		IF((v_quantity_EggsBatch - v_quantity_EggsBatchProducts) < (NEW."quantity" - OLD."quantity")) THEN
			RAISE EXCEPTION 'Invalid quantity available for use';
		END IF;	
	END IF;
	
	NEW."quantityAvailable" = OLD."quantityAvailable" + (NEW."quantity" - OLD."quantity");
	
	IF (NEW."quantityAvailable" <0) THEN
		RAISE EXCEPTION 'quantityAvailable must be greater than 0';
	END IF;

	IF (NEW."quantityAvailable" > NEW."quantity") THEN
		RAISE EXCEPTION 'quantityAvailable cannot be greater than quantity';
	END IF;
	
	RETURN NEW;

END;
