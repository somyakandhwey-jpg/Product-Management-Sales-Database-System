/* ============================
   PBCMS — SPA Application Core
   ============================ */

let currentUser = null;
let currentPage = 'dashboard';

// === NAV CONFIGS PER ROLE ===
const NAV_CONFIG = {
  admin: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Overview' },
    { id: 'company', label: 'Company', icon: '🏢', section: 'Organization' },
    { id: 'departments', label: 'Departments', icon: '🏛️' },
    { id: 'employees', label: 'All Employees', icon: '👥' },
    { id: 'products', label: 'Products', icon: '📦', section: 'Operations' },
    { id: 'inventory', label: 'Inventory', icon: '📋' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'buyers', label: 'Buyers', icon: '🤝' },
    { id: 'vehicles', label: 'Vehicles', icon: '🚛', section: 'Support' },
    { id: 'legal', label: 'Legal Cases', icon: '⚖️' },
    { id: 'customs', label: 'Customs', icon: '🌍' },
  ],
  hr: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'HR Portal' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'departments', label: 'Departments', icon: '🏛️' },
  ],
  production: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Production' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'prod-units', label: 'Production Units', icon: '🏭' },
    { id: 'parts', label: 'Parts', icon: '🔩' },
    { id: 'prod-log', label: 'Production Log', icon: '📝' },
    { id: 'work-assign', label: 'Work Assignments', icon: '👷' },
  ],
  inventory: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Inventory' },
    { id: 'shops', label: 'Shops', icon: '🏪' },
    { id: 'stock', label: 'Stock Levels', icon: '📋' },
    { id: 'products', label: 'Products', icon: '📦' },
  ],
  finance: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Finance' },
    { id: 'orders', label: 'Purchase Orders', icon: '🛒' },
    { id: 'order-summary', label: 'Order Summary', icon: '📈' },
    { id: 'customs', label: 'Customs Records', icon: '🌍' },
    { id: 'consultations', label: 'Consultations', icon: '💼' },
  ],
  legal: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Legal Portal' },
    { id: 'legal', label: 'Legal Cases', icon: '⚖️' },
    { id: 'case-handling', label: 'Case Handling', icon: '📂' },
    { id: 'customs', label: 'Customs Records', icon: '🌍' },
  ],
  logistics: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Logistics' },
    { id: 'vehicles', label: 'Vehicles', icon: '🚛' },
    { id: 'assignments', label: 'Assignments', icon: '🔗' },
    { id: 'maintenance', label: 'Maintenance Log', icon: '🔧' },
  ],
  buyer: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Buyer Portal' },
    { id: 'products', label: 'Browse Products', icon: '📦' },
    { id: 'orders', label: 'My Orders', icon: '🛒' },
    { id: 'stock', label: 'Stock Check', icon: '📋' },
  ],
  shareholder: [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', section: 'Shareholder' },
    { id: 'company', label: 'Company Info', icon: '🏢' },
    { id: 'ownership', label: 'Ownership', icon: '💎' },
  ]
};

// === INIT ===
async function init() {
  try {
    const res = await fetch('/api/auth/me');
    if (!res.ok) { window.location.href = '/'; return; }
    currentUser = await res.json();
    document.getElementById('userName').textContent = currentUser.displayName;
    document.getElementById('userRole').textContent = currentUser.role.toUpperCase();
    document.getElementById('userAvatar').textContent = currentUser.displayName.charAt(0);
    document.getElementById('roleBadge').textContent = getRoleLabel(currentUser.role);
    renderNav();
    navigate('dashboard');
  } catch { window.location.href = '/'; }
}

function getRoleLabel(role) {
  const labels = { admin:'Super Admin', hr:'HR Management', production:'Production', inventory:'Inventory', finance:'Finance', legal:'Legal', logistics:'Logistics', buyer:'B2B Buyer', shareholder:'Shareholder' };
  return labels[role] || role;
}

// === NAV ===
function renderNav() {
  const nav = document.getElementById('sidebarNav');
  const items = NAV_CONFIG[currentUser.role] || NAV_CONFIG.admin;
  let html = '';
  items.forEach(item => {
    if (item.section) html += `<div class="nav-section-title">${item.section}</div>`;
    html += `<div class="nav-item${currentPage===item.id?' active':''}" onclick="navigate('${item.id}')" data-page="${item.id}">
      <span class="icon">${item.icon}</span>${item.label}</div>`;
  });
  nav.innerHTML = html;
}

