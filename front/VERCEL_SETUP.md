# 🚀 Configuración de Variables de Entorno en Vercel

## Paso a paso para configurar el email en producción

### 1. Accede a tu proyecto en Vercel
- Ve a [vercel.com](https://vercel.com)
- Entra a tu proyecto del portfolio

### 2. Configura las Variables de Entorno
- Ve a **Settings** → **Environment Variables**
- Agrega estas 2 variables:

```
Nombre: EMAIL_USER
Valor: julievill77@gmail.com
Environments: Production, Preview, Development (selecciona todos)
```

```
Nombre: EMAIL_PASS
Valor: [tu_app_password_de_16_caracteres_sin_espacios]
Environments: Production, Preview, Development (selecciona todos)
```

### 3. Re-desplegar
Después de agregar las variables:
- Ve a **Deployments**
- Click en **"Redeploy"** en el último deployment
- Espera a que termine el proceso

### 4. Probar funcionamiento
- Ve a tu sitio: `https://tu-proyecto.vercel.app`
- Prueba el formulario de contacto
- Verifica que recibas el email en `julievill77@gmail.com`

## 🔧 Comandos útiles para desarrollo

```bash
# Probar email localmente (después de configurar .env.local)
npm run test:email

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

## 📊 Monitoreo en Vercel

Para ver si hay errores:
1. **Dashboard** → **Functions**
2. Busca `/api/send-email`
3. Revisa los **Runtime Logs**

## 🚨 Troubleshooting común

### "Variables de entorno no configuradas"
- Verifica que agregaste EMAIL_USER y EMAIL_PASS en Vercel
- Asegúrate de seleccionar todos los environments
- Re-despliega después de agregar variables

### "Authentication failed"
- Genera un nuevo App Password en Gmail
- Verifica que no tenga espacios
- Asegúrate de que la verificación en dos pasos esté activada

### El formulario no responde
- Revisa la consola del navegador para errores
- Verifica que la URL de la API sea correcta
- Revisa los Runtime Logs en Vercel