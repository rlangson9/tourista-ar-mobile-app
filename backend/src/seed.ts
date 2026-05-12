/**
 * seed.ts — Tourista AR Database Seeder & Connection Verifier
 *
 * Run with:
 *   npx tsx src/seed.ts
 *
 * What it does:
 *   1. Connects to MongoDB Atlas
 *   2. Verifies all 7 collections can be written to and read from
 *   3. Creates one seed document in each collection
 *   4. Prints a full report
 *   5. Cleans up seed data (optional — comment out the cleanup block to keep it)
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

// ── Inline schemas (avoids import path issues when run standalone) ────────────

const userSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String,
  phone: String, country: String, role: { type: String, default: 'user' },
  language: { type: String, default: 'en' }, currency: { type: String, default: 'USD' },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const partnerSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  businessName: String, businessDescription: String, businessAddress: String,
  businessPhone: String, businessEmail: String, website: String,
  registrationNumber: String, categories: [String], services: [String],
  isApproved: { type: Boolean, default: false }, rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }, totalBookings: { type: Number, default: 0 },
}, { timestamps: true });

const tourSchema = new mongoose.Schema({
  partnerId: mongoose.Schema.Types.ObjectId,
  title: String, description: String, category: String, subcategory: String,
  location: String, duration: Number, durationUnit: { type: String, default: 'hours' },
  price: Number, currency: { type: String, default: 'USD' }, discount: { type: Number, default: 0 },
  images: [String], meetingPoint: String, languages: [String],
  minimumParticipants: { type: Number, default: 1 }, maximumParticipants: Number,
  isFeatured: { type: Boolean, default: false }, isActive: { type: Boolean, default: true },
  views: { type: Number, default: 0 }, bookings: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }, reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, tourId: mongoose.Schema.Types.ObjectId,
  partnerId: mongoose.Schema.Types.ObjectId,
  tourDate: Date, numberOfParticipants: Number, totalPrice: Number,
  currency: { type: String, default: 'USD' },
  status: { type: String, default: 'pending' },
  paymentStatus: { type: String, default: 'pending' },
}, { timestamps: true });

const supplierSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  companyName: String, companyDescription: String, companyAddress: String,
  companyPhone: String, companyEmail: String, website: String,
  registrationNumber: String, businessType: String,
  productCategories: [String], minimumOrderQuantity: Number,
  deliveryRegions: [String], paymentMethods: [String],
  isApproved: { type: Boolean, default: false }, rating: { type: Number, default: 0 },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  supplierId: mongoose.Schema.Types.ObjectId,
  name: String, description: String, category: String, subcategory: String,
  price: Number, currency: { type: String, default: 'USD' },
  images: [String], sku: String, stock: Number,
  minimumOrder: { type: Number, default: 1 },
  isFeatured: { type: Boolean, default: false }, isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 }, reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId, receiverId: mongoose.Schema.Types.ObjectId,
  conversationId: String, content: String,
  type: { type: String, default: 'text' }, isRead: { type: Boolean, default: false },
}, { timestamps: true });

// ── Model registration ────────────────────────────────────────────────────────
const User     = mongoose.models.User     || mongoose.model('User',     userSchema);
const Partner  = mongoose.models.Partner  || mongoose.model('Partner',  partnerSchema);
const Tour     = mongoose.models.Tour     || mongoose.model('Tour',     tourSchema);
const Booking  = mongoose.models.Booking  || mongoose.model('Booking',  bookingSchema);
const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
const Product  = mongoose.models.Product  || mongoose.model('Product',  productSchema);
const Message  = mongoose.models.Message  || mongoose.model('Message',  messageSchema);

// ── Helpers ───────────────────────────────────────────────────────────────────
const pass = (label: string) => console.log(`  ✅ ${label}`);
const fail = (label: string, err: any) => console.error(`  ❌ ${label}: ${err.message}`);

interface SeedResult {
  collection: string;
  status: 'pass' | 'fail';
  docId?: string;
  error?: string;
}

const results: SeedResult[] = [];
const seedIds: { collection: string; id: mongoose.Types.ObjectId }[] = [];

async function test(
  label: string,
  model: mongoose.Model<any>,
  data: object
): Promise<mongoose.Types.ObjectId | null> {
  try {
    const doc = await model.create(data);
    pass(`${label} — write OK  (id: ${doc._id})`);
    const found = await model.findById(doc._id);
    if (!found) throw new Error('Document written but could not be read back');
    pass(`${label} — read  OK`);
    results.push({ collection: label, status: 'pass', docId: doc._id.toString() });
    seedIds.push({ collection: label, id: doc._id });
    return doc._id;
  } catch (err: any) {
    fail(label, err);
    results.push({ collection: label, status: 'fail', error: err.message });
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   Tourista AR — DB Connection & Seed Test    ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');

  // 1. Connect
  console.log('📡 Connecting to MongoDB Atlas...');
  console.log(`   URI: ${MONGODB_URI!.replace(/:([^@]+)@/, ':****@')}`);
  console.log('');

  try {
    await mongoose.connect(MONGODB_URI!, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });
    console.log(`✅ Connected to cluster: ${mongoose.connection.host}`);
    console.log(`   Database: "${mongoose.connection.db!.databaseName}"`);
    console.log('');
  } catch (err: any) {
    console.error('❌ Connection failed:', err.message);
    console.error('');
    console.error('Checklist:');
    console.error('  1. Does the MONGODB_URI in backend/.env match your Atlas cluster?');
    console.error('  2. Atlas → Network Access → is your IP (or 0.0.0.0/0) whitelisted?');
    console.error('  3. Atlas → Database Access → does rlangson9_db_user have readWrite?');
    process.exit(1);
  }

  // 2. Ping
  console.log('🏓 Pinging database...');
  try {
    await mongoose.connection.db!.admin().ping();
    console.log('✅ Ping successful — database is responding');
  } catch (err: any) {
    console.error('❌ Ping failed:', err.message);
    process.exit(1);
  }
  console.log('');

  // 3. List existing collections
  const existing = await mongoose.connection.db!.listCollections().toArray();
  const existingNames = existing.map(c => c.name);
  console.log(`📚 Existing collections (${existingNames.length}): ${existingNames.join(', ') || 'none yet'}`);
  console.log('');

  // 4. Seed each collection
  console.log('🌱 Testing write + read for all 7 collections...');
  console.log('');

  const hashedPw = await bcrypt.hash('SeedPass123!', 10);

  // Users
  const userId = await test('users', User, {
    name: '_SEED_USER_', email: `seed_${Date.now()}@tourista-seed.test`,
    password: hashedPw, phone: '+260971000001', country: 'Zambia',
    role: 'user', isVerified: false,
  });

  // Partners
  const partnerId = await test('partners', Partner, {
    userId: userId ?? new mongoose.Types.ObjectId(),
    businessName: '_SEED_PARTNER_', businessDescription: 'Seed partner for DB test',
    businessAddress: '1 Seed St, Lusaka', businessPhone: '+260971000002',
    businessEmail: `seed_partner_${Date.now()}@tourista-seed.test`,
    website: 'https://seed.test', registrationNumber: 'SEED-001',
    categories: ['Cultural'], services: ['City Tours'], isApproved: false,
  });

  // Tours
  const tourId = await test('tours', Tour, {
    partnerId: partnerId ?? new mongoose.Types.ObjectId(),
    title: '_SEED_TOUR_', description: 'Seed tour for DB test',
    category: 'Cultural', subcategory: 'City Tour',
    location: 'Lusaka, Zambia', duration: 3, durationUnit: 'hours',
    price: 99, currency: 'USD', images: ['https://seed.test/img.jpg'],
    meetingPoint: 'City Centre', languages: ['English'],
    minimumParticipants: 1, maximumParticipants: 10,
    isFeatured: false, isActive: true,
  });

  // Bookings
  await test('bookings', Booking, {
    userId:  userId  ?? new mongoose.Types.ObjectId(),
    tourId:  tourId  ?? new mongoose.Types.ObjectId(),
    partnerId: partnerId ?? new mongoose.Types.ObjectId(),
    tourDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    numberOfParticipants: 2, totalPrice: 198,
    currency: 'USD', status: 'pending', paymentStatus: 'pending',
  });

  // Suppliers
  const supplierId = await test('suppliers', Supplier, {
    userId: userId ?? new mongoose.Types.ObjectId(),
    companyName: '_SEED_SUPPLIER_', companyDescription: 'Seed supplier for DB test',
    companyAddress: '2 Seed Ave, Harare', companyPhone: '+263771000001',
    companyEmail: `seed_supplier_${Date.now()}@tourista-seed.test`,
    website: 'https://seed-supplier.test', registrationNumber: 'SEED-SUP-001',
    businessType: 'Manufacturer', productCategories: ['Electronics'],
    minimumOrderQuantity: 10, deliveryRegions: ['Africa', 'Asia'],
    paymentMethods: ['Bank Transfer', 'SWIFT'], isApproved: false,
  });

  // Products
  await test('products', Product, {
    supplierId: supplierId ?? new mongoose.Types.ObjectId(),
    name: '_SEED_PRODUCT_', description: 'Seed product for DB test',
    category: 'Electronics', subcategory: 'Components',
    price: 25.99, currency: 'USD',
    images: ['https://seed.test/product.jpg'],
    sku: `SEED-SKU-${Date.now()}`, stock: 1000, minimumOrder: 10,
    isFeatured: false, isActive: true,
  });

  // Messages
  const userId2 = new mongoose.Types.ObjectId();
  await test('messages', Message, {
    senderId: userId  ?? new mongoose.Types.ObjectId(),
    receiverId: userId2,
    conversationId: `seed_conv_${Date.now()}`,
    content: '_SEED_MESSAGE_ — DB connection test',
    type: 'text', isRead: false,
  });

  console.log('');

  // 5. Cleanup seed data
  console.log('🧹 Cleaning up seed documents...');
  for (const { collection, id } of seedIds) {
    try {
      const modelMap: Record<string, mongoose.Model<any>> = {
        users: User, partners: Partner, tours: Tour,
        bookings: Booking, suppliers: Supplier, products: Product, messages: Message,
      };
      await modelMap[collection]?.findByIdAndDelete(id);
      console.log(`  🗑  ${collection} seed removed`);
    } catch (err: any) {
      console.log(`  ⚠️  Could not remove ${collection} seed: ${err.message}`);
    }
  }
  console.log('');

  // 6. Final report
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;

  console.log('╔══════════════════════════════════════════════╗');
  console.log('║              SEED TEST RESULTS               ║');
  console.log('╠══════════════════════════════════════════════╣');
  results.forEach(r => {
    const icon = r.status === 'pass' ? '✅' : '❌';
    const line = `  ${icon}  ${r.collection.padEnd(12)} ${r.status === 'pass' ? 'PASS' : 'FAIL — ' + r.error}`;
    console.log(`║ ${line.padEnd(44)}║`);
  });
  console.log('╠══════════════════════════════════════════════╣');
  console.log(`║  Passed: ${passed}/7   Failed: ${failed}/7${' '.repeat(22)}║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');

  if (failed === 0) {
    console.log('🎉 All collections verified — MongoDB Atlas is fully connected!');
    console.log('   You can now run: npm run dev');
  } else {
    console.log('⚠️  Some collections failed. Check errors above.');
  }
  console.log('');

  await mongoose.connection.close();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
