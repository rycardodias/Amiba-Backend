-- Trigger: tr_eggsbatchlines_insert

DROP TRIGGER IF EXISTS tr_eggsbatchlines_insert ON public."EggsBatchLines";

CREATE TRIGGER tr_eggsbatchlines_insert
    BEFORE INSERT
    ON public."EggsBatchLines"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_eggsbatchlines_insert();