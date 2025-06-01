interface UploadParams {
  file: File;
  storageAccount: string;
  sasToken: string;
  containerName: string;
}

export async function uploadFileToAzure(uploadParams: UploadParams): Promise<string | false> {
  const { file, storageAccount, sasToken, containerName } = uploadParams;

  const blobName = `${Date.now()}-${file.name}`;
  const baseUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${blobName}`;
  const uploadUrl = `${baseUrl}?${sasToken}`;

  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });

    if (response.ok) {
      console.log(`Upload bem-sucedido para: ${baseUrl}`);
      return baseUrl;
    } else {
      const errorText = await response.text();
      console.error(`Erro no upload para Azure Blob Storage: ${response.status} - ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error("Erro ao tentar fazer upload para Azure Blob Storage:", error);
    return false;
  }
}