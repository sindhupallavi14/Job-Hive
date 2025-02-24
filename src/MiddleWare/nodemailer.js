// Import Nodemailer
import nodemailer from 'nodemailer';

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sindhuramanadula14@gmail.com', 
        pass: 'vrox hrzj rnrb kast' 
    }
});

// Function to send welcome email to recruiter
export const sendWelcomeEmail = (email, name) => {
    const mailOptions = {
        from: 'sindhuramanadula14@gmail.com',
        to: email,
        subject: 'Welcome to JobHive Portal',
        text: `Hello ${name},\n\nWelcome to JobHive! You can now start posting jobs and hiring candidates.\n\nBest Regards,\nJobHive Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending welcome email:', error);
        } else {
            console.log('Welcome email sent:', info.response);
        }
    });
};

// Function to send job application confirmation email
export const sendApplicationEmail = (email, name) => {
    const mailOptions = {
        from: 'sindhuramanadula14@gmail.com',
        to: email,
        subject: 'Job Application Received',
        text: `Hello ${name},\n\nThank you for applying . We have received your application and will get back to you soon.\n\nBest Regards,\nJobHive Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending application email:', error);
        } else {
            console.log('Application email sent:', info.response);
        }
    });
};
