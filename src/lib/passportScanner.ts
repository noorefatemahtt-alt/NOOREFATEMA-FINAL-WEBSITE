import { GoogleGenAI, Type } from "@google/genai";

export async function scanPassport(base64Image: string, mimeType: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Remove the data:image/jpeg;base64, prefix if present
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: "Extract the following information from this passport image: First Name, Last Name, Passport Number, Date of Birth, Issue Date, and Expiry Date. Return ONLY a JSON object with these keys: firstName, lastName, passportNumber, dob, issueDate, expiryDate. Use YYYY-MM-DD format for dates. If a field is not found, leave it empty.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            firstName: { type: Type.STRING, description: "First name or given names" },
            lastName: { type: Type.STRING, description: "Last name or surname" },
            passportNumber: { type: Type.STRING, description: "Alphanumeric passport number" },
            dob: { type: Type.STRING, description: "Date of birth in YYYY-MM-DD format" },
            issueDate: { type: Type.STRING, description: "Date of issue in YYYY-MM-DD format" },
            expiryDate: { type: Type.STRING, description: "Date of expiry in YYYY-MM-DD format" },
          },
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Error scanning passport:", error);
    throw error;
  }
}
