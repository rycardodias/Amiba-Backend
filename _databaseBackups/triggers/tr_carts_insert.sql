-- Trigger: tr_carts_insert

DROP TRIGGER IF EXISTS tr_carts_insert ON public."Carts";

CREATE TRIGGER tr_carts_insert
    BEFORE INSERT
    ON public."Carts"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_carts_insert();
