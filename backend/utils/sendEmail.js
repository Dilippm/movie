const nodemailer = require("nodemailer");


module.exports =async(email,subject,text)=>{
    try {
      
        const transporter=nodemailer.createTransport({
            host:`sandbox.smtp.mailtrap.io`,
            service:`Gmail`,
            port:`587`,
            secure:true,
            auth:{
                user:"dilipnambiarpm@gmail.com",
                pass:"lbxowcudbehosvzr"
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