function navigate(page) {
  currentPage = page;
  renderNav();
  const content = document.getElementById('pageContent');
  content.innerHTML = '<div class="empty-state"><div class="icon">⏳</div><p>Loading...</p></div>';
  content.style.animation = 'none'; content.offsetHeight; content.style.animation = 'fadeIn 0.4s ease';
  loadPage(page);
}

// === PAGE ROUTER ===
async function loadPage(page) {
  const role = currentUser.role;
  const title = document.getElementById('pageTitle');
  try {
    switch (page) {
      case 'dashboard': title.textContent = 'Dashboard'; await renderDashboard(role); break;
      case 'company': title.textContent = 'Company'; await renderCompany(); break;
      case 'departments': title.textContent = 'Departments'; await renderTable('/api/departments', 'Departments', ['dept_id','dept_name','location','emp_count'], ['ID','Name','Location','Employees'], role!=='buyer'&&role!=='shareholder'); break;
      case 'employees': title.textContent = 'Employees'; await renderEmployees(); break;
      case 'products': title.textContent = 'Products'; await renderTable('/api/products', 'Products', ['product_id','product_name','category','cost_price','selling_price'], ['ID','Name','Category','Cost ₹','Sell ₹'], role==='admin'||role==='production'); break;
      case 'inventory': case 'stock': title.textContent = 'Inventory'; await renderTable('/api/inventory', 'Inventory', ['shop_location','product_name','stock_quantity','selling_price','last_updated'], ['Shop','Product','Stock','Price ₹','Updated'], role==='admin'||role==='inventory'); break;
      case 'orders': title.textContent = 'Purchase Orders'; await renderTable('/api/orders', 'Purchase Orders', ['order_id','company_name','order_date','status'], ['ID','Buyer','Date','Status'], role==='admin'||role==='finance'); break;
      case 'buyers': title.textContent = 'Buyers'; await renderTable('/api/buyers', 'B2B Buyers', ['buyer_id','company_name','gst_no','contact_person'], ['ID','Company','GST No.','Contact'], role==='admin'); break;
      case 'vehicles': title.textContent = 'Vehicles'; await renderTable('/api/vehicles', 'Fleet', ['vehicle_id','type','registration_no'], ['ID','Type','Registration'], role==='admin'||role==='logistics'); break;
      case 'legal': title.textContent = 'Legal Cases'; await renderTable('/api/legal/cases', 'Legal Cases', ['case_id','case_type','status'], ['ID','Type','Status'], role==='admin'||role==='legal'); break;
      case 'customs': title.textContent = 'Customs Records'; await renderTable('/api/legal/customs', 'Customs Records', ['record_id','import_export','duty_amount'], ['ID','Type','Duty ₹'], role==='admin'||role==='finance'); break;
      case 'prod-units': title.textContent = 'Production Units'; await renderTable('/api/products/units', 'Production Units', ['unit_id','unit_name','location'], ['ID','Name','Location'], true); break;
      case 'parts': title.textContent = 'Parts'; await renderTable('/api/products/parts', 'Parts', ['part_id','part_name','specification'], ['ID','Name','Specification'], true); break;
      case 'prod-log': title.textContent = 'Production Log'; await renderTable('/api/products/produces', 'Production Log', ['unit_name','product_name','production_date','quantity'], ['Unit','Product','Date','Qty'], true); break;
      case 'work-assign': title.textContent = 'Work Assignments'; await renderTable('/api/products/performs', 'Work Assignments', ['emp_name','part_name','role_type'], ['Employee','Part','Role'], true); break;
      case 'shops': title.textContent = 'Shops'; await renderTable('/api/inventory/shops', 'Shops', ['shop_id','location'], ['ID','Location'], true); break;
      case 'order-summary': title.textContent = 'Order Summary'; await renderTable('/api/orders/summary/all', 'Order Summary', ['company_name','order_id','order_date','status','items','total_value'], ['Buyer','Order','Date','Status','Items','Value ₹'], false); break;
      case 'consultations': title.textContent = 'Consultations'; await renderTable('/api/legal/consultations', 'Consultations', ['consult_id','type','fee'], ['ID','Type','Fee ₹'], role==='admin'||role==='finance'); break;
      case 'case-handling': title.textContent = 'Case Handling'; await renderTable('/api/legal/handling', 'Case Handling', ['case_type','status','lawyer_name','lawyer_spec'], ['Case Type','Status','Lawyer','Specialization'], false); break;
      case 'assignments': title.textContent = 'Vehicle Assignments'; await renderTable('/api/vehicles/assignments', 'Assignments', ['registration_no','type','driver_name'], ['Vehicle','Type','Driver'], true); break;
      case 'maintenance': title.textContent = 'Maintenance Log'; await renderTable('/api/vehicles/maintenance', 'Maintenance Log', ['registration_no','mechanic_name','service_date','service_details'], ['Vehicle','Mechanic','Date','Details'], true); break;
      case 'ownership': title.textContent = 'Ownership'; await renderOwnership(); break;
      default: document.getElementById('pageContent').innerHTML = '<div class="empty-state"><div class="icon">🚧</div><p>Page not found</p></div>';
    }
  } catch(err) { document.getElementById('pageContent').innerHTML = `<div class="empty-state"><div class="icon">❌</div><p>Error: ${err.message}</p></div>`; }
}

