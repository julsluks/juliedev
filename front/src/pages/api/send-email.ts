import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

interface EmailData {
    name: string
    email: string
    subject: string
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { name, email, subject, message }: EmailData = req.body

    // Validar que todos los campos estén presentes
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email inválido' })
    }

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Variables de entorno EMAIL_USER o EMAIL_PASS no configuradas')
        return res.status(500).json({ message: 'Configuración del servidor incompleta' })
    }

    try {
        // Configurar el transportador de email usando Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // Configuración adicional para producción
            secure: true,
            port: 465,
        })

        // Verificar la conexión en desarrollo
        if (process.env.NODE_ENV === 'development') {
            await transporter.verify()
            console.log('Servidor de email configurado correctamente')
        }

        // Email para ti (notificación del mensaje recibido)
        const notificationEmail = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Tu email donde quieres recibir los mensajes
            subject: `📧 Nuevo mensaje del portfolio: ${subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Nuevo mensaje del portfolio</title>
                </head>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="margin: 0;">💼 Nuevo mensaje desde tu portfolio</h2>
                    </div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e9ecef; font-weight: bold; width: 100px;">Nombre:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e9ecef;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e9ecef; font-weight: bold;">Email:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e9ecef;"><a href="mailto:${email}">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e9ecef; font-weight: bold;">Asunto:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e9ecef;">${subject}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 20px;">
                            <h4 style="color: #495057; margin-bottom: 10px;">Mensaje:</h4>
                            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e9ecef;">
                        <p style="font-size: 12px; color: #6c757d; margin: 0;">
                            📅 Enviado el ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} desde tu portfolio web
                        </p>
                    </div>
                </body>
                </html>
            `,
            replyTo: email,
        }

        // Email de confirmación para el remitente
        const confirmationEmail = {
            from: `"Julie Villegas Portfolio" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `✅ Mensaje recibido - Portfolio Julie Villegas`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Confirmación de mensaje</title>
                </head>
                <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
                        <h2 style="margin: 0;">✅ ¡Mensaje recibido correctamente!</h2>
                    </div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                        <p style="font-size: 16px; color: #495057; margin-top: 0;">Hola <strong>${name}</strong>,</p>
                        
                        <p style="color: #495057;">Gracias por contactarme a través de mi portfolio. He recibido tu mensaje correctamente:</p>
                        
                        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745; margin: 20px 0;">
                            <p style="margin: 0; color: #495057;"><strong>Asunto:</strong> ${subject}</p>
                        </div>
                        
                        <p style="color: #495057;">Te responderé lo antes posible, generalmente en un plazo de 24-48 horas.</p>
                        
                        <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 0; color: #1976d2; font-size: 14px;">
                                <strong>💡 Mientras tanto:</strong><br>
                                • Puedes ver más de mi trabajo en mi portfolio<br>
                                • Conecta conmigo en <a href="https://linkedin.com/in/tu-perfil" style="color: #1976d2;">LinkedIn</a><br>
                                • Revisa mis proyectos en <a href="https://github.com/tu-usuario" style="color: #1976d2;">GitHub</a>
                            </p>
                        </div>
                        
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e9ecef;">
                        
                        <p style="color: #495057;">¡Saludos!</p>
                        <p style="color: #495057; font-weight: bold;">Julie Villegas</p>
                        <p style="font-size: 12px; color: #6c757d; margin: 0;">
                            📅 ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
                        </p>
                    </div>
                </body>
                </html>
            `,
        }

        // Enviar ambos emails
        const [notificationInfo, confirmationInfo] = await Promise.all([
            transporter.sendMail(notificationEmail),
            transporter.sendMail(confirmationEmail)
        ])
        
        console.log('Email de notificación enviado:', notificationInfo.messageId)
        console.log('Email de confirmación enviado:', confirmationInfo.messageId)

        res.status(200).json({ 
            message: 'Emails enviados correctamente',
            notificationId: notificationInfo.messageId,
            confirmationId: confirmationInfo.messageId
        })
    } catch (error: any) {
        console.error('Error detallado enviando email:', {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        })
        
        res.status(500).json({ 
            message: 'Error enviando el email',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno del servidor'
        })
    }
}