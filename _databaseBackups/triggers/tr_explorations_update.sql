-- Trigger: tr_explorations_update

-- DROP TRIGGER tr_explorations_update ON public."Carts";

CREATE TRIGGER tr_explorations_update
    BEFORE UPDATE 
    ON public."Explorations"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_explorations_update();
