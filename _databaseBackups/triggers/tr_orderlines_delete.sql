-- Trigger: tr_orderLines_delete

DROP TRIGGER IF EXISTS "tr_orderLines_delete" ON public."OrderLines";

CREATE TRIGGER "tr_orderLines_delete"
    BEFORE DELETE
    ON public."OrderLines"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_orderlines_delete();