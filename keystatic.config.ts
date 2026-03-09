import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'michalk-kita/AdWise',
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'src/content/hero',
      format: { data: 'json' },
      schema: {
        preheader: fields.text({ label: 'Preheader' }),
        headline: fields.text({ label: 'Nagłówek' }),
        description: fields.text({ label: 'Opis', multiline: true }),
        primaryCtaText: fields.text({ label: 'Tekst głównego przycisku' }),
        primaryCtaHref: fields.text({ label: 'Link głównego przycisku' }),
        secondaryCtaText: fields.text({ label: 'Tekst drugiego przycisku' }),
        secondaryCtaHref: fields.text({ label: 'Link drugiego przycisku' }),
        image: fields.image({
          label: 'Grafika dekoracyjna',
          directory: 'public/images/hero',
          publicPath: '/images/hero/',
        }),
      },
    }),
    services: singleton({
      label: 'Usługi',
      path: 'src/content/services',
      format: { data: 'json' },
      schema: {
        sectionHeading: fields.text({ label: 'Nagłówek sekcji' }),
        ctaHeading: fields.text({ label: 'Nagłówek CTA' }),
        ctaDescription: fields.text({ label: 'Opis CTA', multiline: true }),
        ctaButtonText: fields.text({ label: 'Tekst przycisku CTA' }),
        ctaButtonHref: fields.text({ label: 'Link przycisku CTA' }),
        categories: fields.array(
          fields.object({
            title: fields.text({ label: 'Tytuł kategorii' }),
            description: fields.text({ label: 'Opis kategorii', multiline: true }),
            services: fields.array(
              fields.object({
                title: fields.text({ label: 'Nazwa usługi' }),
                description: fields.text({ label: 'Opis usługi', multiline: true }),
                buttonLabel: fields.text({ label: 'Tekst przycisku' }),
                href: fields.text({ label: 'Link' }),
              }),
              {
                label: 'Usługa',
                itemLabel: (props) => props.fields.title.value,
              }
            ),
          }),
          {
            label: 'Kategoria',
            itemLabel: (props) => props.fields.title.value,
          }
        ),
      },
    }),
    b2bVsB2c: singleton({
      label: 'B2B vs B2C',
      path: 'src/content/b2b-vs-b2c',
      format: { data: 'json' },
      schema: {
        heading: fields.text({ label: 'Nagłówek' }),
        description: fields.text({ label: 'Opis', multiline: true }),
        subheading: fields.text({ label: 'Podnagłówek' }),
        b2cItems: fields.array(
          fields.object({
            text: fields.text({ label: 'Tekst' }),
          }),
          { label: 'Element B2C', itemLabel: (props) => props.fields.text.value }
        ),
        b2bItems: fields.array(
          fields.object({
            text: fields.text({ label: 'Tekst' }),
          }),
          { label: 'Element B2B', itemLabel: (props) => props.fields.text.value }
        ),
      },
    }),
  },
  collections: {
    caseStudies: collection({
      label: 'Case Studies',
      slugField: 'name',
      path: 'src/content/case-studies/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nazwa firmy' } }),
        stat: fields.text({ label: 'Statystyka (np. "Zwiększyliśmy ruch")' }),
        value: fields.text({ label: 'Wartość (np. "+550%")' }),
        description: fields.text({ label: 'Opis', multiline: true }),
        buttonText: fields.text({ label: 'Tekst przycisku' }),
        tag: fields.text({ label: 'Tag (np. "STRONA INTERNETOWA")' }),
        image: fields.image({
          label: 'Zdjęcie',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
        }),
        sortOrder: fields.integer({
          label: 'Kolejność wyświetlania',
          defaultValue: 0,
        }),
      },
    }),
  },
});
