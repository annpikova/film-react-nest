export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/film',
  },
  static: {
    dir: process.env.STATIC_DIR || 'public',
    imagesDir: process.env.IMAGES_DIR || 'public/images',
  },
});
