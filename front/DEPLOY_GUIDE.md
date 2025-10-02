# 🚀 Guía de Despliegue en Vercel

Este archivo contiene las instrucciones paso a paso para desplegar tu portfolio con funcionalidad de email en Vercel.

## 📋 Pre-requisitos

1. **Cuenta de Vercel**: https://vercel.com
2. **Gmail configurado** con App Password generada
3. **Repositorio en GitHub** con el código actualizado

## 🔧 Pasos para el despliegue

### 1. Preparar las variables de entorno

En tu dashboard de Vercel:
- Ve a tu proyecto
- Settings → Environment Variables
- Agrega las siguientes variables:

```
EMAIL_USER = julievill77@gmail.com
EMAIL_PASS = tu_app_password_de_gmail_de_16_caracteres
```

### 2. Configuración de dominio personalizado (opcional)

Si tienes un dominio propio:
- Settings → Domains
- Agrega tu dominio personalizado

### 3. Configuración de build

Vercel detectará automáticamente que es un proyecto Next.js, pero puedes verificar:
- Settings → General
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Variables de entorno de desarrollo vs producción

Local (.env.local):
```bash
EMAIL_USER=julievill77@gmail.com
EMAIL_PASS=tu_app_password_aqui
NODE_ENV=development
```

Producción (Vercel Environment Variables):
```bash
EMAIL_USER=julievill77@gmail.com
EMAIL_PASS=tu_app_password_aqui
NODE_ENV=production
```

### 5. Verificación de funcionamiento

Después del despliegue:
1. Visita tu sitio en la URL de Vercel
2. Ve a la sección de contacto
3. Envía un mensaje de prueba
4. Verifica que llegue a tu email

### 6. Monitoreo y logs

Para ver logs de errores:
- Dashboard de Vercel → Functions
- Busca `/api/send-email`
- Revisa los logs de ejecución

## 🔍 Troubleshooting

### Error común: "Variables de entorno no configuradas"
- Verifica que EMAIL_USER y EMAIL_PASS estén en Vercel
- Asegúrate de que no tengan espacios extra
- Re-deploya después de agregar las variables

### Error común: "Authentication failed"
- Verifica que tu App Password de Gmail sea correcta
- Asegúrate de que la verificación en dos pasos esté activada
- Genera un nuevo App Password si es necesario

### Error común: "Timeout"
- El límite de tiempo en Vercel es 10 segundos para hobby plan
- Si usas un plan Pro, puedes incrementar el tiempo en vercel.json

## 📞 API Endpoint en producción

Una vez desplegado, tu API estará disponible en:
```
https://tu-dominio-vercel.app/api/send-email
```

## 🔒 Seguridad

- Las variables de entorno están encriptadas en Vercel
- Nunca commitees archivos .env.local al repositorio
- Los App Passwords son específicos por aplicación y pueden revocarse

## 📈 Optimizaciones adicionales

1. **Límite de rate limiting**: Considera agregar limitación de solicitudes
2. **Validación adicional**: Captcha o honeypot para evitar spam
3. **Notificaciones**: Configurar Slack/Discord para notificaciones
4. **Analytics**: Trackear envíos exitosos vs fallidos