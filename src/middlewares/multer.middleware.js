import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./public/temp");
    },

    //config for what will be the name of our file when uploading
    filename: function(req, file, callback){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        //generating a random number then multiplying it by 1000000000 to get a large and unique number then rounded it.
        callback(null, file.filename + '-' + uniqueSuffix);
        //added that random number to file name to make it unique
    }
});

export const upload = multer({
    storage,
})