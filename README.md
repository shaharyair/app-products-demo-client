# Product Management App

This project is a Next.js application for managing a list of products. It provides a user-friendly interface to view, edit, add, delete, and search for products. The application incorporates basic styling to achieve a clean and organized layout.

## Features

1. **Display Product List:**

   - Product items are presented in a clean and organized layout.
   - Each product displays the product name, description, and a static/local image.

2. **Product Details:**

   - Clicking on a product item reveals detailed information on the right side of the screen.
   - Users can edit product properties in the details pane.

3. **Save Button:**

   - The details pane features a "Save" button to save changes made to a product.
   - The product list reflects the changes only after a successful save.

4. **Sort Functionality:**

   - Users can sort the product list by product name or creation date using a dropdown control.

5. **Basic CSS Styling:**
   - The application is styled with basic CSS to achieve a layout similar to the provided mockup.

## Bonus Features

1. **Delete Button:**

   - Each product item includes a "Delete" button. Clicking it removes the product from the list.

2. **Add Button:**

   - An "Add" button allows users to add a new empty product item to the details pane.
   - After filling in the required data and clicking "Save," the new product is added to the list.

3. **Validation:**

   - The details pane includes validation rules to ensure valid values for each property.
   - The "Save" button is enabled only if the properties contain valid values.

4. **Filtering:**

   - Users can filter the list by typing free text into a text box. The list displays only products whose name or description contains the search text.

5. **Paging:**
   - Pagination is implemented to display 5 products per page.
   - Users can navigate between pages with next and previous buttons, and the interface indicates the current page and the total number of pages.

## Getting Started

1. Clone the repository: `git clone https://github.com/shaharyair/app-products-demo-client.git`
2. Install dependencies: `npm install`
3. Set the environment variable for the API URL:
   - Create a `.env.local` file in the root of your project.
   - Add the following line to the `.env.local` file:
     ```
     NEXT_PUBLIC_API_URL = <your-products-app-api-url>
     ```
4. Run the development server: `npm run dev`
5. Open your browser and visit `http://localhost:3000` to view the application.

## Additional Information

If you are intrested in the server-side repository, you can find it [here](https://github.com/shaharyair/app-products-demo-server).

Feel free to explore, enhance, and customize the application to meet your specific needs!
