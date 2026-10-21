-- Add user preferences (location) to profiles

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location_detail TEXT;

-- Default HQ location for existing profiles
UPDATE profiles SET location = 'HQ · Kitui', location_detail = 'DukaPlug HQ, Top Notch, Kitui' WHERE location IS NULL;