// === DASHBOARD ===
async function renderDashboard(role) {
  const res = await fetch(`/api/dashboard/${role}`);
  const data = await res.json();
  const el = document.getElementById('pageContent');
  let html = '<div class="stats-grid">';

  if (role === 'admin') {
    html += statCard('👥','Employees', data.employees, 'Across all departments', 'blue');
    html += statCard('🏛️','Departments', data.departments, '', 'gold');
    html += statCard('📦','Products', data.products, '', 'green');
    html += statCard('🛒','Orders', data.orders, '', 'blue');
    html += statCard('💰','Revenue', '₹'+fmt(data.revenue), 'Total order value', 'gold', true);
    html += statCard('📋','Inventory Value', '₹'+fmt(data.inventoryValue), '', 'green', true);
    html += statCard('🚛','Vehicles', data.vehicles, '', 'blue');
    html += statCard('⚖️','Active Cases', data.activeCases, '', 'red');
    html += '</div>';
    html += '<div class="grid-2">';
    html += chartBar('Department Distribution', data.deptDistribution, 'dept_name', 'count');
    html += recentTable('Recent Orders', data.recentOrders, ['order_id','company_name','order_date','status']);
    html += '</div>';
  } else if (role === 'hr') {
    html += statCard('👥','Total Employees', data.employees, '', 'blue');
    html += statCard('💵','Avg Salary', '₹'+fmt(data.avgSalary), '', 'gold', true);
    html += statCard('💰','Total Payroll', '₹'+fmt(data.totalSalary), 'Monthly', 'green', true);
    html += '</div>';
    html += '<div class="grid-2">';
    html += chartBar('Employees by Department', data.deptDistribution, 'dept_name', 'count');
    html += chartBar('Employees by Role', data.roleDistribution, 'role', 'count');
    html += '</div>';
  } else if (role === 'production') {
    html += statCard('🏭','Production Units', data.units, '', 'blue');
    html += statCard('🔩','Parts', data.parts, '', 'gold');
    html += statCard('📦','Products', data.products, '', 'green');
    html += statCard('📈','Total Produced', fmt(data.totalProduced), 'Units', 'blue');
    html += '</div>';
    html += recentTable('Recent Production', data.recentProduction, ['unit_name','product_name','production_date','quantity']);
  } else if (role === 'inventory') {
    html += statCard('🏪','Shops', data.shops, '', 'blue');
    html += statCard('📦','Total Stock', fmt(data.totalStock), 'Items', 'green');
    html += statCard('⚠️','Low Stock Alerts', data.lowStockAlerts, '< 50 units', 'red');
    html += statCard('💰','Inventory Value', '₹'+fmt(data.inventoryValue), '', 'gold', true);
    html += '</div>';
    html += chartBar('Stock by Shop', data.stockByShop, 'location', 'total');
  } else if (role === 'finance') {
    html += statCard('💰','Total Revenue', '₹'+fmt(data.revenue), '', 'gold', true);
    html += statCard('⏳','Pending Orders', data.pendingOrders, '', 'red');
    html += statCard('🌍','Customs Duty', '₹'+fmt(data.totalDuty), '', 'blue');
    html += statCard('💼','Consultation Fees', '₹'+fmt(data.consultationFees), '', 'green');
    html += '</div>';
    html += '<div class="grid-2">';
    html += statCard('💵','Monthly Payroll', '₹'+fmt(data.salaryCost), '', 'gold', true);
    html += chartBar('Orders by Status', data.ordersByStatus, 'status', 'count');
    html += '</div>';
  } else if (role === 'legal') {
    html += statCard('⚖️','Total Cases', data.totalCases, '', 'blue');
    html += statCard('🔴','Active Cases', data.activeCases, '', 'red');
    html += statCard('🌍','Customs Duty', '₹'+fmt(data.totalDuty), '', 'gold', true);
    html += statCard('👨‍⚖️','Lawyers', data.lawyers, '', 'green');
    html += '</div>';
    html += chartBar('Cases by Status', data.casesByStatus, 'status', 'count');
  } else if (role === 'logistics') {
    html += statCard('🚛','Vehicles', data.vehicles, '', 'blue');
    html += statCard('🔗','Assigned', data.assigned, '', 'green');
    html += statCard('👨‍✈️','Drivers', data.drivers, '', 'gold');
    html += statCard('🔧','Maintenance Logs', data.maintenanceLogs, '', 'blue');
    html += '</div>';
    html += chartBar('Fleet by Type', data.vehicleTypes, 'type', 'count');
  } else if (role === 'buyer') {
    html += statCard('🛒','Total Orders', data.orders, '', 'blue');
    html += statCard('💰','Total Spent', '₹'+fmt(data.totalSpent), '', 'gold', true);
    html += statCard('📦','Available Products', data.availableProducts, '', 'green');
    html += '</div>';
    html += recentTable('Recent Orders', data.recentOrders, ['order_id','company_name','order_date','status']);
  } else if (role === 'shareholder') {
    html += statCard('🏢','Company', data.company?.name||'—', '', 'gold');
    html += statCard('📅','Established', data.company?.established_year||'—', '', 'blue');
    html += statCard('📊','Total Ownership', data.totalOwnership+'%', 'Mapped', 'green');
    html += '</div>';
    html += shareholderTable(data.shareholders);
  }

  el.innerHTML = html;
  animateCounters();
}

