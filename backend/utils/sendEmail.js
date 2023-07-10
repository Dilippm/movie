const nodemailer = require("nodemailer");


module.exports =async(email,subject,text)=>{
    try {
      
        const transporter =nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            port:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            },

            mail: {
                // This property is new.
                smtp: {
                  // This property is new.
                  ssl: {
                    // This property is new.
                    version: "TLSv1.2"
                  }
                }
            }
            
                 })
        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text
        })
        
       
    } catch (error) {
        
        console.log(error);
    }
}