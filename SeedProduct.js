require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');

const products = [
  {   
        id: "108",
        name: "Duality in Unity",
        description: "A harmonious fusion of contrasting forces, this painting explores the dynamic relationship between opposites light and dark, strength and softness finding equilibrium in the dance of life.",
        price: 9000,
        imageUrl: "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0544.JPG",
        category: "Textured Art",
        artist: "Monika Kumari",
        rating: 4.9,
        dimensions: "24x36 inches",
        availableSizes: ["Small", "Medium"],
        isFeatured: true,
        imageGallery: [
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0610.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0544.JPG",
        ]
    },
    {
        id: "109",
        name: "Grace of the Divine",
        description: "This art piece combines traditional painting with three-dimensional, sculptural elements on the same canvas. It takes a traditional, sacred subject and reinterprets it using modern artistic techniques. Rather than a realistic depiction, it uses abstract textures, bold colors, and a stylized form to convey a feeling of spiritual energy and devotion.",
        price: 7500,
        imageUrl: "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0589.JPG",
        category: "Textured Art",
        artist: "Monika Kumari",
        rating: 4.8,
        dimensions: "30x40 inches",
        availableSizes: ["Medium", "Large"],
        isFeatured: false,
        imageGallery: [
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0589.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0588.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0591.JPG"
        ]
    },
    {   id: "103",
        name: "Midnight Voyage",
        description: "This art piece is a modern and evocative piece that uses texture and contrast to great effect. It captures a peaceful moment on the water, balancing abstraction with a clear and compelling subject. The simple, natural wood frame provides a warm, clean border that complements the painting's minimalist aesthetic.",
        price: 3000,
        imageUrl: "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0598.JPG",
        category: "Abstract Art",
        artist: "Monika Kumari",
        rating: 4.2,
        dimensions: "18x24 inches",
        availableSizes: ["Small", "Medium"],
        isFeatured: true,
        imageGallery: [
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0596.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0597.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0598.JPG"
        ]
    },
    {
        id: "104",
        name: "Fish Pond",
        description: "This is a compelling piece of abstract expressionism that effectively uses texture and color to explore themes of motion and depth. The artwork is matted with a white border and placed in a simple, warm-toned wood frame, which provides a clean contrast that contains and accentuates the painting's dynamic energy.",
        price: 4000,
        imageUrl: "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0599.JPG",
        category: "Textured Art",
        artist: "Monica Kumari",
        rating: 4.6,
        dimensions: "20x30 inches",
        availableSizes: ["Small", "Medium", "Large"],
        isFeatured: false,
        imageGallery: [
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0599.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0600.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0601.JPG"
        ]
    },
    {
        id: "105",
        name: "Electric Skyline",
        description: "This is a moody and atmospheric cityscape that effectively uses texture and a focused composition to convey the feeling of observing a distant city at night. The simple, natural wood frame provides a light, clean border that contrasts nicely with the dark tones of the painting.",
        price: 6000,
        imageUrl: "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0602.JPG",
        category: "Abstract Art",
        artist: "Monika Kumari",
        rating: 4.9,
        dimensions: "36x48 inches",
        availableSizes: ["Large"],
        isFeatured: true,
        imageGallery: [
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0602.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0603.JPG",        ]
          
    },
    {
        id: "106",
        name: "The Starry Night",
        description: "This is an energetic and heartfelt homage to a masterpiece. The artist has successfully captured the emotional turbulence and unique visual language of Van Gogh's original work. It's a piece that is immediately recognizable and continues to resonate with viewers for its powerful depiction of the beauty and mystery of the night sky.",
        price: 5000,
        imageUrl: "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0605.JPG",
        category: "Texture Art",
        artist: "Monika Kumari",
        rating: 4.3,
        dimensions: "24x36 inches",
        availableSizes: ["Medium", "Large"],
        isFeatured: false,
        imageGallery: [
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0604.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0605.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0606.JPG"
        ]
    },
    {
        id: "107",
        name: "Echoes in Blue",
        description: "This is a compelling piece of abstract art that masterfully uses texture to create visual interest. It's a meditative and decorative work that balances a simple, repeating motif with a complex, tactile surface. The warm, dark wood frame provides a grounding, earthy contrast to the cool, fluid energy of the artwork.",
        price: 3500,
        imageUrl: "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0607.JPG",
        category: "Textured Art",
        artist: "Monika Kumari",
        rating: 4.7,
        dimensions: "30x40 inches",
        availableSizes: ["Medium", "Large"],
        isFeatured: true,
        imageGallery: [
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0607.JPG",
          "https://craftgenic-bucket.s3.ap-south-1.amazonaws.com/Products/IMG_0608.JPG",
        ]
    }

];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.insertMany(products);
    console.log('Sample products inserted!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting products:', err);
    mongoose.disconnect();
  });