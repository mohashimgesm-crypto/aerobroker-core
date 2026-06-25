// أنواع قاعدة البيانات — متوافقة مع الـ migration في supabase/migrations
// تُستخدم لتزويد عملاء Supabase بأنواع قوية (TypeScript strict)

export type Category = 'ultralight' | 'helicopter' | 'machinery';
export type Condition = 'Excellent' | 'Good' | 'Fair';
export type ListingStatus = 'active' | 'sold' | 'draft';
export type RfqStatus = 'new' | 'contacted' | 'closed';

// صفّ الإعلان كما يُقرأ من قاعدة البيانات
// (نستخدم type لا interface كي يحصل على index signature المطلوب من supabase)
export type ListingRow = {
  id: string;
  slug: string;
  category: Category;
  make: string;
  model: string;
  year: number | null;
  price_usd: number | null;
  price_visible: boolean;
  negotiable: boolean;
  flying_hours: number | null;
  engine_model: string | null;
  max_speed_kmh: number | null;
  range_km: number | null;
  mtow_kg: number | null;
  seats: number | null;
  condition: Condition | null;
  country: string;
  city: string | null;
  shipping_weight_kg: number | null;
  description_ar: string | null;
  description_en: string | null;
  images: string[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

// الحقول المطلوبة عند إدخال إعلان جديد (الباقي له قيم افتراضية)
export type ListingInsert = Omit<
  ListingRow,
  'id' | 'created_at' | 'updated_at' | 'price_visible' | 'negotiable' | 'images' | 'status'
> &
  Partial<
    Pick<
      ListingRow,
      'id' | 'price_visible' | 'negotiable' | 'images' | 'status' | 'created_at' | 'updated_at'
    >
  >;

export type ListingUpdate = Partial<ListingRow>;

// صفّ طلب عرض السعر (RFQ)
export type RfqRequestRow = {
  id: string;
  listing_id: string | null;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string | null;
  buyer_country: string | null;
  message: string | null;
  status: RfqStatus;
  created_at: string;
}

export type RfqRequestInsert = Omit<RfqRequestRow, 'id' | 'status' | 'created_at'> &
  Partial<Pick<RfqRequestRow, 'id' | 'status' | 'created_at'>>;

export type RfqRequestUpdate = Partial<RfqRequestRow>;

// شكل قاعدة البيانات المتوقّع من عميل Supabase
export type Database = {
  public: {
    Tables: {
      listings: {
        Row: ListingRow;
        Insert: ListingInsert;
        Update: ListingUpdate;
        Relationships: [];
      };
      rfq_requests: {
        Row: RfqRequestRow;
        Insert: RfqRequestInsert;
        Update: RfqRequestUpdate;
        Relationships: [
          {
            foreignKeyName: 'rfq_requests_listing_id_fkey';
            columns: ['listing_id'];
            referencedRelation: 'listings';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
}
