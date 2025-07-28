# Component Documentation - Base64 to PDF Converter

## UI Components Reference

### HTML Components

#### Main Container (`popup.html`)

The extension's user interface consists of a compact popup window with form elements and a modal overlay system.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Base64 to PDF</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- Main UI components -->
  </body>
</html>
```

---

### Form Components

#### 1. Header Component

**Element**: `<h1>`  
**Content**: "Base64 to PDF Converter"  
**Purpose**: Application title and branding

```html
<h1>Base64 to PDF Converter</h1>
```

**Styling:**
- Font size: 18px
- Margin bottom: 10px
- Font family: Arial, sans-serif

**API Access:**
```javascript
const header = document.querySelector('h1');
header.textContent = 'Custom Title'; // Modify title
```

---

#### 2. Base64 Input Component

**Element**: `<textarea>`  
**ID**: `base64Input`  
**Purpose**: User input field for Base64 encoded PDF data

```html
<textarea
  id="base64Input"
  placeholder="Paste your Base64 string here..."
></textarea>
```

**Properties:**

| Property | Value | Description |
|----------|-------|-------------|
| `id` | `base64Input` | Unique identifier for JavaScript access |
| `placeholder` | "Paste your Base64 string here..." | User guidance text |
| `resize` | `none` (CSS) | Prevents manual resizing |
| `width` | `100%` (CSS) | Full container width |
| `height` | `100px` (CSS) | Fixed height |

**JavaScript API:**
```javascript
const input = document.getElementById('base64Input');

// Get input value
const base64Data = input.value;

// Set input value
input.value = 'JVBERi0xLjQ...';

// Clear input
input.value = '';

// Focus input
input.focus();

// Add event listeners
input.addEventListener('input', (e) => {
  console.log('Input changed:', e.target.value);
});

input.addEventListener('paste', (e) => {
  console.log('Data pasted');
});
```

**Validation:**
- Required field (validated in JavaScript)
- No format validation (accepts any string)
- Trimmed for whitespace handling

---

#### 3. Convert Button Component

**Element**: `<button>`  
**ID**: `convertBtn`  
**Purpose**: Triggers Base64 to PDF conversion process

```html
<button id="convertBtn">Convert to PDF</button>
```

**Properties:**

| Property | Value | Description |
|----------|-------|-------------|
| `id` | `convertBtn` | Unique identifier for event handling |
| `type` | `button` (default) | Standard button type |
| `width` | `100%` (CSS) | Full container width |
| `background-color` | `#4caf50` (CSS) | Green background |
| `color` | `white` (CSS) | White text |

**States:**

| State | CSS | Behavior |
|-------|-----|----------|
| Default | `background-color: #4caf50` | Green background |
| Hover | `background-color: #45a049` | Darker green |
| Active | User click triggers conversion | Event handler execution |
| Disabled | `disabled: true` | Prevents interaction |

**JavaScript API:**
```javascript
const button = document.getElementById('convertBtn');

// Add click handler
button.addEventListener('click', () => {
  console.log('Convert button clicked');
});

// Disable/enable button
button.disabled = true;  // Disable
button.disabled = false; // Enable

// Change button text
button.textContent = 'Converting...';
button.textContent = 'Convert to PDF'; // Reset

// Check button state
if (button.disabled) {
  console.log('Button is disabled');
}
```

---

### Modal Components

#### 4. Modal Overlay Component

**Element**: `<div>`  
**ID**: `modalOverlay`  
**Class**: `modal-overlay`  
**Purpose**: Loading indicator during PDF conversion

```html
<div id="modalOverlay" class="modal-overlay">
  <div class="modal-content">
    <div id="progressContainer" class="progress-container">
      <div id="progressBar" class="progress-bar"></div>
    </div>
    <p id="progressText">Converting... 0%</p>
  </div>
</div>
```

**CSS Properties:**
```css
.modal-overlay {
  display: none; /* Hidden by default */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
```

