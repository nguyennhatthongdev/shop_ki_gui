// Application State
const state = {
  products: [],
  filteredProducts: [],
  categories: ['Tất cả'],
  activeCategory: 'Tất cả',
  searchQuery: '',
  sortBy: 'featured',
  sheetId: localStorage.getItem('sheet_id') || 'https://script.google.com/macros/s/AKfycbzYF99LpDjLRJMXWgI1nHDLwhqTIGqwvQUem-jW7gbW8SDHqM7jJNMTTNLCPmIF1TKP/exec',
  defaultContact: localStorage.getItem('default_contact') || '',
  loading: false,
};

// Premium Mock Database (High quality fallback - Women Consignment Fashion)
const mockProducts = [
  {
    id: "sp-1",
    name: "Túi Xách Hermès Birkin 25 Gold Togo GHW",
    category: "Túi Xách",
    price: 495000000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    description: "Túi xách Hermès Birkin 25 màu Gold (Nâu vàng bò) chất liệu da Togo kinh điển, phần cứng mạ vàng (Gold Hardware - GHW). Hàng ký gửi qua sử dụng siêu lướt.\n\n- Tình trạng: Like new 99%, form cứng cáp, góc cạnh không trầy xước.\n- Phụ kiện: Đầy đủ hộp, túi vải, áo mưa, ổ khóa chìa, hóa đơn mua hàng từ Store Hermès.\n- Xuất xứ: Pháp",
    inStock: true,
    contact: ""
  },
  {
    id: "sp-2",
    name: "Váy Đầm Dior Mid-Length Dress Black Silk",
    category: "Váy Đầm",
    price: 42000000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
    description: "Chiếc váy đen cổ điển huyền thoại đến từ nhà mốt Dior, chất liệu lụa satin cao cấp phối ren tinh tế ở phần ngực. Tôn dáng cực chuẩn cho các buổi tiệc tối.\n\n- Size: 36 (S)\n- Tình trạng: Mới 98% (Đã mặc chụp hình 1 lần)\n- Chất liệu: Lụa satin & Ren cao cấp\n- Xuất xứ: Ý",
    inStock: true,
    contact: ""
  },
  {
    id: "sp-3",
    name: "Giày Cao Gót Chanel Slingbacks Beige & Black",
    category: "Giày Dép",
    price: 24500000,
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80",
    description: "Đôi giày Chanel Slingbacks hai tông màu beige và đen mũi nhọn gót vuông kinh điển. Một phụ kiện không thể thiếu trong tủ đồ hiệu của các quý cô.\n\n- Size: 37\n- Chiều cao gót: 6.5 cm\n- Tình trạng: Độ mới 95% (Có xước nhẹ ở đế giày)\n- Phụ kiện: Hộp giày và túi vải Chanel",
    inStock: true,
    contact: ""
  },
  {
    id: "sp-4",
    name: "Vòng Đeo Tay Cartier Love Bracelet Yellow Gold",
    category: "Trang Sức",
    price: 155000000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
    description: "Chiếc vòng tay Cartier Love bản Classic chất liệu vàng vàng 18K (Yellow Gold). Biểu tượng tình yêu vĩnh cửu nổi tiếng toàn cầu.\n\n- Size: 17\n- Tình trạng: Mới 97%, có trầy xước dăm nhẹ trong quá trình sử dụng (Có thể đánh bóng lại tại hãng)\n- Phụ kiện: Đầy đủ giấy chứng nhận (Certificate), tuốc nơ vít tháo mở vòng, hộp lót nhung đỏ",
    inStock: true,
    contact: ""
  },
  {
    id: "sp-5",
    name: "Kính Mắt Nữ Gucci Square-Frame Acetate",
    category: "Phụ Kiện",
    price: 5800000,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
    description: "Kính mát Gucci gọng Acetate đen bản to sang trọng, càng kính đính logo GG bằng kim loại mạ vàng nổi bật. Mắt kính chống tia cực tím 100%.\n\n- Tình trạng: Like new 99% không xước\n- Phụ kiện: Hộp kính bọc nhung, khăn lau chính hãng\n- Xuất xứ: Ý",
    inStock: true,
    contact: ""
  },
  {
    id: "sp-6",
    name: "Nước Hoa Chanel Coco Mademoiselle Intense 100ml",
    category: "Mỹ Phẩm",
    price: 3600000,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80",
    description: "Chanel Coco Mademoiselle Intense Eau de Parfum chai 100ml. Hương thơm hổ phách phương đông quyến rũ, ấm áp và lôi cuốn với nốt hương hoắc hương, vani ngọt ngào.\n\n- Dung tích: Còn 90ml / 100ml\n- Tình trạng: Chai thủy tinh đẹp không xước vỡ, cam kết authentic 100%\n- Xuất xứ: Pháp",
    inStock: true,
    contact: ""
  },
  {
    id: "sp-7",
    name: "Áo Khoác Dạ Celine Tweed Jacket Navy Blue",
    category: "Váy Đầm",
    price: 35000000,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    description: "Áo khoác dáng lửng Celine chất liệu dạ Tweed cao cấp màu xanh navy thêu dệt tinh xảo, cúc áo bằng đồng cổ dập chìm biểu tượng Celine.\n\n- Size: FR 36 (S)\n- Tình trạng: Độ mới 98%, phom dáng hoàn hảo không sờn rách\n- Chất liệu: Dạ Tweed lót lụa tơ tằm\n- Xuất xứ: Ý",
    inStock: true,
    contact: ""
  },
  {
    id: "sp-8",
    name: "Son Dior Rouge Satin Lipstick 999 Velvet",
    category: "Mỹ Phẩm",
    price: 950000,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
    description: "Thỏi son đỏ huyền thoại Rouge Dior màu 999 Velvet (Đỏ tươi chất son nhung lì quyến rũ). Lên màu chuẩn và lâu trôi.\n\n- Tình trạng: Mới 100% nguyên seal chưa bóc vỏ\n- Hạn sử dụng: Đến 2028\n- Phụ kiện: Đầy đủ hộp giấy chính hãng",
    inStock: false,
    contact: ""
  }
];

