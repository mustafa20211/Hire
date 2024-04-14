import multer, { MulterError } from 'multer' ; 
import {dirname} from 'path'
import path from 'path'
import { fileURLToPath } from 'url';
import { validationFun } from './validation.js';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename) ;

const storage = multer.diskStorage(
    {
        filename:(req,file ,cb)=>{
            const unique = Date.now()+Math.round(Math.random()*1E9)+path.extname(file.originalname)
            cb(null ,unique )
        },
        destination:(req,file,cb)=>{
            const container = path.join(__dirname , '../' , 'assets');
            cb(null ,container )
        }
    }
)

const filterfun = (req , file , cb )=>{
    let allowedTypes= ['.jpg', '.JPG', '.png' ,'.PNG' ,'.jpeg' ,'.JPEG'] ; 
    let extname = path.extname(file.originalname) ; 
    let VlidationResult = validationFun(req.body,'offer');
    const {error} = VlidationResult ;
    if (allowedTypes.includes(extname)&&!error)cb(null , true)
    else {
        cb (null , false)
    cb(new Error('file not support or form validation error '))}

   
} 

const uploadFun = multer({
    fileFilter:filterfun,
    storage , 
    limits:{fileSize:1024*1024 , files:2},
    
})
/////////////////
const uploadMiddleware = (req , res , next)=>{
    console.log('upload middlware start')
    try{
    uploadFun.fields([{name:"doc1" , maxCount:1} , 
    {name:"doc2" , maxCount:1}
])(req,res, next)
    
    
    }
    catch(error){
        next(error)
    }
}

//////////////
export {uploadFun , uploadMiddleware} ; 

