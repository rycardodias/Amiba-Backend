-- Trigger: tr_eggsbatchproducts_insert

-- DROP TRIGGER tr_eggsbatchproducts_insert ON public."EggsBatchProducts";

CREATE TRIGGER tr_eggsbatchproducts_insert
    BEFORE INSERT
    ON public."EggsBatchProducts"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_eggsbatchproducts_insert();