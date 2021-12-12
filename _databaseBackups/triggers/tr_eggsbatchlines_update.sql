-- Trigger: tr_eggsbatchlines_update

 DROP TRIGGER IF EXISTS tr_eggsbatchlines_update ON public."EggsBatchLines";

CREATE TRIGGER tr_eggsbatchlines_update
    BEFORE UPDATE
    ON public."EggsBatchLines"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_eggsbatchlines_update();