# Usage Examples - Base64 to PDF Converter

## Practical Implementation Examples

### Basic Usage Examples

#### Example 1: Simple Base64 PDF Conversion

```javascript
// Example Base64 PDF data (minimal PDF structure)
const sampleBase64PDF = `
JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9CA
S9ONCAvU01hc2sgZmFsc2UKL2NhIDEKL0NBIDEKPj4KZW5kb2JqCgo2IDAgb2
JqCjw8Ci9UeXBlIC9FeHRHU3RhdGUKL0JNL05vcm1hbAovY2EgMQo+PgplbmR
vYmoKCjcgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9C
YXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iagoKOCAwIG9iago8PAovVHlwZ
SAvRXh0R1N0YXRlCi9CTS9Ob3JtYWwKPj4KZW5kb2JqCgo5IDAgb2JqCjw8Ci
9UeXBlIC9FeHRHU3RhdGUKL0JNL05vcm1hbAovY2EgMQovQ0EgMQo+PgplbmR
vYmoKCjEwIDAgb2JqCjw8Ci9UeXBlIC9FeHRHU3RhdGUKL0JNL05vcm1hbAov
Y2EgMQo+PgplbmRvYmoKCjExIDAgb2JqCjw8Ci9UeXBlIC9FeHRHU3RhdGUKL
0JNL05vcm1hbAo+PgplbmRvYmoKCjEyIDAgb2JqCjw8Ci9UeXBlIC9FeHRHU3
RhdGUKL0JNL05vcm1hbAovY2EgMQovQ0EgMQo+PgplbmRvYmoKCjEzIDAgb2J
qCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hl
bHZldGljYS1Cb2xkCj4+CmVuZG9iagoKMTQgMCBvYmoKPDwKL1R5cGUgL0V4d
EdTdGF0ZQovQk0vTm9ybWFsCi9jYSAxCj4+CmVuZG9iagoKMTUgMCBvYmoKPD
wKL1R5cGUgL0V4dEdTdGF0ZQovQk0vTm9ybWFsCj4+CmVuZG9iagoKMTYgMCB
vYmoKPDwKL1R5cGUgL0V4dEdTdGF0ZQovQk0vTm9ybWFsCi9jYSAxCi9DQSAX
Cj4+CmVuZG9iagoKMTcgMCBvYmoKPDwKL1R5cGUgL0V4dEdTdGF0ZQovQk0vT
m9ybWFsCi9jYSAxCj4+CmVuZG9iagoKMTggMCBvYmoKPDwKL1R5cGUgL0V4dE
dTdGF0ZQovQk0vTm9ybWFsCj4+CmVuZG9iagoKMTkgMCBvYmoKPDwKL1R5cGU
gL0V4dEdTdGF0ZQovQk0vTm9ybWFsCi9jYSAxCi9DQSAxCj4+CmVuZG9iagpl
bmRzdHJlYW0KZW5kb2JqCnN0YXJ0eHJlZgoxNjUyCiUlRU9GCg==`;

// Function to programmatically convert Base64 to PDF
function convertBase64ToPDF(base64String) {
  // Set the input value
  document.getElementById('base64Input').value = base64String;
  
  // Trigger the conversion
  document.getElementById('convertBtn').click();
}

// Usage
convertBase64ToPDF(sampleBase64PDF);
```

#### Example 2: Validation Before Conversion

```javascript
// Enhanced conversion with validation
function safeConvertBase64ToPDF(base64String) {
  // Input validation
  if (!base64String || typeof base64String !== 'string') {
    console.error('Invalid input: Base64 string is required');
    return false;
  }

  // Basic Base64 format validation
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64String)) {
    console.error('Invalid Base64 format');
    return false;
  }

  // Check for PDF magic number in Base64
  try {
    const decoded = atob(base64String.substring(0, 20));
    if (!decoded.startsWith('%PDF')) {
      console.warn('Warning: Input may not be a valid PDF');
    }
  } catch (e) {
    console.error('Failed to decode Base64:', e);
    return false;
  }

  // Proceed with conversion
  document.getElementById('base64Input').value = base64String;
  document.getElementById('convertBtn').click();
  return true;
}

// Usage with error handling
const result = safeConvertBase64ToPDF(sampleBase64PDF);
if (result) {
  console.log('Conversion initiated successfully');
} else {
  console.log('Conversion failed validation');
}
```

