---
date created: 2024-07-23T11:46
date modified: 2024-07-23T11:49
---

## Idea

My files are hosted on github. I know the link to the raw source of my files. I want to add a button where it takes the link to the raw source of my file and opens the download file window to download that content.

Template link for the raw source:

`https://raw.githubusercontent.com/<user>/<repo>/<branch>/${fileData.filePath!}`

## GPT response

To create a button that allows users to download a file from a raw GitHub link, you can use HTML and JavaScript. Here's how you can achieve this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download File from GitHub</title>
  <style>
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      text-align: center;
      text-decoration: none;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <button class="button" onclick="downloadFile()">Download File</button>
  </div>

  <script>
    function downloadFile() {
      // Replace with your raw GitHub file URL
      const fileUrl = 'https://raw.githubusercontent.com/username/repository/branch/path/to/your/file.txt';
      
      // Create an invisible anchor element
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      
      // Set the href attribute of the anchor to the file URL
      anchor.href = fileUrl;
      
      // Set the download attribute to force download
      anchor.setAttribute('download', '');
      
      // Trigger the click event to download the file
      anchor.click();
      
      // Clean up
      document.body.removeChild(anchor);
    }
  </script>
</body>
</html>
```