const connectDB = require('./db');
const Recipe = require('./models/recipe');

async function createRecipe() {
  const doc = await Recipe.create({
    title: 'Classic Tomato Soup',
    description: 'A simple and delicious homemade tomato soup.',
    ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Vegetable Broth', 'Olive Oil'],
    instructions: '1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend.',
    prepTimeInMinutes: 30
  });
  console.log('✅ Created:', doc);
}

async function findAllRecipes() {
  const docs = await Recipe.find();
  console.log('📜 All recipes:', docs);
}

async function findRecipeByTitle(title) {
  const doc = await Recipe.findOne({ title });
  console.log('🔍 Found:', doc);
}

async function updateRecipeDescription(title, newDescription) {
  const updated = await Recipe.findOneAndUpdate(
    { title },
    { description: newDescription },
    { new: true }
  );
  console.log('✏️ Updated:', updated);
}

async function deleteRecipe(title) {
  const deleted = await Recipe.findOneAndDelete({ title });
  console.log('🗑️ Deleted:', deleted);
}

(async () => {
  try {
    await connectDB();
    const [,, cmd, ...args] = process.argv;

    switch (cmd) {
      case 'create': await createRecipe(); break;
      case 'findAll': await findAllRecipes(); break;
      case 'findOne': await findRecipeByTitle(args[0] || 'Classic Tomato Soup'); break;
      case 'update': await updateRecipeDescription('Classic Tomato Soup', 'An updated, richer tomato soup recipe.'); break;
      case 'delete': await deleteRecipe('Classic Tomato Soup'); break;
      default:
        console.log('Usage: node index.js <create|findAll|findOne|update|delete>');
    }
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    process.exit();
  }
})();
