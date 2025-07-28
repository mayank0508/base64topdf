/**
 * Base64 to PDF Converter - Main Event Handler
 * 
 * Handles the conversion of Base64 encoded strings to PDF files with automatic
 * preview and print functionality. Provides comprehensive error handling and
 * resource cleanup.
 * 
 * @function convertBase64ToPDF
 * @description Main conversion event handler that processes Base64 input and generates PDF output
 * @fires click - Triggered when the convert button is clicked
 * 
 * @example
 * // HTML: <button id="convertBtn">Convert to PDF</button>
 * // HTML: <textarea id="base64Input">...</textarea>
 * // The event handler will automatically process the input when button is clicked
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/atob} atob() Browser API
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob} Blob() Browser API
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL} URL.createObjectURL() Browser API
 */
document.getElementById('convertBtn').addEventListener('click', function () {
  /**
   * @type {HTMLTextAreaElement} Base64 input textarea element
   */
  const base64Input = document.getElementById('base64Input');
  
  /**
   * @type {string} Raw Base64 string from user input
   */
  const base64String = base64Input.value;

  /**
   * Input validation - Check if Base64 string is provided
   * @throws {void} Shows alert and returns early if input is empty
   */
  if (!base64String) {
    alert('Please enter a Base64 string.');
    return;
  }

  /**
   * Show loading modal to indicate processing state
   * @type {HTMLElement} Modal overlay element for loading indicator
   */
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'flex';

  /**
   * Convert Base64 string to binary data and create PDF Blob
   * 
   * Process:
   * 1. Decode Base64 string to binary string using atob()
   * 2. Convert binary string to Uint8Array for proper binary handling
   * 3. Create Blob with PDF MIME type for browser compatibility
   * 
   * @type {string} decodedArrayBuffer - Binary string from Base64 decoding
   * @type {Uint8Array} arr - Typed array containing binary PDF data
   * @type {Blob} blob - PDF blob object for URL creation
   */
  const decodedArrayBuffer = atob(base64String);
  const arr = new Uint8Array(decodedArrayBuffer.length);
  for (let i = 0; i < decodedArrayBuffer.length; i++) {
    arr[i] = decodedArrayBuffer.charCodeAt(i);
  }
  const blob = new Blob([arr], { type: 'application/pdf' });

  /**
   * Create a temporary URL for the PDF Blob
   * @type {string} url - Object URL for the PDF blob
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL}
   */
  const url = URL.createObjectURL(blob);

  /**
   * Create iframe element for PDF preview and printing
   * 
   * Configuration:
   * - Full width for responsive display
   * - 800px height for optimal viewing
   * - Source set to blob URL for PDF content
   * 
   * @type {HTMLIFrameElement} iframe - PDF preview container
   */
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '800px'; // Set a reasonable height for PDF viewing
  iframe.src = url;

  /**
   * Append iframe to document body for display
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
   */
  document.body.appendChild(iframe);

  /**
   * Delayed print dialog trigger
   * 
   * Waits 1 second for PDF to load in iframe before automatically
   * triggering the browser's print dialog for user convenience.
   * 
   * @param {Function} callback - Print trigger function
   * @param {number} delay - 1000ms delay for PDF loading
   */
  setTimeout(() => {
    // Focus on the iframe content before showing print dialog
    iframe.contentDocument.focus();
    iframe.contentWindow.print();
  }, 1000); // Wait for the iframe to load the PDF

  /**
   * Resource cleanup after printing
   * 
   * Automatically cleans up temporary resources when user completes
   * or cancels the print operation to prevent memory leaks.
   * 
   * Cleanup actions:
   * 1. Remove iframe from DOM
   * 2. Revoke object URL to free memory
   * 3. Hide loading modal
   * 
   * @event afterprint - Browser event fired after print dialog closes
   */
  window.addEventListener('afterprint', function () {
    document.body.removeChild(iframe);
    URL.revokeObjectURL(url);
    modalOverlay.style.display = 'none';
  });

  /**
   * Error handling for PDF loading failures
   * 
   * Handles cases where:
   * - Base64 data is invalid or corrupted
   * - PDF cannot be rendered by browser
   * - Memory or security limitations are encountered
   * 
   * @event error - Fired when iframe fails to load PDF content
   * @param {Event} event - Error event object
   */
  iframe.onerror = function () {
    alert(
      'Failed to load or display the PDF. Please check your input and try again.'
    );
    // Perform cleanup on error
    document.body.removeChild(iframe);
    URL.revokeObjectURL(url);
    modalOverlay.style.display = 'none';
  };
});
