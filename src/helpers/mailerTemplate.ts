import {newUserTemplate} from "../components/user/user.types";

export function newUser({name, email, password, link, subject}: newUserTemplate) {
    const logo = ``;
    const htmlMessage = `<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <style>
        body {
            font-family: Arial;
        }
    </style>
</head>
<body style="background-color: #F3F3F5">
<div
        style="width: 100%; height: 100%;
 box-sizing: border-box;"
>
    <table style="width: 100%; height: 100%">
        <tr>
            <td align="center" valign="center">
                <div style="height: 100%; width: 100%; padding: 70px 0">
                    <div style="background-color: white; width: 740px;overflow: auto">
                        <table
                                style="width: 100%; padding: 10%"
                                cellspacing="0"
                                cellpadding="0"
                        >
                            <tr>
                                <td align="center" valign="center">
                                    <img
                                            src=${logo}
                                            style="width: 220px;"
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td align="center" valign="center">
                                    <div
                                            style="margin-top: 30px; font-weight: 500; font-size: 30px"
                                    >
                                        Hello ${name}, welcome to <a href="https://peerbits.com/">
                                           Peerbits
                                        </a>.
                                        We’re glad you’re here.
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" valign="center">
                                    <div
                                            style="margin-top: 10px; font-size: medium; font-weight: 400"
                                    >
                                        Build your own Offshore Remote Team

                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" valign="center">
                                    <div
                                            style="margin-top: 30px; font-size: 22px; font-weight: 500"
                                    >
                                        Here are your credentials:

                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" valign="center">
                                    <div
                                            style="margin-top: 10px; font-size: large; font-weight: 500"
                                    >
                                        Email: ${email}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" valign="center">
                                    <div
                                            style="font-size: large; font-weight: 500"
                                    >
                                        Password: ${password}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" valign="center">
                                    <div
                                            style="margin-top: 40px; font-size: 22px; font-weight: 500"
                                    >
                                        Ready to build Conversational Experiences?
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td align="center" valign="center">
                                    <div
                                            style="margin-top: 15px; font-size: large;"
                                    >
                                        Check out all of your account's features and see the powerful tool you have at
                                        your fingertips!
                                    </div>
                                </td>
                            </tr>
							<tr>
                                <td align="center" valign="center">
                                    <div style="margin-top: 15px; font-size: large;"
                                    >
                                     Support:
                                     <img src="https://static-serves.s3.ap-south-1.amazonaws.com/Antonic-Dev/Antonic-email/whatsapp.png"
                                      style="height: 20px; width: 20px; margin-left: 10px">
                                    <a href="https://wa.me/1234567890">
                                        +1234567890
                                        </a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="center">
                                    <div style=" width: 200px;
            margin-top: 50px;
            font-size: 16px;
            border: 1px solid #EA008D;
            background-color: #6E18CF;
            color: white;
            font-weight: 500;
            border-radius: 25px;
            padding: 12px 20px;
            cursor: pointer;">
                                        <a href=${link}
                                           style="text-decoration: none; color: white; font-size: large; font-weight: 500">
                                            Sign In here
                                        </a>
                                    </div>
                                </td>
                            </tr>

                        </table>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</div>
</body>
</html>`;

    return {
        subject,
        to: email,
        html: htmlMessage,
    };
}
