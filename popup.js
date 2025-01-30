document.getElementById('convertBtn').addEventListener('click', () => {
  const base64Input = document.getElementById('base64Input').value.trim();

  if (!base64Input) {
    alert('Please enter a Base64 string.');
    return;
  }

  // Show the progress bar
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  progressContainer.style.display = 'block';
  progressBar.style.width = '0%';

  // Simulate progress (for demonstration purposes)
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10; // Increase progress by 10%
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval); // Stop the interval
      convertBase64ToPDF(base64Input); // Perform the actual conversion
    }
  }, 300); // Update progress every 300ms
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

    // Reset progress bar
    const progressContainer = document.getElementById('progressContainer');
    progressContainer.style.display = 'none';
  } catch (error) {
    alert('Invalid Base64 string or error during conversion.');
    console.error(error);
  }
}
