# Frequently Asked Questions (FAQ)

## General Questions

### Q: What is Microsoft Rewards?
**A:** Microsoft Rewards is a free program that rewards you with points for using Microsoft services like Bing search, making purchases in the Microsoft Store, and more. Points can be redeemed for gift cards, sweepstakes entries, or donated to charity.

### Q: Is this script safe to use?
**A:** The script runs entirely in your browser and doesn't collect or transmit any personal data. However, using automation scripts may violate Microsoft's Terms of Service. Use at your own risk.

### Q: Will I get banned for using this script?
**A:** Microsoft's Terms of Service prohibit automated searches. While the script includes delays and randomization to appear more natural, there's always a risk. Use responsibly and at your own discretion.

### Q: How many points can I earn daily?
**A:** Typically:
- Desktop searches: 30 searches × 5 points = 150 points
- Mobile searches: 20 searches × 5 points = 100 points
- Total: 250 points per day from searches
- Monthly: ~7,500 points from searches alone

Note: Point values may vary by region.

## Installation Questions

### Q: Which browsers are supported?
**A:** The script works on:
- ✅ Chrome/Chromium
- ✅ Microsoft Edge
- ✅ Firefox
- ✅ Brave
- ✅ Opera
- ✅ Safari (with Userscripts app)

### Q: Violentmonkey vs Tampermonkey - which should I use?
**A:** Both work well. Violentmonkey is open-source and lightweight. Tampermonkey has more features. Choose based on preference.

### Q: Can I use this on mobile devices?
**A:** Yes! Install Firefox on Android with Violentmonkey extension, or use Userscripts app on iOS Safari.

### Q: The script doesn't appear after installation. What's wrong?
**A:** Try:
1. Refresh the Bing page (Ctrl+F5)
2. Check that the script is enabled in your script manager
3. Verify you're on bing.com (not google.com or other site)
4. Check browser console (F12) for errors

## Usage Questions

### Q: How do I run mobile searches from my desktop?
**A:** Three options:
1. Use browser DevTools device emulation (F12 → Ctrl+Shift+M)
2. Install a User Agent Switcher extension
3. Use an actual mobile device

### Q: Can I run searches for multiple Microsoft accounts?
**A:** Yes, use different browser profiles or browsers. Each profile/browser maintains separate login sessions.

### Q: How long does it take to complete all searches?
**A:** Approximately:
- Desktop only (30): 5-7 minutes
- Mobile only (20): 3-5 minutes
- Both (50): 8-12 minutes

Times vary due to random delays.

### Q: Can I close the browser while searches are running?
**A:** No, keep the browser tab open and active. The script will pause if you close the tab, but can resume within 5 minutes if you return.

### Q: Do I need to watch the searches happen?
**A:** No! Start the script and let it run in a background tab. Check back when it's done.

## Technical Questions

### Q: How does the script avoid detection?
**A:** The script uses several techniques:
- Random delays between searches (3-5 seconds)
- Random search queries from a large pool
- Unique queries (adds random numbers)
- Natural-looking search patterns

### Q: Can I customize the number of searches?
**A:** Yes! Edit the script and change these values:
```javascript
const CONFIG = {
    desktopSearches: 30,  // Change this
    mobileSearches: 20,   // Change this
    // ...
};
```

### Q: Can I make searches faster?
**A:** Not recommended! Fast searches look suspicious. The default 3-5 second delay is already quite quick. If you must:
```javascript
const CONFIG = {
    delayBetweenSearches: 2000,  // 2 seconds (risky!)
    randomDelayVariation: 1000,
};
```

### Q: Where is my progress saved?
**A:** Progress is saved in your browser's localStorage. It persists across page refreshes but is specific to the Bing domain.

### Q: Can I add my own search queries?
**A:** Yes! Edit the `searchQueries` array in the script to add your own terms.

### Q: Does this work with Bing in other languages?
**A:** Yes, the script works with any Bing region/language. The search queries are in English, but you can customize them.

## Troubleshooting

### Q: Searches start but points don't appear?
**A:** Check:
- Are you logged into your Microsoft account?
- Have you exceeded daily limits?
- Wait 5-15 minutes for points to register
- Check your Microsoft Rewards dashboard

### Q: The script stopped mid-search?
**A:** Possible causes:
- Tab was closed or browser crashed
- Internet connection lost
- Page was refreshed

Solution: Return to Bing within 5 minutes to auto-resume, or restart manually.

