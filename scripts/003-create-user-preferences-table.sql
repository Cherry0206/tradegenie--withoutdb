-- Create user preferences table for settings
CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email_notifications BOOLEAN DEFAULT true,
    marketing_updates BOOLEAN DEFAULT false,
    trade_alerts BOOLEAN DEFAULT true,
    weekly_reports BOOLEAN DEFAULT true,
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    two_factor_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_preferences_user_id ON user_preferences(user_id);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_preferences_updated_at 
    BEFORE UPDATE ON user_preferences 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default preferences for demo user
INSERT INTO user_preferences (
    user_id, 
    email_notifications, 
    marketing_updates, 
    trade_alerts, 
    weekly_reports, 
    timezone, 
    language, 
    two_factor_enabled
)
SELECT 
    u.id,
    true,
    false,
    true,
    true,
    'UTC',
    'en',
    false
FROM users u 
WHERE u.email = 'demo@tradegenie.com'
ON CONFLICT (user_id) DO NOTHING;