#### Example 3: Batch PDF Processing

```javascript
// Process multiple Base64 PDFs sequentially
class BatchPDFProcessor {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.results = [];
  }

  addToQueue(base64String, name = 'Document') {
    this.queue.push({ base64: base64String, name: name });
  }

  async processQueue() {
    if (this.processing) {
      console.log('Batch processing already in progress');
      return;
    }

    this.processing = true;
    this.results = [];

    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];
      console.log(`Processing ${item.name} (${i + 1}/${this.queue.length})`);

      try {
        await this.processSinglePDF(item.base64, item.name);
        this.results.push({ name: item.name, status: 'success' });
      } catch (error) {
        console.error(`Failed to process ${item.name}:`, error);
        this.results.push({ name: item.name, status: 'error', error: error.message });
      }

      // Wait between conversions
      if (i < this.queue.length - 1) {
        await this.delay(2000);
      }
    }

    this.processing = false;
    console.log('Batch processing complete:', this.results);
  }

  processSinglePDF(base64String, name) {
    return new Promise((resolve, reject) => {
      // Set input and trigger conversion
      document.getElementById('base64Input').value = base64String;
      
      // Listen for completion/error
      const originalAfterPrint = window.onafterprint;
      window.onafterprint = () => {
        window.onafterprint = originalAfterPrint;
        resolve();
      };

      // Set timeout for error handling
      const timeout = setTimeout(() => {
        reject(new Error('Conversion timeout'));
      }, 10000);

      // Trigger conversion
      document.getElementById('convertBtn').click();
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  clearQueue() {
    this.queue = [];
  }
}

// Usage
const processor = new BatchPDFProcessor();
processor.addToQueue(sampleBase64PDF, 'Document 1');
processor.addToQueue(anotherBase64PDF, 'Document 2');
processor.processQueue();
```

### Advanced Integration Examples

#### Example 4: Custom Modal Integration

```javascript
// Custom modal controller with progress tracking
class PDFConverterUI {
  constructor() {
    this.modal = document.getElementById('modalOverlay');
    this.progressBar = document.getElementById('progressBar');
    this.progressText = document.getElementById('progressText');
    this.input = document.getElementById('base64Input');
    this.button = document.getElementById('convertBtn');
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.startConversion();
    });

    this.input.addEventListener('input', () => {
      this.validateInput();
    });

    this.input.addEventListener('paste', () => {
      setTimeout(() => this.validateInput(), 100);
    });
  }

  validateInput() {
    const value = this.input.value.trim();
    const isValid = value.length > 0;
    
    this.button.disabled = !isValid;
    this.input.style.borderColor = isValid ? '#4caf50' : '#ddd';
    
    if (isValid && value.length > 100) {
      try {
        const decoded = atob(value.substring(0, 20));
        if (decoded.startsWith('%PDF')) {
          this.input.style.borderColor = '#4caf50';
          this.showTooltip('Valid PDF detected');
        } else {
          this.input.style.borderColor = '#ff9800';
          this.showTooltip('May not be a valid PDF');
        }
      } catch (e) {
        this.input.style.borderColor = '#f44336';
        this.showTooltip('Invalid Base64 format');
      }
    }
  }

  showTooltip(message) {
    // Simple tooltip implementation
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
      position: absolute;
      background: #333;
      color: white;
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 12px;
      z-index: 1001;
      top: ${this.input.offsetTop + this.input.offsetHeight + 5}px;
      left: ${this.input.offsetLeft}px;
    `;
    
    document.body.appendChild(tooltip);
    setTimeout(() => document.body.removeChild(tooltip), 3000);
  }

  startConversion() {
    this.showModal('Initializing conversion...');
    this.animateProgress();
  }

  showModal(message) {
    this.progressText.textContent = message;
    this.progressBar.style.width = '0%';
    this.modal.style.display = 'flex';
  }

  hideModal() {
    this.modal.style.display = 'none';
  }

  updateProgress(percentage, message) {
    this.progressBar.style.width = percentage + '%';
    this.progressText.textContent = message;
  }

  animateProgress() {
    const stages = [
      { percent: 20, message: 'Validating Base64 input...' },
      { percent: 40, message: 'Decoding binary data...' },
      { percent: 60, message: 'Creating PDF blob...' },
      { percent: 80, message: 'Generating preview...' },
      { percent: 100, message: 'Opening print dialog...' }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage];
        this.updateProgress(stage.percent, stage.message);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => this.hideModal(), 1000);
      }
    }, 600);
  }
}

