-- Harden the public website enquiry endpoint at the database boundary.
-- Browser validation is for usability only; database policies must validate untrusted clients.

-- The public form needs INSERT only. Keep enquiry rows private to privileged business access.
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
ON TABLE public.enquiries FROM anon, authenticated;

GRANT INSERT ON TABLE public.enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit an enquiry"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consent_given IS TRUE
  AND char_length(btrim(name)) BETWEEN 2 AND 100
  AND mobile ~ '^[6-9][0-9]{9}$'
  AND char_length(btrim(city)) BETWEEN 2 AND 100
  AND vehicle_type IN (
    'New Car',
    'Used Car',
    'Commercial Vehicle',
    'Tractor / Farm Equipment',
    'Not sure yet'
  )
  AND enquiry_type IN (
    'New Car Finance',
    'Used Car Finance',
    'Car Refinance',
    'Commercial Vehicle Finance',
    'Insurance Assistance',
    'Other / General Question'
  )
  AND (message IS NULL OR char_length(message) <= 1000)
);
