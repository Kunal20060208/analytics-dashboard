import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL,

        pass: process.env.PASSWORD

    }

});

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Analytics Dashboard Mail API Running"

    });

});

app.post("/send-mail", async (req, res) => {

    try {

        const {

            to,

            subject,

            message

        } = req.body;

        if (!to || !subject || !message) {

            return res.status(400).json({

                success: false,

                message: "Missing fields"

            });

        }

        await transporter.sendMail({

            from: `"Analytics Dashboard" <${process.env.EMAIL}>`,

            to,

            subject,

            html: message

        });

        res.json({

            success: true,

            message: "Mail sent successfully"

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Mail Server Running on http://localhost:${PORT}`);

});