# Text Styles Thumbnail Calculator

Interactive playground for testing the font size scaling logic used in the Elements Panel.

## Features

### Two View Modes:

**Preview Mode:**
- Adjust Min/Max Thumbnail Sizes with sliders (12px-24px default)
- Edit each heading's actual size with range sliders (12px-160px)
- Live preview of thumbnails updating in real-time
- Calculation breakdown table showing the math
- Visual formula display with actual values

**Edit Values Mode:**
- Direct input for Font Size and Line Height for each heading
- Editable heading names
- Calculated line height ratios (em values)
- Real-time thumbnail size calculations
- Clean, focused editing interface

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

   Opens on http://localhost:3000

## File Structure

```
text-styles-calculator/
├── src/
│   ├── text-styles-playground.jsx  # Main component
│   ├── index.js                     # React entry point
│   └── index.css                    # Styles
├── public/
│   └── index.html
└── package.json
```

## How It Works

The scaling logic uses **linear interpolation** to map actual font sizes to thumbnail display sizes:

```javascript
thumbnailSize = MIN_THUMBNAIL + 
  ((actualSize - minActualSize) / (maxActualSize - minActualSize)) × 
  (MAX_THUMBNAIL - MIN_THUMBNAIL)
```

### Example Calculation

With default values:
- Min thumbnail: 12px
- Max thumbnail: 24px  
- Actual sizes: 24px to 88px (range of 64px)

For Heading 1 (88px):
```
12 + ((88 - 24) / 64) × 12 = 12 + 12 = 24px ✓
```

For Heading 3 (56px):
```
12 + ((56 - 24) / 64) × 12 = 12 + 6 = 18px
```

## Usage Tips

### Preview Mode:
1. **Test Edge Cases**: 
   - Set Heading 6 to 160px to see how all thumbnails recalculate
   - Make all headings the same size to see uniform thumbnails

2. **Adjust Range**:
   - Increase max thumbnail to 40px for more dramatic size differences
   - Decrease min thumbnail to 8px for more compressed small headings

3. **Watch the Math**:
   - Blue numbers show calculated thumbnail sizes
   - Gray formulas show the actual calculation
   - Table at bottom shows complete breakdown

### Edit Values Mode:
1. **Direct Input**:
   - Click on any Font Size or Line Height field to type exact values
   - Edit heading names by clicking on them
   - Watch the Line Height Ratio update automatically (shows em value)

2. **Instant Feedback**:
   - Thumbnail sizes calculate and display in real-time below each heading
   - Changes reflect immediately in Preview mode when you switch back

3. **Professional Specs**:
   - Set precise font sizes like you would in a design tool
   - Define line heights that match your design system
   - Copy values directly from Figma, Sketch, or design specs

## Specs from Wix

Based on the actual Elements Panel:
- Container height: 64px (fixed)
- Container background: #F8F6F6
- Gap between items: 12px
- Content width: 540px
- Default thumbnail range: 12px-24px

## Default Heading Sizes

- Heading 1: 88px / 88px line height (1.0em)
- Heading 2: 64px / 72px line height (1.125em)
- Heading 3: 56px / 64px line height (1.14em)
- Heading 4: 48px / 52px line height (1.08em)
- Heading 5: 32px / 40px line height (1.25em)
- Heading 6: 24px / 30px line height (1.25em)

All use Wix Madefor Display font.
