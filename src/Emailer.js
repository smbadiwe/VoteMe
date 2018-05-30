import nodemailer from "nodemailer";
import { apiSuccess, apiError } from "./utils";
import mustache from "mustache";
import fs from "fs";
import path from "path";

export default class Emailer {
  /**
     * 
     * @param {*} emailAccountDetails Format {
      host: "the.smtp.host",
      port: 587,
      secure: false | true,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })
     */
  constructor(emailAccountDetails) {
    if (!emailAccountDetails) throw new Error("emailAccountDetails cannot be null");
    this._emailAccountDetails = emailAccountDetails;
    this._transporter = null;
    this.emailTemplateDirectory = "./email-templates";
  }

  getTransporter() {
    if (!this._transporter) {
      this._transporter = nodemailer.createTransport(this._emailAccountDetails);
    }
    return this._transporter;
  }

  /**
   *
   * @param {*} emailOptions
   * @param {*} htmlTemplatePath path of the file relative to ./email-templates
   * @param {*} viewData
   */
  sendEmail(emailOptions, htmlTemplatePath, viewData) {
    const postProcess = async (err, page) => {
      if (err) {
        console.error(err);
        return apiError(err.message);
      }
      try {
        const htmlBody = mustache.to_html(page, viewData);
        return await sendEmail(emailOptions, htmlBody);
      } catch (e) {
        console.error(e);
        return apiError(e.message);
      }
    };

    try {
      htmlTemplatePath = path.resolve(this.emailTemplateDirectory, htmlTemplatePath);
      fs.readFile(htmlTemplatePath, "utf8", postProcess);
    } catch (e) {
      console.error(e);
      return apiError(e.message);
    }
  }

  /**
   *
   * @param {*} emailOptions an Email object (or similar JSON) with all properties set. Seee https://nodemailer.com/message/ for options
   *
   * @see Email class definition
   */
  async sendEmail(emailOptions, htmlBody) {
    // create reusable transporter object using the default SMTP transport
    const transporter = this.getTransporter();

    const mailOptions = {
      from: emailOptions.from,
      to: emailOptions.to,
      subject: emailOptions.subject,
      html: htmlBody
    }; // sender address // list of receivers // Subject line // html body

    // send mail with defined transport object
    try {
      const resp = await transporter.sendMail(mailOptions);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }
}
