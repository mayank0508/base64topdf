document.getElementById('convertBtn').addEventListener('click', () => {
  const base64Input = document.getElementById('base64Input').value.trim();

  if (!base64Input) {
    alert('Please enter a Base64 string.');
    return;
  }

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
  } catch (error) {
    alert('Invalid Base64 string or error during conversion.');
    console.error(error);
  }
});
