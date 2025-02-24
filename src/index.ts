import axios from 'axios';

export class VisoraCloud {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api.visora.xyz') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async uploadFile(file: Buffer, fileName: string, contentType: string) {
    const formData = new FormData();
    formData.append('file', new Blob([file]), fileName);

    const response = await axios.post(`${this.baseUrl}/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': contentType
      }
    });

    return response.data;
  }

  async deleteFile(fileName: string) {
    return axios.delete(`${this.baseUrl}/delete/${fileName}`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
  }

  async listFiles() {
    return axios.get(`${this.baseUrl}/list`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
  }
}