// Helper functions
const formatCurrency = (number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(number);
};

const extractSpreadsheetId = (input) => {
  if (!input) return '';
  // Check if input is a full URL or just the ID
  const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : input.trim();
};

// Map raw data from Google Sheet Visualization API
const mapGoogleSheetToProducts = (rawCols, rawRows) => {
  const colNames = rawCols.map(col => (col.label || '').toLowerCase().trim());
  
  return rawRows.map((row, index) => {
    const item = {};
    
    // Safety check for rows that might be partially filled
    if (!row || !row.c) return null;
    
    row.c.forEach((cell, idx) => {
      const colName = colNames[idx] || `col_${idx}`;
      item[colName] = cell ? cell.v : '';
    });
    
    const findValue = (keywords) => {
      const key = colNames.find(col => keywords.some(kw => col.includes(kw)));
      return key && item[key] !== undefined && item[key] !== null ? item[key] : null;
    };
    
    const id = findValue(['id', 'mã']) || `sp-${index + 1}`;
    const name = findValue(['tên', 'name', 'title', 'sản phẩm']) || 'Sản phẩm không tên';
    const category = findValue(['danh mục', 'loại', 'category', 'nhóm']) || 'Mặc định';
    const priceRaw = findValue(['giá', 'price']);
    const image = findValue(['ảnh', 'image', 'hình', 'img', 'url']) || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80';
    const description = findValue(['mô tả', 'description', 'detail', 'chi tiết']) || 'Chưa có thông tin mô tả chi tiết cho sản phẩm này.';
    const statusRaw = findValue(['trạng thái', 'status', 'còn', 'tồn']) || 'Còn hàng';
    const contact = findValue(['liên hệ', 'contact', 'zalo', 'link', 'mua']) || '';
    
    // Format Price
    let priceVal = 0;
    if (priceRaw !== null && priceRaw !== undefined) {
      if (typeof priceRaw === 'number') {
        priceVal = priceRaw;
      } else {
        const cleanStr = String(priceRaw).replace(/[^0-9]/g, '');
        priceVal = parseInt(cleanStr, 10) || 0;
      }
    }
    
    // Format Status
    let inStock = true;
    const statusStr = String(statusRaw).toLowerCase();
    if (statusStr.includes('hết') || statusStr.includes('out') || statusStr === '0' || statusStr === 'false') {
      inStock = false;
    }
    
    return {
      id,
      name,
      category,
      price: priceVal,
      image,
      description,
      inStock,
      contact: String(contact)
    };
  }).filter(p => p !== null);
};