// === HELPERS ===
function fmt(n) { if(n==null) return '0'; return Number(n).toLocaleString('en-IN'); }

function statCard(icon, label, value, sub, color, isGold) {
  return `<div class="stat-card ${color}"><div class="stat-icon">${icon}</div>
    <div class="stat-label">${label}</div>
    <div class="stat-value${isGold?' gold-text':''}" data-count="${typeof value==='number'?value:''}">${value}</div>
    ${sub?`<div class="stat-sub">${sub}</div>`:''}</div>`;
}

function chartBar(title, data, labelKey, valueKey) {
  if (!data || !data.length) return '';
  const max = Math.max(...data.map(d => Number(d[valueKey])||0), 1);
  let bars = data.map(d => {
    const h = Math.max(((Number(d[valueKey])||0)/max)*140, 4);
    return `<div class="bar-item"><div class="bar-value">${d[valueKey]}</div><div class="bar" style="height:${h}px"></div><div class="bar-label">${d[labelKey]}</div></div>`;
  }).join('');
  return `<div class="chart-card"><h4>${title}</h4><div class="bar-chart">${bars}</div></div>`;
}

function recentTable(title, rows, cols) {
  if (!rows || !rows.length) return '';
  let ths = cols.map(c => `<th>${c.replace(/_/g,' ')}</th>`).join('');
  let trs = rows.map(r => '<tr>'+cols.map(c => {
    let v = r[c]??'';
    if (c==='status') v = statusBadge(v);
    return `<td>${v}</td>`;
  }).join('')+'</tr>').join('');
  return `<div class="table-card"><div class="table-header"><h3>${title}</h3></div><table class="data-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

function shareholderTable(data) {
  if (!data?.length) return '';
  let rows = data.map(s => `<tr><td>${s.name}</td><td>${s.type||''}</td><td><span class="badge badge-gold">${s.percentage_owned}%</span></td><td>${s.share_type}</td><td>${s.contact}</td></tr>`).join('');
  return `<div class="table-card"><div class="table-header"><h3>Shareholder Distribution</h3></div><table class="data-table"><thead><tr><th>Name</th><th>Type</th><th>Ownership</th><th>Share Type</th><th>Contact</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function statusBadge(s) {
  const cls = { Confirmed:'success', Shipped:'info', Pending:'warning', Ongoing:'warning', Open:'info', Closed:'success' };
  return `<span class="badge badge-${cls[s]||'info'}">${s}</span>`;
}

// === FORM CONFIGS FOR ADD MODAL ===
const ADD_FORMS = {
  '/api/departments': { title: 'Add Department', fields: [
    { name: 'dept_id', label: 'Department ID', type: 'number', required: true },
    { name: 'dept_name', label: 'Department Name', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true }
  ]},
  '/api/products': { title: 'Add Product', fields: [
    { name: 'product_id', label: 'Product ID', type: 'number', required: true },
    { name: 'product_name', label: 'Product Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'cost_price', label: 'Cost Price (₹)', type: 'number', step: '0.01', required: true },
    { name: 'selling_price', label: 'Selling Price (₹)', type: 'number', step: '0.01', required: true }
  ]},
  '/api/buyers': { title: 'Add Buyer', fields: [
    { name: 'buyer_id', label: 'Buyer ID', type: 'number', required: true },
    { name: 'company_name', label: 'Company Name', type: 'text', required: true },
    { name: 'gst_no', label: 'GST Number', type: 'text', required: true },
    { name: 'contact_person', label: 'Contact Person', type: 'text', required: true }
  ]},
  '/api/vehicles': { title: 'Add Vehicle', fields: [
    { name: 'vehicle_id', label: 'Vehicle ID', type: 'number', required: true },
    { name: 'type', label: 'Type', type: 'select', options: ['Truck','Van','Trailer','Pickup','Sedan'], required: true },
    { name: 'registration_no', label: 'Registration No.', type: 'text', required: true }
  ]},
  '/api/legal/cases': { title: 'Add Legal Case', fields: [
    { name: 'case_id', label: 'Case ID', type: 'number', required: true },
    { name: 'case_type', label: 'Case Type', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Open','Ongoing','Closed'], required: true }
  ]},
  '/api/legal/customs': { title: 'Add Customs Record', fields: [
    { name: 'record_id', label: 'Record ID', type: 'number', required: true },
    { name: 'import_export', label: 'Type', type: 'select', options: ['Import','Export'], required: true },
    { name: 'duty_amount', label: 'Duty Amount (₹)', type: 'number', step: '0.01', required: true }
  ]},
  '/api/inventory/shops': { title: 'Add Shop', fields: [
    { name: 'shop_id', label: 'Shop ID', type: 'number', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true }
  ]},
  '/api/products/parts': { title: 'Add Part', fields: [
    { name: 'part_id', label: 'Part ID', type: 'number', required: true },
    { name: 'part_name', label: 'Part Name', type: 'text', required: true },
    { name: 'specification', label: 'Specification', type: 'text', required: true }
  ]},
  '/api/products/units': { title: 'Add Production Unit', fields: [
    { name: 'unit_id', label: 'Unit ID', type: 'number', required: true },
    { name: 'unit_name', label: 'Unit Name', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true }
  ]},
  '/api/legal/consultations': { title: 'Add Consultation', fields: [
    { name: 'consult_id', label: 'Consultation ID', type: 'number', required: true },
    { name: 'type', label: 'Type', type: 'text', required: true },
    { name: 'fee', label: 'Fee (₹)', type: 'number', step: '0.01', required: true }
  ]},
  '/api/orders': { title: 'Add Purchase Order', fields: [
    { name: 'order_id', label: 'Order ID', type: 'number', required: true },
    { name: 'order_date', label: 'Order Date', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'select', options: ['Pending','Confirmed','Shipped','Delivered','Cancelled'], required: true },
    { name: 'buyer_id', label: 'Buyer ID', type: 'number', required: true }
  ]},
  '/api/inventory': { title: 'Add Inventory Entry', fields: [
    { name: 'shop_id', label: 'Shop ID', type: 'number', required: true },
    { name: 'product_id', label: 'Product ID', type: 'number', required: true },
    { name: 'stock_quantity', label: 'Stock Quantity', type: 'number', required: true }
  ]},
  '/api/products/produces': { title: 'Add Production Log', fields: [
    { name: 'unit_id', label: 'Unit ID', type: 'number', required: true },
    { name: 'product_id', label: 'Product ID', type: 'number', required: true },
    { name: 'production_date', label: 'Production Date', type: 'date', required: true },
    { name: 'quantity', label: 'Quantity Produced', type: 'number', required: true }
  ]},
  '/api/products/performs': { title: 'Add Work Assignment', fields: [
    { name: 'emp_id', label: 'Employee ID', type: 'number', required: true },
    { name: 'part_id', label: 'Part ID', type: 'number', required: true },
    { name: 'role_type', label: 'Role Type', type: 'text', required: true }
  ]}
};

function showAddModal(apiUrl) {
  const config = ADD_FORMS[apiUrl];
  if (!config) { toast('Add form not configured for this entity', 'info'); return; }

  let fieldsHtml = config.fields.map(f => {
    let input;
    if (f.type === 'select') {
      input = `<select name="${f.name}" id="add_${f.name}" ${f.required?'required':''}>
        <option value="">Select...</option>
        ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
      </select>`;
    } else {
      input = `<input type="${f.type}" name="${f.name}" id="add_${f.name}" placeholder="Enter ${f.label.toLowerCase()}" ${f.required?'required':''} ${f.step?`step="${f.step}"`:''}>`;
    }
    return `<div class="form-row"><label>${f.label}</label>${input}</div>`;
  }).join('');

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'addModal';
  overlay.innerHTML = `<div class="modal">
    <div class="modal-header"><h3>${config.title}</h3><button class="modal-close" onclick="closeModal()">×</button></div>
    <form id="addForm" onsubmit="submitAdd(event, '${apiUrl}')">
      <div class="modal-body">${fieldsHtml}</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Record</button>
      </div>
    </form>
  </div>`;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  // Focus first input
  const firstInput = overlay.querySelector('input, select');
  if (firstInput) setTimeout(() => firstInput.focus(), 100);
}

function closeModal() {
  const modal = document.getElementById('addModal');
  if (modal) modal.remove();
}

async function submitAdd(e, apiUrl) {
  e.preventDefault();
  const form = document.getElementById('addForm');
  const formData = new FormData(form);
  const body = {};
  formData.forEach((val, key) => { body[key] = val; });

  // Convert numeric fields
  const config = ADD_FORMS[apiUrl];
  if (config) config.fields.forEach(f => {
    if (f.type === 'number' && body[f.name]) body[f.name] = Number(body[f.name]);
  });

  try {
    const res = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (data.success) {
      closeModal();
      toast('Record added successfully!', 'success');
      navigate(currentPage);
    } else {
      toast(data.error || 'Failed to add record', 'error');
    }
  } catch(err) { toast('Error: ' + err.message, 'error'); }
}

// === GENERIC TABLE RENDERER ===
async function renderTable(url, title, fields, headers, canEdit) {
  const res = await fetch(url);
  const data = await res.json();
  const el = document.getElementById('pageContent');

  let ths = headers.map(h => `<th>${h}</th>`).join('');
  if (canEdit) ths += '<th>Actions</th>';

  let trs = '';
  if (!data.length) {
    trs = `<tr><td colspan="${headers.length+(canEdit?1:0)}" style="text-align:center;padding:40px;color:var(--text-muted)">No records found</td></tr>`;
  } else {
    trs = data.map(row => {
      let tds = fields.map(f => {
        let v = row[f] ?? '';
        if (f === 'status') v = statusBadge(v);
        else if (f === 'import_export') v = `<span class="badge badge-${v==='Import'?'info':'success'}">${v}</span>`;
        else if (typeof v === 'number' && (f.includes('price') || f.includes('salary') || f.includes('amount') || f.includes('fee') || f.includes('value'))) v = '₹'+fmt(v);
        else if (f.includes('date') && v) v = new Date(v).toLocaleDateString('en-IN');
        return `<td>${v}</td>`;
      }).join('');
      if (canEdit) tds += `<td><button class="btn btn-sm btn-danger" onclick="deleteRecord('${url}','${row[fields[0]]}')">✕</button></td>`;
      return `<tr>${tds}</tr>`;
    }).join('');
  }

  const addBtnHtml = canEdit ? `<button class="btn btn-primary btn-sm" onclick="showAddModal('${url}')">+ Add New</button>` : '';
  el.innerHTML = `<div class="table-card">
    <div class="table-header"><h3>${title} <span style="color:var(--text-muted);font-weight:400;font-size:0.85rem">(${data.length})</span></h3>
    <div class="table-actions">${addBtnHtml}</div></div>
    <table class="data-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

// === EMPLOYEES PAGE ===
async function renderEmployees() {
  const res = await fetch('/api/employees');
  const data = await res.json();
  const el = document.getElementById('pageContent');

  const roleCounts = {};
  data.forEach(e => { roleCounts[e.role_type] = (roleCounts[e.role_type]||0)+1; });

  let stats = '<div class="stats-grid">';
  stats += statCard('👥','Total', data.length, '', 'blue');
  Object.entries(roleCounts).forEach(([role, count]) => {
    stats += statCard('👤', role, count, '', 'gold');
  });
  stats += '</div>';

  let rows = data.map(e => `<tr>
    <td>${e.emp_id}</td><td><strong>${e.name}</strong></td>
    <td><span class="badge badge-info">${e.role_type}</span></td>
    <td>${e.dept_name||'—'}</td>
    <td>₹${fmt(e.salary)}</td>
    <td>${e.phone||'—'}</td>
    <td>${e.joining_date?new Date(e.joining_date).toLocaleDateString('en-IN'):'—'}</td>
    <td><button class="btn btn-sm btn-danger" onclick="deleteRecord('/api/employees','${e.emp_id}')">✕</button></td>
  </tr>`).join('');

  el.innerHTML = stats + `<div class="table-card"><div class="table-header"><h3>Employee Directory (${data.length})</h3></div>
    <table class="data-table"><thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Dept</th><th>Salary</th><th>Phone</th><th>Joined</th><th>Actions</th></tr></thead>
    <tbody>${rows}</tbody></table></div>`;
}

// === COMPANY PAGE ===
async function renderCompany() {
  const [compRes, shRes] = await Promise.all([fetch('/api/company'), fetch('/api/company/shareholders')]);
  const company = await compRes.json();
  const shareholders = await shRes.json();
  const el = document.getElementById('pageContent');

  let companyCard = `<div class="table-card"><div class="table-header"><h3>🏢 Company Details</h3></div>
    <table class="data-table">
    <tr><td style="width:200px;font-weight:600">Company Name</td><td>${company.name||'—'}</td></tr>
    <tr><td style="font-weight:600">Type</td><td><span class="badge badge-gold">${company.type||'—'}</span></td></tr>
    <tr><td style="font-weight:600">Registration No.</td><td>${company.registration_no||'—'}</td></tr>
    <tr><td style="font-weight:600">Headquarters</td><td>${company.headquarters||'—'}</td></tr>
    <tr><td style="font-weight:600">Established</td><td>${company.established_year||'—'}</td></tr>
    </table></div>`;

  el.innerHTML = companyCard + shareholderTable(shareholders);
}

// === OWNERSHIP ===
async function renderOwnership() {
  const res = await fetch('/api/dashboard/shareholder');
  const data = await res.json();
  const el = document.getElementById('pageContent');

  let html = '<div class="stats-grid">';
  html += statCard('🏢', 'Company', data.company?.name||'—', '', 'gold');
  html += statCard('📊', 'Total Mapped', data.totalOwnership+'%', '', 'blue');
  html += statCard('👤', 'Shareholders', data.shareholders?.length||0, '', 'green');
  html += '</div>';
  html += shareholderTable(data.shareholders);
  el.innerHTML = html;
}

// === DELETE ===
async function deleteRecord(baseUrl, id) {
  if (!confirm('Delete this record?')) return;
  try {
    const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    const d = await res.json();
    if (d.success) { toast('Record deleted','success'); navigate(currentPage); }
    else toast(d.error||'Delete failed','error');
  } catch(e) { toast('Error: '+e.message, 'error'); }
}

// === TOAST ===
function toast(msg, type='info') {
  const container = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = (type==='success'?'✓ ':type==='error'?'✕ ':'ℹ ') + msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// === COUNTER ANIMATION ===
function animateCounters() {
  document.querySelectorAll('.stat-value[data-count]').forEach(el => {
    const target = Number(el.dataset.count);
    if (!target || isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString('en-IN');
    }, 30);
  });
}

// === LOGOUT ===
async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/';
}

// === START ===
init();
