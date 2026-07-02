# DMart Management API

A simple Node.js and Express.js REST API project for managing DMart product, customer, employee, payment, and offer information.

## Folder Structure

```text
dmart/
|
|-- index.js
|-- product.js
|-- customer.js
|-- employee.js
|-- payment.js
|-- offers.js
|-- package.json
|-- README.md
|-- .gitignore
```

## Installation

```bash
npm install
```

## Run Project

```bash
npm start
```

The server will run at:

```text
http://localhost:4000
```

For development with auto-restart:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Home route |
| GET | `/product` | Fetch single product |
| GET | `/customer` | Fetch single customer |
| GET | `/employee` | Fetch single employee |
| GET | `/payment` | Fetch single payment |
| GET | `/offers` | Fetch all offers |
| GET | `/product/all` | Fetch multiple products |
| GET | `/customer/all` | Fetch multiple customers |
| GET | `/employee/all` | Fetch multiple employees |

## Response Format

All main API responses use a clean JSON structure:

```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "prodId": "P101",
    "prodName": "Pears Face Wash",
    "prodCost": 760,
    "prodQty": 50
  },
  "timestamp": "2026-07-02T00:00:00.000Z"
}
```

## Screenshots

Add Postman screenshots here after testing:

- Home route: `GET /`
- Product route: `GET /product`
- Customer route: `GET /customer`
- Employee route: `GET /employee`
- Payment route: `GET /payment`
- Offers route: `GET /offers`

## Technologies Used

- Node.js
- Express.js
- Express Router
- Nodemon

## Notes

- `index.js` imports and maps all route files.
- Each module uses its own Express Router.
- Request logger middleware prints requests like `GET /product`.
- The required professor data is kept exactly inside the `data` object for each main endpoint.
