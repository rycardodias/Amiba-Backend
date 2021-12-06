-- Trigger: tr_eggsbatchlines_delete

-- DROP TRIGGER tr_eggsbatchlines_delete ON public."EggsBatchLines";

CREATE TRIGGER tr_eggsbatchlines_delete
    BEFORE DELETE
    ON public."EggsBatchLines"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_eggsbatchlines_delete();