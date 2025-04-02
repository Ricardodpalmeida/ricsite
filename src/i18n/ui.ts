// src/i18n/ui.ts
// Define supported languages
export const languages = {
  en: 'English',
  pt: 'Português',
};

export const defaultLang = 'en';

// Get current year for copyright
const currentYear = new Date().getFullYear();

// Define UI string translations
export const ui = {
  en: {
    // Site Metadata
    'site.title': 'Ricardo Almeida | Data & AI Manager',
    'site.description': 'Data & AI Manager at PwC Portugal specializing in AI solutions, Cloud Architecture, Microsoft Power Platform, and RAG implementations.',
    'site.author': 'Ricardo Almeida',
    'site.keywords': 'AI Solutions Architecture, RAG, LLM Integration, Microsoft Power Platform, Azure Cloud Architecture, Data & AI Manager, Power BI, Data Science, Low-code Development',
    
    // JSON-LD Data
    'jsonld.jobTitle': 'Manager, Data & AI',
    'jsonld.organization': 'PwC Portugal',
    'jsonld.description': 'Data & AI lead with a passion for creating practical, AI-powered cloud-based products that blend low-code and pro-code approaches.',
    'jsonld.skills': 'AI Solutions Architecture, RAG, LLM Integration, Microsoft Power Platform, Azure Cloud Architecture',
    
    // Language Switcher
    'lang.switchToEn': 'Switch to English',
    'lang.switchToPt': 'Mudar para Português',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    
    // Hero section
    'hero.greeting': 'Hi, I\'m',
    'hero.jobTitle': 'Data & AI Manager | Cloud Solution Architect',
    
    // Contact Button
    'contact.button': 'Get in Touch',
    'contact.verifying': 'Verifying...',
    'contact.recaptcha.prefix': 'This site is protected by reCAPTCHA v3 and the Google',
    'contact.recaptcha.privacy': 'Privacy Policy',
    'contact.recaptcha.terms': 'Terms of Service',
    'contact.recaptcha.suffix': 'apply.',
    'contact.errorAlert': 'Verification failed. Please try again.',
    'contact.recaptchaErrorAlert': 'Could not initiate verification. Please ensure you are online.',
    
    // Footer
    'footer.copyright': `© ${currentYear} Ricardo Almeida. All rights reserved.`,
    
    // About page
    'about.title': 'About',
    'about.me': 'Me',
    
    // Profile sections
    'profile.about': 'About',
    'profile.skills': 'Skills',
    'profile.technologies': 'Technologies',
    'profile.and': 'and',
    'profile.experience': 'Experience',
    'profile.education': 'Education',
    'profile.certifications': 'Certifications',
    'profile.languages': 'Languages',
    'profile.grade': 'Grade',
    'profile.thesis': 'Thesis',
    'profile.issued': 'Issued',
    'profile.expires': 'Expires',
    'profile.credentialId': 'Credential ID',
    'profile.verifyCertificate': 'Verify Certificate',
    'profile.contact': 'Contact',
    
    // Thank you page
    'thanks.title': 'Thank',
    'thanks.highlight': 'You',
    'thanks.message': 'I\'ve received your message and will get back to you as soon as possible.',
    'thanks.returnHome': 'Return to Home',
    
    // Error messages
    'error.profileData': 'Profile data could not be loaded.',
    
    // RSS Feed Title
    'rss.title': 'Blog RSS Feed',
    
    // Error pages
    '404.title': 'Page Not Found',
    '404.message': 'Sorry, the page you\'re looking for doesn\'t exist or has been moved.',
    '404.returnHome': 'Return to Home',
    
    // Blog
    'blog.title': 'Blog',
    'blog.updated': 'Updated',
    'blog.noPostsMessage': 'No posts available in this language.',
    'blog.back': 'Back to Blog',
  },
  pt: {
    // Site Metadata
    'site.title': 'Ricardo Almeida | Gestor de Data & IA',
    'site.description': 'Gestor de Data & IA na PwC Portugal especializado em soluções de IA, Arquitetura Cloud, Microsoft Power Platform e implementações RAG.',
    'site.author': 'Ricardo Almeida',
    'site.keywords': 'Arquitetura de Soluções de IA, RAG, Integração de LLM, Microsoft Power Platform, Arquitetura Cloud Azure, Gestor de Data & IA, Power BI, Ciência de Dados, Desenvolvimento Low-code',
    
    // JSON-LD Data
    'jsonld.jobTitle': 'Gestor, Data & IA',
    'jsonld.organization': 'PwC Portugal',
    'jsonld.description': 'Líder de Data & IA com paixão por criar produtos cloud práticos com IA que combinam abordagens low-code e pro-code.',
    'jsonld.skills': 'Arquitetura de Soluções de IA, RAG, Integração de LLM, Microsoft Power Platform, Arquitetura Cloud Azure',
    
    // Language Switcher
    'lang.switchToEn': 'Switch to English',
    'lang.switchToPt': 'Mudar para Português',
    
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.blog': 'Blog',
    
    // Hero section
    'hero.greeting': 'Olá, sou o',
    'hero.jobTitle': 'Gestor de Data & IA | Arquiteto de Soluções Cloud',
    
    // Contact Button
    'contact.button': 'Entre em Contato',
    'contact.verifying': 'Verificando...',
    'contact.recaptcha.prefix': 'Este site é protegido pelo reCAPTCHA v3 e pela',
    'contact.recaptcha.privacy': 'Política de Privacidade',
    'contact.recaptcha.terms': 'Termos de Serviço',
    'contact.recaptcha.suffix': 'aplicam-se.',
    'contact.errorAlert': 'Falha na verificação. Por favor, tente novamente.',
    'contact.recaptchaErrorAlert': 'Não foi possível iniciar a verificação. Verifique se está online.',
    
    // Footer
    'footer.copyright': `© ${currentYear} Ricardo Almeida. Todos os direitos reservados.`,
    
    // About page
    'about.title': 'Sobre',
    'about.me': 'Mim',
    
    // Profile sections
    'profile.about': 'Sobre',
    'profile.skills': 'Competências',
    'profile.technologies': 'Tecnologias',
    'profile.and': 'e',
    'profile.experience': 'Experiência',
    'profile.education': 'Educação',
    'profile.certifications': 'Certificações',
    'profile.languages': 'Idiomas',
    'profile.grade': 'Nota',
    'profile.thesis': 'Tese',
    'profile.issued': 'Emitido',
    'profile.expires': 'Expira',
    'profile.credentialId': 'ID da Credencial',
    'profile.verifyCertificate': 'Verificar Certificado',
    'profile.contact': 'Contato',
    
    // Thank you page
    'thanks.title': 'Obrigado',
    'thanks.highlight': '!',
    'thanks.message': 'Recebi a sua mensagem e responderei o mais breve possível.',
    'thanks.returnHome': 'Voltar para o Início',
    
    // Error messages
    'error.profileData': 'Não foi possível carregar os dados do perfil.',
    
    // RSS Feed Title
    'rss.title': 'Feed RSS do Blog',
    
    // Error pages
    '404.title': 'Página Não Encontrada',
    '404.message': 'Desculpe, a página que procura não existe ou foi movida.',
    '404.returnHome': 'Voltar ao Início',
    
    // Blog
    'blog.title': 'Blog',
    'blog.updated': 'Atualizado',
    'blog.noPostsMessage': 'Não há posts disponíveis neste idioma.',
    'blog.back': 'Voltar ao Blog',
  },
} as const; 