// UI Rendering Functions
const showSkeleton = () => {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  
  for (let i = 0; i < 8; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'product-card skeleton-card';
    skeleton.innerHTML = `
      <div class="card-image-wrapper skeleton-image"></div>
      <div class="card-content">
        <div class="skeleton-text cat"></div>
        <div class="skeleton-text title-1"></div>
        <div class="skeleton-text title-2"></div>
        <div class="card-footer">
          <div class="skeleton-text price"></div>
        </div>
      </div>
    `;
    grid.appendChild(skeleton);
  }
};

const updateUIStatus = (statusType) => {
  const indicator = document.getElementById('status-indicator');
  const text = document.getElementById('status-text');
  
  indicator.className = 'status-indicator';
  
  if (statusType === 'connected') {
    indicator.classList.add('connected');
    text.textContent = 'Dữ liệu: Google Sheet';
  } else if (statusType === 'mock') {
    indicator.classList.add('mock');
    text.textContent = 'Dữ liệu: Chế độ chạy thử (Dữ liệu mẫu)';
  } else {
    text.textContent = 'Đang kết nối...';
  }
};

const renderCategories = () => {
  const container = document.getElementById('categories-container');
  container.innerHTML = '';
  
  state.categories.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = `category-chip ${state.activeCategory === cat ? 'active' : ''}`;
    chip.textContent = cat;
    chip.addEventListener('click', () => {
      state.activeCategory = cat;
      renderCategories();
      filterAndSortProducts();
    });
    container.appendChild(chip);
  });
};