**JavaScript API:**
```javascript
const modal = document.getElementById('modalOverlay');

// Show modal
modal.style.display = 'flex';

// Hide modal
modal.style.display = 'none';

// Check if modal is visible
const isVisible = modal.style.display === 'flex';

// Add custom content
const modalContent = modal.querySelector('.modal-content');
modalContent.innerHTML = '<p>Custom loading message</p>';
```

---

#### 5. Modal Content Component

**Element**: `<div>`  
**Class**: `modal-content`  
**Purpose**: Container for modal interior content

```html
<div class="modal-content">
  <!-- Progress components -->
</div>
```

**CSS Properties:**
```css
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
```

**Customization:**
```javascript
const content = document.querySelector('.modal-content');

// Modify styling
content.style.backgroundColor = '#f0f0f0';
content.style.borderRadius = '15px';
content.style.padding = '30px';

// Add custom elements
const customElement = document.createElement('div');
customElement.textContent = 'Processing PDF...';
content.appendChild(customElement);
```

---

#### 6. Progress Container Component

**Element**: `<div>`  
**ID**: `progressContainer`  
**Class**: `progress-container`  
**Purpose**: Progress bar background container

```html
<div id="progressContainer" class="progress-container">
  <div id="progressBar" class="progress-bar"></div>
</div>
```

**CSS Properties:**
```css
.progress-container {
  width: 200px;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}
```

**JavaScript API:**
```javascript
const container = document.getElementById('progressContainer');

// Modify container width
container.style.width = '250px';

// Change background color
container.style.backgroundColor = '#e0e0e0';

// Hide/show progress bar
container.style.display = 'none'; // Hide
container.style.display = 'block'; // Show
```

---

#### 7. Progress Bar Component

**Element**: `<div>`  
**ID**: `progressBar`  
**Class**: `progress-bar`  
**Purpose**: Visual progress indicator

```html
<div id="progressBar" class="progress-bar"></div>
```

**CSS Properties:**
```css
.progress-bar {
  width: 0%;
  height: 20px;
  background-color: #4caf50;
  border-radius: 5px;
  transition: width 0.3s ease;
}
```

**JavaScript API:**
```javascript
const progressBar = document.getElementById('progressBar');

// Set progress percentage
function setProgress(percentage) {
  progressBar.style.width = percentage + '%';
}

// Examples
setProgress(0);   // 0% - start
setProgress(50);  // 50% - halfway
setProgress(100); // 100% - complete

// Animate progress
function animateProgress(duration = 2000) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    setProgress(progress);
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, duration / 50);
}

// Custom colors
progressBar.style.backgroundColor = '#ff6b6b'; // Red
progressBar.style.backgroundColor = '#4ecdc4'; // Teal
progressBar.style.backgroundColor = '#45b7d1'; // Blue
```

---

#### 8. Progress Text Component

**Element**: `<p>`  
**ID**: `progressText`  
**Purpose**: Textual progress information

```html
<p id="progressText">Converting... 0%</p>
```

**CSS Properties:**
```css
#progressText {
  margin: 0;
  font-size: 14px;
  color: #333;
}
```

**JavaScript API:**
```javascript
const progressText = document.getElementById('progressText');

// Update progress text
progressText.textContent = 'Converting... 25%';
progressText.textContent = 'Processing PDF data...';
progressText.textContent = 'Generating preview...';
progressText.textContent = 'Complete!';

// Dynamic progress updates
function updateProgress(percentage, message = 'Converting') {
  progressText.textContent = `${message}... ${percentage}%`;
}

// Examples
updateProgress(0, 'Starting');
updateProgress(33, 'Decoding Base64');
updateProgress(66, 'Creating PDF');
updateProgress(100, 'Complete');

// Custom styling
progressText.style.color = '#007bff';
progressText.style.fontSize = '16px';
progressText.style.fontWeight = 'bold';
```

---

## CSS Classes Reference

