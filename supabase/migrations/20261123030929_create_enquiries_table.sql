/*
# Create enquiries table for finance enquiry form

1. New Tables
- `enquiries`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `name` (text, not null) - customer's full name
  - `mobile` (text, not null) - contact mobile number
  - `city` (text, not null) - customer's city
  - `vehicle_type` (text, not null) - new car / used car / commercial vehicle / refinance / insurance
  - `enquiry_type` (text, not null) - type of enquiry submitted
  - `message` (text, nullable) - optional additional details
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `enquiries`.
- Grant INSERT to `anon` + `authenticated` only (this is a public enquiry form with no sign-in).
- INSERT-only policy: visitors can submit enquiries but cannot read, update or delete any rows.
- No SELECT grant: enquiry data is only readable by the business (via service role / dashboard).
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mobile text NOT NULL,
  city text NOT NULL,
  vehicle_type text NOT NULL,
  enquiry_type text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON enquiries;
CREATE POLICY "Anyone can submit an enquiry"
ON enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) > 0
  AND length(mobile) > 0
  AND length(city) > 0
);