// Initialize enhanced UI
const pdfUI = new PDFConverterUI();
```

#### Example 5: File Drop Integration

```javascript
// Add drag & drop functionality for Base64 text files
class FileDropHandler {
  constructor() {
    this.input = document.getElementById('base64Input');
    this.setupDropZone();
  }

  setupDropZone() {
    const dropZone = this.createDropZone();
    document.body.appendChild(dropZone);
    
    this.setupDragEvents(dropZone);
    this.setupDragEvents(this.input);
  }

  createDropZone() {
    const dropZone = document.createElement('div');
    dropZone.id = 'dropZone';
    dropZone.innerHTML = `
      <div style="
        border: 2px dashed #ccc;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        margin: 10px 0;
        background: #f9f9f9;
        transition: all 0.3s ease;
      ">
        <p>Drop Base64 text files here or click to select</p>
        <input type="file" accept=".txt,.b64" style="display: none;" />
      </div>
    `;

    const fileInput = dropZone.querySelector('input[type="file"]');
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

    return dropZone;
  }

  setupDragEvents(element) {
    element.addEventListener('dragover', (e) => {
      e.preventDefault();
      element.style.borderColor = '#4caf50';
      element.style.backgroundColor = '#f0f8f0';
    });

    element.addEventListener('dragleave', (e) => {
      e.preventDefault();
      element.style.borderColor = '#ccc';
      element.style.backgroundColor = '#f9f9f9';
    });

    element.addEventListener('drop', (e) => {
      e.preventDefault();
      element.style.borderColor = '#ccc';
      element.style.backgroundColor = '#f9f9f9';
      this.handleFileDrop(e);
    });
  }

  handleFileDrop(event) {
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.processFile(files[0]);
    }
  }

  handleFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
      this.processFile(files[0]);
    }
  }

  processFile(file) {
    if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.b64')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        this.input.value = content.trim();
        this.validateAndConvert(content);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a text file containing Base64 data');
    }
  }

  validateAndConvert(base64String) {
    // Basic validation
    if (base64String.length < 100) {
      alert('File seems too small to contain a valid PDF');
      return;
    }

    try {
      const sample = atob(base64String.substring(0, 20));
      if (sample.startsWith('%PDF')) {
        console.log('Valid PDF detected, auto-converting...');
        setTimeout(() => {
          document.getElementById('convertBtn').click();
        }, 500);
      } else {
        console.log('File loaded, please verify it contains valid PDF data');
      }
    } catch (e) {
      alert('Invalid Base64 format in file');
    }
  }
}

// Initialize file drop handler
const fileDropper = new FileDropHandler();
```

### Extension Integration Examples

#### Example 6: Content Script Integration

```javascript
// content-script.js - For injecting into web pages
(function() {
  'use strict';

  // Create floating converter button
  function createFloatingConverter() {
    const button = document.createElement('button');
    button.innerHTML = '📄 Convert to PDF';
    button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: #4caf50;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;

    button.addEventListener('click', () => {
      const selectedText = window.getSelection().toString();
      if (selectedText && isValidBase64(selectedText)) {
        sendToExtension(selectedText);
      } else {
        showToast('Please select valid Base64 text');
      }
    });

    document.body.appendChild(button);
  }

  function isValidBase64(str) {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  function sendToExtension(base64String) {
    chrome.runtime.sendMessage({
      action: 'convertPDF',
      data: base64String
    }, (response) => {
      if (response && response.success) {
        showToast('PDF conversion started');
      } else {
        showToast('Failed to start conversion');
      }
    });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 70px;
      right: 20px;
      background: #333;
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 10001;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  }

  // Initialize when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingConverter);
  } else {
    createFloatingConverter();
  }
})();
```

#### Example 7: Background Script Integration

```javascript
// background.js - Service worker for Chrome extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'convertPDF') {
    // Open extension popup with pre-filled data
    chrome.action.openPopup().then(() => {
      // Send data to popup
      chrome.runtime.sendMessage({
        action: 'fillData',
        data: request.data
      });
    });
    
    sendResponse({ success: true });
    return true;
  }
});

