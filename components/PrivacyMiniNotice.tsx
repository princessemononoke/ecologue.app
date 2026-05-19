import { SITE_CONFIG } from '../config/siteConfig';

type PrivacyMiniNoticeProps = {
  variant?: 'pro' | 'public';
};

export function PrivacyMiniNotice({ variant = 'public' }: PrivacyMiniNoticeProps) {
  const isPro = variant === 'pro';

  return (
    <aside className={`mt-5 rounded-2xl border p-4 text-sm leading-relaxed ${isPro ? 'border-[#84A59D]/30 bg-white/5 text-[#F7EDE2]/85' : 'border-[#84A59D]/25 bg-[#F7EDE2]/70 text-[#23312D]/75'}`}>
      <p className="font-bold">Données et confidentialité</p>
      <p className="mt-1">
        Les réponses servent d’abord à calculer vos résultats dans le navigateur. À la fin du questionnaire, vous pourrez choisir de transmettre volontairement vos résultats à {SITE_CONFIG.companyName}. Aucun envoi n’est réalisé sans validation du formulaire de transmission et acceptation de la politique de confidentialité.
      </p>
      <a href={SITE_CONFIG.privacyUrl} className={`mt-2 inline-flex font-bold underline ${isPro ? 'text-[#F6BD60]' : 'text-[#2F4F49]'}`}>
        Lire la politique de confidentialité
      </a>
    </aside>
  );
}
