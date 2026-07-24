import { AppointmentData } from "@/lib/firebase/appointments";

export function getAppointmentNotificationTemplate(appointment: AppointmentData, confirmationNumber: string): string {
  const isAnna = appointment.location.toLowerCase().includes("anna");
  const clinicAddress = isAnna 
    ? "Anna Clinic (450 N Standridge Blvd, Suite 104)" 
    : "Sherman Clinic (1700 N Travis St)";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Appointment Booked</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #F4F6F8;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 100%;
      background-color: #F4F6F8;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border: 1px solid #E2E8F0;
    }
    .header {
      background-color: #2D3436;
      padding: 24px;
      text-align: center;
      color: #FFFFFF;
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }
    .content {
      padding: 30px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      color: #005EB8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 24px;
      margin-bottom: 12px;
      border-bottom: 2px solid #EDF2F7;
      padding-bottom: 6px;
    }
    .section-title:first-child {
      margin-top: 0;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .data-table th, .data-table td {
      padding: 10px 0;
      text-align: left;
      font-size: 14px;
      vertical-align: top;
    }
    .data-table th {
      width: 150px;
      color: #718096;
      font-weight: 600;
    }
    .data-table td {
      color: #2D3748;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      background-color: #EBF8FF;
      color: #2B6CB0;
      font-size: 11px;
      font-weight: bold;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .badge-verified {
      background-color: #C6F6D5;
      color: #22543D;
    }
    .footer {
      background-color: #EDF2F7;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #718096;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- HEADER -->
      <div class="header">
        <h1>New Appointment Booked</h1>
      </div>

      <!-- CONTENT -->
      <div class="content">
        
        <!-- PATIENT SECTION -->
        <div class="section-title">Patient Information</div>
        <table class="data-table">
          <tr>
            <th>Name</th>
            <td>${appointment.fullName}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td><a href="tel:${appointment.phone}">${appointment.phone}</a></td>
          </tr>
          <tr>
            <th>Email</th>
            <td><a href="mailto:${appointment.email}">${appointment.email}</a></td>
          </tr>
          <tr>
            <th>DOB</th>
            <td><span style="color: #A0AEC0; font-style: italic;">Not provided</span></td>
          </tr>
          <tr>
            <th>Address</th>
            <td><span style="color: #A0AEC0; font-style: italic;">Not provided</span></td>
          </tr>
        </table>

        <!-- APPOINTMENT SECTION -->
        <div class="section-title">Appointment Details</div>
        <table class="data-table">
          <tr>
            <th>Date</th>
            <td><strong>${appointment.date}</strong></td>
          </tr>
          <tr>
            <th>Time Window</th>
            <td><strong>${appointment.timeSlot}</strong></td>
          </tr>
          <tr>
            <th>Provider</th>
            <td>Dr. Sumbul Islam, MD</td>
          </tr>
          <tr>
            <th>Clinic Facility</th>
            <td>${appointment.location} (${clinicAddress})</td>
          </tr>
          <tr>
            <th>Visit / Reason</th>
            <td>${appointment.service}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
              <span class="badge">Patient Type: ${appointment.isNewPatient === "no" ? "Established" : "New"}</span>
              <span class="badge badge-verified" style="margin-left: 5px;">Email Verified</span>
            </td>
          </tr>
          <tr>
            <th>Confirmation #</th>
            <td style="font-family: monospace; font-size: 15px; font-weight: bold; color: #005EB8;">${confirmationNumber}</td>
          </tr>
          <tr>
            <th>Additional Notes</th>
            <td>${appointment.notes ? appointment.notes : '<span style="color: #A0AEC0; font-style: italic;">None</span>'}</td>
          </tr>
          <tr>
            <th>Submitted At</th>
            <td>${new Date().toLocaleString()}</td>
          </tr>
        </table>

      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p>This is an automated notification from the Imperial Care Website Scheduler.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
