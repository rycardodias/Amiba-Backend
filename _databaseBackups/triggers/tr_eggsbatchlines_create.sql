-- Trigger: tr_eggsbatchlines_create

-- DROP TRIGGER tr_eggsbatchlines_create ON public."EggsBatchLines";

CREATE TRIGGER tr_eggsbatchlines_create
    BEFORE INSERT
    ON public."EggsBatchLines"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_eggsbatchlines_create();