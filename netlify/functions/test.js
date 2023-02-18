// Grab our credentials from a .env file or environment variables
const { SUPABASE_URL, SUPABASE_KEY } = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Our standard serverless handler function
export const handler = async () => {
	const response = await supabase.from('videos').select('*');

	return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
};
