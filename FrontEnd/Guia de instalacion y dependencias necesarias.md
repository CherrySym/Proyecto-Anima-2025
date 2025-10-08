## ⚙️ Instalación rápida

1. **Cloná el repositorio y entrá a la carpeta del backend:**

   git clone https://github.com/CherrySym/Proyecto-Anima-2025.git 
   cd backend

2. **Instlaar Dependencias Necesarias:**

    npm install 

3. **Hay que tener MySQL instaldo:**

    **Dentro de MySQL**

    CREATE DATABASE JobPath_DB;
    CREATE USER 'master_user'@'localhost' IDENTIFIED BY 'master_user123';
    GRANT ALL PRIVILEGES ON JobPath_DB.* TO 'master_user'@'localhost';
    FLUSH PRIVILEGES;
    EXIT:


    **Creá un archivo .env en la raíz del proyecto con tu configuración de base de datos**

    DATABASE_URL="mysql://master_user:master_user123@localhost:3306/JobPath_DB"

4. **Genera la base de datos con PRISMA**

    npx prisma generate

5. **Inciar Servidor del BACK**

    npm run dev


