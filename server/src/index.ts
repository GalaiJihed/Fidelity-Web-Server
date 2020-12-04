import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import ProductController from "./controller/ProductController";
import * as multer from "multer";

const storage = multer.diskStorage({
  destination : function(req,file,cb)
{
  cb(null,'../uploads/');
},
filename:function(req,file,cb)
{
  cb(null,file.originalname);

}
});
const upload=multer({storage:storage})



//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    
    // Create a new express application instance
    const app = express();
    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    //Set all routes from routes folder
    app.use("/", routes);

    app.post('/uploads',upload.single('image'), function (req, res) {
     
      
      if (!req.file) {
          console.log("Your request doesn’t have any file");
          return res.send({
            success: false
          });
      
        } else {
          console.log('Your file has been received successfully');
         // res.redirect("http://localhost:3000/store/uploadDb");
          return res.send({
            success: true
          })
        }
  });


  var uploaddatabase = multer({ //multer settings
    storage: storage
  }).single('file');
  /** API path that will upload the files */
  app.post('/uploaddb', function(req, res) {
    uploaddatabase(req,res,function(err){
  if(err){
  res.json({error_code:1,err_desc:err});
  return;
  }
  res.json({error_code:0,err_desc:null});
  });
  });



  
    app.post('/upload',upload.single('filedata'),async(req,res)=>{
      const{filename :image} = req.file
      let name =req.body.name;
      ProductController.updatePicture(image,name);
     
      console.log(image);
      return res.send("SUCCESS");
    })
    app.use('/images',express.static('../uploads/'));

    //UPLOAD DB
    var uploaddatabase = multer({ //multer settings
      storage: storage
    }).single('file');
    /** API path that will upload the files */
    app.post('/uploaddb', function(req, res) {
      uploaddatabase(req,res,function(err){
    if(err){
    res.json({error_code:1,err_desc:err});
    return;
    }
    res.json({error_code:0,err_desc:null});
    });
    });














    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));


  