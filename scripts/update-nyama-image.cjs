const { supabaseAdmin } = require('./src/lib/supabase');

async function main() {
  const { error } = await supabaseAdmin
    .from('products')
    .update({
      image_url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
    })
    .eq('id', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

  if (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  }
  console.log('Nyama choma image updated.');
}

main();