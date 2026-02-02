# The Brand Attention Strategy - Book Website

A Next.js website for publishing "The Brand Attention Strategy" book, with comprehensive analytics tracking for page views and dwell time.

## Features

- **Page-by-Page Reading**: Each book page is a separate route for deep linking and analytics
- **Analytics Tracking**: 
  - Page views with page identification
  - Dwell time per page (time spent reading)
  - Navigation patterns
  - Reading progress
- **Brand Consistent Design**: Full implementation of brand guidelines
- **Responsive Design**: Mobile-first, works on all devices
- **SEO Optimized**: Proper metadata for each page
- **Newsletter Subscription**: Qualification form with Beehiiv integration before accessing the book

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS with custom brand configuration
- **Analytics**: Google Analytics 4 + custom API routes
- **TypeScript**: Full type safety
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file (copy from `.env.local.example`):
```bash
cp .env.local.example .env.local
```

3. Install additional dependencies:
```bash
npm install react-hook-form
```

4. Add your environment variables to `.env.local`:
```env
NEXT_PUBLIC_GA4_ID=your-google-analytics-id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BEEHIV_API_KEY=your_beehiiv_api_key
BEEHIV_PUBLICATION_ID=your_beehiiv_publication_id
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### Building

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Book Content

The book content is stored in `data/book.json`. To add or update book pages:

1. Edit `data/book.json`
2. Add pages to the `pages` array with the following structure:
```json
{
  "id": "unique-page-id",
  "pageNumber": 1,
  "title": "Page Title",
  "content": "Page content here...",
  "chapter": "Chapter Name"
}
```

## Deployment to Vercel

### Initial Setup

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click **"Add New..."** → **"Project"**

4. Import your repository

5. Vercel will auto-detect Next.js. Verify settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (auto-detected)

6. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GA4_ID` - Your Google Analytics 4 ID
   - `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., `https://your-domain.vercel.app`)
   - `BEEHIV_API_KEY` - Your Beehiiv API key for newsletter subscriptions
   - `BEEHIV_PUBLICATION_ID` - Your Beehiiv publication ID
   - (Optional) Supabase variables if using for analytics storage

7. Click **"Deploy"**

### Automatic Deployments

Once set up, Vercel will automatically:
- Deploy every push to `main` branch → **Production**
- Create preview deployments for pull requests → **Preview**

### Custom Domain

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Analytics

### Google Analytics 4

The site is configured to track:
- Page views with page identification
- Dwell time per page
- Navigation events
- Reading progress

### Custom Analytics API

The site includes API routes for custom analytics tracking:
- `/api/analytics/pageview` - Track page views
- `/api/analytics/dwelltime` - Track dwell time

These can be extended to store data in Supabase or another database.

## Newsletter Subscription

The site includes a qualification form that users must complete before accessing the book. The form collects:

1. **Email Address** - Required for newsletter subscription
2. **Name** - First and last name
3. **Qualification Questions**:
   - Current role
   - Company focus
   - Biggest challenge
   - Team size
   - Referral source

After completing the form, users are automatically subscribed to the newsletter via Beehiiv and then redirected to the first page of the book.

### Beehiiv Setup

Beehiiv is a newsletter platform that will handle storing your subscribers and sending them emails. Here's how to set it up:

#### Step 1: Create a Beehiiv Account

