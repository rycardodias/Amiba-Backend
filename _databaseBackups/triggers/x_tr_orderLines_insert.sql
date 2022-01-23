-- Trigger: tr_orderLines_insert

DROP TRIGGER IF EXISTS "tr_orderLines_insert" ON public."OrderLines";

CREATE TRIGGER "tr_orderLines_insert"
    BEFORE INSERT 
    ON public."OrderLines"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_orderlines_insert();