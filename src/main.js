const categories = [
  { id: 'interior', label: '🏠 인테리어/건축', icon: '🏠' },
  { id: 'food', label: '🍽 식품/건강', icon: '🍽' },
  { id: 'it', label: '💻 전자제품/IT', icon: '💻' },
  { id: 'beauty', label: '💄 뷰티/화장품', icon: '💄' },
  { id: 'fashion', label: '👗 패션/잡화', icon: '👗' },
  { id: 'pet', label: '🐶 반려동물', icon: '🐶' },
  { id: 'kids', label: '👶 유아/교육', icon: '👶' },
  { id: 'b2b', label: '🏭 산업용/B2B', icon: '🏭' },
  { id: 'daily', label: '🧴 생활용품', icon: '🧴' },
  { id: 'other', label: '✨ 기타', icon: '✨' }
];

const features = [
  '가성비', '프리미엄', '친환경', '특허기술', '국내생산',
  '수입정품', '저자극', '고성능', '간편사용', '기타'
];

// 카테고리별 동적 필드 데이터
const dynamicFieldsData = {
  food: [
    { name: '원산지', type: 'text', placeholder: '예: 국내산, 호주산 등' },
    { name: '알레르기 유발 성분', type: 'text', placeholder: '예: 대두, 밀, 우유 함유' },
    { name: '보관 방법', type: 'text', placeholder: '예: 냉장/냉동/실온 보관' },
    { name: 'HACCP 여부', type: 'radio', options: ['인증 완료', '없음'] },
    { name: '맛 표현 키워드', type: 'text', placeholder: '예: 매콤달콤, 겉바속촉' }
  ],
  beauty: [
    { name: '피부 타입', type: 'checkbox', options: ['건성', '지성', '복합성', '민감성', '모든피부'] },
    { name: '전성분', type: 'textarea', placeholder: '주요 성분 또는 전성분 입력' },
    { name: '사용 방법', type: 'textarea', placeholder: '사용 순서 및 방법' },
    { name: '임상 테스트 여부', type: 'radio', options: ['완료', '없음'] }
  ],
  it: [
    { name: '배터리 용량', type: 'text', placeholder: '예: 5000mAh' },
    { name: '소비전력', type: 'text', placeholder: '예: 2200W' },
    { name: 'KC 인증 여부', type: 'radio', options: ['인증됨', '미인증'] },
    { name: '호환 기종/OS', type: 'text', placeholder: '예: iOS, Android, PC 호환' }
  ],
  interior: [
    { name: '시공 면적/크기', type: 'text', placeholder: '예: 30평대, 100x200cm' },
    { name: '시공 방식', type: 'text', placeholder: '예: 셀프 시공, 전문가 시공' },
    { name: '유지관리 방법', type: 'textarea', placeholder: '물청소 가능 여부 등' },
    { name: '내구연한/보증기간', type: 'text', placeholder: '예: 무상보증 5년' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderFeatures();

  const colorInput = document.getElementById('brandColor');
  const colorHex = document.getElementById('colorHex');
  colorInput.addEventListener('input', (e) => {
    colorHex.textContent = e.target.value;
  });

  // Limit checkbox to 5 for features
  const featuresContainer = document.getElementById('featuresGroup');
  featuresContainer.addEventListener('change', (event) => {
    const checked = featuresContainer.querySelectorAll('input:checked');
    if (checked.length > 5) {
      alert('주요 특징은 최대 5개까지만 선택 가능합니다.');
      event.target.checked = false;
    }
  });

  // Form submit
  document.getElementById('ai-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('AI 상세페이지 기획이 시작됩니다! (데모 화면 완성)');
  });
});

function renderCategories() {
  const container = document.getElementById('categoryGroup');
  container.innerHTML = categories.map(cat => `
    <label class="card-radio">
      <input type="radio" name="category" value="${cat.id}">
      <div class="card-content">
        <div>${cat.icon}</div>
        <div style="font-size:0.9rem; margin-top:0.5rem">${cat.label.replace(cat.icon, '').trim()}</div>
      </div>
    </label>
  `).join('');

  container.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener('change', (e) => handleCategoryChange(e.target.value));
  });
}

function renderFeatures() {
  const container = document.getElementById('featuresGroup');
  container.innerHTML = features.map(feat => `
    <label class="btn-check">
      <input type="checkbox" name="feature" value="${feat}"> ${feat}
    </label>
  `).join('');
}

function handleCategoryChange(categoryId) {
  const section = document.getElementById('dynamic-section');
  const title = document.getElementById('dynamic-section-title');
  const container = document.getElementById('dynamic-fields');

  const fields = dynamicFieldsData[categoryId];

  if (!fields) {
    section.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  // Update logic to show fields
  const catLabel = categories.find(c => c.id === categoryId).label;
  title.innerText = `${catLabel} 맞춤 추가 정보`;
  section.classList.remove('hidden');

  container.innerHTML = fields.map(field => {
    let inputHtml = '';

    if (field.type === 'text') {
      inputHtml = `<input type="text" placeholder="${field.placeholder || ''}" class="dynamic-input">`;
    } else if (field.type === 'textarea') {
      inputHtml = `<textarea rows="2" placeholder="${field.placeholder || ''}"></textarea>`;
    } else if (field.type === 'radio') {
      inputHtml = `<div class="pills-group">` +
        field.options.map((opt, i) => `
          <label class="pill"><input type="radio" name="dyn_${field.name}" value="${opt}"> ${opt}</label>
        `).join('') + `</div>`;
    } else if (field.type === 'checkbox') {
      inputHtml = `<div class="checkbox-group">` +
        field.options.map((opt, i) => `
          <label class="btn-check"><input type="checkbox" name="dyn_${field.name}" value="${opt}"> ${opt}</label>
        `).join('') + `</div>`;
    }

    return `
      <div class="form-group slide-down">
        <label>${field.name}</label>
        ${inputHtml}
      </div>
    `;
  }).join('');
}
