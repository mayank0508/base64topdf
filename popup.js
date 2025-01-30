document.getElementById('convertBtn').addEventListener('click', () => {
  const base64Input = document.getElementById('base64Input').value.trim();

  if (!base64Input) {
    alert('Please enter a Base64 string.');
    return;
  }

  // Show the modal overlay
  const modalOverlay = document.getElementById('modalOverlay');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  modalOverlay.style.display = 'flex'; // Show the modal
  progressBar.style.width = '0%';
  progressText.textContent = 'Converting... 0%';

  // Simulate progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Converting... ${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      convertBase64ToPDF(base64Input);
    }
  }, 300);
});

function convertBase64ToPDF(base64Input) {
  try {
    // Convert Base64 to a Blob
    const byteCharacters = atob(base64Input);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-file.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Hide the modal overlay after a delay
    setTimeout(() => {
      const modalOverlay = document.getElementById('modalOverlay');
      modalOverlay.style.display = 'none';
    }, 1000); // 1 second delay
  } catch (error) {
    alert('Invalid Base64 string or error during conversion.');
    console.error(error);
  }
}