## Quick Test Guide - Add New Part

### Prerequisites
1. ✅ Backend server running on http://localhost:5050
2. ✅ Frontend running on http://localhost:5174
3. ✅ Database migration completed (products table updated)
4. ✅ Vendor user logged in

### Test Steps

#### 1. Login as Vendor
Navigate to vendor login page and login with vendor credentials.

#### 2. Navigate to Add New Part
Go to: http://localhost:5174/vendor/add-new-part

#### 3. Fill in Basic Information
- **Part Name**: "Brembo Ceramic Brake Pad Set" ✅ (required)
- **Part Number/SKU**: "BP-X09-22"
- **OEM Reference No.**: "45022-T2G-A00"
- **Category**: Select "Brake System" ✅ (required)
- **Brand**: "Brembo"
- **Description**: "High-performance ceramic brake pads for improved stopping power..."

#### 4. Add Vehicle Compatibility
- **Make**: Select "Honda"
- **Model**: Select "Civic" (appears after selecting make)
- **Variant**: Select "EX"
- **Years**: Select "2018-2022"
- Click **"ADD VEHICLE"** button
- You should see a tag appear: "Honda Civic EX (2018-2022)"
- Repeat to add more vehicles

#### 5. Set Pricing & Stock
- **MRP**: 150.00
- **Selling Price**: 127.50 ✅ (required) - You'll see "15% OFF" badge
- **Quantity in Stock**: 25

#### 6. Upload Images
- Click the upload area or drag images
- Select images (max 5MB each)
- You'll see thumbnails with "Uploaded" status
- Click delete icon to remove if needed

#### 7. Set Specifics
- **Brand Type**: Select "OEM" or "Aftermarket"
- **Condition**: Click "New", "Used", or "Refurb"

#### 8. Submit the Form

**Option A: Save as Draft**
- Click **"Save Draft"** button
- Product saved with `status='draft'`
- See success message
- Auto-redirect to vendor dashboard

**Option B: Publish**
- Click **"Publish"** button
- Product saved with `status='published'`
- See success message
- Auto-redirect to vendor dashboard

### Expected API Request

```json
{
  "name": "Brembo Ceramic Brake Pad Set",
  "sku": "BP-X09-22",
  "oem_reference": "45022-T2G-A00",
  "category": "brake",
  "brand": "Brembo",
  "mrp": 150,
  "price": 127.5,
  "quantity_in_stock": 25,
  "brand_type": "OEM",
  "condition": "New",
  "description": "High-performance ceramic brake pads...",
  "compatible_vehicles": [
    {
      "make": "Honda",
      "model": "Civic",
      "variant": "EX",
      "years": "2018-2022"
    }
  ],
  "images": ["blob:http://localhost:5174/..."],
  "status": "published"
}
```

### Check Database

Run this query to verify the product was created:

```sql
SELECT 
  id, name, sku, oem_reference, category, brand, 
  mrp, price, quantity_in_stock, brand_type, condition,
  status, compatible_vehicles, created_at
FROM products 
ORDER BY id DESC 
LIMIT 1;
```

### Validation Tests

#### Test Required Fields
1. Try to submit without Part Name → Should show error
2. Try to submit without Category → Should show error
3. Try to submit without Selling Price → Should show error

#### Test Image Upload
1. Try to upload file > 5MB → Should show error message
2. Upload valid image → Should show thumbnail and "Uploaded" status

#### Test Vehicle Compatibility
1. Try to add vehicle without selecting Make → Should show error
2. Select Make → Model dropdown should become enabled
3. Add vehicle → Should appear as removable tag

### Error Scenarios

**Authentication Error:**
- Not logged in → Should redirect to login
- Session expired → Should show 401 error

**Validation Error:**
- Missing required fields → Red error banner shows
- Invalid data → Error message displayed

**Network Error:**
- Backend not running → Shows "Failed to create product" error
- Database error → Backend logs error, frontend shows generic error

### Success Indicators
✅ Green success message appears
✅ Product ID returned in response
✅ Auto-redirect to dashboard after 1.5 seconds
✅ Product appears in database
✅ All fields saved correctly

### Common Issues & Solutions

**Issue: "Not authenticated" error**
- Solution: Make sure you're logged in as vendor

**Issue: Form validation failing**
- Solution: Check that Part Name, Category, and Selling Price are filled

**Issue: Images not uploading**
- Solution: Check file size < 5MB and format is PNG/JPG

**Issue: Backend error**
- Solution: Check backend console for specific error, verify database connection

**Issue: Discount not calculating**
- Solution: Make sure MRP is higher than Selling Price

### Advanced Testing

#### Test Draft Workflow
1. Save as draft
2. Navigate to products list
3. Find the draft product
4. Edit and publish

#### Test Multiple Images
1. Upload 3-4 images
2. Remove one
3. Upload another
4. Verify all are saved

#### Test Multiple Vehicles
1. Add Honda Civic
2. Add Toyota Camry
3. Add Ford F-150
4. Remove one
5. Verify remaining are saved

### Browser Console Checks

Open browser console (F12) and check:
- No JavaScript errors
- Network tab shows POST to `/api/products`
- Response is 201 Created
- Response body contains product data

### Performance Tests
- Form should remain responsive with multiple images
- Vehicle tags should render smoothly
- No lag when typing in fields
- Submit button should disable during submission
