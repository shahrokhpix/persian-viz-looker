# Persian Looker Studio Community Visualization

[English](#english) | [فارسی](#فارسی)

---

## English

### Project Overview

A comprehensive, production-ready Community Visualization for Looker Studio with full Persian (Farsi) language support. This visualization component provides multiple chart types, RTL (Right-to-Left) layout support, Persian number formatting, and complete customization options.

### Features

#### Core Features
- ✅ **Full Persian Language Support** - Complete Farsi text rendering with proper RTL layout
- ✅ **Vazirmatn Font Integration** - Beautiful Persian typography with all font weights (100-900)
- ✅ **RTL Layout Support** - Native right-to-left text direction and layout
- ✅ **Persian Number Conversion** - Automatic conversion of English digits (0-9) to Persian digits (۰-۹)
- ✅ **Jalali Calendar Support** - Persian date formatting capabilities

#### Visualization Types
1. **Text Display** - Formatted text output with customizable styling
2. **Bar Chart** - Horizontal and vertical bar charts with multiple metrics
3. **Line Chart** - Time series line charts with grid lines and legends
4. **Pie Chart** - Interactive pie/donut charts with percentage labels
5. **KPI Card** - Key Performance Indicator cards with comparison metrics
6. **Data Table** - Sortable tables with pagination and RTL support
7. **Header/Title** - Large formatted headers with subtitle support

#### Customization Options
- Font size adjustment (10-72px)
- Text and background color customization
- Text alignment (right, center, left)
- RTL/LTR direction toggle
- Border styling (width, color, radius)
- Padding and margin controls
- Chart color schemes
- Legend positioning and visibility
- Grid line toggles
- Table pagination settings

### Installation

#### Prerequisites
- A GitHub account
- Access to Looker Studio (Google Data Studio)

#### Step 1: Fork or Clone the Repository

```bash
git clone https://github.com/shahrokhpix/persian-viz-looker.git
cd persian-viz-looker
```

Or fork the repository on GitHub and clone your fork.

#### Step 2: Deploy to GitHub Pages (Optional)

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Select the branch (usually `main` or `master`)
4. Save the settings
5. Your files will be available at: `https://yourusername.github.io/persian-viz-looker/`

#### Step 3: Get the Manifest URL

The manifest file must be accessible via a raw URL. Use one of these formats:

**GitHub Raw URL:**
```
https://raw.githubusercontent.com/shahrokhpix/persian-viz-looker/main/manifest.json
```

**GitHub Pages URL (if deployed):**
```
https://yourusername.github.io/persian-viz-looker/manifest.json
```

**Note:** Replace `shahrokhpix` with your GitHub username and ensure the branch name matches (usually `main` or `master`).

### Looker Studio Integration

#### Step-by-Step Guide

1. **Open Looker Studio**
   - Go to [lookerstudio.google.com](https://lookerstudio.google.com)
   - Open an existing report or create a new one

2. **Access Community Visualizations**
   - Click on **"Resource"** in the top menu
   - Select **"Manage Community Visualizations"**

3. **Add New Visualization**
   - Click the **"+"** button or **"Add"** button
   - Select **"Add by Manifest URL"**

4. **Enter Manifest URL**
   - Paste your manifest URL:
     ```
     https://raw.githubusercontent.com/shahrokhpix/persian-viz-looker/main/manifest.json
     ```
   - Click **"Add"** or **"Save"**

5. **Verify Installation**
   - The visualization should appear in your list
   - Status should show as "Active" or "Ready"

6. **Use in Report**
   - In your report, click **"Add a chart"**
   - Scroll down to **"Community Visualizations"**
   - Select **"Persian Visualization"**
   - Configure your data sources and styling options

### Configuration Options

#### Visualization Type
Select from 7 different visualization types:
- Text Display
- Bar Chart
- Line Chart
- Pie Chart
- KPI Card
- Table
- Header/Title

#### Styling Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| Font Size | Font Size | 16px | Text size for all elements |
| Text Color | Color | #000000 | Primary text color |
| Background Color | Color | #FFFFFF | Background color |
| Text Alignment | Select | Right | Text alignment (Right/Center/Left) |
| Text Direction | Select | RTL | RTL or LTR direction |
| Border Width | Number | 0 | Border width in pixels |
| Border Color | Color | #CCCCCC | Border color |
| Border Radius | Number | 0 | Border corner radius |
| Padding | Number | 10 | Internal padding in pixels |
| Margin | Number | 0 | External margin in pixels |

#### Chart-Specific Options

**Bar Chart:**
- Orientation: Vertical or Horizontal
- Chart Colors: Comma-separated color codes
- Show Legend: Toggle legend visibility
- Legend Position: Top, Bottom, Right, or Left

**Line Chart:**
- Show Grid Lines: Toggle grid line visibility
- Show Legend: Toggle legend visibility
- Chart Colors: Comma-separated color codes

**Pie Chart:**
- Show Legend: Toggle legend visibility
- Chart Colors: Comma-separated color codes

**KPI Card:**
- Show Comparison: Display comparison metrics with arrows

**Table:**
- Show Pagination: Enable/disable pagination
- Rows Per Page: Number of rows to display (5-100)

**Header:**
- Header Size: H1, H2, H3, or H4

### Usage Examples

#### Example 1: Text Display
1. Set Visualization Type to "Text Display"
2. Add a metric or dimension to your data source
3. Configure font size, colors, and alignment
4. The first value will be displayed as formatted text

#### Example 2: Bar Chart
1. Set Visualization Type to "Bar Chart"
2. Add at least one dimension and one metric
3. Configure bar orientation (vertical/horizontal)
4. Customize colors and legend settings
5. The chart will display with Persian labels

#### Example 3: KPI Card
1. Set Visualization Type to "KPI Card"
2. Add a dimension (label) and metric (value)
3. Optionally add a second row for comparison
4. Enable "Show Comparison" to display percentage change
5. The card will show the metric with Persian formatting

### Data Schema

#### Required Data Structure

**For Text Display:**
- At least 1 metric or dimension

**For Charts (Bar, Line, Pie):**
- At least 1 dimension
- At least 1 metric

**For KPI Card:**
- 1 dimension (label)
- 1 metric (value)
- Optional: Additional rows for comparison

**For Table:**
- Multiple dimensions and/or metrics
- Rows will be displayed in a sortable table

**For Header:**
- 1 dimension or metric (title)
- Optional: Second column for subtitle

### Troubleshooting

#### Visualization Not Loading
- **Check manifest URL**: Ensure the URL is accessible and returns valid JSON
- **Check file paths**: Verify all resource files (index.js, index.html, style.css) are accessible
- **Browser console**: Open browser developer tools and check for errors
- **CORS issues**: Ensure files are served from a proper web server (GitHub Pages or similar)

#### Persian Text Not Displaying Correctly
- **Font loading**: Check if Vazirmatn font is loading (inspect Network tab)
- **RTL direction**: Verify "Text Direction" is set to "RTL"
- **Text alignment**: Set "Text Alignment" to "Right" for proper RTL layout

#### Charts Not Rendering
- **Data validation**: Ensure you have the required dimensions and metrics
- **Canvas size**: Check if the container has proper width and height
- **Browser compatibility**: Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

#### Numbers Not Converting to Persian
- **Number formatting**: The conversion happens automatically for displayed text
- **Input format**: Ensure your data contains numeric values
- **Check console**: Look for any JavaScript errors in the browser console

### Browser Compatibility

- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)
- ⚠️ Internet Explorer (not supported)

### Performance Optimization

- Charts use HTML5 Canvas for efficient rendering
- Pagination reduces DOM elements for large tables
- Lazy loading of chart data
- Optimized Persian number conversion

### Security

- No external API calls (except Google Fonts)
- No data collection or tracking
- All processing happens client-side
- XSS protection through proper data sanitization

### Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Credits

- **Vazirmatn Font**: [GitHub - Vazirmatn](https://github.com/rastikerdar/vazirmatn)
- **Looker Studio Community Visualizations**: [Google Documentation](https://developers.google.com/looker-studio/visualization)

### Support

- **Issues**: [GitHub Issues](https://github.com/shahrokhpix/persian-viz-looker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/shahrokhpix/persian-viz-looker/discussions)

### Version History

- **v1.0.0** (Current)
  - Initial release
  - All 7 visualization types
  - Full Persian language support
  - RTL layout support
  - Comprehensive customization options

---

## فارسی

### نمای کلی پروژه

یک افزونه جامع و آماده استفاده برای Looker Studio با پشتیبانی کامل از زبان فارسی. این کامپوننت تجسم داده، انواع مختلف نمودار، پشتیبانی از چیدمان راست‌چین (RTL)، فرمت‌بندی اعداد فارسی و گزینه‌های سفارشی‌سازی کامل را ارائه می‌دهد.

### ویژگی‌ها

#### ویژگی‌های اصلی
- ✅ **پشتیبانی کامل از زبان فارسی** - نمایش کامل متن فارسی با چیدمان صحیح راست‌چین
- ✅ **ادغام فونت وزیرمتن** - تایپوگرافی زیبای فارسی با تمام وزن‌های فونت (۱۰۰-۹۰۰)
- ✅ **پشتیبانی از چیدمان RTL** - جهت متن و چیدمان راست‌به‌چپ بومی
- ✅ **تبدیل اعداد فارسی** - تبدیل خودکار ارقام انگلیسی (۰-۹) به ارقام فارسی (۰-۹)
- ✅ **پشتیبانی از تقویم جلالی** - قابلیت فرمت‌بندی تاریخ شمسی

#### انواع تجسم داده
1. **نمایش متن** - خروجی متن فرمت‌بندی شده با استایل قابل سفارشی‌سازی
2. **نمودار میله‌ای** - نمودارهای میله‌ای افقی و عمودی با چندین متریک
3. **نمودار خطی** - نمودارهای خطی سری زمانی با خطوط شبکه و راهنما
4. **نمودار دایره‌ای** - نمودارهای دایره‌ای/دونات تعاملی با برچسب درصد
5. **کارت KPI** - کارت‌های شاخص عملکرد کلیدی با متریک‌های مقایسه
6. **جدول داده** - جداول قابل مرتب‌سازی با صفحه‌بندی و پشتیبانی RTL
7. **هدر/عنوان** - هدرهای بزرگ فرمت‌بندی شده با پشتیبانی از زیرعنوان

#### گزینه‌های سفارشی‌سازی
- تنظیم اندازه فونت (۱۰-۷۲ پیکسل)
- سفارشی‌سازی رنگ متن و پس‌زمینه
- تراز متن (راست، وسط، چپ)
- تغییر جهت RTL/LTR
- استایل حاشیه (عرض، رنگ، شعاع)
- کنترل فاصله داخلی و خارجی
- طرح‌های رنگی نمودار
- موقعیت و نمایش راهنما
- نمایش/عدم نمایش خطوط شبکه
- تنظیمات صفحه‌بندی جدول

### نصب

#### پیش‌نیازها
- حساب کاربری GitHub
- دسترسی به Looker Studio (Google Data Studio)

#### مرحله ۱: Fork یا Clone کردن مخزن

```bash
git clone https://github.com/shahrokhpix/persian-viz-looker.git
cd persian-viz-looker
```

یا مخزن را در GitHub Fork کنید و Fork خود را Clone کنید.

#### مرحله ۲: استقرار در GitHub Pages (اختیاری)

1. به تنظیمات مخزن خود در GitHub بروید
2. به "Pages" در منوی سمت چپ بروید
3. شاخه را انتخاب کنید (معمولاً `main` یا `master`)
4. تنظیمات را ذخیره کنید
5. فایل‌های شما در آدرس زیر در دسترس خواهند بود: `https://yourusername.github.io/persian-viz-looker/`

#### مرحله ۳: دریافت URL فایل Manifest

فایل manifest باید از طریق یک URL خام قابل دسترسی باشد. از یکی از این فرمت‌ها استفاده کنید:

**URL خام GitHub:**
```
https://raw.githubusercontent.com/shahrokhpix/persian-viz-looker/main/manifest.json
```

**URL GitHub Pages (در صورت استقرار):**
```
https://yourusername.github.io/persian-viz-looker/manifest.json
```

**توجه:** `shahrokhpix` را با نام کاربری GitHub خود جایگزین کنید و مطمئن شوید نام شاخه مطابقت دارد (معمولاً `main` یا `master`).

### یکپارچه‌سازی با Looker Studio

#### راهنمای گام‌به‌گام

1. **باز کردن Looker Studio**
   - به [lookerstudio.google.com](https://lookerstudio.google.com) بروید
   - یک گزارش موجود را باز کنید یا یک گزارش جدید ایجاد کنید

2. **دسترسی به تجسم‌های جامعه**
   - روی **"Resource"** در منوی بالا کلیک کنید
   - **"Manage Community Visualizations"** را انتخاب کنید

3. **افزودن تجسم جدید**
   - روی دکمه **"+"** یا **"Add"** کلیک کنید
   - **"Add by Manifest URL"** را انتخاب کنید

4. **وارد کردن URL Manifest**
   - URL manifest خود را وارد کنید:
     ```
     https://raw.githubusercontent.com/shahrokhpix/persian-viz-looker/main/manifest.json
     ```
   - روی **"Add"** یا **"Save"** کلیک کنید

5. **تأیید نصب**
   - تجسم باید در لیست شما ظاهر شود
   - وضعیت باید "Active" یا "Ready" را نشان دهد

6. **استفاده در گزارش**
   - در گزارش خود، روی **"Add a chart"** کلیک کنید
   - به پایین اسکرول کنید تا **"Community Visualizations"** را ببینید
   - **"Persian Visualization"** را انتخاب کنید
   - منابع داده و گزینه‌های استایل را پیکربندی کنید

### گزینه‌های پیکربندی

#### نوع تجسم
از ۷ نوع مختلف تجسم انتخاب کنید:
- نمایش متن
- نمودار میله‌ای
- نمودار خطی
- نمودار دایره‌ای
- کارت KPI
- جدول
- هدر/عنوان

#### گزینه‌های استایل

| گزینه | نوع | پیش‌فرض | توضیحات |
|-------|-----|---------|----------|
| اندازه فونت | Font Size | 16px | اندازه متن برای تمام عناصر |
| رنگ متن | Color | #000000 | رنگ اصلی متن |
| رنگ پس‌زمینه | Color | #FFFFFF | رنگ پس‌زمینه |
| تراز متن | Select | Right | تراز متن (راست/وسط/چپ) |
| جهت متن | Select | RTL | جهت RTL یا LTR |
| عرض حاشیه | Number | 0 | عرض حاشیه به پیکسل |
| رنگ حاشیه | Color | #CCCCCC | رنگ حاشیه |
| شعاع حاشیه | Number | 0 | شعاع گوشه حاشیه |
| فاصله داخلی | Number | 10 | فاصله داخلی به پیکسل |
| فاصله خارجی | Number | 0 | فاصله خارجی به پیکسل |

#### گزینه‌های خاص نمودار

**نمودار میله‌ای:**
- جهت: عمودی یا افقی
- رنگ‌های نمودار: کدهای رنگی جدا شده با کاما
- نمایش راهنما: تغییر نمایش راهنما
- موقعیت راهنما: بالا، پایین، راست یا چپ

**نمودار خطی:**
- نمایش خطوط شبکه: تغییر نمایش خطوط شبکه
- نمایش راهنما: تغییر نمایش راهنما
- رنگ‌های نمودار: کدهای رنگی جدا شده با کاما

**نمودار دایره‌ای:**
- نمایش راهنما: تغییر نمایش راهنما
- رنگ‌های نمودار: کدهای رنگی جدا شده با کاما

**کارت KPI:**
- نمایش مقایسه: نمایش متریک‌های مقایسه با فلش‌ها

**جدول:**
- نمایش صفحه‌بندی: فعال/غیرفعال کردن صفحه‌بندی
- ردیف در هر صفحه: تعداد ردیف برای نمایش (۵-۱۰۰)

**هدر:**
- اندازه هدر: H1، H2، H3 یا H4

### نمونه‌های استفاده

#### نمونه ۱: نمایش متن
1. نوع تجسم را روی "Text Display" تنظیم کنید
2. یک متریک یا بعد به منبع داده خود اضافه کنید
3. اندازه فونت، رنگ‌ها و تراز را پیکربندی کنید
4. اولین مقدار به عنوان متن فرمت‌بندی شده نمایش داده می‌شود

#### نمونه ۲: نمودار میله‌ای
1. نوع تجسم را روی "Bar Chart" تنظیم کنید
2. حداقل یک بعد و یک متریک اضافه کنید
3. جهت میله (عمودی/افقی) را پیکربندی کنید
4. رنگ‌ها و تنظیمات راهنما را سفارشی کنید
5. نمودار با برچسب‌های فارسی نمایش داده می‌شود

#### نمونه ۳: کارت KPI
1. نوع تجسم را روی "KPI Card" تنظیم کنید
2. یک بعد (برچسب) و متریک (مقدار) اضافه کنید
3. اختیاری: یک ردیف دوم برای مقایسه اضافه کنید
4. "Show Comparison" را فعال کنید تا تغییر درصد نمایش داده شود
5. کارت متریک را با فرمت‌بندی فارسی نمایش می‌دهد

### ساختار داده

#### ساختار داده مورد نیاز

**برای نمایش متن:**
- حداقل ۱ متریک یا بعد

**برای نمودارها (میله‌ای، خطی، دایره‌ای):**
- حداقل ۱ بعد
- حداقل ۱ متریک

**برای کارت KPI:**
- ۱ بعد (برچسب)
- ۱ متریک (مقدار)
- اختیاری: ردیف‌های اضافی برای مقایسه

**برای جدول:**
- چندین بعد و/یا متریک
- ردیف‌ها در یک جدول قابل مرتب‌سازی نمایش داده می‌شوند

**برای هدر:**
- ۱ بعد یا متریک (عنوان)
- اختیاری: ستون دوم برای زیرعنوان

### عیب‌یابی

#### تجسم بارگذاری نمی‌شود
- **بررسی URL manifest**: مطمئن شوید URL قابل دسترسی است و JSON معتبر برمی‌گرداند
- **بررسی مسیر فایل‌ها**: مطمئن شوید تمام فایل‌های منبع (index.js، index.html، style.css) قابل دسترسی هستند
- **کنسول مرورگر**: ابزارهای توسعه‌دهنده مرورگر را باز کنید و خطاها را بررسی کنید
- **مشکلات CORS**: مطمئن شوید فایل‌ها از یک سرور وب مناسب (GitHub Pages یا مشابه) سرو می‌شوند

#### متن فارسی به درستی نمایش داده نمی‌شود
- **بارگذاری فونت**: بررسی کنید آیا فونت Vazirmatn در حال بارگذاری است (تب Network را بررسی کنید)
- **جهت RTL**: مطمئن شوید "Text Direction" روی "RTL" تنظیم شده است
- **تراز متن**: "Text Alignment" را روی "Right" تنظیم کنید برای چیدمان صحیح RTL

#### نمودارها رندر نمی‌شوند
- **اعتبارسنجی داده**: مطمئن شوید ابعاد و متریک‌های مورد نیاز را دارید
- **اندازه Canvas**: بررسی کنید آیا کانتینر عرض و ارتفاع مناسب دارد
- **سازگاری مرورگر**: مطمئن شوید از یک مرورگر مدرن استفاده می‌کنید (Chrome، Firefox، Safari، Edge)

#### اعداد به فارسی تبدیل نمی‌شوند
- **فرمت‌بندی عدد**: تبدیل به صورت خودکار برای متن نمایش داده شده انجام می‌شود
- **فرمت ورودی**: مطمئن شوید داده شما شامل مقادیر عددی است
- **بررسی کنسول**: به دنبال خطاهای JavaScript در کنسول مرورگر باشید

### سازگاری مرورگر

- ✅ Google Chrome (آخرین نسخه)
- ✅ Mozilla Firefox (آخرین نسخه)
- ✅ Safari (آخرین نسخه)
- ✅ Microsoft Edge (آخرین نسخه)
- ⚠️ Internet Explorer (پشتیبانی نمی‌شود)

### بهینه‌سازی عملکرد

- نمودارها از HTML5 Canvas برای رندر کارآمد استفاده می‌کنند
- صفحه‌بندی عناصر DOM را برای جداول بزرگ کاهش می‌دهد
- بارگذاری تنبل داده نمودار
- تبدیل بهینه اعداد فارسی

### امنیت

- بدون فراخوانی API خارجی (به جز Google Fonts)
- بدون جمع‌آوری یا ردیابی داده
- تمام پردازش در سمت کلاینت انجام می‌شود
- محافظت XSS از طریق پاک‌سازی صحیح داده

### مشارکت

مشارکت‌ها خوش‌آمد هستند! لطفاً این مراحل را دنبال کنید:

1. مخزن را Fork کنید
2. یک شاخه ویژگی ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را commit کنید (`git commit -m 'Add amazing feature'`)
4. به شاخه push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request باز کنید

### مجوز

این پروژه تحت مجوز MIT مجوز دارد - برای جزئیات به فایل LICENSE مراجعه کنید.

### اعتبارات

- **فونت وزیرمتن**: [GitHub - Vazirmatn](https://github.com/rastikerdar/vazirmatn)
- **تجسم‌های جامعه Looker Studio**: [مستندات Google](https://developers.google.com/looker-studio/visualization)

### پشتیبانی

- **Issues**: [GitHub Issues](https://github.com/shahrokhpix/persian-viz-looker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/shahrokhpix/persian-viz-looker/discussions)

### تاریخچه نسخه

- **v1.0.0** (فعلی)
  - انتشار اولیه
  - تمام ۷ نوع تجسم
  - پشتیبانی کامل از زبان فارسی
  - پشتیبانی از چیدمان RTL
  - گزینه‌های سفارشی‌سازی جامع

---

**نویسنده:** Shahrokh Pix  
**آخرین به‌روزرسانی:** 2024