const renderProducts = () => {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  
  const statsShowing = document.getElementById('stats-showing');
  statsShowing.textContent = `Hiển thị ${state.filteredProducts.length} / ${state.products.length} sản phẩm`;
  
  if (state.filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i data-lucide="package-open"></i></div>
        <div class="empty-title">Không tìm thấy sản phẩm nào</div>
        <div class="empty-desc">Thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục khác xem sao nhé!</div>
        ${state.sheetId ? '' : '<button class="btn-primary" style="margin-top: 1rem;" onclick="openSettingsModal()"><i data-lucide="settings"></i>Cấu hình Google Sheet ngay</button>'}
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }
  
  state.filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    
    const statusText = product.inStock ? 'Còn hàng' : 'Hết hàng';
    const statusClass = product.inStock ? 'in-stock' : 'out-of-stock';
    
    card.innerHTML = `
      <span class="status-badge ${statusClass}">${statusText}</span>
      <div class="card-image-wrapper">
        <img class="card-image" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80'">
      </div>
      <div class="card-content">
        <span class="card-category">${product.category}</span>
        <h3 class="card-title">${product.name}</h3>
        <div class="card-footer">
          <span class="card-price">${formatCurrency(product.price)}</span>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => openProductDrawer(product));
    grid.appendChild(card);
  });
  
  if (window.lucide) window.lucide.createIcons();
};

// Map raw data from Google Apps Script Web App (Option 2)
const normalizeAppsScriptProducts = (dataArray) => {
  return dataArray.map((item, index) => {
    const keys = Object.keys(item).map(k => k.toLowerCase().trim());
    const normalizedItem = {};
    Object.keys(item).forEach(k => {
      normalizedItem[k.toLowerCase().trim()] = item[k];
    });
    
    const findValue = (keywords) => {
      const key = keys.find(k => keywords.some(kw => k.includes(kw)));
      return key && normalizedItem[key] !== undefined && normalizedItem[key] !== null ? normalizedItem[key] : null;
    };
    
    const id = findValue(['id', 'mã']) || `sp-${index + 1}`;
    const name = findValue(['tên', 'name', 'title', 'sản phẩm']) || 'Sản phẩm không tên';
    const category = findValue(['danh mục', 'loại', 'category', 'nhóm']) || 'Mặc định';
    const priceRaw = findValue(['giá', 'price']);
    const image = findValue(['ảnh', 'image', 'hình', 'img', 'url']) || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80';
    const description = findValue(['mô tả', 'description', 'detail', 'chi tiết']) || 'Chưa có thông tin mô tả chi tiết cho sản phẩm này.';
    const statusRaw = findValue(['trạng thái', 'status', 'còn', 'tồn']) || 'Còn hàng';
    const contact = findValue(['liên hệ', 'contact', 'zalo', 'link', 'mua']) || '';
    
    // Format Price
    let priceVal = 0;
    if (priceRaw !== null && priceRaw !== undefined) {
      if (typeof priceRaw === 'number') {
        priceVal = priceRaw;
      } else {
        const cleanStr = String(priceRaw).replace(/[^0-9]/g, '');
        priceVal = parseInt(cleanStr, 10) || 0;
      }
    }
    
    // Format Status
    let inStock = true;
    const statusStr = String(statusRaw).toLowerCase();
    if (statusStr.includes('hết') || statusStr.includes('out') || statusStr === '0' || statusStr === 'false') {
      inStock = false;
    }
    
    return {
      id,
      name,
      category,
      price: priceVal,
      image,
      description,
      inStock,
      contact: String(contact)
    };
  });
};

// Data Fetch & Parse Logic
const loadData = async () => {
  state.loading = true;
  showSkeleton();
  updateUIStatus('loading');
  
  if (!state.sheetId) {
    // No sheet configured, use Mock database
    setTimeout(() => {
      state.products = [...mockProducts];
      processLoadedData();
      updateUIStatus('mock');
      state.loading = false;
    }, 800); // Small artificial delay for nice skeleton rendering
    return;
  }
  
  try {
    let parsedProducts = [];
    const isAppsScript = state.sheetId.includes('script.google.com');
    
    if (isAppsScript) {
      // Fetch directly from Google Apps Script Web App URL
      const response = await fetch(state.sheetId);
      if (!response.ok) throw new Error('Không thể kết nối API Google Apps Script');
      
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Dữ liệu trả về từ Apps Script phải là một mảng.');
      }
      
      parsedProducts = normalizeAppsScriptProducts(data);
    } else {
      // Standard Google Sheets viz API
      const cleanSheetId = extractSpreadsheetId(state.sheetId);
      const url = `https://docs.google.com/spreadsheets/d/${cleanSheetId}/gviz/tq?tqx=out:json`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Không thể tải file từ Google Sheets');
      
      const text = await response.text();
      // Google gviz endpoint returns code wrapper /*google.visualization.Query.setResponse({...});*/
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) throw new Error('Dữ liệu Google Sheets không đúng định dạng');
      
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      const data = JSON.parse(jsonString);
      
      if (data.status === 'error') {
        throw new Error(data.errors[0]?.detailed_message || 'Lỗi truy cập dữ liệu Google Sheet');
      }
      
      const rawCols = data.table.cols;
      const rawRows = data.table.rows;
      
      parsedProducts = mapGoogleSheetToProducts(rawCols, rawRows);
    }
    
    if (parsedProducts.length === 0) {
      throw new Error('Không tìm thấy dữ liệu hàng sản phẩm hợp lệ nào.');
    }
    
    state.products = parsedProducts;
    processLoadedData();
    updateUIStatus('connected');
  } catch (error) {
    console.error('Error loading data:', error);
    alert(`Lỗi đồng bộ dữ liệu: ${error.message}\n\nỨng dụng sẽ tự động hiển thị Dữ liệu mẫu.`);
    
    state.products = [...mockProducts];
    processLoadedData();
    updateUIStatus('mock');
  } finally {
    state.loading = false;
  }
};

