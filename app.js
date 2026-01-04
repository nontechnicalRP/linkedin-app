// DOM Elements
const apiKeyInput = document.getElementById('apiKey');
const toggleApiKeyBtn = document.getElementById('toggleApiKey');
const transcriptInput = document.getElementById('transcript');
const charCount = document.getElementById('charCount');
const generateBtn = document.getElementById('generateBtn');
const outputSection = document.getElementById('outputSection');
const outputTextarea = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const exportBtn = document.getElementById('exportBtn');
const successMessage = document.getElementById('successMessage');
const outputStats = document.getElementById('outputStats');

// Constants
const STORAGE_KEY = 'claude_api_key';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-5-sonnet-20241022';

// Load saved API key on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    if (savedKey) {
        apiKeyInput.value = savedKey;
    }
});

// Save API key to localStorage when it changes
apiKeyInput.addEventListener('input', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem(STORAGE_KEY, key);
    }
});

// Toggle API key visibility
toggleApiKeyBtn.addEventListener('click', () => {
    if (apiKeyInput.type === 'password') {
        apiKeyInput.type = 'text';
        toggleApiKeyBtn.textContent = 'Hide';
    } else {
        apiKeyInput.type = 'password';
        toggleApiKeyBtn.textContent = 'Show';
    }
});

// Update character count
transcriptInput.addEventListener('input', () => {
    const count = transcriptInput.value.length;
    charCount.textContent = `${count.toLocaleString()} characters`;
});

// Generate LinkedIn post
generateBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const transcript = transcriptInput.value.trim();

    // Validation
    if (!apiKey) {
        alert('Please enter your Claude API key');
        apiKeyInput.focus();
        return;
    }

    if (!transcript) {
        alert('Please paste a transcript to convert');
        transcriptInput.focus();
        return;
    }

    if (transcript.length < 100) {
        alert('Transcript seems too short. Please provide a longer transcript for better results.');
        return;
    }

    // Show loading state
    setLoadingState(true);

    try {
        const linkedInPost = await generateLinkedInPost(apiKey, transcript);

        // Show output section
        outputSection.style.display = 'block';
        outputTextarea.value = linkedInPost;

        // Update stats
        updateOutputStats(linkedInPost);

        // Scroll to output
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    } finally {
        setLoadingState(false);
    }
});

// Generate LinkedIn post using Claude API
async function generateLinkedInPost(apiKey, transcript) {
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

    const response = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: MODEL,
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
        throw new Error(errorData.error?.message || `API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
}

// Copy to clipboard
copyBtn.addEventListener('click', async () => {
    const text = outputTextarea.value;

    try {
        await navigator.clipboard.writeText(text);
        showSuccessMessage();
    } catch (err) {
        // Fallback for older browsers
        outputTextarea.select();
        document.execCommand('copy');
        showSuccessMessage();
    }
});

// Export to Google Docs
exportBtn.addEventListener('click', () => {
    const text = outputTextarea.value;

    // Create a Google Docs URL with the content
    // This opens a new Google Doc with the text pre-filled
    const encodedText = encodeURIComponent(text);
    const googleDocsUrl = `https://docs.google.com/document/create?title=LinkedIn Post&body=${encodedText}`;

    // Alternative: Use the simpler approach with a blank doc and instructions
    // Since the URL method has limitations, we'll use a different approach

    // Create a temporary element to copy formatted text
    const tempDiv = document.createElement('div');
    tempDiv.style.whiteSpace = 'pre-wrap';
    tempDiv.textContent = text;
    document.body.appendChild(tempDiv);

    // Select and copy
    const range = document.createRange();
    range.selectNode(tempDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        document.body.removeChild(tempDiv);

        // Open a blank Google Doc
        window.open('https://docs.google.com/document/create', '_blank');

        alert('Text copied to clipboard! Paste it into the new Google Doc that just opened (Ctrl+V or Cmd+V).');
    } catch (err) {
        document.body.removeChild(tempDiv);
        alert('Please copy the text manually and paste it into a new Google Doc.');
    }
});

// Helper functions
function setLoadingState(isLoading) {
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoading = generateBtn.querySelector('.btn-loading');

    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        generateBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        generateBtn.disabled = false;
    }
}

function showSuccessMessage() {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function updateOutputStats(text) {
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;

    outputStats.innerHTML = `
        <strong>Stats:</strong>
        ${words} words • ${chars} characters • ${paragraphs} paragraphs
    `;
}

// Allow editing the output
outputTextarea.addEventListener('input', () => {
    updateOutputStats(outputTextarea.value);
});
