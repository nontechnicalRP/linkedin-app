# 📝 Transcript to LinkedIn Post Converter

A simple, elegant web application that transforms call transcripts into engaging LinkedIn posts using Claude AI.

## ✨ Features

- **Smart Analysis**: Uses Claude's AI to extract the most insightful points from your transcripts
- **Professional Formatting**: Generates posts with proper structure, hooks, and readability
- **Editable Output**: Tweak the generated post to add your personal touch
- **Copy to Clipboard**: One-click copying for easy pasting into LinkedIn
- **Google Docs Export**: Export to Google Docs for further editing
- **Secure**: API key stored locally in your browser only
- **Zero Dependencies**: Pure HTML, CSS, and JavaScript - no build tools required

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A Claude API key from Anthropic ([Get one here](https://console.anthropic.com/))

### Setup Instructions

1. **Get Your Claude API Key**
   - Visit [https://console.anthropic.com/](https://console.anthropic.com/)
   - Sign up or log in to your account
   - Navigate to API Keys
   - Create a new API key
   - Copy the key (it starts with `sk-ant-api03-...`)

2. **Download or Clone This Repository**
   ```bash
   git clone <repository-url>
   cd linkedin-app
   ```

3. **Open the Application**
   - Simply open `index.html` in your web browser
   - You can double-click the file or use the command:
     ```bash
     # On macOS
     open index.html

     # On Linux
     xdg-open index.html

     # On Windows
     start index.html
     ```

4. **Enter Your API Key**
   - Paste your Claude API key in the API Key field
   - It will be saved in your browser's local storage for future use
   - Your API key never leaves your browser and is never sent anywhere except directly to Anthropic's API

## 📖 How to Use

1. **Paste Your Transcript**
   - Copy the transcript from your call or meeting
   - Paste it into the "Paste Your Transcript" text area
   - For best results, include speaker labels (e.g., "Speaker 1:", "John:", etc.)

2. **Generate the Post**
   - Click the "Generate LinkedIn Post" button
   - Wait a few seconds while Claude analyzes your transcript
   - The AI will extract key insights and create an engaging post

3. **Review and Edit**
   - The generated post appears in the output section
   - Edit it directly in the text area to add your personal touch
   - The character and word count updates as you edit

4. **Copy or Export**
   - Click "Copy to Clipboard" to copy the post
   - Or click "Export to Google Docs" to continue editing in Google Docs
   - Paste into LinkedIn and publish!

## 💡 Tips for Best Results

- **Include Context**: Transcripts with speaker labels and context work better
- **Length Matters**: Longer transcripts (500+ words) typically generate better insights
- **Remove Sensitive Info**: Always remove confidential information before pasting
- **Edit the Output**: The AI provides a great starting point - add your voice to make it yours
- **Test Different Approaches**: Try generating multiple versions and pick the best parts from each

## 🎨 What Makes a Good LinkedIn Post?

The app follows these principles when generating posts:

- **Strong Hook**: First sentence grabs attention
- **Authentic Voice**: Sounds natural, not corporate
- **Actionable Insights**: Provides value to readers
- **Easy to Read**: Short paragraphs with strategic line breaks
- **No Cringe**: Avoids overused phrases and buzzwords

### Avoided Phrases
The AI avoids these common LinkedIn clichés:
- "I'm excited to share..."
- "Thrilled to announce..."
- "Delighted to..."
- Corporate buzzwords (synergy, leverage, circle back, etc.)

## 🔒 Privacy & Security

- **Local First**: Your API key is stored only in your browser's local storage
- **Direct API Calls**: Your transcripts are sent directly to Anthropic's API, not through any intermediary
- **No Backend**: This is a purely client-side application with no server component
- **No Tracking**: No analytics, no tracking, no data collection

## 🛠️ Technical Details

### Stack
- Pure HTML, CSS, and JavaScript
- No frameworks or build tools required
- Uses Claude 3.5 Sonnet via Anthropic's API

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### API Usage
- Each generation uses approximately 1,000-2,000 tokens
- Cost: ~$0.003-$0.006 per post (based on Claude 3.5 Sonnet pricing)

## 📋 Example Workflow

1. Record or download your call transcript
2. Open the application in your browser
3. Paste the transcript (example):
   ```
   John: Hey Sarah, thanks for joining. I wanted to discuss our approach to async work.

   Sarah: Absolutely. I think the key insight is that real-time isn't always better.
   We've been conditioned to think immediate responses are necessary, but async
   actually leads to more thoughtful communication.

   John: Exactly. And it respects people's deep work time...
   ```
4. Click "Generate LinkedIn Post"
5. Review the output, make any edits
6. Copy to clipboard and paste into LinkedIn

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available for personal and commercial use.

## ⚠️ Disclaimer

This tool uses AI to generate content. Always review and edit the output before posting. The quality of the output depends on the quality and length of the input transcript.

## 🆘 Troubleshooting

### "API request failed" error
- Check that your API key is correct
- Ensure you have API credits in your Anthropic account
- Verify your internet connection

### Generated post seems off-topic
- Try with a longer, more detailed transcript
- Ensure the transcript has clear speaker labels
- Add more context to your conversation

### Google Docs export not working
- Make sure pop-ups are enabled for this site
- Try the "Copy to Clipboard" button and manually paste into Google Docs
- Check that you're logged into Google

## 📞 Support

For issues with:
- **The application**: Check the troubleshooting section above
- **Claude API**: Visit [Anthropic's documentation](https://docs.anthropic.com/)
- **API billing**: Contact Anthropic support

---

Made with ❤️ for better LinkedIn content
