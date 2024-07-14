require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome! Type /products to get a list of products."));

bot.command('products', async (ctx) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    let message = 'Here are some products:\n\n';
   for(let product of products){
    message += `###${product.title} - $${product.price}\n`;
   }
    ctx.reply(message);
  } catch (error) {
    console.error('Error fetching products:', error);
    ctx.reply('Sorry, I could not fetch the products. Please try again later.');
  }
});

bot.command('category', async (ctx) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    
    let categories=[...new Set(products.map(product=>product.category))];
         console.log(categories);
         let message="Here are some Categories:\n\n";
         for(let category of categories){
            message+=`###${category}\n`;
         }

    ctx.replyWithMarkdown(message);

  } catch (error) {
    console.error('Error fetching products:', error);
    ctx.reply('Sorry, I could not fetch the products. Please try again later.');
  }
});


bot.command('display', async (ctx) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;
           
           for (let product of products) {
            await ctx.replyWithPhoto({ url: product.image });
          }
      
        } catch (error) {
          console.error('Error fetching products:', error);
          ctx.reply('Sorry, I could not fetch the products. Please try again later.');
        }
   
  });
bot.launch();

console.log('Bot is running...');

