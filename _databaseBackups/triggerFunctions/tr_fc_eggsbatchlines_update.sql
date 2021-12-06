DECLARE
	v_quantityDiference integer;
	v_quantity integer;
	v_quantityAvailableDiference integer;
	v_quantityAvailable integer;
BEGIN
	IF (NEW."quantity" < 1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	IF (NEW."quantityAvailable" < 0) THEN
		RAISE EXCEPTION 'QuantityAvailable cannot be lower than 0';
	END IF;
	IF ((NEW."quantity" <> OLD."quantity") AND (NEW."quantityAvailable" <> OLD."quantityAvailable")) THEN
		RAISE EXCEPTION 'Quantity & QuantityAvailable cannot be changed same time!';
	END IF;
	
	IF(NEW."quantity" <> OLD."quantity") THEN
		NEW."quantityAvailable" = OLD."quantityAvailable" + (NEW."quantity" - OLD."quantity");
	END IF;
	
	IF (NEW."quantity" < NEW."quantityAvailable") THEN
		RAISE EXCEPTION 'QuantityAvailable cannot be lower than quantity';
	END IF;
	 
	 UPDATE "EggsBatches"
		SET "quantity" = "quantity" + (NEW."quantity" - OLD."quantity"),
			"quantityAvailable" = "quantityAvailable" + (NEW."quantityAvailable" - OLD."quantityAvailable")
	  WHERE "EggsBatches"."id" = NEW."EggsBatchId";
		
	RETURN NEW;
END;
