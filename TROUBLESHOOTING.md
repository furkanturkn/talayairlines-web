# Troubleshooting Guide

## Browser Console Errors

### "Unchecked runtime.lastError: The message port closed before a response was received."

This error is typically related to browser extensions rather than an issue with the website itself. Try the following solutions:

1. **Try a different browser**: Open the website in a different browser (like Firefox if you're using Chrome, or vice versa) to see if the error persists.

2. **Disable browser extensions**: 
   - Chrome: Open chrome://extensions/ and disable all extensions, then reload the page
   - Firefox: Open about:addons and disable all extensions, then reload the page
   - Safari: Go to Preferences > Extensions and disable all extensions

3. **Use Incognito/Private mode**: Open the website in an incognito/private window, which typically disables extensions.

4. **Clear browser cache and cookies**:
   - Chrome: Settings > Privacy and security > Clear browsing data
   - Firefox: Options > Privacy & Security > Cookies and Site Data > Clear Data
   - Safari: Preferences > Privacy > Manage Website Data > Remove All

5. **Check for browser updates**: Make sure your browser is up to date.

## Development Server Issues

If you're experiencing issues with the development server:

1. **Restart the development server**:
   ```bash
   # Kill any existing Next.js processes
   pkill -f "next dev"
   
   # Start the server on a specific port
   npm run dev -- -p 3005
   ```

2. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Check for port conflicts**:
   If you see messages about ports being in use, you can specify a different port:
   ```bash
   npm run dev -- -p 3010
   ```

## Hydration Errors

If you see hydration errors in the console (mismatches between server and client rendering):

1. Make sure any code that uses browser APIs (like `window` or `document`) or generates random values is properly wrapped in `useEffect` hooks.

2. Ensure that date formatting is consistent between server and client.

3. Check for conditional rendering that might differ between server and client.

## Still Having Issues?

If you're still experiencing problems:

1. Try a production build to see if the issue persists:
   ```bash
   npm run build
   npm start
   ```

2. Check the browser console for more specific error messages that might provide additional clues.

3. Examine the network tab in developer tools to see if any resources are failing to load. 