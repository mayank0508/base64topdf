# Base64 to PDF Converter - Browser Extension

A Chrome browser extension that converts Base64 encoded strings to PDF files with instant preview and print functionality.

## Overview

This extension provides a simple interface for users to convert Base64 encoded PDF data into viewable and printable PDF documents. It features a modern UI with loading indicators and error handling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Components](#components)
- [File Structure](#file-structure)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Browser Compatibility](#browser-compatibility)

## Installation

### Manual Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension will appear in your Chrome toolbar

### Extension Store (Future)

This extension can be packaged and submitted to the Chrome Web Store for public distribution.

## Usage

### Basic Usage

1. Click the extension icon in your Chrome toolbar
2. Paste your Base64 encoded PDF string into the textarea
3. Click "Convert to PDF"
4. The PDF will be displayed in a preview window
5. A print dialog will automatically open after 1 second
6. Print or save the PDF as needed

### Supported Input

- **Format**: Base64 encoded strings representing PDF files
- **Size**: No explicit size limit (limited by browser memory)
- **Encoding**: Standard Base64 encoding (RFC 4648)

## API Documentation

### Core Functions

#### `convertBtn` Event Handler

**Location**: `popup.js:1-58`

The main conversion function that handles the Base64 to PDF conversion process.

**Function Signature:**
```javascript
document.getElementById('convertBtn').addEventListener('click', function() { ... })
```

**Parameters:**
- **Input Source**: `document.getElementById('base64Input').value`
- **Type**: String (Base64 encoded PDF data)

**Process Flow:**
1. **Input Validation**: Checks if Base64 string is provided
2. **UI State Management**: Shows loading modal
3. **Base64 Decoding**: Converts Base64 string to binary data
4. **Blob Creation**: Creates PDF blob from binary data
5. **PDF Preview**: Generates iframe with PDF content
6. **Print Initialization**: Automatically triggers print dialog
7. **Cleanup**: Removes temporary elements and URLs

**Return Value**: Void (side effects only)

**Error Handling:**
- Empty input validation with user alert
- PDF loading error handling with cleanup
- Automatic resource cleanup on completion

#### Base64 Decoding Algorithm

**Location**: `popup.js:15-21`

Converts Base64 string to Uint8Array for PDF blob creation.

```javascript
const decodedArrayBuffer = atob(base64String);
const arr = new Uint8Array(decodedArrayBuffer.length);
for (let i = 0; i < decodedArrayBuffer.length; i++) {
  arr[i] = decodedArrayBuffer.charCodeAt(i);
}
```

**Parameters:**
- `base64String` (String): Base64 encoded PDF data

**Returns:**
- `arr` (Uint8Array): Binary representation of PDF data

**Browser API Dependencies:**
- `atob()`: Built-in Base64 decoding function
- `Uint8Array()`: Typed array constructor

#### PDF Blob Creation

**Location**: `popup.js:22`

Creates a downloadable PDF blob from binary data.

```javascript
const blob = new Blob([arr], { type: 'application/pdf' });
```

**Parameters:**
- `arr` (Uint8Array): Binary PDF data
- `options` (Object): Blob configuration
  - `type`: MIME type set to 'application/pdf'

**Returns:**
- `blob` (Blob): PDF blob object

#### URL Management

**Location**: `popup.js:25, 42`

Manages object URLs for PDF preview and cleanup.

```javascript
// Create URL
const url = URL.createObjectURL(blob);

// Cleanup URL
URL.revokeObjectURL(url);
```

**Methods:**
- `URL.createObjectURL(blob)`: Creates temporary URL for blob
- `URL.revokeObjectURL(url)`: Releases memory used by URL

## Components

### 1. Popup Interface (`popup.html`)

#### HTML Structure

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Base64 to PDF</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Base64 to PDF Converter</h1>
    <textarea id="base64Input" placeholder="Paste your Base64 string here..."></textarea>
    <button id="convertBtn">Convert to PDF</button>
    
    <!-- Modal Overlay -->
    <div id="modalOverlay" class="modal-overlay">
      <div class="modal-content">
        <div id="progressContainer" class="progress-container">
          <div id="progressBar" class="progress-bar"></div>
        </div>
        <p id="progressText">Converting... 0%</p>
      </div>
    </div>

    <script src="popup.js"></script>
  </body>
</html>
```

#### Component Elements

| Element ID | Type | Purpose | API Access |
|------------|------|---------|------------|
| `base64Input` | `<textarea>` | Base64 input field | `document.getElementById('base64Input')` |
| `convertBtn` | `<button>` | Conversion trigger | `document.getElementById('convertBtn')` |
| `modalOverlay` | `<div>` | Loading modal container | `document.getElementById('modalOverlay')` |
| `progressContainer` | `<div>` | Progress bar container | `document.getElementById('progressContainer')` |
| `progressBar` | `<div>` | Progress indicator | `document.getElementById('progressBar')` |
| `progressText` | `<p>` | Progress text display | `document.getElementById('progressText')` |

#### Element Properties

**Base64 Input Textarea**
- **ID**: `base64Input`
- **Placeholder**: "Paste your Base64 string here..."
- **Resize**: Disabled (`resize: none`)
- **Dimensions**: 100% width, 100px height

**Convert Button**
- **ID**: `convertBtn`
- **Text**: "Convert to PDF"
- **Style**: Full width, green background (#4caf50)
- **Hover Effect**: Darker green (#45a049)

### 2. Extension Manifest (`manifest.json`)

#### Configuration API

```json
{
  "manifest_version": 3,
  "name": "Base64 to PDF Converter",
  "version": "1.0",
  "description": "Convert Base64 strings to PDF files.",
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  },
  "permissions": ["downloads"]
}
```

#### Manifest Properties

| Property | Value | Purpose |
|----------|-------|---------|
| `manifest_version` | 3 | Chrome Extension Manifest V3 |
| `name` | "Base64 to PDF Converter" | Extension display name |
| `version` | "1.0" | Extension version |
| `description` | "Convert Base64 strings to PDF files." | Extension description |
| `action.default_popup` | "popup.html" | Popup interface file |
| `permissions` | ["downloads"] | Required browser permissions |

#### Icon Configuration

The extension includes three icon sizes for different display contexts:
- **16px**: Toolbar icon (small)
- **48px**: Extension management page
- **128px**: Chrome Web Store and installation

### 3. Styling System (`style.css`)

#### CSS API Classes

| Class/Selector | Purpose | Key Properties |
|----------------|---------|----------------|
| `body` | Main container styling | `width: 300px`, `font-family: Arial` |
| `h1` | Header styling | `font-size: 18px`, `margin-bottom: 10px` |
| `textarea` | Input field styling | `width: 100%`, `height: 100px`, `resize: none` |
| `button` | Convert button styling | `background-color: #4caf50`, `width: 100%` |
| `button:hover` | Button hover state | `background-color: #45a049` |
| `.modal-overlay` | Loading modal overlay | `position: fixed`, `backdrop-filter: blur(5px)` |
| `.modal-content` | Modal content container | `background: white`, `border-radius: 10px` |
| `.progress-container` | Progress bar container | `width: 200px`, `background-color: #f3f3f3` |
| `.progress-bar` | Progress indicator | `background-color: #4caf50`, `transition: width 0.3s` |

#### Responsive Design

The extension uses a fixed width design optimized for browser extension popups:
- **Container Width**: 300px
- **Responsive Elements**: All elements scale to 100% width
- **Fixed Heights**: Textarea (100px), Progress bar (20px)

## Examples

### Example 1: Basic Usage

```javascript
// User pastes Base64 string in textarea
const base64String = "JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCg==";

// User clicks convert button
// Extension automatically:
// 1. Validates input
// 2. Shows loading modal
// 3. Converts to PDF
// 4. Displays preview
// 5. Opens print dialog
```

### Example 2: Error Handling

```javascript
// Empty input scenario
if (!base64String) {
  alert('Please enter a Base64 string.');
  return;
}

// PDF loading error scenario
iframe.onerror = function () {
  alert('Failed to load or display the PDF. Please check your input and try again.');
  // Cleanup resources
  document.body.removeChild(iframe);
  URL.revokeObjectURL(url);
  modalOverlay.style.display = 'none';
};
```

### Example 3: Resource Management

```javascript
// URL creation and cleanup
const url = URL.createObjectURL(blob);

// Automatic cleanup after printing
window.addEventListener('afterprint', function () {
  document.body.removeChild(iframe);
  URL.revokeObjectURL(url);
  modalOverlay.style.display = 'none';
});
```

## Error Handling

### Input Validation

The extension validates user input before processing:

```javascript
if (!base64String) {
  alert('Please enter a Base64 string.');
  return;
}
```

**Error Conditions:**
- Empty input field
- Whitespace-only input
- Null or undefined values

### PDF Processing Errors

```javascript
iframe.onerror = function () {
  alert('Failed to load or display the PDF. Please check your input and try again.');
  // Cleanup code...
};
```

**Error Scenarios:**
- Invalid Base64 encoding
- Corrupted PDF data
- Browser compatibility issues
- Memory limitations

### Resource Cleanup

The extension ensures proper cleanup of temporary resources:

1. **URL Object Cleanup**: `URL.revokeObjectURL(url)`
2. **DOM Element Removal**: `document.body.removeChild(iframe)`
3. **Modal State Reset**: `modalOverlay.style.display = 'none'`

## Browser Compatibility

### Supported Browsers

- **Chrome**: Version 88+ (Manifest V3 support)
- **Edge**: Version 88+ (Chromium-based)
- **Opera**: Version 74+ (Chromium-based)

### Required Browser APIs

| API | Purpose | Compatibility |
|-----|---------|---------------|
| `atob()` | Base64 decoding | Universal support |
| `Blob()` | Binary data handling | Modern browsers |
| `URL.createObjectURL()` | Temporary URLs | Modern browsers |
| `addEventListener()` | Event handling | Universal support |
| `setTimeout()` | Delayed execution | Universal support |

### Extension APIs

- **chrome.downloads**: For future download functionality
- **Manifest V3**: Modern extension framework

## Development

### File Structure

```
/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI interface
├── popup.js              # Core functionality
├── style.css             # Styling definitions
├── icon16.png            # Small icon (16x16)
├── icon48.png            # Medium icon (48x48)
├── icon128.png           # Large icon (128x128)
└── README.md             # This documentation
```

### Code Style Guidelines

- **JavaScript**: ES6+ syntax, no external dependencies
- **HTML**: Semantic markup, accessibility considerations
- **CSS**: Modern CSS3, responsive design principles
- **Comments**: Descriptive comments for complex logic

### Performance Considerations

- **Memory Management**: Automatic cleanup of blob URLs and DOM elements
- **Processing Time**: 1-second delay for PDF loading before print dialog
- **Error Recovery**: Graceful handling of failures with user feedback

### Security Features

- **Content Security Policy**: Implicitly secure through Manifest V3
- **Permissions**: Minimal permissions requested (downloads only)
- **Data Handling**: Client-side processing, no external data transmission

## Future Enhancements

### Planned Features

1. **Direct Download**: Save PDF files directly to downloads folder
2. **Batch Processing**: Convert multiple Base64 strings simultaneously
3. **Format Validation**: Enhanced Base64 and PDF validation
4. **Settings Panel**: User preferences for default behavior
5. **File Drag & Drop**: Support for dropping Base64 text files

### API Extensions

```javascript
// Future download API
chrome.downloads.download({
  url: url,
  filename: 'converted-document.pdf',
  saveAs: true
});

// Future batch processing API
function convertMultiple(base64Array) {
  return base64Array.map(convertSingle);
}
```

## License

This extension is provided as-is for educational and practical use. Please ensure compliance with your organization's security policies when handling sensitive PDF data.

---

*Last Updated: [Current Date]*
*Version: 1.0*