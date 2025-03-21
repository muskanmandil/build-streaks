const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const sendEmail = async (mailOptions) => {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.REFRESH_TOKEN;
    const redirectURI = 'https://developers.google.com/oauthplayground';
    const senderEmail = process.env.EMAIL_ADDRESS;

    const oAuth2Client = new google.auth.OAuth2(
        clientID, clientSecret, redirectURI
    );

    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    try {
        const accessToken = await oAuth2Client.getAccessToken();
        if (!accessToken.token) {
            throw new Error('Failed to retrieve access token.');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: senderEmail,
                clientId: clientID,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
                accessToken: accessToken.token,
            },
        });

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending Email:', error);
        throw new Error('Failed to send Email');
    }
}

module.exports = { sendEmail };