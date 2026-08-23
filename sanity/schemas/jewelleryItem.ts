import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'jewelleryItem',
  title: 'Jewellery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Necklace', value: 'necklace' },
          { title: 'Bangles', value: 'bangles' },
          { title: 'Earrings', value: 'earrings' },
          { title: 'Rings', value: 'rings' },
          { title: 'Bridal Sets', value: 'bridal sets' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      description: 'e.g. 22K Yellow Gold, Polki Diamond, Temple Antique Finish',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
  },
})