1. Go to [beehiiv.com](https://www.beehiiv.com) and sign up for a free account
2. Complete the onboarding process
3. Create a new publication (this is your newsletter)
   - Give it a name (e.g., "The Brand Attention Strategy Newsletter")
   - Set up basic publication details

#### Step 2: Get Your Publication ID

The Publication ID is a unique identifier for your newsletter publication. Here's how to find it:

1. Log in to your Beehiiv dashboard
2. Navigate to **Settings** → **API** (or go to your publication settings)
3. Look for a field labeled **Publication ID**
   - It may be a long string of characters
   - It might start with `pub_` (for API v2 format)
   - Example: `pub_abc123xyz789` or just `abc123xyz789`
4. **Copy this ID** - you'll need it for your `.env.local` file

**Alternative method to find Publication ID:**
- Check your publication URL in the browser - it may contain the ID
- Look in the Beehiiv API documentation section of your dashboard

#### Step 3: Create an API Key

The API key allows your website to programmatically add subscribers to your newsletter:

1. In your Beehiiv dashboard, go to **Settings** → **API**
2. Look for a section about **API Keys** or **Authentication**
3. Click **Create New API Key** or **Generate API Key**
4. Give it a descriptive name (e.g., "Website Newsletter Subscription" or "Book Website Integration")
5. **IMPORTANT**: Copy the API key immediately after creation
   - ⚠️ You won't be able to see it again after closing the dialog
   - Store it securely (password manager, notes app, etc.)
6. Make sure the API key has permissions to:
   - ✅ Create subscriptions
   - ✅ Manage subscribers (if you want to update subscriber data later)

#### Step 4: Add Credentials to `.env.local`

1. Open or create the `.env.local` file in your project root (`/Users/stevenharvey/Cursor - Website/book/.env.local`)

2. Add these two lines, replacing the placeholder values with your actual credentials:

```env
BEEHIV_API_KEY=your_actual_api_key_here
BEEHIV_PUBLICATION_ID=your_actual_publication_id_here
```

**Example:**
```env
BEEHIV_API_KEY=sk_live_abc123xyz789def456
BEEHIV_PUBLICATION_ID=pub_abc123xyz789
```

**Important notes:**
- Do NOT include quotes around the values
- Do NOT commit `.env.local` to git (it should already be in `.gitignore`)
- Make sure there are no extra spaces before or after the `=` sign
- The Publication ID can be with or without the `pub_` prefix - the code handles both formats

#### Step 5: Restart Your Development Server

After adding the environment variables:

1. Stop your current development server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

Environment variables are only loaded when the server starts, so you must restart for changes to take effect.

#### Step 6: Test the Integration

1. Go to your homepage at `http://localhost:3000`
2. Click the **"Start Reading"** button
3. Complete the qualification form:
   - Enter your email
   - Enter your name
   - Answer the qualification questions
4. Click **"Start Reading"** to submit
5. Check your Beehiiv dashboard:
   - Go to **Audience** → **Subscribers**
   - You should see your test email appear in the subscriber list
   - The subscriber should have the custom fields (role, company focus, etc.) populated

#### Troubleshooting

**Error: "BEEHIV_API_KEY is not configured"**
- Make sure `.env.local` exists in the project root
- Verify the variable name is exactly `BEEHIV_API_KEY` (case-sensitive)
- Restart your development server after adding the variable

**Error: "BEEHIV_PUBLICATION_ID is not configured"**
- Same as above, but check `BEEHIV_PUBLICATION_ID`

**Error: "Invalid API Key" or "Unauthorized"**
- Verify you copied the entire API key (they can be long)
- Check for any extra spaces or characters
- Try regenerating the API key in Beehiiv and updating `.env.local`

**Subscriber not appearing in Beehiiv**
- Check your server console logs for error messages
- Verify the API key has the correct permissions
- Make sure the Publication ID matches the publication you're using

#### Additional Resources

- [Beehiiv API Documentation](https://developers.beehiiv.com/)
- [Beehiiv Help Center](https://help.beehiiv.com/)
- [Finding your Publication ID and API keys](https://help.beehiiv.com/hc/en-us/articles/13091918395799-Where-to-find-your-Publication-ID-or-API-keys)

## Project Structure

```
book/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                 # Homepage
│   ├── book/
│   │   ├── page.tsx             # Table of contents
│   │   └── [pageId]/
│   │       └── page.tsx         # Individual book pages
│   └── api/
│       └── analytics/           # Analytics API routes
├── components/                  # React components
├── lib/                         # Utilities and helpers
├── data/
│   └── book.json                # Book content
└── styles/
    └── globals.css               # Global styles
```

## Brand Guidelines

This project uses the brand guidelines from `2025_12_30`:
- **Colors**: Adenine (Deep Navy), Thymine (Teal), Guanine (Slate), Cytosine (Gold)
- **Typography**: Freight Display Pro (headings), Acumin Pro (body)
- **Styling**: TailwindCSS with custom brand utilities

## License

© 2025 The Brand Attention Strategy. All rights reserved.
