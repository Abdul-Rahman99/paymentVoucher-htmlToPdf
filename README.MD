# Payment Voucher API Documentation

This API provides endpoints to manage payment vouchers, including creating, updating, deleting, and retrieving payment vouchers. It also allows for generating PDFs of payment vouchers.

## Base URL

https://github.com/Abdul-Rahman99/paymentVoucher-htmlToPdf.git

## Authentication

Authentication is not required for accessing the endpoints.

## Error Handling

Errors are returned in JSON format with an appropriate status code and message. See the [Error Responses](#error-responses) section for details.

## Endpoints

### Create a New Payment Voucher

POST/

Create a new payment voucher.

#### Request Body

- `amount` (required, number): The amount of the payment voucher.
- `empName` (required, string): The name of the employee.
- `description` (required, string): Description of the payment.
- `accountantSignature` (required, string): Accountant's signature.
- `empSignature` (required, string): Employee's signature.

#### Response

- Status Code: 200 OK
- Content: JSON object representing the created payment voucher.

### Get All Payment Vouchers

GET/

Retrieve all payment vouchers.

#### Response

- Status Code: 200 OK
- Content: JSON array of payment voucher objects.

### Get Payment Voucher by Serial Number or Name

GET /:serialOrName

Retrieve a payment voucher by its serial number or employee name.

#### Response

- Status Code: 200 OK
- Content: JSON object representing the payment voucher.

### Update Payment Voucher

PUT /:id

Update a payment voucher by its ID.

#### Request Parameters

- `id` (required, string): ID of the payment voucher to update.

#### Request Body

Same as the request body for creating a payment voucher.

#### Response

- Status Code: 200 OK
- Content: JSON object representing the updated payment voucher.

### Delete Payment Voucher

DELETE /:id


Delete a payment voucher by its ID.

#### Request Parameters

- `id` (required, string): ID of the payment voucher to delete.

#### Response

- Status Code: 204 No Content

## Error Responses

Error responses follow the following format:

```json
{
  "error": {
    "status": 404,
    "message": "Payment voucher not found."
  }
}