### Layout Classes

#### `.modal-overlay`
```css
.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
```

**Purpose**: Full-screen modal backdrop with blur effect  
**Usage**: Applied to modal overlay container  
**Key Features**: 
- Fixed positioning
- Semi-transparent background
- Backdrop blur effect
- Flexbox centering

#### `.modal-content`
```css
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
```

**Purpose**: Modal content container styling  
**Usage**: Applied to modal interior content  
**Key Features**:
- White background
- Rounded corners
- Centered text alignment
- Internal padding

### Progress Classes

#### `.progress-container`
```css
.progress-container {
  width: 200px;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}
```

**Purpose**: Progress bar track/background  
**Usage**: Container for progress bar element  
**Key Features**:
- Fixed width
- Light gray background
- Rounded corners
- Hidden overflow

#### `.progress-bar`
```css
.progress-bar {
  width: 0%;
  height: 20px;
  background-color: #4caf50;
  border-radius: 5px;
  transition: width 0.3s ease;
}
```

**Purpose**: Animated progress indicator  
**Usage**: Visual progress representation  
**Key Features**:
- Variable width (0-100%)
- Green background
- Smooth animation transition
- Fixed height

### Element Selectors

#### `body`
```css
body {
  font-family: Arial, sans-serif;
  padding: 10px;
  width: 300px;
  position: relative;
}
```

**Purpose**: Main container styling  
**Scope**: Entire popup interface  
**Key Features**:
- Fixed width for extension popup
- Arial font family
- Internal padding
- Relative positioning for modal overlay

#### `h1`
```css
h1 {
  font-size: 18px;
  margin-bottom: 10px;
}
```

**Purpose**: Header text styling  
**Scope**: Application title  
**Key Features**:
- Larger font size
- Bottom margin for spacing

#### `textarea`
```css
textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  resize: none;
}
```

**Purpose**: Input field styling  
**Scope**: Base64 input textarea  
**Key Features**:
- Full width
- Fixed height
- Bottom margin
- Resize disabled

#### `button`
```css
button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
```

**Purpose**: Convert button styling  
**Scope**: Main action button  
**Key Features**:
- Full width
- Green color scheme
- No border
- Hover effect
- Pointer cursor

---

## Component Integration Examples

### Complete Modal Control
```javascript
// Modal management utility
class ModalController {
  constructor() {
    this.modal = document.getElementById('modalOverlay');
    this.progressBar = document.getElementById('progressBar');
    this.progressText = document.getElementById('progressText');
  }

  show(message = 'Loading...') {
    this.modal.style.display = 'flex';
    this.progressText.textContent = message;
    this.setProgress(0);
  }

  hide() {
    this.modal.style.display = 'none';
  }

  setProgress(percentage) {
    this.progressBar.style.width = percentage + '%';
    this.progressText.textContent = `Converting... ${percentage}%`;
  }

  setMessage(message) {
    this.progressText.textContent = message;
  }
}

// Usage
const modal = new ModalController();
modal.show('Starting conversion...');
modal.setProgress(50);
modal.setMessage('Processing PDF...');
modal.hide();
```

### Form Validation Component
```javascript
// Input validation utility
class InputValidator {
  constructor() {
    this.input = document.getElementById('base64Input');
    this.button = document.getElementById('convertBtn');
  }

  validate() {
    const value = this.input.value.trim();
    const isValid = value.length > 0;
    
    this.button.disabled = !isValid;
    this.input.style.borderColor = isValid ? '#4caf50' : '#f44336';
    
    return isValid;
  }

  clear() {
    this.input.value = '';
    this.button.disabled = true;
    this.input.style.borderColor = '';
  }

  setValue(base64String) {
    this.input.value = base64String;
    this.validate();
  }
}

// Usage
const validator = new InputValidator();
document.getElementById('base64Input').addEventListener('input', () => {
  validator.validate();
});
```

---

*Component documentation last updated: December 2024*