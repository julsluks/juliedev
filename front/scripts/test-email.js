// Script para probar la funcionalidad de email localmente
const nodemailer = require('nodemailer')
require('dotenv').config({ path: '.env.local' })

async function testEmailConnection() {
    console.log('🔍 Probando configuración de email...\n')
    
    // Verificar variables de entorno
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ Error: Variables EMAIL_USER o EMAIL_PASS no encontradas en .env.local')
        process.exit(1)
    }
    
    console.log('✅ Variables de entorno encontradas:')
    console.log(`   EMAIL_USER: ${process.env.EMAIL_USER}`)
    console.log(`   EMAIL_PASS: ${'*'.repeat(process.env.EMAIL_PASS.length)}\n`)
    
    try {
        // Crear transportador
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            secure: true,
            port: 465,
        })
        
        console.log('🔌 Verificando conexión con Gmail...')
        await transporter.verify()
        console.log('✅ Conexión con Gmail exitosa!\n')
        
        // Enviar emails de prueba (simulando el comportamiento real)
        console.log('📧 Enviando emails de prueba (notificación + confirmación)...')
        
        const testNotificationEmail = {
            from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
            to: 'julievill77@gmail.com',
            subject: '🧪 Test - Notificación de mensaje',
            html: `
                <h2>✅ Test de Notificación Exitoso!</h2>
                <p>Este es el email que recibirás cuando alguien te contacte.</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
                <p><strong>Tipo:</strong> Email de notificación</p>
                <hr>
                <p><small>Email de prueba para verificar la funcionalidad.</small></p>
            `
        }

        const testConfirmationEmail = {
            from: `"Julie Villegas Portfolio" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Te lo envío a ti para que puedas ver cómo se ve
            subject: '🧪 Test - Confirmación para remitente',
            html: `
                <h2>✅ Test de Confirmación Exitoso!</h2>
                <p>Este es el email que recibirán las personas que te contacten.</p>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
                <p><strong>Tipo:</strong> Email de confirmación</p>
                <hr>
                <p><small>Email de prueba para verificar la funcionalidad.</small></p>
            `
        }
        
        const [notificationInfo, confirmationInfo] = await Promise.all([
            transporter.sendMail(testNotificationEmail),
            transporter.sendMail(testConfirmationEmail)
        ])
        
        console.log('✅ Emails de prueba enviados exitosamente!')
        console.log(`   Notificación ID: ${notificationInfo.messageId}`)
        console.log(`   Confirmación ID: ${confirmationInfo.messageId}`)
        console.log(`   Destinatario: julievill77@gmail.com\n`)
        
        console.log('🎉 ¡Todo configurado correctamente!')
        console.log('   Tu formulario de contacto debería funcionar tanto local como en Vercel.')
        
    } catch (error) {
        console.error('❌ Error en la prueba:', error.message)
        console.error('\n🔧 Posibles soluciones:')
        console.error('   1. Verifica que tu App Password sea correcto')
        console.error('   2. Asegúrate de que la verificación en dos pasos esté activada en Gmail')
        console.error('   3. Genera un nuevo App Password si es necesario')
        console.error('   4. Verifica que no haya espacios extra en las variables de entorno')
        process.exit(1)
    }
}

// Ejecutar la prueba
testEmailConnection()