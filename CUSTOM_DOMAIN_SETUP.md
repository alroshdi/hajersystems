# Custom Domain Setup Guide for hajeralroshdi.github.io

## 🎯 Goal: Set up hajeralroshdi.com (or your preferred domain)

---

## STEP 1: Register Your Domain

### Option A: Free Domain (Recommended to Start)
**Freenom** - Get free domains like `.tk`, `.ml`, `.ga`, `.cf`

1. Go to: https://www.freenom.com
2. Search for: `hajeralroshdi.ml` or `hajeralroshdi.tk`
3. Add to cart (FREE)
4. Complete registration (no payment needed)
5. **Remember your Freenom login credentials!**

### Option B: Paid Domain (Professional)
**Namecheap** - Best value (~$10-15/year)

1. Go to: https://www.namecheap.com
2. Search: `hajeralroshdi.com`
3. Add to cart and checkout
4. Complete payment
5. **Remember your Namecheap login credentials!**

---

## STEP 2: Configure DNS Records

### For Freenom (Free Domain):
1. Login to Freenom
2. Go to "My Domains" → Select your domain
3. Click "Manage Domain" → "Manage Freenom DNS"
4. Add these records:

**Delete existing records, then add:**

```
Type: A
Name: (leave empty or @)
TTL: 3600
Target: 185.199.108.153

Type: A
Name: (leave empty or @)
TTL: 3600
Target: 185.199.109.153

Type: A
Name: (leave empty or @)
TTL: 3600
Target: 185.199.110.153

Type: A
Name: (leave empty or @)
TTL: 3600
Target: 185.199.111.153

Type: CNAME
Name: www
TTL: 3600
Target: alroshdi92.github.io
```

5. Click "Save Changes"
6. Wait 5-10 minutes for DNS propagation

### For Namecheap (Paid Domain):
1. Login to Namecheap
2. Go to "Domain List" → Select your domain
3. Click "Manage" → "Advanced DNS"
4. Add these records:

**Remove existing A records, then add:**

```
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.109.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic

Type: CNAME Record
Host: www
Value: alroshdi92.github.io
TTL: Automatic
```

5. Click "Save All Changes"
6. Wait 5-10 minutes for DNS propagation

---

## STEP 3: Update GitHub Repository

### Update CNAME File:
1. The CNAME file is already in your repository
2. Replace `yourdomain.com` with your actual domain

### Update via GitHub Website:
1. Go to: https://github.com/alroshdi92/hajeralroshdi.github.io
2. Click on `CNAME` file
3. Click "Edit" (pencil icon)
4. Change content to your domain (e.g., `hajeralroshdi.ml`)
5. Click "Commit changes"

---

## STEP 4: Configure GitHub Pages Settings

1. Go to: https://github.com/alroshdi92/hajeralroshdi.github.io/settings/pages

2. Scroll to "Custom domain" section

3. Enter your domain (e.g., `hajeralroshdi.ml` or `hajeralroshdi.com`)

4. ✅ Check "Enforce HTTPS" (will be available after DNS propagates)

5. Click "Save"

6. Wait 10-15 minutes for:
   - DNS to propagate
   - GitHub to verify domain
   - SSL certificate to be issued

---

## STEP 5: Verify Setup

### Check DNS Propagation:
Visit: https://www.whatsmydns.net/#A/yourdomain.com

Look for these IPs:
- 185.199.108.153 ✅
- 185.199.109.153 ✅
- 185.199.110.153 ✅
- 185.199.111.153 ✅

### Test Your Site:
1. Visit: `https://yourdomain.com` (wait 10-15 min after DNS setup)
2. Visit: `https://www.yourdomain.com` (should redirect to main domain)

---

## 📋 Quick Checklist

- [ ] Domain registered (Freenom or Namecheap)
- [ ] DNS A records added (4 IP addresses)
- [ ] DNS CNAME record added (www → alroshdi92.github.io)
- [ ] CNAME file updated in GitHub repository
- [ ] Custom domain entered in GitHub Pages settings
- [ ] HTTPS enforced (checked after DNS propagation)
- [ ] Site accessible at your custom domain

---

## 🔧 Troubleshooting

### Domain not working?
- Wait 15-30 minutes for DNS propagation (can take up to 24 hours)
- Check DNS records are correct
- Verify CNAME file exists in repository
- Check GitHub Pages settings show your domain

### HTTPS not available?
- Wait 10-15 minutes after adding domain
- Make sure DNS is fully propagated
- Uncheck/recheck "Enforce HTTPS" in settings

### Need help?
- Check GitHub Pages docs: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Verify DNS: https://www.whatsmydns.net

---

## ✨ Expected Result

Your portfolio will be accessible at:
- 🌐 `https://hajeralroshdi.ml` (or your chosen domain)
- 🌐 `https://www.hajeralroshdi.ml` (redirects to main)

Both URLs will work and redirect to HTTPS automatically!