const processLoadedData = () => {
  // Extract unique categories
  const categoriesList = new Set(state.products.map(p => p.category));
  state.categories = ['Tất cả', ...Array.from(categoriesList)];
  
  // Set fallback active category if previous doesn't exist
  if (!state.categories.includes(state.activeCategory)) {
    state.activeCategory = 'Tất cả';
  }
  
  renderCategories();
  filterAndSortProducts();
};

const filterAndSortProducts = () => {
  let result = [...state.products];
  
  // Apply Category Filter
  if (state.activeCategory !== 'Tất cả') {
    result = result.filter(p => p.category === state.activeCategory);
  }
  
  // Apply Search Query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase().trim();
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }
  
  // Apply Sort
  if (state.sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else {
    // Default / Featured: Keep natural ordering
  }
  
  state.filteredProducts = result;
  renderProducts();
};

// Drawer Interaction
const openProductDrawer = (product) => {
  const backdrop = document.getElementById('drawer-backdrop');
  const drawer = document.getElementById('drawer');
  
  // Set window hash for deep linking (avoiding infinite loops)
  if (window.location.hash !== '#' + product.id) {
    history.replaceState(null, null, '#' + product.id);
  }
  
  // Populate drawer elements
  document.getElementById('drawer-img').src = product.image;
  document.getElementById('drawer-img').onerror = function() {
    this.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80';
  };
  
  document.getElementById('drawer-cat').textContent = product.category;
  document.getElementById('drawer-product-title').textContent = product.name;
  document.getElementById('drawer-price-val').textContent = formatCurrency(product.price);
  document.getElementById('drawer-desc-text').textContent = product.description;
  
  // Status tag in drawer
  const statusEl = document.getElementById('drawer-status');
  statusEl.className = `status-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`;
  statusEl.textContent = product.inStock ? 'Còn hàng' : 'Hết hàng';
  
  // Configure Buy / Contact Action
  const btnBuy = document.getElementById('btn-buy');
  const btnChat = document.getElementById('btn-chat');
  
  // Determine target contact info
  let contactUrl = product.contact;
  let defaultContactClean = state.defaultContact.trim();
  
  // If contactUrl doesn't look like a URL and we have defaultContact, or contactUrl is empty
  if (!contactUrl) {
    if (defaultContactClean) {
      if (defaultContactClean.startsWith('http://') || defaultContactClean.startsWith('https://')) {
        contactUrl = defaultContactClean;
      } else {
        // Assume phone number, generate Zalo Link
        // Remove non-numeric characters for phone
        const cleanPhone = defaultContactClean.replace(/[^0-9]/g, '');
        contactUrl = `https://zalo.me/${cleanPhone}`;
      }
    } else {
      contactUrl = ''; // None configured
    }
  }
  
  if (contactUrl) {
    btnBuy.style.display = 'flex';
    btnBuy.onclick = () => {
      window.open(contactUrl, '_blank');
    };
    
    btnChat.style.display = 'flex';
    btnChat.onclick = () => {
      window.open(contactUrl, '_blank');
    };
  } else {
    // Hide contact buttons if nothing is configured
    btnBuy.style.display = 'none';
    btnChat.style.display = 'none';
  }
  
  // Set up Social Share Buttons
  const shareUrl = window.location.origin + window.location.pathname + '#' + product.id;
  
  // Zalo Share
  document.getElementById('btn-share-zalo').onclick = () => {
    const zaloUrl = `https://sp.zalo.me/share_to_zalo?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(product.name + ' - ' + formatCurrency(product.price))}`;
    window.open(zaloUrl, '_blank');
  };
  
  // Facebook Share
  document.getElementById('btn-share-facebook').onclick = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank');
  };
  
  // Copy Link + Message Share
  document.getElementById('btn-share-copy').onclick = () => {
    const shareText = `🌸 LADY LUXE - KÝ GỬI ĐỒ NỮ HIỆU 🌸\n✨ Sản phẩm: ${product.name}\n💰 Giá bán: ${formatCurrency(product.price)}\n📍 Chi tiết: ${shareUrl}\n💬 Nhắn tin để chốt đơn ngay!`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Đã sao chép tin nhắn kèm giá và link sản phẩm vào khay nhớ tạm! Bạn có thể dán (Paste) để gửi cho khách.');
    }).catch(err => {
      console.error('Không thể sao chép văn bản:', err);
    });
  };
  
  // Open classes
  backdrop.classList.add('active');
  drawer.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock body scroll
};

