import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsPost',
  title: 'Vest / News',
  type: 'document',
  fields: [
    defineField({
      name: 'titleSr',
      title: 'Naslov (Srpski)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'titleEn', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerptSr',
      title: 'Kratak opis (Srpski)',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerptEn',
      title: 'Excerpt (English)',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bodySr',
      title: 'Tekst (Srpski)',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bodyEn',
      title: 'Body (English)',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'titleSr', subtitle: 'date'},
  },
})