// Context menu integration
chrome.contextMenus.create({
  id: 'convertBase64PDF',
  title: 'Convert to PDF',
  contexts: ['selection'],
  documentUrlPatterns: ['http://*/*', 'https://*/*']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'convertBase64PDF') {
    const selectedText = info.selectionText;
    if (selectedText) {
      // Open popup with selected text
      chrome.action.openPopup();
      
      // Store data for popup to retrieve
      chrome.storage.local.set({
        pendingBase64: selectedText
      });
    }
  }
});
```

### Testing Examples

#### Example 8: Unit Testing Framework

```javascript
// test-framework.js - Simple testing framework for the converter
class PDFConverterTester {
  constructor() {
    this.tests = [];
    this.results = [];
  }

  addTest(name, testFunction) {
    this.tests.push({ name, testFunction });
  }

  async runAllTests() {
    console.log('Starting PDF Converter Tests...\n');
    
    for (const test of this.tests) {
      try {
        await test.testFunction();
        this.results.push({ name: test.name, status: 'PASS' });
        console.log(`✅ ${test.name}: PASS`);
      } catch (error) {
        this.results.push({ name: test.name, status: 'FAIL', error: error.message });
        console.log(`❌ ${test.name}: FAIL - ${error.message}`);
      }
    }

    this.printSummary();
  }

  printSummary() {
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    
    console.log(`\n📊 Test Summary:`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / this.results.length) * 100).toFixed(1)}%`);
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  assertEquals(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, got ${actual}`);
    }
  }
}

// Test cases
const tester = new PDFConverterTester();

tester.addTest('DOM Elements Exist', () => {
  const input = document.getElementById('base64Input');
  const button = document.getElementById('convertBtn');
  const modal = document.getElementById('modalOverlay');
  
  tester.assert(input, 'Base64 input element should exist');
  tester.assert(button, 'Convert button should exist');
  tester.assert(modal, 'Modal overlay should exist');
});

tester.addTest('Input Validation', () => {
  const input = document.getElementById('base64Input');
  
  // Test empty input
  input.value = '';
  tester.assertEquals(input.value, '', 'Input should be empty initially');
  
  // Test setting value
  input.value = 'test';
  tester.assertEquals(input.value, 'test', 'Input value should be settable');
});

tester.addTest('Base64 Decoding', () => {
  const testString = 'SGVsbG8gV29ybGQ='; // "Hello World"
  const decoded = atob(testString);
  
  tester.assertEquals(decoded, 'Hello World', 'Base64 decoding should work correctly');
});

tester.addTest('Blob Creation', () => {
  const testData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
  const blob = new Blob([testData], { type: 'application/pdf' });
  
  tester.assert(blob instanceof Blob, 'Should create valid Blob object');
  tester.assertEquals(blob.type, 'application/pdf', 'Blob should have correct MIME type');
});