const closeProductDrawer = () => {
  const backdrop = document.getElementById('drawer-backdrop');
  const drawer = document.getElementById('drawer');
  
  // Clear hash when closing drawer
  if (window.location.hash) {
    history.replaceState(null, null, window.location.origin + window.location.pathname + window.location.search);
  }
  
  backdrop.classList.remove('active');
  drawer.classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
};

// Modal Interaction (Google Sheet Config)
const openSettingsModal = () => {
  const backdrop = document.getElementById('modal-backdrop');
  
  document.getElementById('sheet-id-input').value = state.sheetId;
  document.getElementById('contact-input').value = state.defaultContact;
  
  backdrop.classList.add('active');
};

const closeSettingsModal = () => {
  document.getElementById('modal-backdrop').classList.remove('active');
};

const saveSettings = () => {
  const sheetInput = document.getElementById('sheet-id-input').value.trim();
  const contactInput = document.getElementById('contact-input').value.trim();
  
  state.sheetId = sheetInput;
  state.defaultContact = contactInput;
  
  localStorage.setItem('sheet_id', sheetInput);
  localStorage.setItem('default_contact', contactInput);
  
  closeSettingsModal();
  loadData();
};

const resetToMockData = () => {
  state.sheetId = '';
  document.getElementById('sheet-id-input').value = '';
  localStorage.removeItem('sheet_id');
  
  closeSettingsModal();
  loadData();
};

// Hash checking for deep linking
const checkHashAndOpenProduct = () => {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#sp-')) {
    const productId = hash.substring(1);
    const product = state.products.find(p => p.id === productId);
    if (product) {
      openProductDrawer(product);
    }
  } else {
    closeProductDrawer();
  }
};

// Event Listeners Setup
document.addEventListener('DOMContentLoaded', () => {
  // Search event
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    filterAndSortProducts();
  });
  
  // Sort event
  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    filterAndSortProducts();
  });
  
  // Register close events
  document.getElementById('drawer-backdrop').addEventListener('click', closeProductDrawer);
  document.getElementById('drawer-close-btn').addEventListener('click', closeProductDrawer);
  document.getElementById('modal-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modal-backdrop') closeSettingsModal();
  });
  
  // Hash change event listener
  window.addEventListener('hashchange', checkHashAndOpenProduct);
  
  // Load products initially, then check hash deep link
  loadData().then(() => {
    // Small timeout to let products render first
    setTimeout(checkHashAndOpenProduct, 100);
  });
  
  if (window.lucide) window.lucide.createIcons();
});
