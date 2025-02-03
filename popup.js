<!DOCTYPE html>
<html>
<head>
    <title>Base64 to PDF Print</title>
</head>
<body>
    <!-- Your HTML content -->
    
    <script>
        function convertBase64ToPDF(base64Input) {
            try {
                // Convert Base64 string to Blob
                const byteCharacters = atob(base64Input);
                const byteNumbers = new Array(byteCharacters.length);
                
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'application/pdf' });

                // Create an iframe to display the PDF
                const iframe = document.createElement('iframe');
                iframe.width = '100%';
                iframe.height = '600px';
                
                // Load the PDF into the iframe
                iframe.src = URL.createObjectURL(blob);
                
                // Append the iframe to the body
                document.body.appendChild(iframe);

                // Focus on the iframe (needed for some browsers)
                setTimeout(() => {
                    iframe.focus();
                    iframe.contentDocument.print();
                }, 1000);

            } catch (error) {
                alert('Error converting Base64 string to PDF: ' + error.message);
                console.error(error);
            }
        }

        async function handlePrintPDF() {
            try {
                // Show loading modal
                const modalOverlay = document.getElementById('modalOverlay');
                if (modalOverlay) {
                    modalOverlay.style.display = 'flex';
                }

                // Get Base64 input value
                const base64Input = document.getElementById('base64Input').value;
                
                // Convert and display PDF
                await convertBase64ToPDF(base64Input);

                // Hide loading modal after successful conversion
                if (modalOverlay) {
                    setTimeout(() => {
                        modalOverlay.style.display = 'none';
                    }, 1000);
                }

            } catch (error) {
                alert('Error processing PDF: ' + error.message);
                console.error(error);
            }
        }
    </script>
</body>
</html>