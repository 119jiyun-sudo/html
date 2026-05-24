const dashboardData = {
  "kpis": {
    "totalSalesCount": 200,
    "totalRevenue": 122661450,
    "totalQuantity": 449,
    "avgOrderValue": 613307.25,
    "totalInboundCount": 60,
    "totalInboundCost": 994500000,
    "reorderItems": 0,
    "warningItems": 1
  },
  "categoryData": [
    {
      "category": "웨어러블",
      "quantity": 30,
      "revenue": 9475200,
      "ratio": 0.0772467633474087
    },
    {
      "category": "음향기기",
      "quantity": 124,
      "revenue": 28791050,
      "ratio": 0.234719628701601
    },
    {
      "category": "저장장치",
      "quantity": 38,
      "revenue": 6739350,
      "ratio": 0.0549426898181947
    },
    {
      "category": "전자제품",
      "quantity": 154,
      "revenue": 66048050,
      "ratio": 0.538458089318201
    },
    {
      "category": "주변기기",
      "quantity": 103,
      "revenue": 11607800,
      "ratio": 0.094632828814595
    }
  ],
  "inventory": [
    {
      "product": "스마트워치",
      "code": "P009",
      "category": "웨어러블",
      "stock": 2980,
      "safety": 90,
      "status": "재고충분"
    },
    {
      "product": "노이즈캔슬링 헤드폰",
      "code": "P006",
      "category": "음향기기",
      "stock": 2100,
      "safety": 120,
      "status": "재고충분"
    },
    {
      "product": "블루투스 스피커",
      "code": "P010",
      "category": "음향기기",
      "stock": 1560,
      "safety": 140,
      "status": "재고충분"
    },
    {
      "product": "외장 SSD 1TB",
      "code": "P008",
      "category": "저장장치",
      "stock": 1930,
      "safety": 130,
      "status": "재고충분"
    }
  ]
};

function formatCurrency(value) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(value);
}
function formatNumber(value) { return new Intl.NumberFormat('ko-KR').format(value); }

function renderKpis(kpis) {
  document.getElementById('totalRevenue').textContent = formatCurrency(kpis.totalRevenue);
  document.getElementById('totalSalesCount').textContent = formatNumber(kpis.totalSalesCount) + '건';
  document.getElementById('avgOrderValue').textContent = formatCurrency(kpis.avgOrderValue);
  document.getElementById('warningItems').textContent = formatNumber(kpis.warningItems) + '개';
}

function renderCharts(categoryData) {
  const labels = categoryData.map(item => item.category);
  const revenues = categoryData.map(item => item.revenue);
  const quantities = categoryData.map(item => item.quantity);

  new Chart(document.getElementById('revenueChart'), {
    type: 'bar',
    data: { labels, datasets: [{ label: '판매금액', data: revenues, borderWidth: 1 }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { ticks: { callback: value => formatNumber(value) } } } }
  });

  new Chart(document.getElementById('quantityChart'), {
    type: 'doughnut',
    data: { labels, datasets: [{ label: '판매수량', data: quantities }] },
    options: { responsive: true }
  });
}

function renderInventory(rows) {
  const tbody = document.getElementById('inventoryRows');
  tbody.innerHTML = rows.map(row => `
    <tr>
      <td>${row.code}</td><td>${row.product}</td><td>${row.category}</td>
      <td>${formatNumber(row.stock)}</td><td><span class="badge">${row.status}</span></td>
    </tr>`).join('');
}

renderKpis(dashboardData.kpis);
renderCharts(dashboardData.categoryData);
renderInventory(dashboardData.inventory);
