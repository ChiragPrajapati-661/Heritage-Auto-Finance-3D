-- Record whether the customer explicitly agreed to be contacted.
-- Existing enquiries remain false because historical consent was not captured.
ALTER TABLE public.enquiries
ADD COLUMN IF NOT EXISTS consent_given boolean NOT NULL DEFAULT false;