tester.addTest('URL Management', () => {
  const blob = new Blob(['test'], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  tester.assert(url.startsWith('blob:'), 'Should create valid object URL');
  
  // Test cleanup (this won't throw an error even if URL is invalid)
  URL.revokeObjectURL(url);
});

// Run tests
tester.runAllTests();
```

### Performance Examples

#### Example 9: Performance Monitoring

```javascript
// performance-monitor.js - Monitor conversion performance
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
    this.currentConversion = null;
  }

  startConversion(base64Length) {
    this.currentConversion = {
      startTime: performance.now(),
      base64Length: base64Length,
      stages: {}
    };
  }

  markStage(stageName) {
    if (this.currentConversion) {
      this.currentConversion.stages[stageName] = performance.now() - this.currentConversion.startTime;
    }
  }

  endConversion() {
    if (this.currentConversion) {
      this.currentConversion.totalTime = performance.now() - this.currentConversion.startTime;
      this.metrics.push({ ...this.currentConversion });
      this.currentConversion = null;
      
      this.logPerformance();
    }
  }

  logPerformance() {
    const latest = this.metrics[this.metrics.length - 1];
    console.group('🚀 PDF Conversion Performance');
    console.log(`📄 Base64 Size: ${(latest.base64Length / 1024).toFixed(2)} KB`);
    console.log(`⏱️ Total Time: ${latest.totalTime.toFixed(2)} ms`);
    console.log(`⚡ Throughput: ${(latest.base64Length / latest.totalTime * 1000 / 1024).toFixed(2)} KB/s`);
    
    if (Object.keys(latest.stages).length > 0) {
      console.log('📊 Stage Breakdown:');
      Object.entries(latest.stages).forEach(([stage, time]) => {
        console.log(`  • ${stage}: ${time.toFixed(2)} ms`);
      });
    }
    console.groupEnd();
  }

  getAveragePerformance() {
    if (this.metrics.length === 0) return null;

    const totalTime = this.metrics.reduce((sum, m) => sum + m.totalTime, 0);
    const avgTime = totalTime / this.metrics.length;
    
    const totalSize = this.metrics.reduce((sum, m) => sum + m.base64Length, 0);
    const avgSize = totalSize / this.metrics.length;

    return {
      averageTime: avgTime,
      averageSize: avgSize,
      averageThroughput: avgSize / avgTime * 1000 / 1024,
      conversionCount: this.metrics.length
    };
  }
}

// Integrate with existing converter
const performanceMonitor = new PerformanceMonitor();

// Wrap the original conversion function
const originalConverter = document.getElementById('convertBtn').onclick;
document.getElementById('convertBtn').addEventListener('click', function() {
  const base64String = document.getElementById('base64Input').value;
  
  // Start monitoring
  performanceMonitor.startConversion(base64String.length);
  
  // Override modal display to track stages
  const originalModal = document.getElementById('modalOverlay');
  const originalShow = originalModal.style.display;
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        if (originalModal.style.display === 'flex') {
          performanceMonitor.markStage('Modal Shown');
        } else if (originalModal.style.display === 'none') {
          performanceMonitor.markStage('Modal Hidden');
          performanceMonitor.endConversion();
          observer.disconnect();
        }
      }
    });
  });
  
  observer.observe(originalModal, { attributes: true });
});
```

---

## Integration with External Libraries

#### Example 10: Using with PDF-lib

```javascript
// Integration with PDF-lib for enhanced PDF manipulation
// Note: This would require including PDF-lib library in the extension

import { PDFDocument } from 'pdf-lib';

class EnhancedPDFConverter {
  async convertAndManipulate(base64String, options = {}) {
    try {
      // Convert Base64 to array buffer
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Load PDF with PDF-lib
      const pdfDoc = await PDFDocument.load(bytes);

      // Apply manipulations based on options
      if (options.addWatermark) {
        await this.addWatermark(pdfDoc, options.watermarkText);
      }

      if (options.mergePage) {
        await this.mergePages(pdfDoc);
      }

      if (options.extractText) {
        const text = await this.extractText(pdfDoc);
        console.log('Extracted text:', text);
      }

      // Save manipulated PDF
      const modifiedPdfBytes = await pdfDoc.save();
      
      // Convert back to blob and display
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      this.displayPDF(blob);

    } catch (error) {
      console.error('Enhanced PDF conversion failed:', error);
      throw error;
    }
  }

  async addWatermark(pdfDoc, watermarkText) {
    const pages = pdfDoc.getPages();
    
    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 2 - 50,
        y: height / 2,
        size: 50,
        opacity: 0.3,
        rotate: { type: 'degrees', angle: 45 }
      });
    });
  }

  displayPDF(blob) {
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '800px';
    iframe.src = url;
    document.body.appendChild(iframe);
  }
}

