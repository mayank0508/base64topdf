# API Reference - Base64 to PDF Converter

## JavaScript API Documentation

### Core APIs

#### Event Listeners

##### `convertBtn.addEventListener()`

Registers the main conversion event handler for the convert button.

```javascript
document.getElementById('convertBtn').addEventListener('click', function () {
  // Main conversion logic
});
```

**Event Type**: `click`  
**Target Element**: `#convertBtn`  
**Return Value**: `undefined`

---

### Data Processing APIs

#### `atob(base64String)`

**Native Browser API** - Decodes Base64 encoded string to binary string.

```javascript
const decodedArrayBuffer = atob(base64String);
```

**Parameters:**
- `base64String` (string): Base64 encoded data

**Returns:**
- `string`: Binary string representation

**Throws:**
- `DOMException`: If input is not valid Base64

**Example:**
```javascript
const base64 = "SGVsbG8gV29ybGQ=";
const decoded = atob(base64); // "Hello World"
```

---

#### `new Uint8Array(length)`

**Native Browser API** - Creates typed array for binary data.

```javascript
const arr = new Uint8Array(decodedArrayBuffer.length);
for (let i = 0; i < decodedArrayBuffer.length; i++) {
  arr[i] = decodedArrayBuffer.charCodeAt(i);
}
```

**Parameters:**
- `length` (number): Array length

**Returns:**
- `Uint8Array`: Typed array instance

**Example:**
```javascript
const binaryString = "Hello";
const uint8Array = new Uint8Array(binaryString.length);
for (let i = 0; i < binaryString.length; i++) {
  uint8Array[i] = binaryString.charCodeAt(i);
}
```

---

#### `new Blob(data, options)`

**Native Browser API** - Creates blob from binary data.

```javascript
const blob = new Blob([arr], { type: 'application/pdf' });
```

**Parameters:**
- `data` (Array): Array of data chunks
- `options` (Object): Blob configuration
  - `type` (string): MIME type

**Returns:**
- `Blob`: Blob object

**Example:**
```javascript
const textData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
const blob = new Blob([textData], { type: 'text/plain' });
```

---

### URL Management APIs

#### `URL.createObjectURL(object)`

**Native Browser API** - Creates URL for blob object.

```javascript
const url = URL.createObjectURL(blob);
```

**Parameters:**
- `object` (Blob|File|MediaSource): Object to create URL for

**Returns:**
- `string`: Object URL

**Example:**
```javascript
const blob = new Blob(['Hello'], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
// url: "blob:null/550e8400-e29b-41d4-a716-446655440000"
```

---

#### `URL.revokeObjectURL(url)`

**Native Browser API** - Releases object URL to free memory.

```javascript
URL.revokeObjectURL(url);
```

**Parameters:**
- `url` (string): Object URL to revoke

**Returns:**
- `undefined`

**Example:**
```javascript
const url = URL.createObjectURL(blob);
// Use the URL...
URL.revokeObjectURL(url); // Clean up memory
```

---

### DOM Manipulation APIs

#### `document.getElementById(id)`

**Native Browser API** - Gets element by ID.

```javascript
const element = document.getElementById('base64Input');
```

**Parameters:**
- `id` (string): Element ID

**Returns:**
- `Element|null`: DOM element or null if not found

**Example:**
```javascript
const textarea = document.getElementById('base64Input');
const value = textarea.value;
```

---

### Complete Usage Example

```javascript
// Complete conversion flow with all APIs
document.getElementById('convertBtn').addEventListener('click', function () {
  // 1. Get and validate input
  const base64Input = document.getElementById('base64Input');
  const base64String = base64Input.value;
  
  if (!base64String) {
    alert('Please enter a Base64 string.');
    return;
  }

  // 2. Show loading modal
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'flex';

  // 3. Convert Base64 to binary data
  const decodedArrayBuffer = atob(base64String);
  const arr = new Uint8Array(decodedArrayBuffer.length);
  for (let i = 0; i < decodedArrayBuffer.length; i++) {
    arr[i] = decodedArrayBuffer.charCodeAt(i);
  }

  // 4. Create PDF blob
  const blob = new Blob([arr], { type: 'application/pdf' });

  // 5. Create object URL and iframe
  const url = URL.createObjectURL(blob);
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '800px';
  iframe.src = url;
  
  document.body.appendChild(iframe);

  // 6. Trigger print after delay
  setTimeout(() => {
    iframe.contentDocument.focus();
    iframe.contentWindow.print();
  }, 1000);

  // 7. Cleanup after printing
  window.addEventListener('afterprint', function () {
    document.body.removeChild(iframe);
    URL.revokeObjectURL(url);
    modalOverlay.style.display = 'none';
  });

  // 8. Handle errors
  iframe.onerror = function () {
    alert('Failed to load or display the PDF.');
    document.body.removeChild(iframe);
    URL.revokeObjectURL(url);
    modalOverlay.style.display = 'none';
  };
});
```