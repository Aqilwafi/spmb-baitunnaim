CREATE TABLE IF NOT EXISTS master_roles (
    id SMALLINT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    role_name TEXT NOT NULL,
    role_description TEXT
);

CREATE TABLE IF NOT EXISTS master_domains (
    id SMALLINT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    domain_name TEXT NOT NULL,
    domain_description TEXT
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id SMALLINT NOT NULL REFERENCES master_roles(id) ON DELETE CASCADE,
    domain_id SMALLINT NOT NULL REFERENCES master_domains(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    suspended_at TIMESTAMPTZ,
    suspended_by UUID REFERENCES auth.users(id),
    PRIMARY KEY (user_id, role_id, domain_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_user_role_domain
ON user_roles(user_id, role_id, domain_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_user
ON user_roles(user_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_role_domain
ON user_roles(role_id, domain_id);