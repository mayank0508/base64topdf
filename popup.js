document.getElementById('convertBtn').addEventListener('click', function () {
  const base64Input = document.getElementById('base64Input');
  const base64String = base64Input.value;

  if (!base64String) {
    alert('Please enter a Base64 string.');
    return;
  }

  // Show loading modal
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'flex';

  // Convert Base64 to Blob
  const decodedArrayBuffer = atob(base64String);
  const arr = new Uint8Array(decodedArrayBuffer.length);
  for (let i = 0; i < decodedArrayBuffer.length; i++) {
    arr[i] = decodedArrayBuffer.charCodeAt(i);
  }
  const blob = new Blob([arr], { type: 'application/pdf' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an Iframe to display the PDF
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '800px'; // Set a reasonable height
  iframe.src = url;

  // Append the iframe to the body or a specific container
  document.body.appendChild(iframe);

  // Handle user interaction for printing
  setTimeout(() => {
    // Focus on the iframe content before showing print dialog
    iframe.contentDocument.focus();
    iframe.contentWindow.print();
  }, 1000); // Wait for the iframe to load the PDF

  // Clean up URL reference
  window.addEventListener('afterprint', function () {
    document.body.removeChild(iframe);
    URL.revokeObjectURL(url);
    modalOverlay.style.display = 'none';
  });

  // Handle any errors during the process
  iframe.onerror = function () {
    alert(
      'Failed to load or display the PDF. Please check your input and try again.'
    );
    document.body.removeChild(iframe);
    URL.revokeObjectURL(url);
    modalOverlay.style.display = 'none';
  };
});
