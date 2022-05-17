const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Outerwear' },
    { name: 'Pants' },
    { name: 'Tops' },
    { name: 'Accessories' },
    { name: 'Swimwear' },
    { name: 'Dresses' },
    { name: 'Skirts' },
    { name: 'Shoes' }
  ]);

  console.log('Categories Seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Green Pants',
      description:
        'Rare Abercrombie and Fitch Green khaki colored vintage 2000s low rise cargo pants with pockets and zip up details. Size 0, in excellent preloved condition. Pockets on side and in back, perfect low rise style to pair with a cami!',
      images: ["GreenPants.jpg", "Skirt.jpg"],
      category: categories[1]._id,
      price: 40.00,
      quantity: 1
    },
    {
      name: `Mariner's Hat`,
      description:
        `Y2k Mariners Hat. MLB baseball snap back dad cap. Broke in slight fade. Seattle USA PNW`,
      images: ['Hat.jpg'],
      category: categories[3]._id,
      price: 15,
      quantity: 1
    },
    {
      name: 'Harley Tank',
      category: categories[2]._id,
      description:
        `Original Deadstock Harley Davidson Baby Tank Size X-small-small`,
      images: ['HarleyTank.jpg'],
      price: 75,
      quantity: 1
    },
    {
      name: 'New Balance',
      category: categories[7]._id,
      description:
        `Jaden Smith X New Balance sneakers. Worn twice for working out. Platform`,
      images: ['NewBalance.jpg'],
      price: 65,
      quantity: 1
    },
    {
      name: 'Red Sweater',
      category: categories[2]._id,
      description:
        'Red Urban Outfitters cropped sweater! Super cute and would look great for spring :)',
      images: ['Sweater.jpg'],
      price: 20,
      quantity: 1
    },
    {
      name: 'Sandals',
      category: categories[7]._id,
      description:
        'Courtney Platform Sandal by Vagabond Shoemakers Size 8.I am usually a size 7.5 and these sandals were huge on me length wise. I am so so so sad about it as they are truly the perfect strappy y2k platform sandals.',
      images: ['Sandals.jpg'],
      price: 175,
      quantity: 1,
      comments: [{
        commentAuthor:'Emma',
        commentText: 'Omg these are to die for...',
        commentDate: '08/01/2021',
    },
    {
        commentAuthor:'Danica',
        commentText: `Would you consider shipping internationally?`,
        commentDate: '04/16/2022',
    }]
    },
    {
      name: 'Marc Jacobs Pink Skirt',
      category: categories[6]._id,
      description:
        `Brand: Marc Jacobs. 100% cotton. Purchased from someone else recently but was too wide for me. Size:2. Waist measurement: 16 inches.Length is 14`,
      images: ['Skirt.jpg'],
      price: 50,
      quantity: 1,
      comments: [{
        commentAuthor:'Emma',
        commentText: 'Omg I love this skirt so much. Would you consider lowing the price?',
        commentDate: '04/10/2022',
    },
    {
        commentAuthor:'Julia',
        commentText: 'I saw this on your instagram and I want it!',
        commentDate: '10/13/2021',
    },
    {
      commentAuthor:'Adele',
      commentText: 'Stop I need this',
      commentDate: '09/01/2021',
  }]
    },
    {
      name: 'Adidas',
      category: categories[7]._id,
      description:
        `Grey Adidas Campus Sneakers, 7.5 women 5.5 mens. Bought these on Ebay and worn once. Hardly used. Great condition. Super cute, just did not work with my wardrobe!`,
      images: ['Adidas.jpg'],
      price: 40,
      quantity: 1
    },
    {
      name: 'Y2K Levis',
      category: categories[1]._id,
      description: `Repop! Early 2000s Levi’s 517 Dark Wash Blue Mid Rise Bell Bottom Bootcut flare jeans. Tagged as a size 14 but best fits a 24 inch waist.`,
      images: ['Jeans.jpg'],
      price: 50,
      quantity: 1,
      comments: [{
        commentAuthor:'Emma',
        commentText: 'These are so cute',
        commentDate: '05/10/2022',
    },
    {
        commentAuthor:'Julia',
        commentText: 'I want these',
        commentDate: '10/13/2021',
    }]
    },
    {
      name: 'Swimsuit',
      category: categories[4]._id,
      description:
        `Cupshe And White Stripe V-Neck One Piece Swimsuit Size Medium
        New no tags
        This classic Black and White Stripe V-Neck One-Piece Swimsuit is a must-have for every body.`,
      images: ['Swimsuit.jpg'],
      price: 12,
      quantity: 1
    },
    {
      name: 'Halter Dress',
      category: categories[5]._id,
      description:
        `Free people cross halter dress! Size 2. Only worn a few times. Super cute for summer.`,
      images: ['Dress.jpg'],
      price: 25,
      quantity: 1
    },
    {
      name: 'Blue Tank Top',
      category: categories[2]._id,
      description:
        `Vintage Y2K Cottage Baby Blue V Neck Cami Tank Top SZ XS Early 2000s Cottagecore💙
        Pet free and smoke free home
        Pre owned great condition
        `,
      images: ['BlueCami.jpg'],
      price: 15,
      quantity: 1,
      comments: [{
        commentAuthor:'Ashley',
        commentText: 'This is so cute',
        commentDate: '05/10/2022',
    }],
    },
    {
      name: 'Butterfly Dress',
      category: categories[5]._id,
      description:
        `Urban Outfitters Kimchi Blue Yellow Empirewaist Floral Mini Dress Size Small.`,
      images: ['ButterflyDress.jpg'],
      price: 25,
      quantity: 1
    },
    {
      name: 'Jean Short',
      category: categories[1]._id,
      description:
        `Everlane Womens Cheeky Short Size 33 Blue Denim Cut Off Button Fly`,
      images: ['Short.jpg'],
      price: 30,
      quantity: 1
    },
    {
      name: 'Jean Jacket',
      category: categories[0]._id,
      description:
        `JEAN PAUL GAULTIER JEANS 1990s DENIM JACKET!! This vintage Jean Paul Gaultier Jean's denim jacket, circa the 1990s, is made out of 100% cotton medium blue denim.`,
      images: ['JeanJacket.jpg'],
      price: 100,
      quantity: 1,
      comments: [{
        commentAuthor:'Erica',
        commentText: 'Omg this jacket is to die for. Would you consider lowing the price?',
        commentDate: '03/10/2021',
    },
    {
        commentAuthor:'Alyssa',
        commentText: 'I saw this on your instagram and I want it!',
        commentDate: '10/20/2021',
    }]
    },
  ]);

  console.log('Products Seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Adele',
    lastName: 'Maxwell',
    email: 'armaxwell13@gmail.com',
    password: 'password123456',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Emma',
    lastName: 'Graham',
    email: 'egraham@hotmail.com',
    password: 'password123456'
  });

  console.log('Users Seeded');

  process.exit();
});
