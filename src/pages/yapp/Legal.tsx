import { useLang } from "@/lib/language";
import { PageHero, Reveal } from "@/components/yapp/chrome";
import { heroText as privacyHero, content as privacyContent } from "@/pages/PrivacyPolicyPage";
import { heroText as termsHero, content as termsContent } from "@/pages/TermsOfUsePage";

export function YappPrivacy() {
  const { lang } = useLang();
  const hero = privacyHero[lang];
  const c = privacyContent[lang];

  return (
    <>
      <PageHero label={hero.label} title={hero.heading} subtitle={hero.date} />
      <section className="yapp-section">
        <div className="yapp-container max-w-3xl">
          <Reveal>
            <p className="yapp-secondary leading-relaxed">{c.intro}</p>
          </Reveal>
          <div className="mt-12 space-y-10">
            {c.sections.map((s) => {
              const contact = "contact" in s ? (s as { contact?: { name: string; email: string } }).contact : undefined;
              return (
                <Reveal key={s.title}>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">{s.title}</h2>
                    {s.body && <p className="mt-3 yapp-secondary leading-relaxed">{s.body}</p>}
                    {s.items && (
                      <ul className="mt-4 space-y-3">
                        {s.items.map((it, i) => (
                          <li key={i} className="flex gap-3 yapp-secondary leading-relaxed">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00a9e0]" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.footer && <p className="mt-3 yapp-secondary leading-relaxed">{s.footer}</p>}
                    {contact && (
                      <div className="mt-4 rounded-[10px] border border-[#e0e3ea] bg-[#f4f5f7] p-5">
                        <p className="text-sm font-semibold">{contact.name}</p>
                        <a href={`mailto:${contact.email}`} className="text-sm text-[#00a9e0] hover:underline">{contact.email}</a>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function YappTerms() {
  const { lang } = useLang();
  const hero = termsHero[lang];
  const c = termsContent[lang];

  return (
    <>
      <PageHero label={hero.label} title={hero.heading} subtitle={hero.date} />
      <section className="yapp-section">
        <div className="yapp-container max-w-3xl">
          <Reveal>
            <p className="yapp-secondary leading-relaxed">{c.intro}</p>
          </Reveal>
          <Reveal className="mt-12">
            <h2 className="text-xl font-bold tracking-tight">{c.policyHeading}</h2>
            <ol className="mt-6 space-y-6">
              {c.principles.map((text, i) => (
                <li key={i} className="flex gap-3 yapp-secondary leading-relaxed">
                  <span className="font-bold text-[#1c2438]">{i + 1}.</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="mt-10">
            <p className="font-semibold">{c.signature}</p>
          </Reveal>
          <Reveal className="mt-8">
            <div className="border-t border-[#e0e3ea] pt-6">
              <p className="text-sm yapp-secondary">{c.contactLabel}</p>
              <a href="mailto:contact@the-unchain.com" className="text-sm text-[#00a9e0] hover:underline">contact@the-unchain.com</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
