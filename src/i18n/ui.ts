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
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    
    // Hero section
    'hero.greeting': 'Hi, I\'m',
    'hero.jobTitle': 'Data & AI Manager | Cloud Solution Architect',
    
    // Contact Button (New)
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
    // RSS Feed Title (New)
    'rss.title': 'Blog RSS Feed',
  },
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.blog': 'Blog',
    
    // Hero section
    'hero.greeting': 'Olá, sou o',
    'hero.jobTitle': 'Gestor de Data & IA | Arquiteto de Soluções Cloud',
    
    // Contact Button (New)
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
    // RSS Feed Title (New)
    'rss.title': 'Feed RSS do Blog',
  },
} as const; 