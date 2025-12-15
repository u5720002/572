# Visual Guide

## What You'll See

### 1. Control Panel

When you visit Bing.com with the script installed, you'll see a beautiful purple panel in the top-right corner:

```
┌─────────────────────────────────┐
│ 🎁 MS Rewards Auto Search       │
├─────────────────────────────────┤
│ Mode: Desktop                   │
│ Progress: 0 / 0                 │
│ Status: Ready                   │
├─────────────────────────────────┤
│ [Progress Bar: ░░░░░░░░░░]     │
├─────────────────────────────────┤
│ [🖥️ Start Desktop (30)]        │
│ [📱 Start Mobile (20)]          │
│ [🚀 Start Both (50)]            │
│ [⏸️ Stop]                       │
└─────────────────────────────────┘
```

### 2. During Search Execution

When searches are running:

```
┌─────────────────────────────────┐
│ 🎁 MS Rewards Auto Search       │
├─────────────────────────────────┤
│ Mode: Desktop                   │
│ Progress: 15 / 30              │
│ Status: Searching: weather...   │
├─────────────────────────────────┤
│ [Progress Bar: ██████░░░░] 50%  │
├─────────────────────────────────┤
│ [🖥️ Start Desktop (30)] ⚫      │
│ [📱 Start Mobile (20)] ⚫        │
│ [🚀 Start Both (50)] ⚫          │
│ [⏸️ Stop] ✅                    │
└─────────────────────────────────┘
```

### 3. Completion

When all searches complete:

```
┌─────────────────────────────────┐
│ 🎁 MS Rewards Auto Search       │
├─────────────────────────────────┤
│ Mode: Desktop                   │
│ Progress: 30 / 30              │
│ Status: ✅ Completed!           │
├─────────────────────────────────┤
│ [Progress Bar: ██████████] 100% │
├─────────────────────────────────┤
│ [🖥️ Start Desktop (30)] ✅      │
│ [📱 Start Mobile (20)] ✅        │
│ [🚀 Start Both (50)] ✅          │
│ [⏸️ Stop] ⚫                    │
└─────────────────────────────────┘
```

## Color Scheme

