this backend can upload video and image to cloudeinary with the help of multer

POST http://localhost:3000/upload 

    body >>> form-data >>> key:video/file [dropdown:File] >>> value: {select the video/image}

GET http://localhost:3000/uploads/{the new generated file name}
    
    you will get the "GET" url automatically on the console for successful upload