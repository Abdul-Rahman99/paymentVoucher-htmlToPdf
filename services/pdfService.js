const puppeteer = require("puppeteer");

//@desc  Generate PDF from HTML content
async function generatePDF(htmlContent, pdfFileName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
  const pdfBuffer = await page.pdf({
    format: "A4",
    path: pdfFileName,
    printBackground: true,
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
  });
  console.log("pdf Generated");

  return pdfBuffer;
}

//@desc   Generate HTML content for PDF from payment voucher data
const generateHTMLContent = (voucher) => {
  return `
@tailwind utilities;
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Payment Voucher</title>
    <link
      href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      rel="stylesheet"
    />    <style>
      .separator {
        border-bottom: 2px solid black;
      }

      .serial-number-box {
        border: 2px solid black;
        border-radius: 3px;
        padding: 3px 8px 4px;
        color: red;
        margin-top: 8px;
      }
    </style>
  </head>

  <body class="bg-gray-100 p-8">
    <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <div class="text-center mb-8">
        <div class="flex justify-between items-center">
          <img
            src="https://media.licdn.com/dms/image/D4D0BAQFFx8IHlzrsiA/company-logo_200_200/0/1685908393147/ftlgroups_logo?e=1715212800&v=beta&t=gEPGU_ta0EIXOtYRev6vXve28AHa-QP7XkJvXaJSWz4"
            alt="Company Logo"
            class="w-12 h-12 mr-4"
          />
          <div>
            <h1 class="text-2xl font-bold">Payment Voucher</h1>
            <h2 class="text-sm font-semibold pb-3">إذن صرف</h2>
            <p class="text-xs">
              <span class="serial-number-box p-8">${voucher.serialNumber}</span>
            </p>
          </div>
          <img
            src="https://media.licdn.com/dms/image/D4D0BAQFFx8IHlzrsiA/company-logo_200_200/0/1685908393147/ftlgroups_logo?e=1715212800&v=beta&t=gEPGU_ta0EIXOtYRev6vXve28AHa-QP7XkJvXaJSWz4"
            alt="Second Logo"
            class="w-12 h-12 ml-4"
          />
        </div>
        <div class="separator my-4"></div>
      </div>
      <div class="flex justify-between mb-4">
        <div class="w-24 border border-gray-300 h-12">${voucher.amount}</div>
        <div class="flex flex-col items-center">
          <span>LE</span>
          <span>جنيه</span>
        </div>
        <div class="w-24 border items-center border-gray-300 h-12">${voucher.date
          .toString()
          .slice(4, 15)}</div>
        <div class="flex flex-col items-center">
          <span>Date</span>
          <span>التاريخ</span>
        </div>
      </div>
      <br />
      <div class="flex justify-between mb-4">
        <span class="font-bold">Pay to:</span>
        <span
          >${voucher.empName}</span
        >
        <span class="font-bold">:يصرف الي</span>
      </div>
      <div class="flex justify-between mb-4">
        <span class="font-bold">Amount:</span>
        <span
          >${voucher.amount}</span
        >
        <span class="font-bold">:المبلغ</span>
      </div>
      <div class="flex justify-between mb-4">
        <span class="font-bold">Value of:</span>
        <span
          >${voucher.description}</span
        >
        <span class="font-bold">:وذلك قيمة</span>
      </div>
      <br />
      <div class="separator my-4"></div>

      <div class="flex justify-between mb-4">
        <div class="flex flex-col items-center">
          <span>ACCOUNT OFFICE</span>
          <span>الحسابات</span>
          <span>.................</span>
        </div>
        <div class="flex flex-col items-center">
          <span>RECIPIENT'S NAME</span>
          <span>اسم المستلم</span>
          <span>.................</span>
        </div>
      </div>
    </div>
  </body>
</html>


  `;
};

module.exports = {
  generateHTMLContent,
  generatePDF,
};
