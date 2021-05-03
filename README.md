# Image Repository

This is an image repository created for the Shopify backend challenge for Fall 2021. It allows users to add images, view images, and search images. Users can also delete and download images that have been uploaded.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech Stack

React.js, Node.js, MongoDB and Express.js

## How to Run

In order to run, you will need [Node.js](https://nodejs.org/en/) and a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.

Once you have cloned the application, you can replace the DB connection in ./server/index.js to your Atlas URI.

```
const uri =
  "mongodb+srv://selenachen:Password@cluster0.r6qaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
```

```
git clone https://github.com/chenselena/shopify-backend-challenge.git
npm install
npm run start-app
```

## API Routes

- **GET**:

```
/uploads
```
Queries all of the images in the database. You can query individual images through id by adding /:id to the end.

```
/download/:id
```
Allows users to download the image by id.

Example:
```
{
        "_id": "608ecfca426251a5f6c34747",
        "title": "Ice cream",
        "description": "Wow yummy ice cream!",
        "file_path": "files/icecream.jpeg",
        "file_mimetype": "image/jpeg",
        "createdAt": "2021-05-02T16:14:02.549Z",
        "updatedAt": "2021-05-02T16:14:02.549Z",
        "__v": 0
    }
```

- **POST**:
```
/uploads
```
Posts a new image to the database and adds image file locally to /files/

- **DELETE**:
```
/uploads/:id"
```
Deletes the image with id from the database.

## Application Features

- Users can **add** images (one at a time) to the repository. The image data (title, description, file_path and file_mimetype) are saved as JSON in MongoDB, and the image files are saved locally in the application under /files/. Images are displayed by getting the local files.
- Users can **delete** images (one at a time) from the repository. The image data in JSON is removed from MongoDB and the image file is deleted from /files/
- Users can **download** images (one at a time).
- Users can **search** for images by the title when uploaded.

## Future Features

- User login/authentication that secures individual user images.
- Bulk image upload feature
- Add public and private permissions with user accounts.

## Available Scripts

In the project directory, you can run:

### `npm run start-app`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
