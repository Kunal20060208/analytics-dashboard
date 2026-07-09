import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export default async function handler(req, res) {

    if(req.method !== "POST"){
        return res.status(405).json({
            success:false,
            message:"Method Not Allowed"
        });
    }

    try{

        const{
            to,
            subject,
            message
        }=req.body;

        if(!to || !subject || !message){

            return res.status(400).json({
                success:false,
                message:"Missing fields"
            });

        }

        await transporter.sendMail({

            from:`"Analytics Dashboard" <${process.env.EMAIL}>`,

            to,

            subject,

            html:message

        });

        return res.json({

            success:true,

            message:"Mail sent successfully"

        });

    }

    catch(error){

        console.error(error);

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

}