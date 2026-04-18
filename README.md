# DevOps Engineer Portfolio

A modern, fully static personal portfolio website designed for a DevOps Engineer. Built using HTML, CSS, and JavaScript.

## Features
- **Dark Mode Design**: A modern, minimalistic aesthetic fitting for a DevOps engineer.
- **Interactive Terminal**: A custom JavaScript terminal allowing users to run commands like `help`, `about`, `skills`, and `projects`.
- **Fully Responsive**: Optimized for both desktop and mobile views.
- **Static Contact Form**: Utilizes `mailto:` links to open the user's default email client, keeping the site 100% static.
- **High Performance**: Lightweight static assets ready for fast delivery.

## Local Development
Since this is a fully static website, you can view it locally by simply opening the `index.html` file in your web browser. 
For a better experience (to avoid CORS issues with certain assets if added later), serve it using a local static server:
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .
```

---

## AWS S3 Deployment Guide (Static Website Hosting)

This website is designed to be hosted cheaply and effectively on AWS S3. Follow these steps to deploy your site.

### 1. Create an S3 Bucket
1. Log in to the AWS Management Console.
2. Navigate to **S3**.
3. Click **Create bucket**.
4. **Bucket Name**: Enter a globally unique name (e.g., `parvesh-mushraf-portfolio`). If you plan to use a custom domain later, name the bucket exactly as your domain (e.g., `portfolio.yourdomain.com`).
5. **AWS Region**: Choose a region close to your target audience.
6. **Object Ownership**: Leave as ACLs disabled (recommended).
7. **Block Public Access settings**: 
   - Uncheck **Block all public access**.
   - Acknowledge that the current settings might result in this bucket and the objects within becoming public.
8. Click **Create bucket**.

### 2. Enable Static Website Hosting
1. Click on your newly created bucket.
2. Go to the **Properties** tab.
3. Scroll down to **Static website hosting** and click **Edit**.
4. Select **Enable**.
5. **Hosting type**: Host a static website.
6. **Index document**: Enter `index.html`.
7. **Error document**: Enter `index.html` (Optional, useful if you add a 404 page later).
8. Click **Save changes**.

### 3. Update Bucket Policy (Make Content Public)
To allow anyone on the internet to view your website, you must add a bucket policy.
1. Go to the **Permissions** tab of your bucket.
2. Scroll to **Bucket policy** and click **Edit**.
3. Paste the following JSON, replacing `YOUR-BUCKET-NAME` with your actual bucket name:

\`\`\`json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
\`\`\`
4. Click **Save changes**.

### 4. Upload Files
1. Go to the **Objects** tab of your bucket.
2. Click **Upload**.
3. Click **Add files** and select `index.html`.
4. Click **Add folder** and upload the `css`, `js`, and `assets` folders.
5. Click **Upload**.

### 5. Access Your Website
1. Go to the **Properties** tab.
2. Scroll down to **Static website hosting**.
3. Click the **Bucket website endpoint** URL. Your site is now live!

---

## Optional: Advanced AWS Setup

To make your portfolio more professional, consider adding a CDN and custom domain:

### Setup CloudFront (CDN + HTTPS)
S3 static website endpoints only support HTTP. To serve your site securely over HTTPS and improve global loading speeds:
1. Go to **CloudFront** and click **Create Distribution**.
2. **Origin domain**: Select your S3 bucket's *website endpoint* (do not select the standard S3 bucket from the dropdown, paste the URL from Step 5 above).
3. **Viewer protocol policy**: Select **Redirect HTTP to HTTPS**.
4. Create the distribution and wait for it to deploy. Use the CloudFront provided `xxxx.cloudfront.net` domain to access your site securely.

### Custom Domain using Route 53
1. Register a domain in **Route 53** (or your preferred registrar).
2. Request a free SSL certificate in **AWS Certificate Manager (ACM)** in the `us-east-1` region.
3. Attach the certificate to your CloudFront distribution and add your domain as an Alternate Domain Name (CNAME).
4. Create an `A Record` in Route 53 pointing to your CloudFront distribution as an Alias.