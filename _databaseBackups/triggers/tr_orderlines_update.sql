-- Trigger: tr_orderlines_update

DROP TRIGGER IF EXISTS "tr_orderlines_update" ON public."OrderLines";

CREATE TRIGGER "tr_orderlines_update"
    BEFORE UPDATE 
    ON public."OrderLines"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_orderlines_update();