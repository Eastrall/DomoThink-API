--
-- DomoThink
-- Default DomoBox users SQL script
--
-- Creates the default users for the DomoBox
--

-- Create users

CREATE USER domo@localhost IDENTIFIED BY 'default_password';
CREATE USER domo@% IDENTIFIED BY 'default_password';

-- Grant access

GRANT ALL PRIVILEGES ON * . * TO domo@localhost;
GRANT ALL PRIVILEGES ON * . * TO domo@%;