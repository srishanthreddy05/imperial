export function getOTPEmailTemplate(patientName: string, otpCode: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Appointment Request</title>
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
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px border #E2E8F0;
    }
    .header {
      background-color: #005EB8;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .header p {
      color: #00A9CE;
      margin: 5px 0 0 0;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1.5px;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
    }
    .greeting {
      font-size: 18px;
      font-weight: bold;
      color: #1A202C;
      margin-bottom: 16px;
    }
    .instructions {
      font-size: 15px;
      color: #4A5568;
      margin-bottom: 30px;
    }
    .otp-container {
      background-color: #F0F4F8;
      border: 2px dashed #005EB8;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin: 30px 0;
    }
    .otp-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #718096;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .otp-code {
      font-size: 36px;
      font-weight: 800;
      color: #005EB8;
      letter-spacing: 6px;
      margin: 0;
    }
    .disclaimer {
      font-size: 13px;
      color: #718096;
      margin-top: 30px;
      border-t: 1px solid #E2E8F0;
      padding-top: 20px;
    }
    .footer {
      background-color: #F7FAFC;
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: #A0AEC0;
      border-top: 1px solid #EDF2F7;
    }
    .footer p {
      margin: 4px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- HEADER -->
      <div class="header">
        <h1>Imperial Care</h1>
        <p>Internal Medicine</p>
      </div>

      <!-- CONTENT -->
      <div class="content">
        <div class="greeting">Hello ${patientName},</div>
        <div class="instructions">
          Use the verification code below to confirm your appointment request at our clinic.
        </div>

        <!-- OTP BOX -->
        <div class="otp-container">
          <div class="otp-label">Verification Code</div>
          <div class="otp-code">${otpCode}</div>
        </div>

        <div class="instructions" style="font-weight: 500; color: #E53E3E;">
          This code expires in 10 minutes.
        </div>

        <div class="disclaimer">
          If you did not request an appointment, you may safely ignore this email.
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p><strong>Imperial Care Internal Medicine</strong></p>
        <p>Anna Clinic | Sherman Clinic</p>
        <p>© 2026 Imperial Care. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
