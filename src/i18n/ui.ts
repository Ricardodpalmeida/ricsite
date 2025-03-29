// src/i18n/ui.ts
// Define supported languages
export const languages = {
  en: 'English',
  pt: 'Português',
};

export const defaultLang = 'en';

// Define UI string translations
export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.podcast': 'Podcast',
    'nav.music': 'Music',
    
    // Hero section
    'hero.greeting': 'Hi, I\'m',
    'hero.jobTitle': 'Data & AI Manager | Cloud Solution Architect',
    'hero.cta.learnMore': 'Learn More About Me',
    
    // Footer
    'footer.copyright': '© 2025 Ricardo Almeida. All rights reserved.',
    'footer.getInTouch': 'Get in Touch',
    'footer.verifying': 'Verifying...',
    'footer.recaptcha': 'This site is protected by reCAPTCHA v3 and the Google',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    
    // About page
    'about.title': 'About',
    'about.me': 'Me',
    
    // Profile sections
    'profile.about': 'About',
    'profile.skills': 'Skills',
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
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.blog': 'Blog',
    'nav.podcast': 'Podcast',
    'nav.music': 'Música',
    
    // Hero section
    'hero.greeting': 'Olá, sou o',
    'hero.jobTitle': 'Gestor de Data & IA | Arquiteto de Soluções Cloud',
    'hero.cta.learnMore': 'Saber Mais Sobre Mim',
    
    // Footer
    'footer.copyright': '© 2025 Ricardo Almeida. Todos os direitos reservados.',
    'footer.getInTouch': 'Entre em Contato',
    'footer.verifying': 'Verificando...',
    'footer.recaptcha': 'Este site é protegido pelo reCAPTCHA v3 e pela',
    'footer.privacyPolicy': 'Política de Privacidade',
    'footer.termsOfService': 'Termos de Serviço',
    
    // About page
    'about.title': 'Sobre',
    'about.me': 'Mim',
    
    // Profile sections
    'profile.about': 'Sobre',
    'profile.skills': 'Competências',
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
  },
} as const; 