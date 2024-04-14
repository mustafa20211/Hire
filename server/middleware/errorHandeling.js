const errorHandeler = (err ,req,res , next)=>{
    console.log('error handeler work (message )' , err.message , err.code)
    let message  ; 
    switch(err.code){
        case 0:
            message = 'validation Failed'
            break; 
        case 5 : 
            message = 'db created error '
    }
    res.send({message})

}


export default errorHandeler ; 