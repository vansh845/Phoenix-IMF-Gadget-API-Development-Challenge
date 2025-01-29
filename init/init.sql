CREATE TABLE gadgets(
    id TEXT PRIMARY KEY,
    name TEXT,
    codename TEXT UNIQUE NOT NULL,
    status TEXT,
    mission_success_probability INTEGER
);

CREATE TABLE decommissioned(
    gadget_id TEXT references gadgets,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
