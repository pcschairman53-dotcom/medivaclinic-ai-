/**
 * GOOGLE SHEETS & APPS SCRIPT BACKEND INTEGRATION
 * 
 * This service connects your premium frontend to a free Google Sheets database.
 * 
 * STEP-BY-STEP SETUP:
 * 1. Create a new Google Sheet: https://sheets.new
 * 2. Name it "Mediva Clinic Leads" and name the first tab "Leads".
 * 3. Go to "Extensions" > "Apps Script".
 * 4. Delete the existing code and paste the following:
 * 
 * ```javascript
 * function doPost(e) {
 *   try {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads") || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
 *     var data = JSON.parse(e.postData.contents);
 *     
 *     // Append the data: [Timestamp, Name, Phone, Problem, AppointmentTime, Source]
 *     sheet.appendRow([
 *       new Date(),
 *       data.name || "N/A",
 *       data.phone || "N/A",
 *       data.problem || "N/A",
 *       data.appointmentTime || "Not Specified",
 *       data.source || "Website Form"
 *     ]);
 *     
 *     return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Lead stored successfully" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * 
 * function doOptions(e) {
 *   return ContentService.createTextOutput("")
 *     .setMimeType(ContentService.MimeType.TEXT);
 * }
 * ```
 * 
 * 5. Click "Deploy" > "New Deployment".
 * 6. Select "Web App".
 * 7. Description: "Mediva Clinic API".
 * 8. Execute as: "Me" (your email).
 * 9. Who has access: "Anyone".
 * 10. Click "Deploy", authorize the permissions, and COPY the "Web App URL".
 * 11. PASTE the URL below in GOOGLE_SHEETS_WEBAPP_URL.
 */

const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyqDw37hkyAOk1N1ept0ZbOXZ-h1Nf1IhXwksoTmpVuaFmGE9V5ihgetx2jwahvH6r8/exec"; 

export interface SubmissionData {
  timestamp?: any;
  name: string;
  phone: string;
  problem: string;
  appointmenttime?: string;
  source?: string;
}

export async function fetchLeads(): Promise<SubmissionData[]> {
  if (!GOOGLE_SHEETS_WEBAPP_URL) {
    // Demo data for preview if URL is missing
    return [
      { timestamp: new Date().toISOString(), name: "John Doe", phone: "+1 555 0123", problem: "Routine Checkup", appointmenttime: "Today 4PM", source: "Website" },
      { timestamp: new Date().toISOString(), name: "Jane Smith", phone: "+1 555 4567", problem: "Dental Pain", appointmenttime: "Tomorrow 10AM", source: "AI Chat" },
      { timestamp: new Date().toISOString(), name: "Alice Wonder", phone: "+1 555 8888", problem: "Allergy", appointmenttime: "Friday 2PM", source: "WhatsApp" },
      { timestamp: new Date().toISOString(), name: "Robert Fox", phone: "+1 555 9999", problem: "Heart issues", appointmenttime: "Next Monday", source: "Website" },
    ];
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBAPP_URL);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

export async function submitToSheets(data: SubmissionData) {
  if (!GOOGLE_SHEETS_WEBAPP_URL) {
    console.group("🚀 Mediva Backend Demo Mode");
    console.log("Status: No WebApp URL found.");
    console.log("Data:", data);
    console.groupEnd();
    
    // Simulate network delay for that premium feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, message: "Demo: Lead captured locally!" };
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
      method: "POST",
      // Using 'no-cors' for Apps Script simplicity, though it limits response reading
      // For a real SaaS, we'd handle the 'text/plain' or 'application/json' redirect properly
      mode: "no-cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      }),
    });

    // With no-cors, we can't read the body, so we assume success if no error is thrown
    return { success: true, message: "Data synchronized happily." };
  } catch (error) {
    console.error("Backend Error:", error);
    throw new Error("Unable to reach the secure database. Please check your connection.");
  }
}
