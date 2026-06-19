// site-helper.js – Public asset for generating tooltip cards, keyword badges, and visit instructions.
// No external dependencies. All data is static and used only for UI rendering.

(function () {
  'use strict';

  // Configuration data (sample site and keyword)
  var config = {
    siteUrl: 'https://homeaiyouxi.com.cn',
    keyword: '爱游戏'
  };

  // Predefined sample data: category cards with keywords
  var categoryData = [
    { title: '热门推荐', keywords: ['爱游戏', '冒险', '策略', '休闲', '动作'] },
    { title: '新游速递', keywords: ['爱游戏', 'RPG', '模拟', '射击', '解谜'] },
    { title: '玩家社区', keywords: ['爱游戏', '攻略', '测评', '活动', '讨论'] }
  ];

  // Helper: create element with optional class and content
  function createElement(tag, className, content) {
    var el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    if (content) {
      if (typeof content === 'string') {
        el.textContent = content;
      } else {
        el.appendChild(content);
      }
    }
    return el;
  }

  // Helper: create a keyword badge (span)
  function createBadge(text) {
    var span = document.createElement('span');
    span.textContent = text;
    span.className = 'keyword-badge';
    // Optional: add a small color variation based on text length (non‑random)
    var hue = (text.length * 20) % 360;
    span.style.backgroundColor = 'hsl(' + hue + ', 70%, 85%)';
    span.style.color = '#333';
    span.style.padding = '2px 8px';
    span.style.margin = '3px';
    span.style.borderRadius = '12px';
    span.style.display = 'inline-block';
    span.style.fontSize = '0.85em';
    return span;
  }

  // Helper: create a tip card (div.card)
  function createCard(title, keywords) {
    var card = document.createElement('div');
    card.className = 'tip-card';
    card.style.border = '1px solid #ddd';
    card.style.borderRadius = '8px';
    card.style.padding = '12px';
    card.style.margin = '10px 0';
    card.style.backgroundColor = '#fafafa';

    var titleEl = createElement('h4', 'card-title', title);
    titleEl.style.margin = '0 0 8px 0';
    card.appendChild(titleEl);

    var badgeContainer = createElement('div', 'badge-container');
    keywords.forEach(function (kw) {
      badgeContainer.appendChild(createBadge(kw));
    });
    card.appendChild(badgeContainer);

    return card;
  }

  // Helper: create visit instruction banner
  function createVisitBanner(url) {
    var banner = document.createElement('div');
    banner.className = 'visit-banner';
    banner.style.backgroundColor = '#e8f0fe';
    banner.style.border = '1px solid #a2c4f0';
    banner.style.borderRadius = '8px';
    banner.style.padding = '12px';
    banner.style.margin = '15px 0';
    banner.style.textAlign = 'center';

    var link = document.createElement('a');
    link.href = url;
    link.textContent = '访问 ' + url;
    link.style.color = '#1a73e8';
    link.style.textDecoration = 'none';
    link.style.fontWeight = 'bold';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    banner.appendChild(link);

    var note = document.createElement('p');
    note.textContent = '点击上方链接即可打开站点，关键词“' + config.keyword + '”已嵌入示例数据。';
    note.style.margin = '8px 0 0 0';
    note.style.fontSize = '0.9em';
    note.style.color = '#555';
    banner.appendChild(note);

    return banner;
  }

  // Main render function: attach cards and banner to a container
  function renderHelpUI(containerId) {
    var container = document.getElementById(containerId);
    if (!container) {
      console.warn('Container #' + containerId + ' not found. Creating fallback.');
      container = document.body;
    }

    // Create a wrapper to keep things tidy
    var wrapper = createElement('div', 'site-helper-wrapper');
    wrapper.style.fontFamily = 'sans-serif';
    wrapper.style.maxWidth = '600px';
    wrapper.style.margin = '20px auto';

    // Add visit banner
    wrapper.appendChild(createVisitBanner(config.siteUrl));

    // Add section title
    var sectionTitle = createElement('h3', 'helper-section-title', '关键词卡片示例');
    sectionTitle.style.margin = '20px 0 10px 0';
    wrapper.appendChild(sectionTitle);

    // Add cards
    categoryData.forEach(function (cat) {
      wrapper.appendChild(createCard(cat.title, cat.keywords));
    });

    // Add a small note
    var footerNote = createElement('p', 'helper-footer', '本组件仅为静态示例，不发起任何网络请求。');
    footerNote.style.fontSize = '0.8em';
    footerNote.style.color = '#888';
    footerNote.style.marginTop = '20px';
    wrapper.appendChild(footerNote);

    container.appendChild(wrapper);
  }

  // Auto‑run when DOM is ready (or immediately if already loaded)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderHelpUI('site-helper-container');
    });
  } else {
    renderHelpUI('site-helper-container');
  }
})();