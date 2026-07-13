CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  beds INTEGER DEFAULT 0,
  baths INTEGER DEFAULT 0,
  size VARCHAR(100),
  category VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  location VARCHAR(255) DEFAULT 'Prime District',
  status VARCHAR(100) DEFAULT 'Available',
  dropbox_link VARCHAR(500),
  floors JSON DEFAULT '[]'::json,
  images JSON DEFAULT '[]'::json,
  features JSON DEFAULT '[]'::json,
  handover VARCHAR(100),
  payment_plan VARCHAR(100),
  property_type VARCHAR(255),
  bedrooms_range VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  property_type VARCHAR(100) DEFAULT 'villa',
  property_id INTEGER,
  message TEXT,
  status VARCHAR(100) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