### Q: Searches are too slow!
**A:** This is intentional! Slow searches appear more natural and reduce ban risk. If you're impatient, you can customize the delays (see "Can I make searches faster?" above).

### Q: The panel is in the way of other content?
**A:** You can edit the script to reposition the panel:
```javascript
panel.style.cssText = `
    position: fixed;
    top: 10px;     // Change position
    right: 10px;   // Change position
    // Or use: left: 10px; bottom: 10px;
```

### Q: Can I hide the panel?
**A:** The panel is how you control the script. You can minimize it by editing the CSS or add a hide/show button (requires script modification).

## Points & Rewards Questions

### Q: How do I check my points?
**A:** Visit [Microsoft Rewards Dashboard](https://rewards.microsoft.com/) and click "Point activity" or "History".

### Q: Points appear but then disappear?
**A:** This sometimes happens if Microsoft detects suspicious activity. Consider:
- Using slower delays
- Running searches less frequently
- Varying your search times

### Q: What can I redeem points for?
**A:** Visit [Microsoft Rewards Redeem](https://rewards.microsoft.com/redeem) for:
- Gift cards (Amazon, Xbox, Microsoft, etc.)
- Xbox Game Pass subscriptions
- Microsoft products
- Sweepstakes entries
- Charity donations

### Q: Different regions have different point values?
**A:** Yes! Microsoft Rewards availability and point values vary by country. Check your region's rewards program for specific details.

## Best Practices

### Q: How often should I run the script?
**A:** Once per day is recommended. Running multiple times won't earn more points and increases ban risk.

### Q: Best time to run searches?
**A:** Any time! Morning routine is popular. Some users run it:
- First thing in the morning
- During lunch break
- Before bed

### Q: Should I run desktop and mobile separately?
**A:** Either way works:
- **Separate**: More control, can spread throughout the day
- **Together**: One-click convenience, faster completion

### Q: Can I combine this with manual searches?
**A:** Yes! The script just automates the process. You can still search normally.

## Safety & Privacy

### Q: Does the script collect my data?
**A:** No! The script runs entirely in your browser. It doesn't send data anywhere except to Bing (which you're already using).

### Q: Can others see what I'm searching?
**A:** Only Bing/Microsoft can see your searches (same as manual searching). The script doesn't share your searches with anyone else.

### Q: Should I review the script code before installing?
**A:** Yes! Always review scripts before installation. The code is open and readable. Look for:
- No external connections
- No data collection
- No suspicious functions

### Q: How do I uninstall?
**A:** In your script manager:
1. Click the extension icon
2. Find "Microsoft Rewards Auto Search"
3. Click delete/remove
4. Confirm deletion

## Advanced Questions

### Q: Can I run this on a server?
**A:** Not recommended. The script is designed for browser use. Server automation is more easily detected and likely violates ToS.

### Q: Can I modify the script?
**A:** Yes! It's open source. Feel free to customize it for your needs.

### Q: Where can I report bugs?
**A:** Check the repository's Issues section on GitHub.

### Q: Can I contribute improvements?
**A:** Yes! Fork the repository, make changes, and submit a pull request.

### Q: Will this work with Microsoft Edge Rewards?
**A:** Yes! Microsoft Edge Rewards and Microsoft Rewards are the same program. The script works with any browser accessing Bing.

## Limitations

### Q: Can this earn unlimited points?
**A:** No. Microsoft imposes daily limits:
- Desktop: Usually 30 searches max
- Mobile: Usually 20 searches max
- Other activities have separate limits

### Q: Does this complete other reward activities?
**A:** No. The script only automates Bing searches. Other activities (quizzes, polls, etc.) must be done manually.

### Q: Can I schedule automatic daily runs?
**A:** The script doesn't include scheduling. You must manually start it each day. You could use browser automation tools, but this increases detection risk.

## Getting Help

### Q: Where can I get more help?
**A:** Check:
1. [README.md](README.md) - Overview and features
2. [INSTALLATION.md](INSTALLATION.md) - Installation guide
3. [USAGE.md](USAGE.md) - Detailed usage instructions
4. [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - UI/UX guide
5. GitHub Issues - Report bugs or ask questions

### Q: The script isn't working, what do I do?
**A:** Debug steps:
1. Check browser console (F12) for errors
2. Verify script is enabled in script manager
3. Confirm you're on bing.com
4. Try reinstalling the script
5. Test in a fresh browser profile
6. Check GitHub Issues for similar problems

---

## Still have questions?

If your question isn't answered here, check the other documentation files or open an issue on GitHub!
