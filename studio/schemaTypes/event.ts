import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Dogadjaj / Event',
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
      name: 'date',
      title: 'Datum',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationSr',
      title: 'Lokacija (Srpski)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locationEn',
      title: 'Location (English)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionSr',
      title: 'Opis (Srpski)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'titleSr', subtitle: 'date'},
  },
})
