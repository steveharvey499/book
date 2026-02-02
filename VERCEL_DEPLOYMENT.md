# Vercel Deployment Guide

This guide will help you deploy The Brand Attention Strategy book website to Vercel.

## Quick Setup

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub and push:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Find and select your repository
5. Click **"Import"**

### Step 3: Configure Project

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (auto-detected)

### Step 4: Environment Variables

Add these environment variables in Vercel dashboard:

1. Scroll to **"Environment Variables"** section
2. Add each variable:

   - `NEXT_PUBLIC_GA4_ID`
     - Value: Your Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`)
     - Environments: Production, Preview, Development

   - `NEXT_PUBLIC_SITE_URL`
     - Value: Your production URL (e.g., `https://your-domain.vercel.app`)
     - Environments: Production, Preview, Development

   - (Optional) `NEXT_PUBLIC_SUPABASE_URL`
     - Value: Your Supabase project URL
     - Environments: Production, Preview, Development

   - (Optional) `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Value: Your Supabase anonymous key
     - Environments: Production, Preview, Development

   - (Optional) `SUPABASE_SERVICE_ROLE_KEY`
     - Value: Your Supabase service role key
     - Environments: Production, Preview, Development

3. Make sure to select **Production**, **Preview**, and **Development** for each variable

### Step 5: Deploy

1. Click **"Deploy"** at the bottom
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://your-project.vercel.app`

## Automatic Deployments

Once set up, Vercel automatically:

- ✅ Deploys every push to `main` branch → **Production**
- ✅ Creates preview deployments for pull requests → **Preview**
- ✅ Rebuilds when environment variables change

**No manual action needed!** Just push to GitHub and Vercel handles the rest.

## Custom Domain Setup

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain (e.g., `book.yourdomain.com`)
4. Follow DNS configuration instructions:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or add an A record with Vercel's IP addresses
5. Wait for DNS propagation (can take up to 24 hours)
6. Vercel will automatically provision SSL certificate

## Monitoring Deployments

### View Deployment Status

1. Go to Vercel dashboard → Your project → **Deployments** tab
2. You'll see:
   - ✅ Green checkmark = Successful deployment
   - ⏳ Spinning icon = Currently deploying
   - ❌ Red X = Failed deployment (check logs)

### View Build Logs

1. Click on any deployment
2. Click **"View Build Logs"** to see what happened
3. Check for any errors or warnings

## Troubleshooting

### Build Failures

1. Check deployment logs for error messages
2. Verify all environment variables are set
3. Make sure `npm install` works locally
4. Check that all dependencies are in `package.json`

### Environment Variables Not Working?

1. Make sure variables are set for **Production** environment
2. Redeploy after adding new variables
3. Check variable names match exactly (case-sensitive)
4. Restart the deployment if variables were added after initial deploy

### Analytics Not Tracking?

1. Verify `NEXT_PUBLIC_GA4_ID` is set correctly
2. Check browser console for errors
3. Verify Google Analytics is receiving events
4. Check that the GA4 ID format is correct (starts with `G-`)

## Next Steps

After deployment:

1. ✅ Test the website on the Vercel URL
2. ✅ Verify analytics tracking is working
3. ✅ Set up custom domain (optional)
4. ✅ Configure Google Analytics to view data
5. ✅ Update book content in `data/book.json` as needed

## Support

For Vercel-specific issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
