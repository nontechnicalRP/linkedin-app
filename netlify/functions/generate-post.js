const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { transcript, apiKey } = JSON.parse(event.body);

    // Validate inputs
    if (!transcript || !apiKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing transcript or API key' })
      };
    }

    const systemPrompt = `You are an expert LinkedIn content creator. Your task is to transform call transcripts into engaging, authentic LinkedIn posts.

Guidelines for creating LinkedIn posts:
1. START WITH A HOOK: The first sentence must grab attention. Make it intriguing, surprising, or thought-provoking.
2. EXTRACT INSIGHTS: Pull out the most interesting, actionable, or counterintuitive points from the conversation.
3. BE AUTHENTIC: Write in a natural, conversational tone. Sound like a real person, not a corporate press release.
4. AVOID CRINGE:
   - Never use: "I'm excited to share...", "Thrilled to announce...", "Delighted to...", "Honored to..."
   - No excessive emojis (1-2 maximum, if they add value)
   - No corporate buzzwords like "synergy", "leverage", "circle back", "touch base"
   - No humble brags or virtue signaling
5. FORMAT FOR READABILITY:
   - Use short paragraphs (1-3 sentences each)
   - Add blank lines between paragraphs for breathing room
   - Break up long thoughts
   - Use line breaks strategically
6. FOCUS ON VALUE: What will readers learn? What's the key takeaway?
7. BE SPECIFIC: Use concrete examples and specific details from the transcript.
8. KEEP IT CONCISE: Aim for 150-250 words. LinkedIn posts should be scannable.

Structure to follow:
- Hook (1 sentence that grabs attention)
- Context or setup (1-2 sentences)
- Main insights (2-4 short paragraphs)
- Closing thought or call to reflection (1-2 sentences)

DO NOT include hashtags unless they're truly relevant and minimal (max 2-3).
DO NOT include a call-to-action to like/share/comment.
Just provide the post text, ready to copy and paste into LinkedIn.`;

    const userPrompt = `Here's a transcript from a conversation. Transform it into an engaging LinkedIn post following all the guidelines:

${transcript}`;

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: userPrompt
        }],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API Error:', JSON.stringify(errorData, null, 2));
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: errorData.error?.message || errorData.message || JSON.stringify(errorData) || `API request failed: ${response.status}`
        })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        post: data.content[0].text
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Internal server error'
      })
    };
  }
};
