# 🚀 Deployment Guide

This app now uses **Netlify Functions** to securely handle API calls. Follow these simple steps to deploy:

## Why Netlify?

The Anthropic API doesn't allow direct browser requests (CORS). Netlify Functions act as a secure backend proxy that:
- Keeps your API key safe
- Handles the API calls server-side
- Works from any browser without CORS issues

## 📋 Prerequisites

1. A GitHub account
2. A Netlify account (free) - Sign up at https://netlify.com
3. A Claude API key from https://console.anthropic.com/

## 🎯 Deployment Steps

### Step 1: Push Code to GitHub

The code is already in your repository at `github.com/nontechnicalRP/linkedin-app` on branch `claude/transcript-linkedin-converter-CkBsM`.

### Step 2: Connect to Netlify

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select the repository: **`linkedin-app`**
6. Choose the branch: **`claude/transcript-linkedin-converter-CkBsM`**

### Step 3: Configure Build Settings

Netlify should auto-detect the settings, but verify:

- **Build command**: (leave empty)
- **Publish directory**: `.` (just a dot)
- **Functions directory**: `netlify/functions` (should be auto-detected)

Click **"Deploy site"**

### Step 4: Wait for Deploy

Netlify will:
- Install dependencies
- Build the functions
- Deploy your site

This takes about 1-2 minutes. You'll see a URL like: `https://random-name-12345.netlify.app`

### Step 5: Test Your App

1. Open the Netlify URL
2. Enter your Claude API key in the yellow box
3. Paste a transcript
4. Click "Generate LinkedIn Post"
5. It should work! ✨

## 🎨 Optional: Custom Domain

1. In Netlify dashboard, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Follow instructions to set up your own domain

## 🔐 Security Best Practices

✅ **Your API key is safe because:**
- It's stored locally in your browser (localStorage)
- Only sent to the Netlify Function (your own server)
- Never exposed in client-side code to external parties

✅ **Recommended:**
- Set spending limits in Anthropic Console
- Rotate your API key periodically
- Don't share your deployed URL publicly if you don't want others using your API key

## 🐛 Troubleshooting

**Problem: "Function not found"**
- Solution: Make sure the `netlify/functions` folder deployed correctly
- Check the Netlify deploy logs

**Problem: Still getting CORS errors**
- Solution: Make sure you're using the Netlify URL, not opening the file locally
- Clear browser cache and try again

**Problem: "API request failed"**
- Check that your API key is correct
- Verify you have credits in your Anthropic account
- Check Netlify Function logs for errors

## 📊 Monitoring Usage

In the Anthropic Console:
- Go to **"Usage"** to see API calls
- Set up billing alerts
- Monitor costs (each post costs ~$0.003-0.006)

## 🔄 Updating the App

To deploy updates:
1. Make changes to the code
2. Push to GitHub
3. Netlify auto-deploys (unless you disabled it)

---

**Need help?** Check the main README.md or open an issue on GitHub.