- **Panel Background**: Purple gradient (Professional and modern)
- **Buttons**:
  - Desktop: Green (#4CAF50)
  - Mobile: Blue (#2196F3)
  - Both: Orange (#FF9800)
  - Stop: Red (#f44336)
- **Progress Bar**: Green (#4CAF50)
- **Text**: White on colored background

## Button States

### Active (Ready to Click)
- Full color saturation
- Clickable cursor
- Hover effect (slight opacity change)

### Disabled (During Execution)
- Grayed out appearance
- Not clickable
- No hover effect

## Screen Layouts

### Desktop View

```
┌─────────────────────────────────────────────────┐
│  Bing                                  [Panel]  │
│  ┌─────────────────────────────────┐   ↑       │
│  │ [Search Box                   ] │   │       │
│  └─────────────────────────────────┘   │       │
│                                         │       │
│  Trending Searches                  Located    │
│  • News                             Top-Right  │
│  • Weather                              │       │
│  • Sports                               ↓       │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Mobile View

```
┌───────────────────────┐
│  Bing        [Panel]  │
│  ┌─────────────────┐  │
│  │ Search Box    🔍│  │
│  └─────────────────┘  │
│                       │
│  Trending             │
│  • News               │
│  • Weather            │
│                       │
│  Panel positioned     │
│  at top-right,        │
│  scales for mobile    │
│                       │
└───────────────────────┘
```

## Panel Features

### 1. Gradient Background
- Starts with purple (#667eea)
- Transitions to darker purple (#764ba2)
- Creates depth and modern look

### 2. Shadow Effects
- Subtle box shadow for depth
- Makes panel "float" above page
- Professional appearance

### 3. Rounded Corners
- 10px border radius on panel
- 5px border radius on buttons
- Smooth, modern design

### 4. Responsive Layout
- Fixed position (stays visible when scrolling)
- Minimum width of 280px
- Adapts to different screen sizes

### 5. Typography
- Font: Segoe UI (Microsoft's design language)
- Fallbacks: Tahoma, Geneva, Verdana, sans-serif
- Clean, readable text

## Progress Indicators

### Progress Bar Animation
```
0%:   [░░░░░░░░░░]
25%:  [██░░░░░░░░]
50%:  [█████░░░░░]
75%:  [████████░░]
100%: [██████████]
```

### Status Messages
- "Ready" - Initial state
- "Running Desktop..." - Desktop searches active
- "Running Mobile..." - Mobile searches active
- "Running Both..." - Both modes active
- "Searching: query..." - Current search query
- "✅ Completed!" - All done
- "⏸️ Stopped" - Manually stopped

## User Experience Flow

### First Time User
1. **Lands on Bing** → Sees purple panel
2. **Reads panel** → Understands options
3. **Clicks button** → Searches start
4. **Watches progress** → Sees bar fill up
5. **Completion** → Gets confirmation

### Regular User
1. **Visits Bing** → Panel appears
2. **Quick click** → "Start Both"
3. **Continues browsing** → Checks back later
4. **Completion** → Points earned!

## Accessibility Features

- **High Contrast**: White text on colored backgrounds
- **Clear Labels**: Emoji + text for all buttons
- **Status Updates**: Real-time feedback
- **Visual Progress**: Multiple progress indicators
- **Large Buttons**: Easy to click/tap

## Mobile Optimization

### Touch-Friendly
- Buttons sized for easy tapping
- Adequate spacing between elements
- No tiny click targets

### Screen Size Adaptation
- Panel doesn't overflow small screens
- Text scales appropriately
- Maintains readability

### Performance
- Lightweight CSS
- No heavy animations
- Fast loading

## Browser Compatibility

✅ **Chrome/Edge**: Full support
✅ **Firefox**: Full support
✅ **Safari**: Full support (with Userscripts app)
✅ **Brave**: Full support
✅ **Opera**: Full support

## Animation Details

### Hover Effects
```
Normal State → Hover
Opacity: 1.0 → 0.8
Transition: 0.3s smooth
```

### Progress Bar
```
Width changes with smooth transition
Transition: width 0.3s ease
Updates in real-time
```

### Button State Changes
```
Enabled → Disabled
Color → Gray
Cursor → Not-allowed
Instant change (no animation)
```

## Tips for Best Visual Experience

1. **Use Modern Browser**: Latest Chrome, Firefox, or Edge
2. **Full Screen**: More space for panel
3. **Zoom Level**: 100% recommended
4. **Theme**: Works with both light and dark Bing themes
5. **Extensions**: Disable ad blockers if panel doesn't appear

## Customization (Advanced)

Users can customize panel appearance by editing the script:

### Change Panel Position
```javascript
panel.style.cssText = `
    position: fixed;
    top: 10px;      // Change this
    right: 10px;    // Or this
    ...
`;
```

### Change Colors
```javascript
// Panel gradient
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// Button colors
background: #4CAF50; // Desktop (Green)
background: #2196F3; // Mobile (Blue)
background: #FF9800; // Both (Orange)
background: #f44336; // Stop (Red)
```

### Change Size
```javascript
min-width: 280px;  // Panel width
padding: 20px;     // Internal spacing
font-size: 18px;   // Title size
```

## Visual Feedback Summary

| Action | Visual Feedback |
|--------|----------------|
| Script loads | Panel appears |
| Button click | Button disables, status updates |
| Search starts | Progress bar begins filling |
| Each search | Counter increments, status shows query |
| Completion | Green checkmark, "Completed!" message |
| Stop clicked | Red pause icon, "Stopped" message |
| Error | Status shows error message |

This creates a smooth, intuitive user experience with constant visual feedback!
