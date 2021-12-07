-- Trigger: tr_eggsbatchproducts_delete

-- DROP TRIGGER tr_eggsbatchproducts_delete ON public."EggsBatchLines";

CREATE TRIGGER tr_eggsbatchproducts_delete
    BEFORE DELETE
    ON public."EggsBatchProducts"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_eggsbatchproducts_delete();