// Usage
const enhancedConverter = new EnhancedPDFConverter();
enhancedConverter.convertAndManipulate(base64String, {
  addWatermark: true,
  watermarkText: 'CONFIDENTIAL'
});
```

---

## Error Handling Examples

#### Example 11: Comprehensive Error Handling

```javascript
// robust-error-handler.js
class PDFErrorHandler {
  constructor() {
    this.errorLog = [];
    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      this.logError('Global Error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Unhandled Promise Rejection', event.reason);
      event.preventDefault(); // Prevent console error
    });
  }

  logError(type, error, context = {}) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      type: type,
      message: error.message || error,
      stack: error.stack,
      context: context
    };

    this.errorLog.push(errorEntry);
    console.error('PDF Converter Error:', errorEntry);

    // Show user-friendly error message
    this.showUserError(type, error);
  }

  showUserError(type, error) {
    const userMessage = this.getUserFriendlyMessage(type, error);
    
    // Create error modal
    const errorModal = this.createErrorModal(userMessage);
    document.body.appendChild(errorModal);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorModal.parentNode) {
        document.body.removeChild(errorModal);
      }
    }, 5000);
  }

  getUserFriendlyMessage(type, error) {
    const errorMessages = {
      'Base64 Decode Error': 'The provided text is not valid Base64 format. Please check your input.',
      'PDF Creation Error': 'Failed to create PDF. The Base64 data may be corrupted.',
      'Browser Compatibility Error': 'Your browser doesn\'t support this feature. Please try a newer version.',
      'Memory Error': 'The PDF is too large to process. Please try a smaller file.',
      'Network Error': 'Network connection failed. Please check your internet connection.'
    };

    return errorMessages[type] || 'An unexpected error occurred. Please try again.';
  }

  createErrorModal(message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      max-width: 400px;
      border-left: 4px solid #f44336;
    `;

    modal.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <span style="color: #f44336; font-size: 24px; margin-right: 10px;">⚠️</span>
        <h3 style="margin: 0; color: #333;">Error</h3>
      </div>
      <p style="margin: 0; color: #666; line-height: 1.4;">${message}</p>
      <button onclick="this.parentElement.remove()" style="
        margin-top: 15px;
        padding: 8px 16px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Close</button>
    `;

    return modal;
  }

  // Wrap conversion function with error handling
  wrapConversionFunction() {
    const originalButton = document.getElementById('convertBtn');
    const originalHandler = originalButton.onclick;

    originalButton.onclick = () => {
      try {
        this.validateEnvironment();
        this.validateInput();
        
        // Call original handler with error catching
        if (originalHandler) {
          originalHandler.call(originalButton);
        }
      } catch (error) {
        this.logError('Conversion Error', error);
      }
    };
  }

  validateEnvironment() {
    // Check browser capabilities
    if (!window.atob) {
      throw new Error('Browser doesn\'t support Base64 decoding');
    }

    if (!window.Blob) {
      throw new Error('Browser doesn\'t support Blob API');
    }

    if (!window.URL || !window.URL.createObjectURL) {
      throw new Error('Browser doesn\'t support Object URLs');
    }
  }

  validateInput() {
    const input = document.getElementById('base64Input');
    const value = input.value.trim();

    if (!value) {
      throw new Error('Base64 input is required');
    }

    if (value.length < 10) {
      throw new Error('Input too short to be valid Base64 PDF data');
    }

    // Basic Base64 validation
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(value)) {
      throw new Error('Invalid Base64 format');
    }

    // Check for reasonable size limits (e.g., 50MB)
    if (value.length > 50 * 1024 * 1024 * 4/3) { // Base64 is ~133% of original size
      throw new Error('File too large (max 50MB)');
    }
  }

  getErrorReport() {
    return {
      totalErrors: this.errorLog.length,
      errors: this.errorLog.slice(-10), // Last 10 errors
      errorTypes: this.groupErrorsByType()
    };
  }

  groupErrorsByType() {
    const types = {};
    this.errorLog.forEach(error => {
      types[error.type] = (types[error.type] || 0) + 1;
    });
    return types;
  }

  clearErrorLog() {
    this.errorLog = [];
  }
}

// Initialize error handler
const errorHandler = new PDFErrorHandler();
errorHandler.wrapConversionFunction();

// Export for debugging
window.pdfErrorHandler = errorHandler;
```

These examples provide comprehensive coverage of how to use, extend, and integrate the Base64 to PDF Converter extension. Each example includes practical implementation details and error handling to ensure robust functionality in real-world scenarios.