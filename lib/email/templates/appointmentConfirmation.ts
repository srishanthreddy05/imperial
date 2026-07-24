import { AppointmentData } from "@/lib/firebase/appointments";

export function getAppointmentConfirmationTemplate(appointment: AppointmentData, confirmationNumber: string): string {
  const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://imperialcareinternalmedicine.com"}/loho.jpeg`;
  const isAnna = appointment.location.toLowerCase().includes("anna");
  const clinicAddress = isAnna 
    ? "450 N Standridge Blvd, Suite 104, Anna, TX 75409" 
    : "1700 N Travis St, Sherman, TX 75092";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmed</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #F8F9FA;
      color: #333333;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #F8F9FA;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid #E2E8F0;
    }
    .header {
      background-color: #005EB8;
      padding: 30px;
      text-align: center;
      border-bottom: 4px solid #00A9CE;
    }
    .logo-container {
      background-color: #FFFFFF;
      border-radius: 12px;
      padding: 8px;
      display: inline-block;
      margin-bottom: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .logo {
      height: 48px;
      width: auto;
      vertical-align: middle;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 4px 0 0 0;
      font-size: 24px;
      font-weight: 700;
    }
    .header p {
      color: #E2E8F0;
      margin: 4px 0 0 0;
      font-size: 13px;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      font-weight: bold;
      color: #1A202C;
      margin-bottom: 8px;
    }
    .intro {
      font-size: 15px;
      color: #4A5568;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .detail-card {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 14px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .detail-row {
      display: flex;
      margin-bottom: 12px;
      font-size: 14px;
    }
    .detail-row:last-child {
      margin-bottom: 0;
    }
    .detail-label {
      width: 140px;
      font-weight: bold;
      color: #718096;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.8px;
      padding-top: 2px;
    }
    .detail-value {
      flex: 1;
      color: #2D3748;
      font-weight: 600;
    }
    .detail-value-conf {
      color: #005EB8;
      font-family: monospace;
      font-size: 16px;
      font-weight: bold;
    }
    .info-box {
      background-color: #EBF8FF;
      border-left: 4px solid #3182CE;
      color: #2B6CB0;
      padding: 16px;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .footer {
      background-color: #2D3436;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      color: #A0AEC0;
      border-top: 1px solid #4A5568;
    }
    .footer a {
      color: #00A9CE;
      text-decoration: none;
    }
    .footer p {
      margin: 6px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- HEADER -->
      <div class="header">
        <div class="logo-container">
          <img class="logo" src="${logoUrl}" alt="Imperial Care Logo" />
        </div>
        <h1>Appointment Confirmed</h1>
        <p>Imperial Care Internal Medicine</p>
      </div>

      <!-- CONTENT -->
      <div class="content">
        <div class="greeting">Hello ${appointment.fullName},</div>
        <div class="intro">
          Your appointment request has been successfully verified and confirmed! Below are your visit details. Please save this for your records.
        </div>

        <!-- DETAILS CARD -->
        <div class="detail-card">
          <div class="detail-row">
            <div class="detail-label">Confirmation #</div>
            <div class="detail-value detail-value-conf">${confirmationNumber}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Date</div>
            <div class="detail-value">${appointment.date}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Time Window</div>
            <div class="detail-value">${appointment.timeSlot}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Provider</div>
            <div class="detail-value">Dr. Sumbul Islam, MD</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Visit Type</div>
            <div class="detail-value">${appointment.service}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">Clinic Location</div>
            <div class="detail-value">
              ${appointment.location}<br/>
              <span style="font-weight: normal; font-size: 12px; color: #718096;">${clinicAddress}</span>
            </div>
          </div>
        </div>

        <!-- HELPFUL INFO BOX -->
        <div class="info-box">
          <strong>Important Instructions:</strong> Please arrive 15 minutes before your scheduled window. Bring your insurance card, photo ID, and copies of your completed patient forms. If you need to reschedule or cancel, please notify us at least 24 hours in advance at <strong>(903) 957-0417</strong>.
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p><strong>Imperial Care Internal Medicine</strong></p>
        <p>Phone: (903) 957-0417 | Fax: (903) 355-2938</p>
        <p>Web: <a href="https://imperialcareinternalmedicine.com">imperialcareinternalmedicine.com</a></p>
        <p>© 2026 Imperial Care. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
