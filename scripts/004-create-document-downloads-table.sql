-- Create document_downloads table
CREATE TABLE IF NOT EXISTS document_downloads (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    download_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Add foreign key constraint to users table
    CONSTRAINT fk_document_downloads_user_id 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_document_downloads_user_id ON document_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_document_downloads_download_time ON document_downloads(download_time);
CREATE INDEX IF NOT EXISTS idx_document_downloads_document_type ON document_downloads(document_type);

-- Insert some sample data for testing
INSERT INTO document_downloads (user_id, document_name, document_type, risk_level) VALUES
(1, 'Commercial Invoice Template', 'template', 'low'),
(1, 'Bill of Lading Form', 'template', 'medium'),
(1, 'Certificate of Origin', 'certificate', 'high');
