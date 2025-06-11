
-- Only create types that don't exist yet
DO $$ BEGIN
    CREATE TYPE document_type AS ENUM ('nda', 'cease_desist', 'dmca', 'license', 'contract');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ip_type AS ENUM ('patent', 'trademark', 'copyright', 'trade_secret');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE threat_level AS ENUM ('low', 'medium', 'high', 'critical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE case_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the IP assets table if it doesn't exist
CREATE TABLE IF NOT EXISTS ip_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL,
    organization_id UUID,
    title TEXT NOT NULL,
    description TEXT,
    ip_type ip_type NOT NULL,
    file_hash TEXT UNIQUE,
    blockchain_proof TEXT,
    registration_number TEXT,
    filing_date TIMESTAMP WITH TIME ZONE,
    expiry_date TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'pending',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create legal cases table if it doesn't exist
CREATE TABLE IF NOT EXISTS legal_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    assigned_lawyer_id UUID,
    ip_asset_id UUID,
    case_number TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    case_status case_status DEFAULT 'open',
    priority threat_level DEFAULT 'medium',
    estimated_value DECIMAL(15,2),
    filing_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolution_date TIMESTAMP WITH TIME ZONE,
    outcome TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create legal documents table if it doesn't exist
CREATE TABLE IF NOT EXISTS legal_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID,
    ip_asset_id UUID,
    creator_id UUID NOT NULL,
    document_type document_type NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    template_id UUID,
    ai_generated BOOLEAN DEFAULT false,
    lawyer_approved BOOLEAN DEFAULT false,
    approved_by UUID,
    file_url TEXT,
    signature_required BOOLEAN DEFAULT false,
    signed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create misinformation alerts table if it doesn't exist
CREATE TABLE IF NOT EXISTS misinformation_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_asset_id UUID NOT NULL,
    source_url TEXT NOT NULL,
    content_snippet TEXT,
    threat_level threat_level DEFAULT 'medium',
    ai_confidence DECIMAL(3,2),
    status TEXT DEFAULT 'pending',
    response_action TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AI analysis table if it doesn't exist
CREATE TABLE IF NOT EXISTS ai_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL,
    subject_type TEXT NOT NULL,
    analysis_type TEXT NOT NULL,
    results JSONB NOT NULL,
    confidence_score DECIMAL(3,2),
    model_version TEXT,
    processing_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription plans table if it doesn't exist
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tier TEXT NOT NULL,
    price_monthly DECIMAL(10,2),
    price_yearly DECIMAL(10,2),
    features JSONB NOT NULL,
    limits JSONB NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user subscriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    plan_id UUID NOT NULL,
    status TEXT DEFAULT 'active',
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at TIMESTAMP WITH TIME ZONE,
    canceled_at TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_ip_assets_owner ON ip_assets(owner_id);
CREATE INDEX IF NOT EXISTS idx_ip_assets_hash ON ip_assets(file_hash);
CREATE INDEX IF NOT EXISTS idx_legal_cases_client ON legal_cases(client_id);
CREATE INDEX IF NOT EXISTS idx_legal_cases_status ON legal_cases(case_status);
CREATE INDEX IF NOT EXISTS idx_misinformation_alerts_asset ON misinformation_alerts(ip_asset_id);
CREATE INDEX IF NOT EXISTS idx_misinformation_alerts_threat ON misinformation_alerts(threat_level);
CREATE INDEX IF NOT EXISTS idx_ai_analysis_subject ON ai_analysis(subject_id, subject_type);

-- Enable RLS on new tables
ALTER TABLE ip_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE misinformation_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DO $$ BEGIN
    CREATE POLICY "Users can view their own IP assets" ON ip_assets
        FOR SELECT USING (auth.uid() = owner_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can create their own IP assets" ON ip_assets
        FOR INSERT WITH CHECK (auth.uid() = owner_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can update their own IP assets" ON ip_assets
        FOR UPDATE USING (auth.uid() = owner_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can view their own legal cases" ON legal_cases
        FOR SELECT USING (auth.uid() = client_id OR auth.uid() = assigned_lawyer_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can view their own documents" ON legal_documents
        FOR SELECT USING (auth.uid() = creator_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Users can create their own documents" ON legal_documents
        FOR INSERT WITH CHECK (auth.uid() = creator_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Insert default subscription plans if they don't exist
INSERT INTO subscription_plans (name, tier, price_monthly, price_yearly, features, limits) 
SELECT 'Free Plan', 'free', 0, 0, 
 '["Timestamp 5 works", "Auto-NDA Generator", "1 Rumor Scan/month"]'::jsonb,
 '{"ip_assets": 5, "rumor_scans": 1, "legal_documents": 10}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Free Plan');

INSERT INTO subscription_plans (name, tier, price_monthly, price_yearly, features, limits) 
SELECT 'Pro Plan', 'pro', 99, 990,
 '["Unlimited Proof-of-Origin", "AI avatar legal assistant", "Real-time misinformation defense", "Auto cease & desist"]'::jsonb,
 '{"ip_assets": -1, "rumor_scans": -1, "legal_documents": -1}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Pro Plan');

INSERT INTO subscription_plans (name, tier, price_monthly, price_yearly, features, limits) 
SELECT 'Enterprise Plan', 'enterprise', 0, 0,
 '["Everything in Pro", "Custom legal workflows", "Dedicated legal team", "API integrations"]'::jsonb,
 '{"ip_assets": -1, "rumor_scans": -1, "legal_documents": -1, "custom_workflows": true}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Enterprise Plan');
