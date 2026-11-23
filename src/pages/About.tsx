import SEO from '@/components/SEO';
import SectionHeading from '@/components/SectionHeading';
import { site } from '@/config/site';
import { pexels } from '@/lib/media';

const values = [
  {
    title: 'Honest guidance',
    text: 'We explain options, costs and trade-offs in plain language — before you sign anything.',
  },
  {
    title: 'Local understanding',
    text: 'Based in Mehsana, we assist families, farmers, traders and transporters with vehicle finance enquiries from across Gujarat.',
  },
  {
    title: 'No false promises',
    text: 'We never guarantee approvals or quote rates we cannot deliver. Eligibility is always subject to lender assessment.',
  },
  {
    title: 'One point of contact',
    text: 'From enquiry to disbursal and beyond, you deal with one accountable team rather than a call-centre queue.',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description={`${site.name} is a vehicle finance assistance team based in Mehsana, helping customers across Gujarat explore new car, used car, refinance, commercial vehicle finance and insurance options.`}
        path="/about"
      />
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={pexels.about} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-950/60 to-night-950" />
        </div>
        <div className="container-site relative">
          <p className="eyebrow">About Us</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Vehicle finance, rooted in {site.location.city}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            {site.name} helps individuals and businesses across Gujarat arrange the right finance for the
            vehicles they rely on — with clear advice, careful paperwork and no shortcuts.
          </p>
        </div>
      </section>

      <section className="container-site grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Our Story" title="Built on referrals, not advertising" align="left" />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            <p>
              Heritage Auto Finance started with a simple observation: people in Mehsana and across Gujarat were being sold vehicle loans — not advised on them. Rates, tenures and charges were
              explained only after commitment.
            </p>
            <p>
              We set out to flip that. Today we assist with new car finance, used car finance, car refinance,
              commercial vehicle finance and insurance assistance, working with banks and NBFCs that operate
              in Gujarat. Most of our customers arrive the way we like best: referred by someone we helped
              before.
            </p>
            <p>
              We are a finance assistance service. We are not a bank and we do not lend directly — loan
              approval, rates and terms are decided by the lender after their eligibility checks.
            </p>
          </div>
        </div>
        <div className="grid content-start gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="glass-card p-6">
              <h3 className="font-display text-xl font-semibold text-gold-400">{v.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-night-900/40 py-16">
        <div className="container-site text-center">
          <SectionHeading
            eyebrow="Visit or Call"
            title="Talk to the team"
            description={`${site.hours} · Based in Mehsana, serving customers across Gujarat`}
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={`tel:${site.phoneDial}`} className="btn-gold">Call {site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`} className="btn-ghost">Email us</a>
          </div>
        </div>
      </section>
    </>
  );
}
