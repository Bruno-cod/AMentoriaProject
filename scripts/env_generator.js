const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..'); 
const envPath = path.join(rootDir, '.env');
const examplePath = path.join(rootDir, '.env.example');

console.log('⚙️ Verificando ambiente local na raiz do projeto...');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(examplePath)) {
    try {
      let envContent = fs.readFileSync(examplePath, 'utf8');

      
      const secureSecret = crypto.randomBytes(32).toString('hex');
      envContent = envContent.replaceAll('GERAR_SECRET_KEY_AUTOMATICO', secureSecret);

      
      const dbPassword = crypto.randomBytes(8).toString('hex');
      envContent = envContent.replaceAll('GERAR_SENHA_BANCO_AUTOMATICO', dbPassword);

      fs.writeFileSync(envPath, envContent, { encoding: 'utf8' });
      console.log('✅ Arquivo .env gerado com sucesso com credenciais seguras!');
    } catch (err) {
      console.log('❌ Erro ao gravar o arquivo .env:', err.message);
    }
  } else {
    console.log('❌ Erro: Arquivo .env.example não foi encontrado na raiz.');
  }
} else {
  console.log('ℹ️ Arquivo .env já existe. Pulando geração.');
}