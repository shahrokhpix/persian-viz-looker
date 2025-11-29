/**
 * Persian Looker Studio Community Visualization
 * Main JavaScript file with all visualization types and Persian language support
 */

// Global variables
let gvizData = null;
let gvizConfig = null;
let currentPage = 1;
let pageSize = 10;
let tableData = [];

/**
 * Persian number converter: English digits (0-9) to Persian digits (۰-۹)
 */
function toPersianNumbers(str) {
  if (!str) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(str).replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

/**
 * Format number with Persian digits and thousand separators
 */
function formatPersianNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '۰';
  const formatted = Number(num).toLocaleString('fa-IR');
  return formatted;
}

/**
 * Convert Gregorian date to Jalali (Persian) date
 */
function toJalaliDate(date) {
  if (!date) return '';
  try {
    const d = new Date(date);
    const gy = d.getFullYear();
    const gm = d.getMonth() + 1;
    const gd = d.getDate();
    
    // Gregorian to Jalali conversion algorithm
    let jy, jm, jd;
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    
    if (gy > 1600) {
      jy = 979;
      gy -= 1600;
    } else {
      jy = 0;
      gy -= 621;
    }
    
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + 
               (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (parseInt(days / 12053));
    days %= 12053;
    jy += 4 * (parseInt(days / 1461));
    days %= 1461;
    
    if (days > 365) {
      jy += parseInt((days - 1) / 365);
      days = (days - 1) % 365;
    }
    
    if (days < 186) {
      jm = 1 + parseInt(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + parseInt((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    
    return `${toPersianNumbers(jy)}/${toPersianNumbers(jm)}/${toPersianNumbers(jd)}`;
  } catch (e) {
    return date;
  }
}

/**
 * Hide all visualization types
 */
function hideAllVizTypes() {
  const types = ['text-display', 'bar-chart', 'line-chart', 'pie-chart', 
                 'kpi-card', 'table-display', 'header-display'];
  types.forEach(type => {
    const el = document.getElementById(type);
    if (el) el.style.display = 'none';
  });
}

/**
 * Show loading state
 */
function showLoading() {
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  if (loading) loading.style.display = 'flex';
  if (error) error.style.display = 'none';
}

/**
 * Hide loading state
 */
function hideLoading() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';
}

/**
 * Show error state
 */
function showError(message) {
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const errorMsg = document.getElementById('error-message');
  if (loading) loading.style.display = 'none';
  if (error) error.style.display = 'flex';
  if (errorMsg) errorMsg.textContent = message || 'خطایی رخ داده است';
}

/**
 * Apply base styles from configuration
 */
function applyBaseStyles(config) {
  const container = document.getElementById('viz-container');
  if (!container || !config) return;
  
  const style = config.style || {};
  container.style.fontSize = style.fontSize || '16px';
  container.style.color = style.textColor || '#000000';
  container.style.backgroundColor = style.backgroundColor || '#FFFFFF';
  container.style.textAlign = style.textAlign || 'right';
  container.style.direction = style.direction || 'rtl';
  container.style.borderWidth = (style.borderWidth || 0) + 'px';
  container.style.borderColor = style.borderColor || '#CCCCCC';
  container.style.borderRadius = (style.borderRadius || 0) + 'px';
  container.style.borderStyle = (style.borderWidth > 0) ? 'solid' : 'none';
  container.style.padding = (style.padding || 10) + 'px';
  container.style.margin = (style.margin || 0) + 'px';
}

/**
 * Parse chart colors from configuration
 */
function parseChartColors(config) {
  const colorsStr = (config.style && config.style.chartColors) || 
                    '#4285F4,#EA4335,#FBBC04,#34A853,#FF6D01,#46BDC6,#E67C73,#F7B928';
  return colorsStr.split(',').map(c => c.trim()).filter(c => c);
}

/**
 * Render Text Display
 */
function renderTextDisplay(data, config) {
  hideAllVizTypes();
  const textDisplay = document.getElementById('text-display');
  const textContent = document.getElementById('text-content');
  
  if (!textDisplay || !textContent) return;
  
  let text = '';
  if (data && data.tables && data.tables[0] && data.tables[0].rows) {
    const rows = data.tables[0].rows;
    if (rows.length > 0 && rows[0].cells) {
      // Get first metric or dimension value
      const cells = rows[0].cells;
      text = cells[0] ? (cells[0].v || cells[0].f || '') : '';
    }
  }
  
  textContent.textContent = text;
  textDisplay.style.display = 'block';
}

/**
 * Render Bar Chart
 */
function renderBarChart(data, config) {
  hideAllVizTypes();
  const barChart = document.getElementById('bar-chart');
  const canvas = document.getElementById('bar-canvas');
  const legend = document.getElementById('bar-legend');
  
  if (!barChart || !canvas) return;
  
  try {
    const ctx = canvas.getContext('2d');
    const orientation = (config.style && config.style.barOrientation) || 'vertical';
    const colors = parseChartColors(config);
    const showLegend = config.style && config.style.showLegend !== false;
    
    // Parse data
    const table = data.tables && data.tables[0];
    if (!table || !table.rows || table.rows.length === 0) {
      showError('داده‌ای برای نمایش وجود ندارد');
      return;
    }
    
    const rows = table.rows;
    const dimensionIndex = 0;
    const metricIndices = [];
    
    // Find metric columns
    if (table.cols) {
      table.cols.forEach((col, idx) => {
        if (col.type === 'number' || idx > 0) {
          metricIndices.push(idx);
        }
      });
    } else {
      // Fallback: assume first column is dimension, rest are metrics
      for (let i = 1; i < (rows[0]?.cells?.length || 0); i++) {
        metricIndices.push(i);
      }
    }
    
    if (metricIndices.length === 0) {
      showError('هیچ متریکی یافت نشد');
      return;
    }
    
    // Set canvas size
    const container = barChart.querySelector('.chart-wrapper');
    const width = container ? container.offsetWidth : 600;
    const height = container ? container.offsetHeight : 400;
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const barCount = rows.length;
    const metricCount = metricIndices.length;
    const isVertical = orientation === 'vertical';
    
    if (isVertical) {
      const barWidth = (width - 100) / barCount / metricCount;
      const maxValue = Math.max(...rows.flatMap(row => 
        metricIndices.map(idx => parseFloat(row.cells[idx]?.v || 0))
      ));
      const chartHeight = height - 80;
      const scale = chartHeight / (maxValue || 1);
      
      // Draw bars
      rows.forEach((row, rowIdx) => {
        metricIndices.forEach((metricIdx, metricIdx2) => {
          const value = parseFloat(row.cells[metricIdx]?.v || 0);
          const barHeight = value * scale;
          const x = 50 + (rowIdx * (width - 100) / barCount) + (metricIdx2 * barWidth);
          const y = height - 30 - barHeight;
          
          ctx.fillStyle = colors[metricIdx2 % colors.length];
          ctx.fillRect(x, y, barWidth - 2, barHeight);
        });
      });
      
      // Draw labels
      ctx.fillStyle = config.style?.textColor || '#000000';
      ctx.font = '12px Vazirmatn';
      ctx.textAlign = 'center';
      rows.forEach((row, rowIdx) => {
        const label = row.cells[dimensionIndex]?.f || row.cells[dimensionIndex]?.v || '';
        const x = 50 + (rowIdx + 0.5) * (width - 100) / barCount;
        ctx.fillText(toPersianNumbers(label), x, height - 10);
      });
      
      // Draw Y-axis
      ctx.strokeStyle = '#CCCCCC';
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(50, height - 30);
      ctx.stroke();
      
      // Draw Y-axis labels
      for (let i = 0; i <= 5; i++) {
        const value = (maxValue / 5) * i;
        const y = height - 30 - (i * chartHeight / 5);
        ctx.fillText(toPersianNumbers(Math.round(value)), 45, y + 5);
      }
    } else {
      // Horizontal bars
      const barHeight = (height - 80) / barCount / metricCount;
      const maxValue = Math.max(...rows.flatMap(row => 
        metricIndices.map(idx => parseFloat(row.cells[idx]?.v || 0))
      ));
      const chartWidth = width - 150;
      const scale = chartWidth / (maxValue || 1);
      
      // Draw bars
      rows.forEach((row, rowIdx) => {
        metricIndices.forEach((metricIdx, metricIdx2) => {
          const value = parseFloat(row.cells[metricIdx]?.v || 0);
          const barWidth = value * scale;
          const x = 120;
          const y = 40 + (rowIdx * (height - 80) / barCount) + (metricIdx2 * barHeight);
          
          ctx.fillStyle = colors[metricIdx2 % colors.length];
          ctx.fillRect(x, y, barWidth, barHeight - 2);
        });
      });
      
      // Draw labels
      ctx.fillStyle = config.style?.textColor || '#000000';
      ctx.font = '12px Vazirmatn';
      ctx.textAlign = 'right';
      rows.forEach((row, rowIdx) => {
        const label = row.cells[dimensionIndex]?.f || row.cells[dimensionIndex]?.v || '';
        const y = 40 + (rowIdx + 0.5) * (height - 80) / barCount;
        ctx.fillText(toPersianNumbers(label), 115, y + 5);
      });
      
      // Draw X-axis
      ctx.strokeStyle = '#CCCCCC';
      ctx.beginPath();
      ctx.moveTo(120, height - 40);
      ctx.lineTo(width - 30, height - 40);
      ctx.stroke();
    }
    
    // Draw legend
    if (showLegend && legend) {
      legend.innerHTML = '';
      metricIndices.forEach((metricIdx, idx) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
          <span class="legend-color" style="background-color: ${colors[idx % colors.length]}"></span>
          <span class="legend-label">${toPersianNumbers('متریک ' + (idx + 1))}</span>
        `;
        legend.appendChild(legendItem);
      });
    }
    
    barChart.style.display = 'block';
  } catch (error) {
    console.error('Error rendering bar chart:', error);
    showError('خطا در نمایش نمودار میله‌ای');
  }
}

/**
 * Render Line Chart
 */
function renderLineChart(data, config) {
  hideAllVizTypes();
  const lineChart = document.getElementById('line-chart');
  const canvas = document.getElementById('line-canvas');
  const legend = document.getElementById('line-legend');
  
  if (!lineChart || !canvas) return;
  
  try {
    const ctx = canvas.getContext('2d');
    const colors = parseChartColors(config);
    const showLegend = config.style && config.style.showLegend !== false;
    const showGrid = config.style && config.style.showGridLines !== false;
    
    const table = data.tables && data.tables[0];
    if (!table || !table.rows || table.rows.length === 0) {
      showError('داده‌ای برای نمایش وجود ندارد');
      return;
    }
    
    const rows = table.rows;
    const dimensionIndex = 0;
    const metricIndices = [];
    
    if (table.cols) {
      table.cols.forEach((col, idx) => {
        if (col.type === 'number' || idx > 0) {
          metricIndices.push(idx);
        }
      });
    } else {
      for (let i = 1; i < (rows[0]?.cells?.length || 0); i++) {
        metricIndices.push(i);
      }
    }
    
    if (metricIndices.length === 0) {
      showError('هیچ متریکی یافت نشد');
      return;
    }
    
    const container = lineChart.querySelector('.chart-wrapper');
    const width = container ? container.offsetWidth : 600;
    const height = container ? container.offsetHeight : 400;
    canvas.width = width;
    canvas.height = height;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxValue = Math.max(...rows.flatMap(row => 
      metricIndices.map(idx => parseFloat(row.cells[idx]?.v || 0))
    ));
    const chartWidth = width - 100;
    const chartHeight = height - 80;
    const scale = chartHeight / (maxValue || 1);
    
    // Draw grid lines
    if (showGrid) {
      ctx.strokeStyle = '#E0E0E0';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = 40 + (i * chartHeight / 5);
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(width - 50, y);
        ctx.stroke();
      }
    }
    
    // Draw lines for each metric
    metricIndices.forEach((metricIdx, metricIdx2) => {
      ctx.strokeStyle = colors[metricIdx2 % colors.length];
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      rows.forEach((row, rowIdx) => {
        const value = parseFloat(row.cells[metricIdx]?.v || 0);
        const x = 50 + (rowIdx * chartWidth / (rows.length - 1 || 1));
        const y = height - 40 - (value * scale);
        
        if (rowIdx === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Draw points
      rows.forEach((row, rowIdx) => {
        const value = parseFloat(row.cells[metricIdx]?.v || 0);
        const x = 50 + (rowIdx * chartWidth / (rows.length - 1 || 1));
        const y = height - 40 - (value * scale);
        
        ctx.fillStyle = colors[metricIdx2 % colors.length];
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
    
    // Draw axes
    ctx.strokeStyle = '#CCCCCC';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(50, height - 40);
    ctx.lineTo(width - 50, height - 40);
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = config.style?.textColor || '#000000';
    ctx.font = '12px Vazirmatn';
    ctx.textAlign = 'center';
    rows.forEach((row, rowIdx) => {
      const label = row.cells[dimensionIndex]?.f || row.cells[dimensionIndex]?.v || '';
      const x = 50 + (rowIdx * chartWidth / (rows.length - 1 || 1));
      ctx.fillText(toPersianNumbers(label), x, height - 20);
    });
    
    // Draw Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue / 5) * i;
      const y = height - 40 - (i * chartHeight / 5);
      ctx.fillText(toPersianNumbers(Math.round(value)), 45, y + 5);
    }
    
    // Draw legend
    if (showLegend && legend) {
      legend.innerHTML = '';
      metricIndices.forEach((metricIdx, idx) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
          <span class="legend-color" style="background-color: ${colors[idx % colors.length]}"></span>
          <span class="legend-label">${toPersianNumbers('متریک ' + (idx + 1))}</span>
        `;
        legend.appendChild(legendItem);
      });
    }
    
    lineChart.style.display = 'block';
  } catch (error) {
    console.error('Error rendering line chart:', error);
    showError('خطا در نمایش نمودار خطی');
  }
}

/**
 * Render Pie Chart
 */
function renderPieChart(data, config) {
  hideAllVizTypes();
  const pieChart = document.getElementById('pie-chart');
  const canvas = document.getElementById('pie-canvas');
  const legend = document.getElementById('pie-legend');
  
  if (!pieChart || !canvas) return;
  
  try {
    const ctx = canvas.getContext('2d');
    const colors = parseChartColors(config);
    const showLegend = config.style && config.style.showLegend !== false;
    
    const table = data.tables && data.tables[0];
    if (!table || !table.rows || table.rows.length === 0) {
      showError('داده‌ای برای نمایش وجود ندارد');
      return;
    }
    
    const rows = table.rows;
    const dimensionIndex = 0;
    const metricIndex = 1;
    
    const container = pieChart.querySelector('.chart-wrapper');
    const width = container ? container.offsetWidth : 400;
    const height = container ? container.offsetHeight : 400;
    canvas.width = width;
    canvas.height = height;
    
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // Calculate total
    const total = rows.reduce((sum, row) => {
      return sum + parseFloat(row.cells[metricIndex]?.v || 0);
    }, 0);
    
    // Draw pie slices
    let currentAngle = -Math.PI / 2;
    rows.forEach((row, idx) => {
      const value = parseFloat(row.cells[metricIndex]?.v || 0);
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[idx % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw percentage label
      if (value / total > 0.05) {
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        const percentage = ((value / total) * 100).toFixed(1);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px Vazirmatn';
        ctx.textAlign = 'center';
        ctx.fillText(toPersianNumbers(percentage + '%'), labelX, labelY);
      }
      
      currentAngle += sliceAngle;
    });
    
    // Draw legend
    if (showLegend && legend) {
      legend.innerHTML = '';
      rows.forEach((row, idx) => {
        const label = row.cells[dimensionIndex]?.f || row.cells[dimensionIndex]?.v || '';
        const value = parseFloat(row.cells[metricIndex]?.v || 0);
        const percentage = ((value / total) * 100).toFixed(1);
        
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
          <span class="legend-color" style="background-color: ${colors[idx % colors.length]}"></span>
          <span class="legend-label">${toPersianNumbers(label)} (${toPersianNumbers(percentage)}%)</span>
        `;
        legend.appendChild(legendItem);
      });
    }
    
    pieChart.style.display = 'block';
  } catch (error) {
    console.error('Error rendering pie chart:', error);
    showError('خطا در نمایش نمودار دایره‌ای');
  }
}

/**
 * Render KPI Card
 */
function renderKPICard(data, config) {
  hideAllVizTypes();
  const kpiCard = document.getElementById('kpi-card');
  const kpiLabel = document.getElementById('kpi-label');
  const kpiValue = document.getElementById('kpi-value');
  const kpiComparison = document.getElementById('kpi-comparison');
  const kpiArrow = document.getElementById('kpi-arrow');
  const kpiChange = document.getElementById('kpi-change');
  const kpiSecondary = document.getElementById('kpi-secondary');
  
  if (!kpiCard) return;
  
  try {
    const table = data.tables && data.tables[0];
    if (!table || !table.rows || table.rows.length === 0) {
      showError('داده‌ای برای نمایش وجود ندارد');
      return;
    }
    
    const rows = table.rows;
    const firstRow = rows[0];
    
    // Get label from dimension
    const label = firstRow.cells[0]?.f || firstRow.cells[0]?.v || 'متریک';
    if (kpiLabel) kpiLabel.textContent = toPersianNumbers(label);
    
    // Get value from first metric
    const value = parseFloat(firstRow.cells[1]?.v || firstRow.cells[1]?.f || 0);
    if (kpiValue) kpiValue.textContent = formatPersianNumber(value);
    
    // Show comparison if enabled and we have multiple rows
    const showComparison = config.style && config.style.kpiShowComparison !== false;
    if (showComparison && rows.length > 1 && kpiComparison) {
      const currentValue = parseFloat(firstRow.cells[1]?.v || 0);
      const previousValue = parseFloat(rows[1].cells[1]?.v || 0);
      const change = previousValue !== 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
      
      kpiComparison.style.display = 'flex';
      if (kpiArrow) {
        kpiArrow.textContent = change >= 0 ? '↑' : '↓';
        kpiArrow.style.color = change >= 0 ? '#34A853' : '#EA4335';
      }
      if (kpiChange) {
        kpiChange.textContent = toPersianNumbers(Math.abs(change).toFixed(1) + '%');
        kpiChange.style.color = change >= 0 ? '#34A853' : '#EA4335';
      }
    } else if (kpiComparison) {
      kpiComparison.style.display = 'none';
    }
    
    // Show secondary metric if available
    if (rows.length > 0 && firstRow.cells[2] && kpiSecondary) {
      const secondaryValue = parseFloat(firstRow.cells[2]?.v || 0);
      kpiSecondary.textContent = 'متریک ثانویه: ' + formatPersianNumber(secondaryValue);
      kpiSecondary.style.display = 'block';
    } else if (kpiSecondary) {
      kpiSecondary.style.display = 'none';
    }
    
    kpiCard.style.display = 'block';
  } catch (error) {
    console.error('Error rendering KPI card:', error);
    showError('خطا در نمایش کارت KPI');
  }
}

/**
 * Render Table
 */
function renderTable(data, config) {
  hideAllVizTypes();
  const tableDisplay = document.getElementById('table-display');
  const tableHead = document.getElementById('table-head');
  const tableBody = document.getElementById('table-body');
  const tablePagination = document.getElementById('table-pagination');
  
  if (!tableDisplay || !tableHead || !tableBody) return;
  
  try {
    const table = data.tables && data.tables[0];
    if (!table || !table.rows || table.rows.length === 0) {
      showError('داده‌ای برای نمایش وجود ندارد');
      return;
    }
    
    const rows = table.rows;
    const cols = table.cols || [];
    const showPagination = config.style && config.style.tableShowPagination !== false;
    pageSize = config.style && config.style.tablePageSize ? config.style.tablePageSize : 10;
    
    // Store data globally for pagination
    tableData = rows;
    currentPage = 1;
    
    // Create header
    tableHead.innerHTML = '';
    const headerRow = document.createElement('tr');
    cols.forEach((col, idx) => {
      const th = document.createElement('th');
      th.textContent = toPersianNumbers(col.label || col.id || `ستون ${idx + 1}`);
      th.onclick = () => sortTable(idx);
      th.style.cursor = 'pointer';
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
    
    // Render table with pagination
    renderTablePage();
    
    // Show/hide pagination
    if (showPagination && rows.length > pageSize && tablePagination) {
      tablePagination.style.display = 'flex';
      updatePaginationControls();
    } else if (tablePagination) {
      tablePagination.style.display = 'none';
    }
    
    tableDisplay.style.display = 'block';
  } catch (error) {
    console.error('Error rendering table:', error);
    showError('خطا در نمایش جدول');
  }
}

/**
 * Render current page of table
 */
function renderTablePage() {
  const tableBody = document.getElementById('table-body');
  if (!tableBody) return;
  
  tableBody.innerHTML = '';
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = tableData.slice(start, end);
  
  pageData.forEach((row) => {
    const tr = document.createElement('tr');
    row.cells.forEach((cell) => {
      const td = document.createElement('td');
      const value = cell.f || cell.v || '';
      td.textContent = toPersianNumbers(value);
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
  
  updatePaginationControls();
}

/**
 * Update pagination controls
 */
function updatePaginationControls() {
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');
  
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage >= Math.ceil(tableData.length / pageSize);
  if (pageInfo) {
    const totalPages = Math.ceil(tableData.length / pageSize);
    pageInfo.textContent = `صفحه ${toPersianNumbers(currentPage)} از ${toPersianNumbers(totalPages)}`;
  }
}

/**
 * Sort table by column
 */
let sortColumn = -1;
let sortDirection = 1;

function sortTable(columnIndex) {
  if (sortColumn === columnIndex) {
    sortDirection *= -1;
  } else {
    sortColumn = columnIndex;
    sortDirection = 1;
  }
  
  tableData.sort((a, b) => {
    const aVal = parseFloat(a.cells[columnIndex]?.v || 0);
    const bVal = parseFloat(b.cells[columnIndex]?.v || 0);
    return (aVal - bVal) * sortDirection;
  });
  
  currentPage = 1;
  renderTablePage();
}

/**
 * Render Header/Title
 */
function renderHeader(data, config) {
  hideAllVizTypes();
  const headerDisplay = document.getElementById('header-display');
  const headerTitle = document.getElementById('header-title');
  const headerSubtitle = document.getElementById('header-subtitle');
  
  if (!headerDisplay || !headerTitle) return;
  
  try {
    const table = data.tables && data.tables[0];
    let title = 'عنوان';
    let subtitle = '';
    
    if (table && table.rows && table.rows.length > 0) {
      const firstRow = table.rows[0];
      title = firstRow.cells[0]?.f || firstRow.cells[0]?.v || 'عنوان';
      if (firstRow.cells[1]) {
        subtitle = firstRow.cells[1]?.f || firstRow.cells[1]?.v || '';
      }
    }
    
    headerTitle.textContent = toPersianNumbers(title);
    const headerSize = (config.style && config.style.headerSize) || 'h1';
    headerTitle.className = `header-title ${headerSize}`;
    
    if (subtitle && headerSubtitle) {
      headerSubtitle.textContent = toPersianNumbers(subtitle);
      headerSubtitle.style.display = 'block';
    } else if (headerSubtitle) {
      headerSubtitle.style.display = 'none';
    }
    
    headerDisplay.style.display = 'block';
  } catch (error) {
    console.error('Error rendering header:', error);
    showError('خطا در نمایش هدر');
  }
}

/**
 * Main draw function - called by Looker Studio
 */
function drawViz(data) {
  try {
    showLoading();
    
    // Store data globally
    gvizData = data;
    
    // Get configuration from data
    const config = {
      style: data.style || {},
      theme: data.theme || {}
    };
    gvizConfig = config;
    
    // Apply base styles
    applyBaseStyles(config);
    
    // Get visualization type
    const vizType = (config.style && config.style.vizType) || 'text';
    
    // Render based on type
    switch (vizType) {
      case 'text':
        renderTextDisplay(data, config);
        break;
      case 'bar':
        renderBarChart(data, config);
        break;
      case 'line':
        renderLineChart(data, config);
        break;
      case 'pie':
        renderPieChart(data, config);
        break;
      case 'kpi':
        renderKPICard(data, config);
        break;
      case 'table':
        renderTable(data, config);
        break;
      case 'header':
        renderHeader(data, config);
        break;
      default:
        renderTextDisplay(data, config);
    }
    
    hideLoading();
  } catch (error) {
    console.error('Error in drawViz:', error);
    showError('خطا در نمایش داده: ' + error.message);
    hideLoading();
  }
}

// Pagination event listeners
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderTablePage();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(tableData.length / pageSize);
      if (currentPage < totalPages) {
        currentPage++;
        renderTablePage();
      }
    });
  }
});

// Looker Studio Community Visualization API Integration
if (typeof gviz !== 'undefined') {
  // Set up the visualization
  gviz.api.setOnReadyCallback(() => {
    console.log('Persian Visualization ready');
  });
  
  // Set draw callback - this is called when data or config changes
  gviz.api.setDrawCallback((data, config) => {
    drawViz(data);
  });
} else {
  // Fallback for testing outside Looker Studio
  // This allows testing the visualization in a regular browser
  window.drawViz = drawViz;
  
  // If data is provided via window, render it
  if (window.testData) {
    setTimeout(() => {
      drawViz(window.testData);
    }, 100);
  }
}

