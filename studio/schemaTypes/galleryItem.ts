import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Galerija / Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Slika',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categorySr',
      title: 'Kategorija (Srpski)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoryEn',
      title: 'Category (English)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'captionSr',
      title: 'Opis (Srpski)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'captionEn',
      title: 'Caption (English)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Redosled (manji broj = prikazuje se prvo)',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Redosled',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'captionSr', media: 'image'},
  },
})
